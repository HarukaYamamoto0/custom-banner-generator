module.exports = (res, canvas) => {
  res.contentType("image/png");
  res.send(canvas.toBuffer("image/png"));
};
