const express = require("express");
const { isAuth } = require("../../utils/middleware");
const {
  createCategory,
  getCategoryById,
  getCategories,
  updateCategory,
  deleteCategoryById,
  getShowCategories,
} = require("./category.controller");

const router = express.Router();

router.post("/", createCategory);
router.get("/:id", getCategoryById);
router.get("/", getCategories);
router.get("/show/cate", getShowCategories);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategoryById);

module.exports = router;
