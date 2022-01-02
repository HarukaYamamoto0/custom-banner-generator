const { loadImage } = require("canvas");
const User = require("../../database/Schemas/User.js");
const Utils = require("../../utils/main.js");

module.exports = async (req, res, userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).send({ error: "User not found" });

    const [ctx, canvas] = await Utils.createBase(user.theme1.banner);

    // texts
    let tag = user.user.username;
    tag = Utils.shorten(tag, 17);

    let about = user.theme1.about ?? user.user.about ?? "doing nothing";
    about = Utils.lineBreaker(about, 35, 70);

    // writing the user tag
    ctx.font = "20px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(tag, 89, 26);

    // writing the user's surname
    ctx.font = "13px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(about, 90, 57);

    let status;
    switch (user.user.status) {
      case "online": status = "#008000"; break;
      case "dnd": status = "#e61919"; break;
      case "offline": status = "#696969"; break;
      case "idle": status = "#d7d350"; break;
    }

    // drawing the avatar
    ctx.arc(47, 40, 35, 0, 2 * Math.PI, true);
    ctx.lineWidth = 2;
    ctx.strokeStyle = status;
    ctx.stroke();
    ctx.closePath();
    ctx.clip();

    const avatar = await loadImage(user.user.avatar);
    ctx.drawImage(avatar, 10, 4, 79, 79);

    Utils.sendImage(res, canvas);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "error while trying to create the image" });
  }
};
