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

//! GET ID BLOG POST
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

//! PUT ID BLOG POST
exports.updateBlogPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Invalid value, input tidak sesuai"); // Input teks validasi < 5
    err.errorStatus = 400;
    err.data = errors.array();
    throw next(err); // Gunakan next untuk mengoper error ke middleware error handler
  }

  if (!req.file) {
    const err = new Error("Image harus di-upload"); // Input pengecekan validasi image/file
    err.errorStatus = 422;
    throw err; // Gunakan next untuk mengoper error ke middleware error handler
  }

  const title = req.body.title;
  const image = req.file.path; // Image/file tidak perlu req body karena sudah diproses oleh multer jadi cukup menerima path-nya saja
  const body = req.body.body; // .body yang dibelakang adalah body untuk kontennya
  const postId = req.params.postId; // mencari ID blog post

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("Blog Post Tidak Ditemukan");
        err.errorStatus = 404;
        throw err;
      }

      post.title = title;
      post.body = body;
      post.image = image;

      return post.save();
    }) // multiple promise
    .then((result) => {
      res.status(200).json({
        message: "UPDATE SUCCESS",
        data: "result",
      });
    })
    .catch((err) => {
      next(err);
    });
};
