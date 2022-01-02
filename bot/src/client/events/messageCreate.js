const createAndUpdate = require("../../utils/createAndUpdate.js");

module.exports = async (client, message) => {
  const author = message.author;
  const guild = message.guild;

  if (message.channel.type == "dm") return;
  if (author.bot) return;

  if (message.content === `<@${client.user.id}>`)
    return message.reply(`👋│Hello ${author} See my commands using /help.`);

  await createAndUpdate(message);
};
