const express = require("express");
const { getAllPosts, getAll } = require("../controllers/post.controller");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.route("/post").get(getAllPosts).post(getAllPosts);

module.exports = router;
