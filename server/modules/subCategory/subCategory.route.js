const express = require("express");
const {
  createSubCategory,
  getSubCategoryById,
  getSubCategories,
  getShowSubCategories,
  updateSubCategory,
  deleteSubCategoryById,
} = require("./subCategory.controller");

const router = express.Router();

router.post("/", createSubCategory);
router.get("/:id", getSubCategoryById);
router.get("/", getSubCategories);
router.get("/show/cate", getShowSubCategories);
router.patch("/:id", updateSubCategory);
router.delete("/:id", deleteSubCategoryById);

module.exports = router;
