const TelegramBot = require('node-telegram-bot-api');
const dotenv = require("dotenv")
dotenv.config(); //Load env vars before using.
const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error('BOT_TOKEN is missing in environment variables');
}

let bot; // Declare bot variable here

try {
  bot = new TelegramBot(token, { polling: true });
  bot.maxConnections = 100; // Increase max connections to handle multiple requests
  bot.connectionTimeout = 30000; // Increase connection timeout to 30 seconds
  bot.on('webhook-error', (error) => {
    console.error('Webhook error:', error);
  });
  // bot.on("")
  bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
  });
  console.log('Bot is running...');
} catch (error) {
  console.error('Error starting bot:', error.message);
}

module.exports = bot;