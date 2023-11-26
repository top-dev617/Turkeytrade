const mongoose = require("mongoose");
const Product = require("../product/product.model");
const SubCategory = require("../subCategory/subCategory.model");
const Category = require("./category.model");

const createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const result = await newCategory.save();
    res.status(200).json({
      status: true,
      message: "Category create successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Category create unsuccessful",
      errorMessage: error.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const result = await Category.findById({ _id: req.params.id });
    res.status(200).json({
      status: true,
      message: "Category get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "category get unsuccessful",
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const result = await Category.find({});
    res.status(200).json({
      status: true,
      message: "Categories get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "categories get unsuccessful",
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const uniqueCategories = await Product.find({ status: "Publish" }).distinct(
      "category"
    );
    const categories = await Category.find({
      _id: { $in: uniqueCategories },
      status: true,
    });
    const categoriesWithSubCategories = await Promise.all(
      categories.map(async (category) => {
        const subcategories = await SubCategory.find({
          parent_cate_id: category._id,
          status: true,
        });
        return { ...category.toObject(), subcategories };
      })
    );
    res.status(200).json({
      status: true,
      message: "Unique categories fetched successfully",
      data: categoriesWithSubCategories,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "categories get unsuccessfuldf",
      error: error.message,
    });
  }
};

const getShowCategories = async (req, res) => {
  try {
    const result = await Category.find({ status: true }).select("_id");
    const categories = await Category.find({
      _id: { $in: result },
      status: true,
    });
    const categoriesWithSubCategories = await Promise.all(
      categories.map(async (category) => {
        const subcategories = await SubCategory.find({
          parent_cate_id: category._id,
          status: true,
        });
        return { ...category.toObject(), subcategories };
      })
    );
    res.status(200).json({
      status: true,
      message: "Categories get successfully",
      data: categoriesWithSubCategories,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "categories get unsuccessful",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const isExist = await Category.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await Category.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Category Update successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: true,
        message: "Category update unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "category update unsuccessful",
    });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const isExist = await Category.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await Category.findByIdAndDelete(
        { _id: req.params.id },
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Category Delete successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: true,
        message: "Category Delete unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "category Delete unsuccessful",
    });
  }
};

module.exports = {
  createCategory,
  getCategoryById,
  getCategories,
  getShowCategories,
  updateCategory,
  deleteCategoryById,
  getAllCategories,
};
