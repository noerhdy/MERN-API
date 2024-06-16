const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");

exports.createBlogPost = (req, res, next) => {
  const title = req.body.title;
  // const image = req.body.image;
  const body = req.body.body; // .body yg dibelakang adalah body untuk contentnya

  const errors = validationResult(req);

  //validasi ada eror atau tidak
  if (!errors.isEmpty()) {
    const err = new Error("invalid value tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const Posting = new BlogPost({
    title: title,
    body: body,
    author: {
      uid: 1,
      nama: "noer",
    },
  });

  Posting.save()
    .then((result) => {
      res.status(201).json({
        message: "Create Blog Post Success",
        data: result,
      });
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};
