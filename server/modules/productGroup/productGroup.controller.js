const Product = require("../product/product.model");
const ProductGroup = require("./productGroup.model");

const createPGroup = async (req, res) => {
  try {
    const newGroup = new ProductGroup(req.body);
    const result = await newGroup.save();
    res.status(200).json({
      status: true,
      message: "Group create successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Group create unsuccessful",
      errorMessage: error.message,
    });
  }
};

const getPGroupById = async (req, res) => {
  try {
    const result = await ProductGroup.findById({ _id: req.params.id });
    res.status(200).json({
      status: true,
      message: "Group get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Group get unsuccessful",
    });
  }
};

const getPGroupsByStoreId = async (req, res) => {
  try {
    const result = await ProductGroup.find({ store: req.params.storeId }).sort({
      _id: -1,
    });
    const modifiedResult = result.map(async (group) => {
      const isExist = await Product.exists({ group: group._id });
      return { ...group.toObject(), isExist: Boolean(isExist) };
    });
    const finalResult = await Promise.all(modifiedResult);

    res.status(200).json({
      status: true,
      message: "Group get successfully",
      data: finalResult,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Group get unsuccessful",
    });
  }
};

const getUniquePGroupsByStoreId = async (req, res) => {
  try {
    const uniqueGroups = await Product.distinct("group", {
      store: req.params.storeId,
    });
    const result = await ProductGroup.find({ _id: { $in: uniqueGroups } });
    res.status(200).json({
      status: true,
      message: "Group get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Group get unsuccessful",
    });
  }
};

const getPGroups = async (req, res) => {
  try {
    const result = await ProductGroup.find({});
    res.status(200).json({
      status: true,
      message: "Groups get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Groups get unsuccessful",
    });
  }
};

const getShowPGroups = async (req, res) => {
  try {
    const result = await ProductGroup.find({ status: "Show" });
    res.status(200).json({
      status: true,
      message: "Groups get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Groups get unsuccessful",
    });
  }
};

const checkIsExist = async (req, res) => {
  try {
    const count = await Product.countDocuments({ group: req.params.id });
    if (count > 0) {
      return res.status(200).json({
        status: true,
        isExist: true,
        message: `This custom category cannot be removed as it has ${count} product(s) linked to it.`,
        data: null,
      });
    } else {
      // If count is 0, the group is not in use
      return res.status(200).json({
        status: true,
        isExist: false,
        message: "This custom category is not linked to any products.",
        data: null,
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Groups get unsuccessful",
    });
  }
};

const updatePGroup = async (req, res) => {
  try {
    const isExist = await ProductGroup.findOne({
      _id: req.params.id,
      store: req.params.storeId,
    });
    if (isExist) {
      const result = await ProductGroup.updateOne(
        { _id: req.params.id, store: req.params.storeId },
        { $set: req.body },
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        success: true,
        message: "Group Update successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: true,
        message: "Group update unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Group update unsuccessful",
    });
  }
};

const deletePGroupById = async (req, res) => {
  try {
    const isExist = await ProductGroup.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await ProductGroup.findByIdAndDelete(
        { _id: req.params.id },
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Group Delete successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: true,
        message: "Group Delete unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Group Delete unsuccessful",
    });
  }
};

module.exports = {
  createPGroup,
  getPGroupById,
  getPGroups,
  getShowPGroups,
  updatePGroup,
  deletePGroupById,
  getPGroupsByStoreId,
  getUniquePGroupsByStoreId,
  checkIsExist,
};
