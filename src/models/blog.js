const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPost = new Schema(
  {
    //* TITLE
    title: {
      type: String,
      required: true,
    },
    //* IMAGE
    image: {
      type: String, // karna disimpan di mongoDb jadi url imagenya saja / path dari imagenya saja
      required: true,
    },
    //* TEXT BODY
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
