const {
  sendStoreApprovedMail,
  sendStoreDeclineMail,
} = require("../../utils/sendEmailHelpers");
const Category = require("../category/category.model");
const Product = require("../product/product.model");
const Store = require("./store.model");

const createStore = async (req, res) => {
  try {
    const newStore = new Store(req.body);
    const result = await newStore.save();
    res.status(200).json({
      status: true,
      message: "Store Info Add successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Store Info Add Not Successful",
      errorMessage: error.message,
    });
  }
};

const getStoreById = async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await Store.findById({ _id: req.params.id }).populate(
      "user"
    );
    res.status(200).json({
      status: true,
      message: "Store Info get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Info get Not Successful",
    });
  }
};
const getStores = async (req, res) => {
  try {
    const result = await Store.find({}).populate("user").sort({ _id: -1 });
    res.status(200).json({
      status: true,
      message: "Stores get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Stores get Not Successful",
    });
  }
};

const getStoreByUserId = async (req, res) => {
  try {
    const result = await Store.findOne({
      user: req.params.userId,
      $or: [{ status: "accept" }, { status: "pending" }],
    }).populate("user");

    res.status(200).json({
      status: true,
      message: "Store Info get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Info get Not Successful",
    });
  }
};

const updateStore = async (req, res) => {
  try {
    const storeData = JSON.parse(req.body?.storeData);
    if (req.file) {
      storeData["store_presentation_video"] = req.file?.path;
    }
    const isExist = await Store.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await Store.findByIdAndUpdate(
        { _id: req.params.id },
        storeData,
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Store Info Update successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: false,
        message: "Info Update unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Info Add Not Successful",
    });
  }
};

const updateStoreInfo = async (req, res) => {
  try {
    const isExist = await Store.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await Store.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Store Info Update successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: false,
        message: "Info Update unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Info Add Not Successful",
    });
  }
};

const updateStoreStatus = async (req, res) => {
  try {
    const isExist = await Store.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await Store.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      ).populate("user");
      if (result?.status === "accept") {
        await sendStoreApprovedMail(result?.user?.email, result);
      } else if (result?.status === "decline") {
        await sendStoreDeclineMail(result?.user?.email, result);
      }
      res.status(200).json({
        status: true,
        message: "Store status Update successful",
        data: result,
      });
    } else {
      res.status(201).json({
        status: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Info Add Not Successful",
    });
  }
};

// get stores categories
const getStoreCategoriesByStore = async (req, res) => {
  try {
    const { storeId } = req.params;

    const pipeline = [
      {
        $match: {
          store: storeId,
        },
      },
      {
        $group: {
          _id: "$category",
        },
      },
    ];

    // Run the aggregation pipeline
    const categories = await Product.aggregate(pipeline);
    const ids = categories.map((cate) => cate._id); // Use map to extract _id values

    const result = await Category.find({
      _id: {
        $in: ids, // Use the extracted _id values directly, not inside an array
      },
    });
    res.status(200).json({
      success: true,
      message: "Store Categories get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  getStoreByUserId,
  getStoreCategoriesByStore,
  updateStoreStatus,
  updateStoreInfo,
};
