const mongoose = require("mongoose");

const helpCenterMessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    attachment: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const HelpCenterMessage = mongoose.model(
  "HelpCenterMessage",
  helpCenterMessageSchema
);
module.exports = HelpCenterMessage;
