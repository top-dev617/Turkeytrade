const mongoose = require("mongoose");

const productGroupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    store: {
      type: String,
      ref: "Store",
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

const ProductGroup = mongoose.model("ProductGroup", productGroupSchema);

module.exports = ProductGroup;
