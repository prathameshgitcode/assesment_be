const postSchema = require("../models/user.model"); // Adjust the path as needed

// GET /posts?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
exports.getAllPosts = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      page = 1,
      pageSize = 10,
    } = req.method === "GET" ? req.query : req.body;

    let filter = {};

    // Only apply date filter if provided
    if (startDate || endDate) {
      filter.date = {};

      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }

      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    const limit = parseInt(pageSize);
    const skip = (parseInt(page) - 1) * limit;

    const [posts, totalPosts] = await Promise.all([
      postSchema.find(filter).skip(skip).limit(limit),
      postSchema.countDocuments(filter),
    ]);

    console.log("posts.length", posts?.length);

    res.status(200).json({
      posts,
      pagination: {
        totalPosts,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalPosts / limit),
        pageSize: limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching posts",
      error: error.message,
    });
  }
};
