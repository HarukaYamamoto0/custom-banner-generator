const { createCanvas, loadImage } = require("canvas");

module.exports = async banner => {
  const canvas = createCanvas(395, 80);
  const ctx = canvas.getContext("2d");

  if (banner !== null) {
    if (banner.startsWith("link")) {
      const link = banner.slice(5, banner.length);
      const background = await loadImage(link);
      ctx.drawImage(background, 0, 0, /*canvas.width, canvas.height*/);
    }

    if (banner.startsWith("color")) {
      ctx.fillStyle = banner.split(":")[1];
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  } else {
    // adding a gradient background
    const grd = ctx.createLinearGradient(0, 0, 0, 170);
    grd.addColorStop(0, "black");
    grd.addColorStop(0.8, "grey");
    grd.addColorStop(1, "white");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  return [ctx, canvas];
};
