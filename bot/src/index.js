const { Client, Collection } = require("discord.js");
require("dotenv").config();

async function start() {
  try {
    const client = new Client({ intents: 2047 });
    client.cooldowns = new Collection();
    
    await require("./database/index.js").start();
    await require("./client/fileLoader.js").loadAll(client);

    await client.login(process.env.tokenBot);
    console.log("[INDEX] - index loaded successfully");
  } catch (err) {
    console.log(err);
  }
}

start();
