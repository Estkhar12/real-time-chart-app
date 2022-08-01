const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const connectSchema = new Schema(
  {
    username: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const connect = mongoose.model("Comment", connectSchema);
module.exports = connect;
