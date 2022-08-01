require("dotenv").config();

function dbConnection() {
  //Db connection
  const mongoose = require("mongoose");

  // const url = process.env.MONGODB_URI;

  mongoose.connect(process.env.MONGODB_URI, () => {
    console.log("Database connected!");
  });
}
module.exports = dbConnection;