const mongoose = require("mongoose");

const helpCenterChatSchema = new mongoose.Schema(
  {
    help_center: {
      type: Boolean,
      default: true,
    },
    member: {
      type: Object,
      member_type: {
        type: String,
        enum: ["Store", "User"],
      },
      id: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HelpCenterChat = mongoose.model("HelpCenterChat", helpCenterChatSchema);

module.exports = HelpCenterChat;
