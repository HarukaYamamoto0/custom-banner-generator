const User = require("../database/Schemas/User.js");
const Getter = require("../utils/getter.js");

module.exports = async options => {
  try {
    const { user: author, guild } = options;
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
      return author.send({
        content:
          "before you were not registered in my database, but now you are"
      });
    }
  } catch (err) {
    console.log(err);
  }
};
