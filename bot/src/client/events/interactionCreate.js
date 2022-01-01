module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;

  try {
    const { commandName } = interaction;

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
