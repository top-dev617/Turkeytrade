const express = require("express");
const {
  createPGroup,
  getPGroupById,
  getPGroups,
  getShowPGroups,
  updatePGroup,
  deletePGroupById,
  getPGroupsByStoreId,
  getUniquePGroupsByStoreId,
  checkIsExist,
} = require("./productGroup.controller");

const router = express.Router();

router.post("/", createPGroup);
router.get("/:id", getPGroupById);
router.get("/store/:storeId", getPGroupsByStoreId);
router.get("/unique/store/:storeId", getUniquePGroupsByStoreId);
router.get("/", getPGroups);
router.get("/show/group", getShowPGroups);
router.patch("/:id", updatePGroup);
router.delete("/:id", deletePGroupById);

// check is exist
router.get("/isexist/:id", checkIsExist);

module.exports = router;
