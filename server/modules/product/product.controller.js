const Category = require("../category/category.model");
const SaveProduct = require("../saveProduct/saveProduct.model");
const SubCategory = require("../subCategory/subCategory.model");
const Product = require("./product.model");

const createProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body?.productData);
    if (req.files) {
      if (req.files.video) {
        productData["video"] = req.files.video[0]?.path;
      }
      let images = [];
      if (req?.files?.images?.length > 0) {
        for (let i = 0; i < req?.files?.images?.length; i++) {
          images.push(req?.files?.images[i]?.path);
        }
        productData["images"] = images;
      }
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
    const result = await Product.findOne({
      _id: req.params.id,
      status: "Publish",
    })
      .populate("store")
      .populate("category")
      .populate("sub_category")
      .populate("group");

    if (result?.category) {
      var relatedProducts = await Product.find({
        category: result?.category._id,
        sub_category: result?.sub_category?._id,
        _id: { $ne: result._id },
        status: "Publish",
      })
        .limit(4)
        .select("unit price title images");
    }

    res.status(200).json({
      status: true,
      message: "Product get successfully",
      data: result,
      related_products: relatedProducts,
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
    // console.log(isExist);
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
            const prices = product?.price?.ladder_price?.map((price) =>
              parseInt(price.euro)
            );
            // console.log(prices);
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
      res.status(404).json({
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
    // console.log("sub cate:", isExistSubCate);
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
          const prices = product?.price?.ladder_price?.map((price) =>
            parseInt(price.euro)
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
      .limit(40)
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
    if (req.files) {
      if (req.files.video) {
        productData["video"] = req.files.video[0]?.path;
      }
      if (req?.files?.images?.length > 0) {
        let images = [];
        let index = 0;

        for (let i = 0; i < productData?.images?.length; i++) {
          const element = productData?.images[i];
          if (typeof element === "string") {
            images.push(element);
          } else if (typeof element === "object") {
            index = index === 0 ? index : index + 1;
            images.push(req?.files?.images[index]?.path);
          }
        }
        productData["images"] = images;
      }
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

    const products = await Product.find({
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

    const productsWithMinMaxPrices = await Promise.all(
      products.map(async (product) => {
        if (product?.price?.price_type === "ladder_price") {
          const prices = product?.price?.ladder_price?.map((price) =>
            parseInt(price.euro)
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
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Products get unsuccessful",
    });
  }
};

// recently viewed products
const recentlyViewedProducts = async (req, res) => {
  try {
    const query = {
      _id: {
        $in: [...req.body.ids],
      },
      status: "Publish",
    };

    // if (req.query.id) {
    //   query._id["$ne"] = req.query.id;
    // }

    const result = await Product.find(query)
      .limit(4)
      .select("unit price images title");
    const sortedProducts = req.body.ids.map((id) =>
      result.find((product) => product._id.toString() === id)
    );

    res.status(200).json({
      status: true,
      success: true,
      message: "Products retrieved successfully",
      data: sortedProducts,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Product get unsuccessful",
      error_message: error.message,
    });
  }
};

// popular products
const popularProducts = async (req, res) => {
  try {
    const limit = 32;

    // Aggregate to find the product IDs with their save counts
    const popularProductIds = await SaveProduct.aggregate([
      {
        $group: {
          _id: "$product",
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gte: 2 }, // Only include products with at least 2 saves
        },
      },
      {
        $sort: { count: -1 }, // Sort by save count in descending order
      },
      {
        $limit: limit, // Limit the results
      },
    ]);

    // Extracting the product IDs from the result
    const productIds = popularProductIds.map((item) => item._id);

    // Fetching product details from the Product collection
    const products = await Product.find({
      _id: { $in: productIds },
      status: "Publish",
    });

    // Creating a map to associate product IDs with their save counts
    const productIdToCountMap = new Map(
      popularProductIds.map((item) => [item._id.toString(), item.count])
    );

    // Fetching product details and adding min and max prices if necessary
    const productsWithMinMaxPrices = await Promise.all(
      products.map(async (product) => {
        let productObj = product.toObject();
        if (product?.price?.price_type === "ladder_price") {
          const prices = product?.price?.ladder_price?.map((price) =>
            parseInt(price.euro)
          );
          productObj.minPrice = Math.min(...prices);
          productObj.maxPrice = Math.max(...prices);
        }

        // Add the save count to the product object
        productObj.saveCount = productIdToCountMap.get(product._id.toString());

        return productObj;
      })
    );

    // Sorting products with min-max prices by their save count again to ensure correct order
    productsWithMinMaxPrices.sort((a, b) => b.saveCount - a.saveCount);

    res.status(201).json({
      success: true,
      message: "Products retrieved successfully",
      data: productsWithMinMaxPrices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product retrieval unsuccessful",
      error_message: error.message,
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
  recentlyViewedProducts,
  popularProducts,
};
