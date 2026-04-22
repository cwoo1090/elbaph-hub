import nacl from "tweetnacl";

const DISCORD_API = "https://discord.com/api/v10";
const THREAD_CHANNEL_TYPES = new Set([10, 11, 12]);
const RECENT_MESSAGE_LIMIT = 10;

type DiscordChannel = {
  type?: number;
  parent_id?: string | null;
};

export function verifyDiscordRequest(
  publicKey: string,
  signature: string,
  timestamp: string,
  body: string
): boolean {
  try {
    return nacl.sign.detached.verify(
      Buffer.from(timestamp + body),
      Buffer.from(signature, "hex"),
      Buffer.from(publicKey, "hex")
    );
  } catch {
    return false;
  }
}

export async function sendFollowup(
  applicationId: string,
  interactionToken: string,
  content: string
) {
  const url = `${DISCORD_API}/webhooks/${applicationId}/${interactionToken}`;
  const chunks = splitMessage(content, 1900);
  for (const chunk of chunks) {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: chunk }),
    });
  }
}

export async function editOriginalResponse(
  applicationId: string,
  interactionToken: string,
  content: string
) {
  const url = `${DISCORD_API}/webhooks/${applicationId}/${interactionToken}/messages/@original`;
  await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
}

export async function editOriginalResponseWithFollowups(
  applicationId: string,
  interactionToken: string,
  content: string
) {
  const chunks = splitMessage(content, 1900);
  await editOriginalResponse(applicationId, interactionToken, chunks[0]);

  for (const chunk of chunks.slice(1)) {
    await sendFollowup(applicationId, interactionToken, chunk);
  }
}

export async function postMessage(channelId: string, content: string) {
  const url = `${DISCORD_API}/channels/${channelId}/messages`;
  const chunks = splitMessage(content, 1900);
  for (const chunk of chunks) {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN?.trim()}`,
      },
      body: JSON.stringify({ content: chunk }),
    });
  }
}

export async function resolveIsThread(
  channelId: string,
  interactionChannel?: DiscordChannel
): Promise<boolean> {
  if (isThreadChannel(interactionChannel)) return true;
  if (interactionChannel?.type !== undefined) return false;

  const channel = await fetchChannel(channelId);
  return isThreadChannel(channel ?? undefined);
}

export async function fetchMessages(channelId: string, fetchAll = false): Promise<string> {
  const token = process.env.DISCORD_BOT_TOKEN?.trim();
  if (!token) {
    console.error("DISCORD_BOT_TOKEN is missing; Loki cannot read Discord message history.", { channelId, fetchAll });
    return "";
  }

  try {
    type Msg = {
      id: string;
      author: {
        username: string;
        global_name?: string | null;
        bot?: boolean;
      };
      member?: {
        nick?: string | null;
      };
      content: string;
      attachments?: Array<{ filename: string }>;
    };
    const allMessages: Msg[] = [];

    if (fetchAll) {
      // Paginate to get all messages in a thread
      let before: string | undefined;
      while (true) {
        const url = `${DISCORD_API}/channels/${channelId}/messages?limit=100${before ? `&before=${before}` : ""}`;
        const res = await fetch(url, { headers: { Authorization: `Bot ${token}` } });
        if (!res.ok) {
          await logDiscordApiFailure("fetch thread messages", channelId, res);
          break;
        }
        const batch = await res.json() as Msg[];
        if (batch.length === 0) break;
        allMessages.push(...batch);
        if (batch.length < 100) break;
        before = batch[batch.length - 1].id;
      }
    } else {
      // Get last 10 messages in a regular channel
      const url = `${DISCORD_API}/channels/${channelId}/messages?limit=${RECENT_MESSAGE_LIMIT}`;
      const res = await fetch(url, { headers: { Authorization: `Bot ${token}` } });
      if (!res.ok) {
        await logDiscordApiFailure("fetch recent channel messages", channelId, res);
        return "";
      }
      const batch = await res.json() as Msg[];
      allMessages.push(...batch);
    }

    return allMessages
      .reverse()
      .map(formatMessage)
      .filter(Boolean)
      .join("\n");
  } catch (error) {
    console.error("Failed to fetch Discord message history.", { channelId, fetchAll, error });
    return "";
  }
}

function isThreadChannel(channel?: DiscordChannel): boolean {
  if (!channel) return false;
  if (channel.parent_id) return true;
  return channel.type !== undefined && THREAD_CHANNEL_TYPES.has(channel.type);
}

async function fetchChannel(channelId: string): Promise<DiscordChannel | null> {
  const token = process.env.DISCORD_BOT_TOKEN?.trim();
  if (!token) {
    console.error("DISCORD_BOT_TOKEN is missing; Loki cannot resolve Discord channel type.", { channelId });
    return null;
  }

  try {
    const url = `${DISCORD_API}/channels/${channelId}`;
    const res = await fetch(url, { headers: { Authorization: `Bot ${token}` } });
    if (!res.ok) {
      await logDiscordApiFailure("resolve channel", channelId, res);
      return null;
    }
    return await res.json() as DiscordChannel;
  } catch (error) {
    console.error("Failed to resolve Discord channel.", { channelId, error });
    return null;
  }
}

function formatMessage(message: {
  author: { username: string; global_name?: string | null; bot?: boolean };
  member?: { nick?: string | null };
  content: string;
  attachments?: Array<{ filename: string }>;
}): string {
  const authorName = message.member?.nick || message.author.global_name || message.author.username;
  const attachmentSummary = message.attachments?.length
    ? ` [attachments: ${message.attachments.map(attachment => attachment.filename).join(", ")}]`
    : "";
  const content = message.content.trim();

  if (!content && !attachmentSummary) return "";
  return `${authorName}: ${content || "[attachment only]"}${attachmentSummary}`;
}

async function logDiscordApiFailure(operation: string, channelId: string, response: Response) {
  const body = await response.text().catch(() => "");
  console.error(`Discord API failed to ${operation}.`, {
    channelId,
    status: response.status,
    statusText: response.statusText,
    body,
  });
}

function splitMessage(text: string, maxLen: number): string[] {
  if (text.length <= maxLen) return [text];
  const chunks: string[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }
    let splitIdx = remaining.lastIndexOf("\n", maxLen);
    if (splitIdx < maxLen / 2) splitIdx = maxLen;
    chunks.push(remaining.slice(0, splitIdx));
    remaining = remaining.slice(splitIdx);
  }
  return chunks;
}
