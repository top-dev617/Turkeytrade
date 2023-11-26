const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    cate_name: {
      type: String,
      required: true,
    },
    cate_slug: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
