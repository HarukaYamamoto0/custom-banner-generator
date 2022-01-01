const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Collection } = require("discord.js");
const { tokenBot, clientId } = process.env;

const fs = require("fs");
const path = require("path");

module.exports = {
  // so i can reuse the separate functions
  async loadAll(client) {
    await this.loadEvents(client);
    await this.loadCommands(client);
  },

  loadEvents(client) {
    try {
      const eventFiles = fs.readdirSync("./bot/src/client/events/");

      for (const file of eventFiles) {
        const filePath = path.resolve(__dirname, "./events", file);

        const event = require(filePath);
        const eventName = file.split(".")[0];

        if (eventName == "ready") {
          client.once("ready", event.bind(null, client));
        } else {
          client.on(eventName, event.bind(null, client));
        }

        delete require.cache[filePath];
      }
      console.log("[FILELOADER] - all events have been loaded");
    } catch (err) {
      console.log(err.stack);
    }
  },

  async loadCommands(client) {
    try {
      client.commands = new Collection();
      const commands = [];

      const commandFiles = fs.readdirSync("./bot/src/commands/");

      for (const file of commandFiles) {
        const commandPath = path.resolve(__dirname, "../commands", file);
        
        const command = new (require(commandPath))();
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
        
        delete require.cache[commandPath];
      }

      const rest = new REST({ version: "9" }).setToken(tokenBot);
      await rest.put(Routes.applicationGuildCommands(clientId, "916433838434058261"), {
        body: commands
      });
      console.log("[FILELOADER] -  all commands have been loaded");
    } catch (err) {
      console.log(err.stack);
    }
  }
};
