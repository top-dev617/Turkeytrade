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
    secondaryEmail: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    user_type: {
      type: String,
      enum: ["Manual", "Social"],
      default: "Manual",
      required: false,
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
    time_format: {
      type: String,
      enum: ["12h", "24h"],
      required: true,
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
    emailChatNotification: {
      type: Boolean,
      enum: [true, false],
      default: true,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
