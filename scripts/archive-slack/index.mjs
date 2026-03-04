import { WebClient } from "@slack/web-api";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

// --- Config ---
const CHANNELS = {
  ideas: "C0A9KPUDG7K",
  projects: "C0A95QN2DNX",
};

const ARCHIVE_DIR = path.resolve(process.cwd(), "archive");
const STATE_FILE = path.join(ARCHIVE_DIR, ".last-archived.json");
const KST_OFFSET = 9 * 60 * 60 * 1000;

// --- Clients ---
const slack = new WebClient(process.env.SLACK_BOT_TOKEN?.trim());
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// --- User cache ---
const userCache = new Map();

async function getDisplayName(userId) {
  if (userCache.has(userId)) return userCache.get(userId);
  try {
    const res = await slack.users.info({ user: userId });
    const name =
      res.user.profile.display_name ||
      res.user.real_name ||
      res.user.name;
    userCache.set(userId, name);
    return name;
  } catch {
    return userId;
  }
}

// --- Slack mrkdwn → Markdown ---
function slackToMarkdown(text) {
  if (!text) return "";
  return (
    text
      .replace(/<@(U[A-Z0-9]+)>/g, (_, id) => `@${userCache.get(id) || id}`)
      .replace(/<#C[A-Z0-9]+\|([^>]+)>/g, "#$1")
      .replace(/<(https?:[^|>]+)\|([^>]+)>/g, "[$2]($1)")
      .replace(/<(https?:[^>]+)>/g, "$1")
      .replace(/(?<!\w)\*([^*\n]+)\*(?!\w)/g, "**$1**")
      .replace(/(?<!\w)_([^_\n]+)_(?!\w)/g, "*$1*")
      .replace(/(?<!\w)~([^~\n]+)~(?!\w)/g, "~~$1~~")
  );
}

// --- Timestamp helpers ---
function tsToDate(ts) {
  const ms = parseFloat(ts) * 1000;
  return new Date(ms + KST_OFFSET);
}

function formatTime(ts) {
  const d = tsToDate(ts);
  return d.toISOString().slice(11, 16);
}

function formatDateKey(ts) {
  const d = tsToDate(ts);
  return d.toISOString().slice(0, 10);
}

// --- Fetch all messages with pagination ---
async function fetchMessages(channelId, oldest) {
  const messages = [];
  let cursor;
  do {
    const res = await slack.conversations.history({
      channel: channelId,
      oldest: oldest || undefined,
      limit: 200,
      cursor,
    });
    messages.push(...(res.messages || []));
    cursor = res.response_metadata?.next_cursor;
  } while (cursor);
  return messages.sort((a, b) => parseFloat(a.ts) - parseFloat(b.ts));
}

// --- Fetch thread replies with pagination ---
async function fetchReplies(channelId, threadTs) {
  const replies = [];
  let cursor;
  do {
    const res = await slack.conversations.replies({
      channel: channelId,
      ts: threadTs,
      limit: 200,
      cursor,
    });
    replies.push(...(res.messages || []));
    cursor = res.response_metadata?.next_cursor;
  } while (cursor);
  return replies.slice(1);
}

// --- Gemini thread summary ---
async function summarizeThread(parentText, replies) {
  const conversation = replies
    .slice(0, 50)
    .map((r) => r.text || "")
    .join("\n");

  const prompt = `다음은 Slack 스레드의 대화입니다. 1-2문장으로 핵심 내용을 요약해주세요. 요약만 출력하세요.

원본 메시지: ${parentText}

대화:
${conversation}`;

  try {
    const res = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return res.text?.trim() || "";
  } catch (e) {
    console.error("Gemini summary failed:", e.message);
    return "";
  }
}

// --- Resolve all user IDs in a set of messages ---
async function resolveUsers(messages) {
  const userIds = new Set();
  for (const msg of messages) {
    if (msg.user) userIds.add(msg.user);
  }
  await Promise.all([...userIds].map(getDisplayName));
}

// --- Format a single message ---
function formatMessage(msg, indent = "") {
  const name = userCache.get(msg.user) || msg.bot_profile?.name || "Unknown";
  const time = formatTime(msg.ts);
  const text = slackToMarkdown(msg.text || "");

  if (indent) {
    const lines = text.split("\n").map((l) => `${indent}> ${l}`);
    return `${indent}> **${name} — ${time}**\n${lines.join("\n")}`;
  }
  return `## ${name} — ${time}\n${text}`;
}

// --- Format forwarded message attachment ---
async function formatForwarded(attachment) {
  const author = attachment.author_name || "Unknown";
  const fromChannel = attachment.channel_id
    ? Object.entries(CHANNELS).find(
        ([, id]) => id === attachment.channel_id
      )?.[0] || "another channel"
    : "another channel";
  const text = slackToMarkdown(attachment.text || attachment.fallback || "");
  const lines = text.split("\n").map((l) => `> ${l}`);

  let result = `> **Forwarded from #${fromChannel} — ${author}**\n${lines.join("\n")}`;

  if (attachment.channel_id && attachment.ts) {
    try {
      const replies = await fetchReplies(attachment.channel_id, attachment.ts);
      if (replies.length > 0) {
        await resolveUsers(replies);
        const summary = await summarizeThread(attachment.text, replies);
        result += `\n>\n> ### Thread (${replies.length} replies)\n>`;
        if (summary) {
          result += `\n> **Summary:** ${summary}\n>`;
        }
        for (const reply of replies) {
          result += "\n" + formatMessage(reply, "> ");
          result += "\n>";
        }
      }
    } catch (e) {
      console.error("Failed to fetch forwarded thread:", e.message);
    }
  }

  return result;
}

// --- Main ---
async function main() {
  let state = {};
  if (fs.existsSync(STATE_FILE)) {
    state = JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"));
  }

  let totalNew = 0;

  for (const [name, channelId] of Object.entries(CHANNELS)) {
    console.log(`\nArchiving #${name}...`);
    const oldest = state[name] || undefined;
    const messages = await fetchMessages(channelId, oldest);

    if (messages.length === 0) {
      console.log(`  No new messages.`);
      continue;
    }

    console.log(`  Found ${messages.length} new messages.`);
    await resolveUsers(messages);

    const byDate = new Map();
    for (const msg of messages) {
      if (msg.subtype && msg.subtype !== "bot_message") continue;

      const dateKey = formatDateKey(msg.ts);
      if (!byDate.has(dateKey)) byDate.set(dateKey, []);
      byDate.get(dateKey).push(msg);
    }

    for (const [dateKey, dayMessages] of byDate) {
      const dir = path.join(ARCHIVE_DIR, name);
      fs.mkdirSync(dir, { recursive: true });
      const filePath = path.join(dir, `${dateKey}.md`);

      let content = `# #${name} — ${dateKey}\n`;

      for (const msg of dayMessages) {
        content += "\n" + formatMessage(msg) + "\n";

        if (msg.attachments) {
          for (const att of msg.attachments) {
            if (att.is_share || att.is_msg_unfurl) {
              content += "\n" + (await formatForwarded(att)) + "\n";
            }
          }
        }

        if (msg.reply_count && msg.reply_count > 0) {
          const replies = await fetchReplies(channelId, msg.thread_ts || msg.ts);
          if (replies.length > 0) {
            await resolveUsers(replies);
            const summary = await summarizeThread(msg.text, replies);
            content += `\n### Thread (${replies.length} replies)\n`;
            if (summary) {
              content += `\n**Summary:** ${summary}\n`;
            }
            for (const reply of replies) {
              content += "\n" + formatMessage(reply, "") + "\n";
            }
          }
        }
      }

      if (fs.existsSync(filePath)) {
        const existing = fs.readFileSync(filePath, "utf-8");
        const withoutHeader = content.replace(/^# .+\n/, "");
        fs.writeFileSync(filePath, existing + "\n" + withoutHeader);
      } else {
        fs.writeFileSync(filePath, content);
      }

      console.log(`  Wrote ${filePath}`);
      totalNew += dayMessages.length;
    }

    const latestTs = messages[messages.length - 1].ts;
    state[name] = latestTs;
  }

  fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  console.log(`\nDone. Archived ${totalNew} messages total.`);
}

main().catch((e) => {
  console.error("Archive failed:", e);
  process.exit(1);
});
