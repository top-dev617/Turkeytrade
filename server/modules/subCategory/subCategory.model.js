const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    sub_cate_name: {
      type: String,
      required: true,
    },
    sub_cate_slug: {
      type: String,
      unique: true,
      required: true,
    },
    parent_cate_id: {
      type: String,
      ref: "Category",
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
subCategorySchema.index({ parent_cate_id: 1 });
const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
