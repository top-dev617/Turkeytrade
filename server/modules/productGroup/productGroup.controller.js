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
    const result = await ProductGroup.find({ store: req.params.storeId });
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

const updatePGroup = async (req, res) => {
  try {
    const isExist = await ProductGroup.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await ProductGroup.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
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
};
