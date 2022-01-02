const User = require("../database/Schemas/User.js");
const Getter = require("./getter.js");

module.exports = async options => {
  const { user, author, guild } = options;
  const channel = user ?? author;
  const userId = user?.id ?? author?.id;

  try {
    const userD = await User.findById(userId);
    const getter = new Getter(user ?? author, guild);

    const databaseUser = {
      _id: userId,
      user: {
        username: getter.tag,
        avatar: getter.avatar,
        status: getter.status,
        device: getter.device,
        about: getter.about
      }
    };

    // create or update user
    if (userD) {
      if (getter.equals(userD)) {
        // nothing
      } else await User.findByIdAndUpdate(userId, databaseUser);
    } else {
      await User.create(databaseUser);
      return channel.send({
        content:
          "before you were not registered in my database, but now you are"
      });
    }
  } catch (err) {
    console.log(err);
  }
};
