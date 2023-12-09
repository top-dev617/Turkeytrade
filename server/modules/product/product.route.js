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
  getProductsBySubCateId,
} = require("./product.controller");
const { upload, handleMulterError } = require("../../config/multerConfig");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "images", maxCount: 6 },
  ]),
  handleMulterError,
  createProduct
);
router.get("/:id", getProductById);
router.get("/", getProducts);
router.get("/store/:storeId", getProductsByStoreId);
router.get("/group/:groupId", getProductsByGroupId);
router.get("/store/:storeId/draft", getDraftProductsByStoreId);
router.get("/category/:cateSlug", getProductsByCateId);
router.get("/category/:cateSlug/:subCateSlug", getProductsBySubCateId);
router.get("/show/products", getShowProducts);
router.get("/latest/products", getLatestProducts);
router.patch(
  "/:id",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "images", maxCount: 6 },
  ]),
  handleMulterError,
  updateProduct
);
router.delete("/delete/:id", deleteProductById);
router.delete("/delete/many/ids", isAuth, deleteProductsByIds);
router.get("/search/products", getSearchProducts);

module.exports = router;
