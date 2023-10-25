const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    cate_name: {
      type: String,
      required: true,
    },
    cate_slug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Show", "Hide"],
      default: "Show",
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
