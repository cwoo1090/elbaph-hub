import {
  Client,
  GatewayIntentBits,
  Events,
  Message,
  REST,
  Routes,
  SlashCommandBuilder,
} from "discord.js";
import { askGemini } from "./lib/gemini.js";
import { createManusTask } from "./lib/manus.js";

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const processedMessages = new Set<string>();

// --- Register slash commands ---
async function registerCommands() {
  const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN!);
  const command = new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Ask Loki a question")
    .addStringOption((opt) =>
      opt.setName("question").setDescription("Your question").setRequired(true)
    );
  await rest.put(
    Routes.applicationCommands(process.env.DISCORD_APPLICATION_ID!),
    { body: [command.toJSON()] }
  );
}

// --- Handle @mention ---
async function handleMention(message: Message) {
  if (processedMessages.has(message.id)) return;
  processedMessages.add(message.id);
  setTimeout(() => processedMessages.delete(message.id), 10 * 60 * 1000);

  const question = message.content.replace(/<@!?\d+>/g, "").trim();
  if (!question) return;

  let threadContext = "";
  if (message.channel.isThread()) {
    const messages = await message.channel.messages.fetch({ limit: 50 });
    threadContext = [...messages.values()]
      .reverse()
      .filter((m) => m.id !== message.id)
      .map((m) => m.content)
      .join("\n");
  }

  try {
    const result = await askGemini(question, threadContext);

    if (result.type === "answer") {
      await message.reply(result.text);
    } else {
      await message.reply("🔍 리서치 중입니다... 잠시만 기다려주세요.");
      try {
        const manusPrompt = threadContext
          ? `Context from team discussion:\n${threadContext}\n\nResearch request: ${question}\n\nProvide a structured research report in Korean with TL;DR, key findings with details, and source URLs.`
          : `Research request: ${question}\n\nProvide a structured research report in Korean with TL;DR, key findings with details, and source URLs.`;
        await createManusTask(manusPrompt, {
          channelId: message.channel.id,
          messageId: message.id,
        });
      } catch {
        await message.reply("⚠️ 리서치 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  } catch (error) {
    console.error("Error handling mention:", error);
    await message.reply("⚠️ 잠시 문제가 생겼습니다. 다시 시도해주세요.");
  }
}

// --- Handle /ask slash command ---
async function handleSlashCommand(interaction: any) {
  if (!interaction.isChatInputCommand() || interaction.commandName !== "ask") return;

  const question = interaction.options.getString("question", true);
  await interaction.deferReply();

  try {
    const result = await askGemini(question, "");

    if (result.type === "answer") {
      await interaction.editReply(result.text);
    } else {
      await interaction.editReply("🔍 리서치 중입니다... 잠시만 기다려주세요.");
      const manusPrompt = `Research request: ${question}\n\nProvide a structured research report in Korean with TL;DR, key findings with details, and source URLs.`;
      await createManusTask(manusPrompt, {
        channelId: interaction.channelId,
        messageId: (await interaction.fetchReply()).id,
      });
    }
  } catch (error) {
    console.error("Error handling /ask:", error);
    await interaction.editReply("⚠️ 잠시 문제가 생겼습니다. 다시 시도해주세요.");
  }
}

// --- Setup events ---
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (!client.user || !message.mentions.has(client.user)) return;
  await handleMention(message);
});

client.on(Events.InteractionCreate, handleSlashCommand);

client.once(Events.ClientReady, (c) => {
  console.log(`Loki is online as ${c.user.tag}`);
});

export async function startBot() {
  await client.login(process.env.DISCORD_BOT_TOKEN!);
  await registerCommands();
}
