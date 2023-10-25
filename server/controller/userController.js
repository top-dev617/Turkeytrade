const User = require("../models/Users");
const bcrcypt = require("bcryptjs");
const randomstring = require("randomstring");
const { generateToken, sendVerificationCode } = require("../utils/auth");
const Store = require("../modules/store/store.model");
const Product = require("../modules/product/product.model");

const registerUser = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });

    const isVerified = isExist?.isVerified;

    if (isExist && isVerified === true) {
      return res.status(403).send({
        message: `${req.body.email} is already Exist!`,
        status: 403,
      });
    } else if (isExist && isVerified === false) {
      const password = bcrcypt.hashSync(req.body.password);
      const otp = randomstring.generate({ length: 5, charset: "numeric" });

      isExist.password = password;
      isExist.otp = otp;

      const updatedUser = await isExist.save();

      await sendVerificationCode(updatedUser, otp);

      res.status(200).send({
        message: "We have sent you verification code. Please check your email!",
        status: 200,
      });
    } else {
      const otp = randomstring.generate({ length: 5, charset: "numeric" });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrcypt.hashSync(req.body.password),
        otp,
        companyAddress: req.body.companyAddress,
        city: req.body.city,
        zipCode: req.body.zipCode,
        province: req.body.province,
        country: req.body.country,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role
      });

      const user = await newUser.save();

      // const token = generateToken(user);
      // res.send({
      //   user,
      //   accessToken: token,
      //   status: 200,
      // });
      await sendVerificationCode(user, otp);
      res.status(200).send({
        message: "We have sent you verification code. Please check your email!",
        status: 200,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


// get user info by token verified => email
const getUserInfo = async (req, res) => {
  try {
    console.log(req.user)
    const user = await User.findOne({ email: req?.user?.email });
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const emailVerification = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        message: "User not found!",
        status: 200,
      });
    }

    if (user?.otp !== otp) {
      return res.status(400).send({
        success: false,
        message: "Invalid OTP",
        status: 200,
      });
    } else {
      user.isVerified = true;
      await user.save();

      const token = await generateToken(user);
      res.send({
        message: "User Verified successfully",
        user,
        accessToken: token,
        status: 200,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user?.isVerified === false) {
      return res.status(401).send({
        message: "Please Verify you email.",
      });
    }
    if (
      user &&
      bcrcypt.compareSync(req.body.password, user.password) &&
      user?.isVerified === true
    ) {
      const accessToken = await generateToken(user);
      return res.send({
        message: "Logged in successfully",
        status: 200,
        user,
        accessToken,
      });
    } else {
      res.status(401).send({
        message: "Invalid user or password",
        status: 401,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      data: users,
      status: 200,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id })
      .exec()
      .then((result) => {
        res.status(200).send({
          message: `${result.name} is successfully removed!`,
          status: 200,
        });
      })
      .catch((err) => {
        res.send({
          message: err.message,
        });
      });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, {
      name: 1,
      email: 1,
      isVerified: 1,
    });
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};



const forgetPassword = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.body.email })
    if (req.body.email && !req.body.otp) {
      if (isExist && isExist.isVerified === true) {
        const otp = randomstring.generate({ length: 5, charset: "numeric" });
        isExist.otp = otp;
        const updatedUser = await isExist.save();
        await sendVerificationCode(updatedUser, otp);
        res.status(200).send({
          message: "We have sent you verification code. Please check your email!",
          status: true,
        });
      } else if (isExist) {
        res.status(200).send({
          message: "Account Not Found",
          status: false,
        });
      } else {
        res.status(200).send({
          message: "Email Not Verified",
          status: false,
        });
      }
    } else if (req.body.email && req.body.otp && !req.body.password) {
      if (isExist.otp === req.body.otp) {
        res.send({
          message: "Change Your Password",
          status: true,
        });
      } else {
        res.send({
          message: "OTP is incorrect",
          status: false,
        });
      }

    } else if (req.body.password) {
      isExist.password = bcrcypt.hashSync(req.body.password)
      await isExist.save();

      const token = await generateToken(isExist);
      res.send({
        message: "Password Changed successfully",
        isExist,
        accessToken: token,
        status: 200,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}



const changePassword = async (req, res) => {
  const { old_password, new_password } = req.body;
  try {
    const user = await User.findById({ _id: req.user._id });

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
    }
    const isPasswordMatch = await bcrcypt.compareSync(old_password, user.password)
    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: 'Incorrect old password.'
      });
    } else {
      user.password = bcrcypt.hashSync(new_password)
      await user.save();

      res.status(200).json({
        success: true,
        message: 'Password updated successfully.',
      });
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



const deleteUserAndCollections = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const isStore = await Store.findOne({ user: userId });
    await Product.deleteMany({ store: isStore?._id });
    await Store.deleteMany({ user: userId });

    return res.status(200).json({
      success: true,
      message: "User account and associated collections deleted successfully."
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};


const checkIsExistEmail = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });
    if (isExist) {
      res.status(201).json({
        success: false,
        message: "Email Already in use"
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Email is Unique"
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message
    });
  }
}



const updateUserInfo = async (req, res) => {
  try {
    const isExist = await User.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await User.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Company Info Update successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: false,
        message: "Update unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: error.message,
    });
  }
};







module.exports = {
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
  updateUserInfo
};
