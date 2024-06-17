const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const blogController = require("../controllers/blog");

//! [POST] : /v1/blog/post (VALIDATION)
router.post(
  "/post",
  [
    body("title").isLength({ min: 5 }).withMessage("input title tidak sesuai"),
    body("body").isLength({ min: 5 }).withMessage("input body tidak sesuai"),
  ],
  blogController.createBlogPost
);

//! [GET] : /v1/blog/posts

router.get("/posts", blogController.getAllBlogPost);
//GET ID
router.get("/post/:postId", blogController.getBlogPostById);
//PUT ID (UPDATE METHOD)
router.put(
  "/post/:postId",
  [
    body("title").isLength({ min: 5 }).withMessage("input title tidak sesuai"),
    body("body").isLength({ min: 5 }).withMessage("input body tidak sesuai"),
  ],
  blogController.updateBlogPost
);
module.exports = router;
