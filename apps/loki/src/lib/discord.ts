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
