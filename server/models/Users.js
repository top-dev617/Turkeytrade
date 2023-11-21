const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["Buyer", "Seller", "Admin"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: false,
    },
    company_name: {
      type: String,
      required: true,
    },
    companyAddress: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    zipCode: {
      type: String,
      required: false,
    },
    province: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    number_of_employees: {
      type: String,
      required: false,
    },
    business_type: {
      type: String,
      required: false,
    },
    year_established: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    social: {
      type: Object,
      facebook: String,
      instagram: String,
      twitter: String,
      required: false,
    },
  },
  {
    timestamps: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
