const { SlashCommandBuilder } = require("@discordjs/builders");
const User = require("../database/Schemas/User");
const getColor = require("../utils/getColor");

class SetBanner {
  constructor() {
    this.data = new SlashCommandBuilder()
      .setName("setbanner")
      .setDescription("Configure the banner to your liking")
      .addStringOption(
        option =>
          option
            .setName("theme")
            .setDescription("tell which theme the change will be made")
            .setRequired(true)
            .addChoice("theme 1", "theme1")
        //.addChoice("theme 2", "theme2")
      )
      .addStringOption(option =>
        option
          .setName("color")
          .setDescription('color in hexadecimal or image url, to use the pattern, use "pattern"')
          .setRequired(true)
      );
  }

  async run(interaction) {
    try {
      const theme = interaction.options.getString("theme");
      const color = interaction.options.getString("color");

      let objSet = null;

      if (color === "pattern") {
        objSet = JSON.parse(`{ "$set": { "${theme}.banner": null } }`);
      } else {
        const banner = getColor(color);

        if (banner == null)
          return interaction.reply("❌│this is not a valid link/color");

        objSet = JSON.parse(`{ "$set": { "${theme}.banner": "${banner}" } }`);
      }
      await User.findByIdAndUpdate(interaction.user.id, objSet);
      interaction.reply("🎉│banner set successfully");
    } catch (err) {
      console.log(err);
      interaction.reply("❌│There was an error when trying to set the banner");
    }
  }
}

module.exports = SetBanner;
