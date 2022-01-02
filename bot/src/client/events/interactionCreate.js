const { Collection } = require("discord.js");
const createAndUpdate = require("../../modules/createAndUpdate.js");

module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;

  try {
    const { client: { cooldowns }, user, commandName } = interaction;

    // cooldowns
    const now = Date.now();
    const time = 7 * 1000;

    if (cooldowns.has(user.id)) {
      const expiration = cooldowns.get(user.id) + time;

      if (now < expiration) {
        const timeLeft = (expiration - now) / 1000;
        return interaction.reply({
          content: `please wait ${parseInt(timeLeft)} seconds to use some command again`,
          ephemeral: true
        });
      }
    }

    cooldowns.set(user.id, now);
    setTimeout(() => cooldowns.delete(user.id), time);

    // create or update the user in the database
    await createAndUpdate(interaction);

    // execute the command
    const command = client.commands.get(commandName);

    if (!command)
      return interaction.reply({
        content: "this command is not currently available.",
        ephemeral: true
      });

    await command.run(interaction);
  } catch (error) {
    console.log(error);

    await interaction.reply({
      content: "some error occurred when trying to run the command ¯\\_(ツ)_/¯",
      ephemeral: true
    });
  }
};
