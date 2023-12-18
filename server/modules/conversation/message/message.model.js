const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    members: {
      type: [String],
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
    product: {
      type: String,
      ref: "Product",
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
    isSeen: {
      type: Boolean,
      enum: [true, false],
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
