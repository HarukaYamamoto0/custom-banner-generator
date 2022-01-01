const { createCanvas, loadImage } = require("canvas");

module.exports = async (color = "#2c2c2c") => {
  const canvas = createCanvas(395, 80);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return [ctx, canvas];
};
