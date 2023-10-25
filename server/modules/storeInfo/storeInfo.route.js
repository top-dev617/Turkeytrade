const express = require("express");
const { isAuth } = require("../../utils/middleware");
const {
  createStoreInfo,
  getStoreInfoById,
  getAllStoreInfo,
  updateStoreInfo,
  deleteStoreInfoById,
  getStoreInfoByStoreId,
} = require("./storeInfo.controller");

const router = express.Router();

router.post("/", createStoreInfo);
router.get("/:id", getStoreInfoById);
router.get("/", getAllStoreInfo);
router.get("/store/:storeId", getStoreInfoByStoreId);
router.patch("/:id", updateStoreInfo);
router.delete("/:id", deleteStoreInfoById);

module.exports = router;
