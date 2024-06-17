const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");

//! [POST]
exports.createBlogPost = (req, res, next) => {
  // Cek validasi ada eror atau tidak
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid value, input tidak sesuai"); // Input teks validasi < 5
    err.errorStatus = 400;
    err.data = errors.array();
    return next(err); // Gunakan next untuk mengoper error ke middleware error handler
  }

  if (!req.file) {
    const err = new Error("Image harus di-upload"); // Input pengecekan validasi image/file
    err.errorStatus = 422;
    return next(err); // Gunakan next untuk mengoper error ke middleware error handler
  }

  const title = req.body.title;
  const image = req.file.path; // Image/file tidak perlu req body karena sudah diproses oleh multer jadi cukup menerima path-nya saja
  const body = req.body.body; // .body yang dibelakang adalah body untuk kontennya

  const Posting = new BlogPost({
    title: title,
    image: image,
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
      // Gunakan next untuk mengoper error ke middleware error handler
      next(err);
    });
};

//! [GET]
exports.getAllBlogPost = (req, res, next) => {
  BlogPost.find()
    .then((result) => {
      res.status(200).json({
        message: "Data blog post berhasil dipanggil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getBlogPostById = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((result) => {
      if (!result) {
        const error = new Error("Blog Post Tidak Ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "Data Blog Post Berhasil Dipanggil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
