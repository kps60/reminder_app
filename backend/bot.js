// bot.js
const TelegramBot = require('node-telegram-bot-api');
const dotenv =require("dotenv")
dotenv.config(); //Load env vars before using.
const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error('BOT_TOKEN is missing in environment variables');
}

const bot = new TelegramBot(token, { polling: true });
console.log('Bot is running...');

module.exports = bot;