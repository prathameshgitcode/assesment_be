const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Optional: Reference to User model
    },
    title: {
      type: String,
      required: true, // Ensures title is always provided
      trim: true, // Removes whitespace
    },
    body: {
      type: String,
      required: true, // Ensures body is always provided
    },
    date: {
      type: Date,
      required: true, // Ensures date is always provided
    },
    // New fields for randomized values
    high: {
      type: Number,
      required: true, // Ensures high is always provided
      min: 1, // Minimum value constraint
    },
    low: {
      type: Number,
      required: true, // Ensures low is always provided
      min: 1, // Minimum value constraint
      validate: {
        // Custom validator: Ensures low < high
        validator: function (value) {
          return value < this.high;
        },
        message: "Low must be less than High.",
      },
    },
    medium: {
      type: Number,
      required: true, // Ensures medium is always provided
      validate: {
        // Custom validator: Ensures low <= medium < high
        validator: function (value) {
          return value >= this.low && value < this.high;
        },
        message: "Medium must be between Low and High (exclusive).",
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("Post", postSchema);
