const express = require("express");
const { isAuth } = require("../../utils/middleware");
const {
  createStore,
  getStoreById,
  updateStore,
  getStoreByUserId,
  getStoreCategoriesByStore,
} = require("./store.controller");
const { upload, handleMulterError } = require("../../config/multerConfig");

const router = express.Router();

router.post("/", createStore);
router.get("/:id", getStoreById);
router.get("/user/:userId", getStoreByUserId);
router.patch(
  "/:id",
  upload.single("store_presentation_video"),
  handleMulterError,
  updateStore
);
router.get("/store/:storeId/categories", getStoreCategoriesByStore);

module.exports = router;
