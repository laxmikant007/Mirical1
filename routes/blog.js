const express = require("express");
const router = express.Router();
const { getCategoryById } = require("../controllers/category");
const { getUserById } = require("../controllers/user");
const {
  getBlogById,
  createBlog,
  getBlog,
  getAllBlogs,
  pushBlogInUserBlogList,
  getBlogByUser,
  getBlogByCategory,
  createComment,
  removeBlog,
  uploadImages,
  getImageById,
  getBlogImage,
  updateBlog,
  removeBlogFromUserList,
  removeImage,
  updateUserBlogList,
} = require("../controllers/blog");
const {
  isSignedIn,
  isAuthenticated,
} =  require('../controllers/auth');
const { check } = require("express-validator");
const { isRequestValidated } = require("../validators/auth");

// Params
router.param("blogId", getBlogById);
router.param("categoryId", getCategoryById);
router.param("userId", getUserById);
router.param("imageId", getImageById);

// Actual Routes
// Create
router.post(
  "/blog/create/:userId/:categoryId",
  isSignedIn,
  isAuthenticated,
  [
    check("blog.title", "Please Enter A Title For Your Blog Post Of Minimum 10 Characters").isLength({ min: 10 }),
    check("blog.description", "Please Enter A Short Description About Your Blog in minimum 10 Characters").isLength({ min: 10 }),
    check(
      "blog.content",
      "Please Write a blog Post of Atleast 100 words"
    ).isLength({
      min: 400,
    }),
  ],
  isRequestValidated,
  createBlog,
  pushBlogInUserBlogList
);
router.post(
  "/blog/user/comment/:blogId",
  [check("comment.text", "You can't post an empty comment!").notEmpty()],
  isRequestValidated,
  createComment
);

router.post("/blog/images/:userId", isSignedIn, isAuthenticated, uploadImages);

// Read
router.get("/blog/:blogId", getBlog);
router.get("/blogs/user/:userId", getBlogByUser);
router.get("/blogs/category/:categoryId", getBlogByCategory);
router.get("/blogs", getAllBlogs);
router.get("/blog/image/:imageId", getBlogImage);

// Update
router.put(
  "/blog/:blogId/:userId",
  isSignedIn,
  isAuthenticated,
  [
    check("blog.title", "Please Enter A Title For Your Blog Post").notEmpty(),
    check("blog.description", "Please Enter A Short Description About Your Blog in minimum 10 Characters").isLength({ min: 10 }),
    check(
      "blog.content",
      "Please Write a blog Post of Atleast 100 words"
    ).isLength({
      min: 400,
    }),
    check("blog.category", "Please Select The Category Of Blog!").notEmpty()
  ],
  isRequestValidated,
  updateBlog,
  updateUserBlogList
);
// TODO: modify pushh item on userlist and categorylist

// Delete
router.delete(
  "/blog/:blogId/:userId",
  isSignedIn,
  isAuthenticated,
  removeBlog,
  removeBlogFromUserList
);
router.delete(
  "/image/blog/:imageId/:userId",
  isSignedIn,
  isAuthenticated,
  removeImage
);

module.exports = router;
