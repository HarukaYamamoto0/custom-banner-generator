const { Client } = require("discord.js");
require("dotenv").config();

async function start() {
  try {
    const client = new Client({ intents: 2047 });

    client.once("ready", () => console.log("I'm online"));

    await client.login(process.env.tokenBot);
    console.log("[INDEX] - index loaded successfully");
  } catch (err) {
    console.log(err);
  }
}

start();
