const { connect } = require("mongoose");
require("dotenv").config();

module.exports = {
  start() {
    try {
      connect(process.env.tokenData, {
        "useNewUrlParser": true,
        "useUnifiedTopology": true,
        "useFindAndModify": false
      })

      console.log("[DATABASE] - Connected to database");
    } catch (err) {
      console.log("[DATABASE] - " + err);
    }
  }
} 