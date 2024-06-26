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
  recentlyViewedProducts,
  popularProducts,
} = require("./product.controller");
const { upload, handleMulterError } = require("../../config/multerConfig");
const Chat = require("../conversation/chat/chat.model");
const User = require("../../models/Users");

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
router.post("/recent-view", recentlyViewedProducts);
router.get("/popular/prods", popularProducts);
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

// router.get("/a/b", async (req, res) => {
//   const result = await Chat.updateMany(
//     {},
//     {
//       $set: {
//         sendMailAction: true,
//         responseMailAction: false,
//       },
//     }
//   );
//   const users = await User.updateMany(
//     {},
//     {
//       $set: {
//         emailChatNotification: true,
//       },
//     }
//   );

//   res.send({ result, users });
// });

module.exports = router;
