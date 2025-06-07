const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
    createdAt: { type: Date, default: Date.now },
  },
});

module.exports = mongoose.model("Comments", CommentSchema);
