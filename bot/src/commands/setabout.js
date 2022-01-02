const { SlashCommandBuilder } = require("@discordjs/builders");
const User = require("../database/Schemas/User");

class SetBanner {
  constructor() {
    this.data = new SlashCommandBuilder()
      .setName("setabout")
      .setDescription("Put a message on your about me")
      .addStringOption(option => 
        option
          .setName("theme")
          .setDescription("the theme to be set your about me")
          .setRequired(true)
          .addChoice("theme 1", "theme1")
          //.addChoice("theme 2", "theme2")
      )
      .addStringOption(option =>
        option
          .setName("text")
          .setDescription('text to put on your about, to use the pattern, use "pattern"')
          .setRequired(true)
      );
  }

  async run(interaction) {
    try {
      const theme = interaction.options.getString("theme");
      const text = interaction.options.getString("text");
      
      let objSet = null;
      
      if (text === "pattern") {
        objSet = JSON.parse(`{ "$set": { "${theme}.about": null } }`);
      } else {
        objSet = JSON.parse(`{ "$set": { "${theme}.about": "${text}" } }`)
      }
      
      await User.findByIdAndUpdate(interaction.user.id, objSet);
      interaction.reply("🎉│about me successfully set");
    } catch (err) {
      console.log(err);
      interaction.reply("❌│there was an error when trying to set your about me");
    }
  }
}

module.exports = SetBanner;
