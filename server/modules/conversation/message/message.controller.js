const Store = require("../../store/store.model");
const Chat = require("../chat/chat.model");
const Notification = require("../notification/notification.model");
const Message = require("./message.model");

const createMessage = async (req, res) => {
  try {
    const messageData = JSON.parse(req.body.message);
    if (req.files) {
      let images = [];
      if (req?.files?.images?.length > 0) {
        for (let i = 0; i < req?.files?.images?.length; i++) {
          images.push(req?.files?.images[i]?.path);
        }
        messageData["images"] = images;
      }
    }
    // const { sender_type, ...other } = messageData;
    // const newNotification = new Notification({
    //   title: `New Message`,
    //   chatId: req.body.chatId,
    //   sender_type: sender_type,
    //   receiverId: messageData[0],
    //   senderId: messageData[1],
    //   seen: false,
    // });
    const newMessage = new Message(messageData);
    const result = await newMessage.save();
    // const nftResult = await newNotification.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Ensure indexes for the "notifications" collection
Message.createIndexes([{ chatId: 1 }, { senderId: 1 }]);

const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await Message.find({ chatId })
      .populate("product")
      .sort({ _id: -1 })
      .limit(50);
    const messagesAsc = result.reverse();
    res.status(200).send(messagesAsc);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTotalUnseen = async (req, res) => {
  try {
    const store = await Store.findOne({ user: req.user?._id });
    const storeId = store?._id?.toString();
    if (storeId) {
      var storeChats = await Chat.find({ "memberOne.id": storeId }).select(
        "_id district"
      );
    }
    const userChats = await Chat.find({ "memberTwo.id": req.user?._id }).select(
      "_id district"
    );
    const storeChatIds = storeChats.map((chat) => chat._id.toString());
    const userChatIds = userChats.map((chat) => chat._id.toString());
    const total = await Message.countDocuments({
      $and: [
        {
          $or: [
            { chatId: { $in: userChatIds } },
            { chatId: { $in: storeChatIds } },
          ],
        },
        { senderId: { $ne: req.user?._id } },
        { isSeen: false },
      ],
    });

    res.status(200).json(total);
  } catch (error) {
    res.status(500).send(error);
  }
};

const seenAllUnseenMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const result = await Message.updateMany(
      {
        $and: [
          { chatId: chatId },
          { senderId: { $ne: req.user?._id } },
          { isSeen: false },
        ],
      },
      { isSeen: true }
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createMessage,
  getMessages,
  getTotalUnseen,
  seenAllUnseenMessages,
};
