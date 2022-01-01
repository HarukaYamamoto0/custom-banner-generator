const { Client } = require("discord.js");
require("dotenv").config();

async function start() {
  try {
    const client = new Client({ intents: 2047 });
    await require("./client/fileLoader.js").loadAll(client);

    await client.login(process.env.tokenBot);
    console.log("[INDEX] - index loaded successfully");
  } catch (err) {
    console.log(err);
  }
}

start();
