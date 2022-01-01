const { Router } = require("express");
const router = Router();

router.get("/banners", async (req, res) => {
  try {
    const { theme, id } = req.query;

    if (theme == undefined || id == undefined)
      return res.send({ error: "the parameters were not passed correctly" });

    const themeFile = require(`../banners/theme${theme}.js`);

    await themeFile(req, res, id);
  } catch (err) {
    res.send({ error: "an error occurred, check if the commands were passed correctly" });
  }
});

module.exports = app => app.use("/api", router);
