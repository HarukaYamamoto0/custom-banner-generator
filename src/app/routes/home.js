const fs = require("fs");
const path = require("path");
const { Router } = require("express");
const router = Router();

router.get("/home", async (req, res) => {
  const banners = await fs.readdirSync(path.resolve(__dirname, ".././banners"));
  res.send(`<p>currently a total of ${banners.length} themes</p>`);
});

module.exports = app => app.use("/api", router);
