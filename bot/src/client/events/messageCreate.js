const User = require("../../database/Schemas/User");
const Getter = require("../../utils/getter");

module.exports = async (client, message) => {
  const author = message.author;
  const guild = message.guild;

  if (message.channel.type == "dm") return;
  if (author.bot) return;

  if (message.content === `<@${client.user.id}>`)
    return message.reply(`👋│Hello ${author} See my commands using /help.`);

  try {
    // database
    const user = await User.findById(author.id);
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

    // create or update user
    if (user) {
      if (getter.equals(user)) {
        // nothing
      } else await User.findByIdAndUpdate(author.id, databaseUser);
    } else {
      await User.create(databaseUser);
    }
  } catch (err) {
    console.log(err);
  }
};
