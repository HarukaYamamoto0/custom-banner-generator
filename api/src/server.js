const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./database/index.js").start();
require("./app/routes/main.js")(app);

app.listen(process.env.PORT || 3000, () => {
  console.log("[SERVER] - server running");
});
