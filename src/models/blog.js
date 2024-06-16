const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPost = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true, // menambahkan otomatis secara default createdAt / updateAt
  }
);

module.exports = mongoose.model("BlogPost", BlogPost); // 'name model' , model
