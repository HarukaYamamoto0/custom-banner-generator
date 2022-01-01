const User = require("../../database/Schemas/User");
const Getter = require("../../utils/getter");

module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;

  try {
    const { user: author, guild, client, commandName } = interaction;

    const user = await User.findById(author.id);

    if (!user) {
      const getter = new Getter(author, guild);

      const databaseUser = {
        _id: author.id,
        user: {
          username: getter.tag,
          avatar: getter.avatar,
          status: getter.status,
          device: getter.device,
          about: getter.about
        }
      };

      await User.create(databaseUser);

      return interaction.reply({
        content:
          "before you were not registered in my database, but now you are, try using the command again",
        ephemeral: true
      });
    }

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
