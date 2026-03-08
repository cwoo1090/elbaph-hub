import { startBot } from "./discord.js";
import { startWebhookServer } from "./webhook.js";

const PORT = parseInt(process.env.PORT || "3000");

await startBot();
startWebhookServer(PORT);
