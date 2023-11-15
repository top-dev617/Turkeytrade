const Product = require("../product/product.model");
const SaveProduct = require("./saveProduct.model");

const createSaveProduct = async (req, res) => {
  try {
    const isExist = await SaveProduct.findOne({
      $and: [{ user: req.body.user }, { _id: req.body.product }],
    });
    if (isExist) {
      res.status(200).json({
        success: false,
        message: "Product Already Saved",
      });
    } else {
      const newProduct = new SaveProduct({
        user: req.user?._id,
        product: req.body.product,
      });
      await newProduct.save();
      res.status(200).json({
        success: true,
        message: "Product Saved successful",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Data couldn't insert",
      error: error.message,
    });
  }
};

const getSaveProducts = async (req, res) => {
  try {
    const result = await SaveProduct.find({ user: req.user?._id }).sort({
      _id: -1,
    });
    const productIds = result.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });
    const productsWithMinMaxPrices = await Promise.all(
      products.map(async (product) => {
        if (product?.price?.price_type === "ladder_price") {
          const prices = product?.price?.ladder_price?.map(
            (price) => price.euro
          );
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          return {
            ...product?.toObject(),
            minPrice,
            maxPrice,
          };
        } else {
          return { ...product?.toObject() };
        }
      })
    );
    res.status(200).json({
      success: true,
      data: productsWithMinMaxPrices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Data couldn't insert",
      error: error.message,
    });
  }
};
const getSaveProduct = async (req, res) => {
  try {
    const result = await SaveProduct.findOne({
      user: req.user?._id,
      product: req.params.id,
    });
    console.log(result, req.user?._id, req.params.id);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeSaveProductById = async (req, res) => {
  try {
    const isExist = await SaveProduct.findOne({
      $and: [{ user: req.user?._id }, { product: req.params.id }],
    });
    if (isExist) {
      await SaveProduct.deleteOne({
        $and: [{ user: req.user?._id }, { product: req.params.id }],
      });
      res.status(200).json({
        success: true,
        message: "Save product deleted",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Data couldn't insert",
      error: error.message,
    });
  }
};

module.exports = {
  createSaveProduct,
  getSaveProducts,
  getSaveProduct,
  removeSaveProductById,
};
