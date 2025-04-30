const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");
const {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePost,
  searchPosts,
  addToFavourites,
  removeFromFavourites,
  getFavourites,
  getPostsByDateRange,
} = require("../controllers/postController");
const User = require("../model/User");

router.post("/post/create", verifyToken, createPost);
router.get("/post/getAll", getAllPosts);
router.get("/post/myPosts", verifyToken, getMyPosts);
router.delete("/post/delete/:id", verifyToken, deletePost);
router.get("/post/search", searchPosts);
router.post("/post/addToFavourites/:postId", verifyToken, addToFavourites);
router.delete(
  "/post/removeFromFavourites/:postId",
  verifyToken,
  removeFromFavourites
);
router.get("/post/favourites", verifyToken, getFavourites);
router.get("/post/getPostsByDateRange", verifyToken, getPostsByDateRange);


module.exports = router;