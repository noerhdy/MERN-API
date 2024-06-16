const { validationResult } = require("express-validator");

exports.createBlogPost = (req, res, next) => {
  const title = req.body.title;
  // const image = req.body.image;
  const body = req.body.body; // .body yg dibelakang adalah body untuk contentnya

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("invalid value tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const result = {
    message: "Create Blog Post Success",
    data: {
      post_id: 1,
      title: "Title Blog",
      image: "imagefile.png",
      body: "lorem ipsum is simple dummy text of the printing",
      created: "17/06/2024",
      author: {
        uid: 1,
        name: "Testing",
      },
    },
  };
  res.status(201).json(result);
};
