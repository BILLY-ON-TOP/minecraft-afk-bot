const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Keepalive web server (needed for Railway free tier)
app.get('/', (req, res) => {
  res.send('AFK bot is online');
});
app.listen(port, () => {
  console.log(`Web server running on port ${port}`);
});

// ========== BOT CONFIG ==========
const botOptions = {
  host: 'SpaceMX-1ak1.aternos.me',  // 🔁 Replace with your Minecraft server IP
  port: 20560,              // Optional: use if your port is different
  username: 'AFK_Bot'       // Can be any name (or real account if premium)
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('Bot has spawned in the server');

    // Periodic jump to prevent AFK kick
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 60000);
  });

  bot.on('end', () => {
    console.log('Bot was disconnected. Reconnecting in 10s...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Bot error:', err.message);
  });
}

createBot();
