const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  emailVerification,
  getUser,
  getUserInfo,
  forgetPassword,
  changePassword,
  deleteUserAndCollections,
  checkIsExistEmail,
  updateUserInfo,
  loginAdmin,
  createSocialUser,
} = require("../controller/userController");
const { isAuth } = require("../utils/middleware");
const { upload, handleMulterError } = require("../config/multerConfig");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login/social", createSocialUser);
router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);
router.post("/verifyEmail", emailVerification);
router.patch("/:id", upload.single("image"), handleMulterError, updateUserInfo);
router.get("/", isAuth, getAllUsers);
router.delete("/delete/:id", deleteUser);
router.get("/:id", getUser);
router.get("/user-info/me", isAuth, getUserInfo);
router.post("/forgot-password", forgetPassword);
router.post("/password/change-password", isAuth, changePassword);
router.post("/remove/all-data", isAuth, deleteUserAndCollections);
router.post("/check-email", checkIsExistEmail);

module.exports = router;
