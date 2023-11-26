const Category = require("../category/category.model");
const SubCategory = require("../subCategory/subCategory.model");
const Product = require("./product.model");

const createProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body?.productData);
    if (req.file) {
      productData["video"] = req.file?.path;
    }
    const newProduct = new Product(productData);
    const result = await newProduct.save();
    res.status(200).json({
      status: true,
      message: "Product create successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Product create unsuccessful",
      errorMessage: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const result = await Product.findOne({ _id: req.params.id })
      .populate("store")
      .populate("category")
      .populate("sub_category")
      .populate("group");
    res.status(200).json({
      status: true,
      message: "Product get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Product get unsuccessful",
      error_message: error.message,
    });
  }
};

const getProductsByCateId = async (req, res) => {
  try {
    const isExist = await Category.findOne({ cate_slug: req.params.cateSlug });
    console.log(isExist);
    if (isExist) {
      const products = await Product.find({
        category: isExist._id,
        status: "Publish",
      })
        .sort({ _id: -1 })
        .populate("category")
        .populate("sub_category")
        .populate("group");

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
        status: true,
        message: "Products fetched successfully",
        data: productsWithMinMaxPrices,
      });
    } else {
      res.status(201).json({
        status: false,
        message: "Category not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Products fetch unsuccessful",
      error_message: error.message,
    });
  }
};
const getProductsBySubCateId = async (req, res) => {
  try {
    // const isExist = await Category.findOne({ cate_slug: req.params.cateSlug });
    const isExistSubCate = await SubCategory.findOne({
      sub_cate_slug: req.params.subCateSlug,
    });
    console.log("sub cate:", isExistSubCate);
    if (isExistSubCate) {
      const products = await Product.find({
        sub_category: isExistSubCate._id,
        status: "Publish",
      })
        .sort({ _id: -1 })
        .populate("category")
        .populate("sub_category")
        .populate("group");
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
        status: true,
        message: "Products fetched successfully",
        data: productsWithMinMaxPrices,
      });
    } else {
      res.status(201).json({
        status: false,
        message: "Category not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Products fetch unsuccessful",
      error_message: error.message,
    });
  }
};

const getProductsByGroupId = async (req, res) => {
  try {
    const products = await Product.find({
      group: req.params.groupId,
      status: "Publish",
    })
      .sort({ _id: -1 })
      .populate("category")
      .populate("sub_category")
      .populate("group");

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
      status: true,
      message: "Products fetched successfully",
      data: productsWithMinMaxPrices,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Products fetch unsuccessful",
      error_message: error.message,
    });
  }
};

const getProductsByStoreId = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 32;
    const count = await Product.countDocuments({
      store: req.params.storeId,
      status: "Publish",
    });
    const totalPages = Math.ceil(count / pageSize);

    const result = await Product.find({
      store: req.params.storeId,
      status: "Publish",
    })
      .sort({ _id: -1 })
      .populate("category")
      .populate("sub_category")
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const productsWithMinMaxPrices = await Promise.all(
      result.map(async (product) => {
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
      status: true,
      message: "Products get successfully",
      data: productsWithMinMaxPrices,
      pagination: {
        totalPages,
        currentPage: page,
      },
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Products get unsuccessful",
      error_message: error.message,
    });
  }
};

const getDraftProductsByStoreId = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 32;
    const count = await Product.countDocuments({
      store: req.params.storeId,
      status: "Draft",
    });
    const totalPages = Math.ceil(count / pageSize);

    const result = await Product.find({
      store: req.params.storeId,
      status: "Draft",
    })
      .sort({ _id: -1 })
      .populate("category")
      .populate("sub_category")
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).json({
      status: true,
      message: "Products get successfully",
      data: result,
      pagination: {
        totalPages,
        currentPage: page,
      },
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Products get unsuccessful",
      error_message: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const result = await Product.find({ status: "Publish" })
      .sort({ _id: -1 })
      .populate("store")
      .populate("group");
    res.status(200).json({
      status: true,
      message: "Products get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Products get unsuccessful",
    });
  }
};

const getLatestProducts = async (req, res) => {
  try {
    const result = await Product.find({ status: "Publish" })
      .sort({ _id: -1 })
      .limit(9)
      .select("title images");
    res.status(200).json({
      status: true,
      message: "Products get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Products get unsuccessful",
    });
  }
};

const getShowProducts = async (req, res) => {
  try {
    const result = await Product.find({ status: "Publish" }).sort({ _id: -1 });
    res.status(200).json({
      status: true,
      message: "Products get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Products get unsuccessful",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body?.productData);
    if (req.file) {
      productData["video"] = req.file?.path;
    }
    const isExist = await Product.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await Product.findByIdAndUpdate(
        { _id: req.params.id },
        productData,
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Product Update successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: true,
        message: "Product update unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: error?.message,
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const isExist = await Product.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await Product.findByIdAndDelete(
        { _id: req.params.id },
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Product Delete successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: true,
        message: "Product Delete unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Product Delete unsuccessful",
    });
  }
};

const deleteProductsByIds = async (req, res) => {
  try {
    const ids = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid or empty 'ids' array in the request body",
      });
    }
    const result = await Product.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount > 0) {
      res.status(200).json({
        status: true,
        message: "Products deleted successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: false,
        message: "No products were deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while deleting products",
      error: error.message,
    });
  }
};

const getSearchProducts = async (req, res) => {
  try {
    const { search } = req.query;
    const searchRegex = new RegExp(search, "i");

    const result = await Product.find({
      $or: [
        { title: searchRegex },
        { keyword: searchRegex },
        { group: searchRegex },
        { description: searchRegex },
      ],
      status: "Publish",
    })
      .populate("group")
      .sort({ _id: -1 });

    res.status(200).json({
      status: true,
      message: "Products get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Products get unsuccessful",
    });
  }
};

module.exports = {
  createProduct,
  getProductById,
  getProducts,
  getShowProducts,
  updateProduct,
  deleteProductById,
  getProductsByCateId,
  getProductsBySubCateId,
  getProductsByStoreId,
  getLatestProducts,
  deleteProductsByIds,
  getSearchProducts,
  getDraftProductsByStoreId,
  getProductsByGroupId,
};
