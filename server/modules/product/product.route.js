const express = require("express");
const { isAuth } = require("../../utils/middleware");

const {
  getProductById,
  getProducts,
  getShowProducts,
  updateProduct,
  deleteProductById,
  createProduct,
  getProductsByCateId,
  getProductsByStoreId,
  getLatestProducts,
  getSearchProducts,
  deleteProductsByIds,
  getDraftProductsByStoreId,
  getProductsByGroupId,
} = require("./product.controller");
const { upload, handleMulterError } = require("../../config/multerConfig");

const router = express.Router();

router.post("/", upload.single("video"), handleMulterError, createProduct);
router.get("/:id", getProductById);
router.get("/", getProducts);
router.get("/store/:storeId", getProductsByStoreId);
router.get("/group/:groupId", getProductsByGroupId);
router.get("/store/:storeId/draft", getDraftProductsByStoreId);
router.get("/category/:cateId", getProductsByCateId);
router.get("/show/products", getShowProducts);
router.get("/latest/products", getLatestProducts);
router.patch("/:id", upload.single("video"), handleMulterError, updateProduct);
router.delete("/delete/:id", deleteProductById);
router.delete("/delete/many/ids", isAuth, deleteProductsByIds);
router.get("/search/products", getSearchProducts);

module.exports = router;
