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
      if (req?.files?.video) {
        messageData["video"] = req.files?.video[0]?.path;
      }
      if (req?.files?.document) {
        messageData["document"] = req.files?.document[0]?.path;
      }
    }

    console.log(messageData);
    const newMessage = new Message(messageData);
    const result = await newMessage.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Ensure indexes for the "notifications" collection
Message.createIndexes([{ chatId: 1 }, { senderId: 1 }]);

const getMessages = async (req, res) => {
  const { chatId } = req.params;
  const page = parseInt(req.query.page) || 1; // Default page is 1
  const limit = parseInt(req.query.limit) || 50; // Default limit is 50

  const skip = (page - 1) * limit;

  try {
    const result = await Message.find({ chatId })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    const messagesAsc = result.reverse();
    const total = await Message.countDocuments({ chatId });
    res.status(200).json({
      data: {
        messages: messagesAsc,
        total: total,
        page: page,
      },
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTotalUnseen = async (req, res) => {
  try {
    const userChats = await Chat.find({
      members: { $all: [req.user?._id] },
    }).select("_id district");

    const userChatIds = userChats.map((chat) => chat._id.toString());
    const total = await Message.countDocuments({
      $and: [
        { chatId: { $in: userChatIds } },
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
