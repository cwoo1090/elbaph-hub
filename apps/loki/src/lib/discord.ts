import nacl from "tweetnacl";

const DISCORD_API = "https://discord.com/api/v10";

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

export async function fetchMessages(channelId: string, fetchAll = false): Promise<string> {
  const token = process.env.DISCORD_BOT_TOKEN?.trim();
  if (!token) return "";

  try {
    type Msg = { id: string; author: { username: string; bot?: boolean }; content: string };
    const allMessages: Msg[] = [];

    if (fetchAll) {
      // Paginate to get all messages in a thread
      let before: string | undefined;
      while (true) {
        const url = `${DISCORD_API}/channels/${channelId}/messages?limit=100${before ? `&before=${before}` : ""}`;
        const res = await fetch(url, { headers: { Authorization: `Bot ${token}` } });
        if (!res.ok) break;
        const batch = await res.json() as Msg[];
        if (batch.length === 0) break;
        allMessages.push(...batch);
        if (batch.length < 100) break;
        before = batch[batch.length - 1].id;
      }
    } else {
      // Get last 10 messages in a regular channel
      const url = `${DISCORD_API}/channels/${channelId}/messages?limit=10`;
      const res = await fetch(url, { headers: { Authorization: `Bot ${token}` } });
      if (!res.ok) return "";
      const batch = await res.json() as Msg[];
      allMessages.push(...batch);
    }

    return allMessages
      .reverse()
      .filter(m => m.content)
      .map(m => `${m.author.bot ? "Loki" : m.author.username}: ${m.content}`)
      .join("\n");
  } catch {
    return "";
  }
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
