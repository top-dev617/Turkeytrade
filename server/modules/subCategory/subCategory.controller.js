const SubCategory = require("./subCategory.model");

const createSubCategory = async (req, res) => {
  try {
    const newSubCategory = new SubCategory(req.body);
    const result = await newSubCategory.save();
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

const getSubCategoryById = async (req, res) => {
  try {
    const result = await SubCategory.findById({ _id: req.params.id });
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

const getSubCategories = async (req, res) => {
  try {
    const result = await SubCategory.find({});
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

const getShowSubCategories = async (req, res) => {
  try {
    const result = await SubCategory.find({ status: "Show" });
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

const updateSubCategory = async (req, res) => {
  try {
    const isExist = await SubCategory.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await SubCategory.findByIdAndUpdate(
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

const deleteSubCategoryById = async (req, res) => {
  try {
    const isExist = await SubCategory.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await SubCategory.findByIdAndDelete(
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
  createSubCategory,
  getSubCategoryById,
  getSubCategories,
  getShowSubCategories,
  updateSubCategory,
  deleteSubCategoryById,
};
