const express = require("express");
const { isAuth } = require("../../utils/middleware");
const {
  createStore,
  getStoreById,
  updateStore,
  getStoreByUserId,
  getStoreCategoriesByStore,
  updateStoreStatus,
  getStores,
  updateStoreInfo,
  updateStoreInfoAfterVerification,
  updateHighlight,
} = require("./store.controller");
const { upload, handleMulterError } = require("../../config/multerConfig");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "business_registration_certificate", maxCount: 1 },
    { name: "kdv_certificate", maxCount: 1 },
  ]),
  createStore
);
router.get("/:id", getStoreById);
router.get("/", getStores);
router.get("/user/:userId", getStoreByUserId);
router.patch(
  "/:id",
  upload.fields([
    { name: "store_presentation_video", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "certificates", maxCount: 10 },
  ]),
  handleMulterError,
  updateStore
);

router.patch(
  "/info/after-verify/:id",
  isAuth,
  upload.fields([
    { name: "store_presentation_video", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  handleMulterError,
  updateStoreInfoAfterVerification
);
router.patch("/status/:id", updateStoreStatus);
router.patch("/isHighlight/:storeId", updateHighlight);
router.patch("/info/:id", updateStoreInfo);
router.get("/store/:storeId/categories", getStoreCategoriesByStore);

module.exports = router;
