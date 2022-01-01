const { SlashCommandBuilder } = require("@discordjs/builders");

class Ping {
  constructor() {
    this.data = new SlashCommandBuilder()
      .setName("ping")
      .setDescription("See the bot ping");
  }

  async run(interaction) {
    await interaction.reply(`ping: ${interaction.client.ws.ping}ms`);
  }
}

module.exports = Ping;
