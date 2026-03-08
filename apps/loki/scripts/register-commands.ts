import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local manually (no dotenv dependency needed)
try {
  const envPath = resolve(import.meta.dirname, "../.env.local");
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx);
    const value = trimmed.slice(eqIdx + 1);
    if (!process.env[key]) process.env[key] = value;
  }
} catch {}

const DISCORD_API = "https://discord.com/api/v10";

async function registerCommands() {
  const token = process.env.DISCORD_BOT_TOKEN?.trim();
  const appId = process.env.DISCORD_APPLICATION_ID?.trim();

  if (!token || !appId) {
    console.error("Missing DISCORD_BOT_TOKEN or DISCORD_APPLICATION_ID in .env.local");
    process.exit(1);
  }

  const commands = [
    {
      name: "ask",
      description: "Ask Loki a question",
      options: [
        {
          name: "question",
          description: "Your question",
          type: 3, // STRING
          required: true,
        },
      ],
    },
  ];

  const url = `${DISCORD_API}/applications/${appId}/commands`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${token}`,
    },
    body: JSON.stringify(commands),
  });

  if (!res.ok) {
    console.error("Failed to register commands:", res.status, await res.text());
    process.exit(1);
  }

  const data = await res.json();
  console.log("Registered commands:", data.map((c: any) => c.name).join(", "));
}

registerCommands();
