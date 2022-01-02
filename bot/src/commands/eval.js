const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { inspect } = require("util");

class Eval {
  constructor() {
    this.data = new SlashCommandBuilder()
      .setName("eval")
      .setDescription("Run command with eval")
      .addStringOption(option =>
        option
          .setName("command")
          .setDescription("command to be executed")
          .setRequired(true)
      );
  }

  async run(interaction) {
    if (interaction.user.id !== process.env.ownerId) return;

    //---------------------------KEYWORDS--------------------------//
    const { client, user: author, member, guild } = interaction;
    const code = interaction.options.getString("command");
    let result;
    //-------------------------------------------------------------//

    //---------------------COMMAND---------------------------------//
    try {
      result = eval(code);

      if (typeof result !== "string") result = inspect(result, { depth: 0 });
      if (result.length >= 1002) result = result.slice(0, 1002) + "...";
    } catch (err) {
      result = err.message;
      console.log(err.stack);
    }

    // embed
    const embed = new MessageEmbed()
      .addField(":inbox_tray: Entrada: ", `\`\`\`js\n${code}\`\`\``)
      .addField(":outbox_tray: Saida: ", `\`\`\`js\n${result}\`\`\``)
      .setColor(process.env.colorEmbed);

    await interaction.reply({
      embeds: [embed]
    });

    //-------------------------------------------------------------//

    //----------------------USEFUL FUNCTIONS-----------------------//
    async function exit() {
      await interaction.reply("Turning off....");
      await client.destroy();
      process.exit();
    }
    //-------------------------------------------------------------//
  }
}

module.exports = Eval;
