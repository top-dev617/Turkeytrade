const StoreInfo = require("./storeInfo.model");

const createStoreInfo = async (req, res) => {
  try {
    const newStoreInfo = new StoreInfo(req.body);
    const result = await newStoreInfo.save();
    res.status(200).json({
      status: true,
      message: "Store Info save successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Store Info save unsuccessful",
      errorMessage: error.message,
    });
  }
};

const getStoreInfoById = async (req, res) => {
  try {
    const result = await StoreInfo.findById({ _id: req.params.id });
    res.status(200).json({
      status: true,
      message: "Store info get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Store info get unsuccessful",
    });
  }
};

const getAllStoreInfo = async (req, res) => {
  try {
    const result = await StoreInfo.find({}).populate("store");
    res.status(200).json({
      status: true,
      message: "Store info get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Store info get unsuccessful",
    });
  }
};

const getStoreInfoByStoreId = async (req, res) => {
  try {
    const result = await StoreInfo.find({ store: req.params.storeId });
    res.status(200).json({
      status: true,
      message: "Store info get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Store info get unsuccessful",
    });
  }
};

const updateStoreInfo = async (req, res) => {
  try {
    const isExist = await StoreInfo.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await StoreInfo.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Store info Update successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: true,
        message: "Store info update unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Store info update unsuccessful",
    });
  }
};

const deleteStoreInfoById = async (req, res) => {
  try {
    const isExist = await StoreInfo.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await StoreInfo.findByIdAndDelete(
        { _id: req.params.id },
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Store info Delete successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: true,
        message: "Store info Delete unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Store info Delete unsuccessful",
    });
  }
};

module.exports = {
  createStoreInfo,
  getStoreInfoById,
  getAllStoreInfo,
  getStoreInfoByStoreId,
  updateStoreInfo,
  deleteStoreInfoById,
};
