const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

class Help {
  constructor() {
    this.data = new SlashCommandBuilder()
      .setName("help")
      .setDescription("See my list of commands");
  }

  async run(interaction) {
    const client = interaction.client;
    const icon = client.user.displayAvatarURL({ dynamic: true });
    let commands = [];

    const embed = new MessageEmbed()
      .setAuthor({ name: "Help Center", iconURL: icon })
      .setColor(process.env.colorEmbed);

    client.commands
      .map(cmd => cmd)
      .forEach(cmd => {
        const { name, description } = cmd.data;
        commands.push(`**/${name}** - ${description}`);
      });

    embed.setDescription(commands.join("\n"));
    await interaction.reply({
      embeds: [embed]
    });
  }
}

module.exports = Help;
