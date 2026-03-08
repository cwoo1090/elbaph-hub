import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Client, GatewayIntentBits, TextChannel, ThreadChannel } from "discord.js";
import { z } from "zod";

const token = process.env.DISCORD_BOT_TOKEN;
if (!token) {
  console.error("DISCORD_BOT_TOKEN is required");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

await client.login(token);
await new Promise<void>((resolve) => client.once("ready", () => resolve()));

const server = new McpServer({
  name: "discord-mcp",
  version: "0.1.0",
});

// --- list_channels ---
server.tool(
  "discord_list_channels",
  "List all text and forum channels in the server",
  {},
  async () => {
    const guilds = client.guilds.cache;
    const channels: string[] = [];
    for (const guild of guilds.values()) {
      const fetched = await guild.channels.fetch();
      for (const ch of fetched.values()) {
        if (!ch) continue;
        if (ch.isTextBased() || ch.type === 15) {
          channels.push(`#${ch.name} (${ch.id}) [${ch.type === 15 ? "forum" : "text"}]`);
        }
      }
    }
    return { content: [{ type: "text", text: channels.join("\n") || "No channels found" }] };
  }
);

// --- read_channel ---
server.tool(
  "discord_read_channel",
  "Read recent messages from a Discord channel",
  {
    channel_id: z.string().describe("The Discord channel ID"),
    limit: z.number().optional().default(20).describe("Number of messages to fetch (default 20, max 100)"),
  },
  async ({ channel_id, limit }) => {
    const channel = await client.channels.fetch(channel_id);
    if (!channel || !channel.isTextBased()) {
      return { content: [{ type: "text", text: "Channel not found or not a text channel" }] };
    }
    const messages = await (channel as TextChannel).messages.fetch({ limit: Math.min(limit, 100) });
    const formatted = [...messages.values()]
      .reverse()
      .map((m) => `[${m.createdAt.toISOString()}] ${m.author.displayName}: ${m.content}`)
      .join("\n");
    return { content: [{ type: "text", text: formatted || "No messages" }] };
  }
);

// --- read_thread ---
server.tool(
  "discord_read_thread",
  "Read messages from a Discord thread",
  {
    thread_id: z.string().describe("The thread ID"),
    limit: z.number().optional().default(50).describe("Number of messages to fetch (default 50, max 100)"),
  },
  async ({ thread_id, limit }) => {
    const thread = await client.channels.fetch(thread_id);
    if (!thread || !thread.isThread()) {
      return { content: [{ type: "text", text: "Thread not found" }] };
    }
    const messages = await (thread as ThreadChannel).messages.fetch({ limit: Math.min(limit, 100) });
    const formatted = [...messages.values()]
      .reverse()
      .map((m) => `[${m.createdAt.toISOString()}] ${m.author.displayName}: ${m.content}`)
      .join("\n");
    return { content: [{ type: "text", text: formatted || "No messages in thread" }] };
  }
);

// --- post_message ---
server.tool(
  "discord_post_message",
  "Post a message to a Discord channel",
  {
    channel_id: z.string().describe("The Discord channel ID"),
    content: z.string().describe("The message content (supports markdown)"),
  },
  async ({ channel_id, content }) => {
    const channel = await client.channels.fetch(channel_id);
    if (!channel || !channel.isTextBased()) {
      return { content: [{ type: "text", text: "Channel not found or not a text channel" }] };
    }
    const msg = await (channel as TextChannel).send(content);
    return { content: [{ type: "text", text: `Message sent (id: ${msg.id})` }] };
  }
);

// --- reply_to_thread ---
server.tool(
  "discord_reply_to_thread",
  "Reply to a message, creating or continuing a thread",
  {
    channel_id: z.string().describe("The channel ID where the message is"),
    message_id: z.string().describe("The message ID to reply to / create thread on"),
    content: z.string().describe("The reply content (supports markdown)"),
    thread_name: z.string().optional().describe("Thread name (required if creating a new thread)"),
  },
  async ({ channel_id, message_id, content, thread_name }) => {
    const channel = await client.channels.fetch(channel_id);
    if (!channel || !channel.isTextBased()) {
      return { content: [{ type: "text", text: "Channel not found" }] };
    }
    const message = await (channel as TextChannel).messages.fetch(message_id);
    if (message.thread) {
      const reply = await message.thread.send(content);
      return { content: [{ type: "text", text: `Replied in thread (id: ${reply.id})` }] };
    }
    const thread = await message.startThread({
      name: thread_name || "Thread",
    });
    const reply = await thread.send(content);
    return { content: [{ type: "text", text: `Created thread and replied (thread_id: ${thread.id}, message_id: ${reply.id})` }] };
  }
);

// --- add_reaction ---
server.tool(
  "discord_add_reaction",
  "Add a reaction emoji to a message",
  {
    channel_id: z.string().describe("The channel ID"),
    message_id: z.string().describe("The message ID to react to"),
    emoji: z.string().describe("The emoji to react with (e.g., '\u{1F44D}', '\u{1F525}')"),
  },
  async ({ channel_id, message_id, emoji }) => {
    const channel = await client.channels.fetch(channel_id);
    if (!channel || !channel.isTextBased()) {
      return { content: [{ type: "text", text: "Channel not found" }] };
    }
    const message = await (channel as TextChannel).messages.fetch(message_id);
    await message.react(emoji);
    return { content: [{ type: "text", text: `Reacted with ${emoji}` }] };
  }
);

// --- Start server ---
const transport = new StdioServerTransport();
await server.connect(transport);
