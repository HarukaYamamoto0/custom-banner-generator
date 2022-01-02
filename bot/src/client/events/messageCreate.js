module.exports = async (client, message) => {
  if (message.channel.type == "dm") return;
  if (message.author.bot) return;

  if (message.content === `<@${client.user.id}>`)
    return message.reply(
      `👋│Hello ${message.author} See my commands using /help.`
    );
};
