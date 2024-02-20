const User = require("../../../models/Users");
const Store = require("../../store/store.model");
const Message = require("../message/message.model");
const Chat = require("./chat.model");

const getChatByUserId = async (userId, chatId) => {
  const chat = await Chat.findOne({
    $and: [{ _id: chatId }, { members: { $all: [userId] } }],
  });

  const lastMessage = await Message.findOne({ chatId: chat._id }).sort({
    createdAt: -1,
  });
  const finder = await chat?.members?.find(
    (member) => member?.toString() !== userId
  );
  const receiverInfo = await User.findOne({
    _id: finder?.toString(),
  }).select("role name company_name image");

  const storeInfo = await Store.findOne({
    user: finder,
  }).select("store_name logo");
  const total = await Message.countDocuments({
    $and: [
      { chatId: chat?._id },
      { senderId: { $ne: userId } },
      { isSeen: false },
    ],
  });
  const formattedChat = {
    ...chat.toObject(),
    receiverInfo: receiverInfo,
    storeInfo: storeInfo,
    lastMessage: lastMessage,
    total_unseen: total,
  };
  return formattedChat;
};

const updateLastActivity = async (userId, time) => {
  const userChats = await Chat.find({ members: { $all: [userId] } });

  for (const isExist of userChats) {
    const receiverId = isExist?.receiver?.toString();
    if (receiverId === userId) {
      const rsData = {
        settings: {
          sender: isExist?.settings?.sender,
          receiver: {
            isMute: isExist?.settings?.receiver?.isMute,
            last_active: time,
          },
        },
      };
      const result = await Chat.updateOne(
        { _id: isExist?._id.toString(), receiver: userId },
        rsData,
        { new: true }
      );
    } else {
      const snData = {
        settings: {
          receiver: isExist?.settings?.receiver,
          sender: {
            isMute: isExist?.settings?.sender?.isMute,
            last_active: time,
          },
        },
      };
      const result = await Chat.updateOne(
        { _id: isExist?._id.toString(), requester: userId },
        snData,
        { new: true }
      );
    }
  }
};

module.exports = {
  getChatByUserId,
  updateLastActivity,
};
