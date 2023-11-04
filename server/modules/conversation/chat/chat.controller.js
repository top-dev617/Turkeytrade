const User = require("../../../models/Users");
const Store = require("../../store/store.model");
const Message = require("../message/message.model");
const Chat = require("./chat.model");

const createChat = async (req, res) => {
  try {
    const { memberOne, memberTwo } = req.body;
    const isExist = await Chat.findOne({
      $or: [
        { "memberOne.id": memberOne.id, "memberTwo.id": memberTwo.id },
        { "memberOne.id": memberTwo.id, "memberTwo.id": memberOne.id },
      ],
    });
    if (isExist) {
      res.status(200).json({
        status: false,
        access: true,
        message: "Already Friend",
        data: isExist,
      });
    } else {
      const newChat = new Chat(req.body);
      const result = await newChat.save();
      res.status(200).json({
        status: true,
        access: true,
        message: "Chat Created",
        data: result,
      });
    }
  } catch (error) {
    res.status(200).json({
      status: false,
      access: false,
      message: error.message,
    });
  }
};

// const userChats = async (req, res) => {
//     const { userId } = req.params
//     try {
//         const result = await Chat.find({
//             $or: [
//                 { 'memberOne.id': userId },
//                 { 'memberTwo.id': userId }
//             ]
//         })
//         res.status(200).send(result)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// };

const userChats = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find chats where the user is a member of memberOne or memberTwo
    const chats = await Chat.find({
      $or: [{ "memberOne.id": userId }, { "memberTwo.id": userId }],
    }).sort({ createdAt: 1 });

    const formattedChats = [];

    for (const chat of chats) {
      const lastMessage = await Message.findOne({ chatId: chat._id })
        .sort({ createdAt: -1 })
        .populate({
          path: "senderId",
          select: "username",
        })
        .populate("product");
      const formattedChat = {
        _id: chat._id,
        memberOne: chat.memberOne,
        memberTwo: chat.memberTwo,
        lastMessage: lastMessage ? lastMessage.text : null,
        lastConversationTime: lastMessage ? lastMessage.createdAt : null,
      };
      formattedChats.push(formattedChat);
    }
    const sortByIsoDateDesc = (a, b) =>
      new Date(b.lastConversationTime) - new Date(a.lastConversationTime);

    const sortedDateArrayDesc = formattedChats.sort(sortByIsoDateDesc);
    res.status(200).json(sortedDateArrayDesc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get global chats
const getGlobalChats = async (req, res) => {
  const { userId } = req.params;
  try {
    const store = await Store.findOne({ user: userId });
    const storeId = store?._id?.toString();
    if (storeId) {
      var storeChats = await Chat.find({ "memberOne.id": storeId }).sort({
        createdAt: 1,
      });
    }

    const userChats = await Chat.find({ "memberTwo.id": userId }).sort({
      createdAt: 1,
    });

    const formattedChats = [];

    for (const chat of userChats) {
      const lastMessage = await Message.findOne({ chatId: chat._id })
        .sort({ createdAt: -1 })
        .populate({
          path: "senderId",
          select: "username",
        })
        .populate("product");
      const formattedChat = {
        _id: chat._id,
        type: "Store",
        memberOne: chat.memberOne,
        memberTwo: chat.memberTwo,
        lastMessage: lastMessage ? lastMessage.text : null,
        lastConversationTime: lastMessage ? lastMessage.createdAt : null,
      };
      formattedChats.push(formattedChat);
    }

    if (storeChats?.length) {
      for (const chat of storeChats) {
        const lastMessage = await Message.findOne({ chatId: chat._id })
          .sort({ createdAt: -1 })
          .populate({
            path: "senderId",
            select: "username",
          })
          .populate("product");
        const formattedChat = {
          _id: chat._id,
          type: "User",
          memberOne: chat.memberOne,
          memberTwo: chat.memberTwo,
          lastMessage: lastMessage ? lastMessage.text : null,
          lastConversationTime: lastMessage ? lastMessage.createdAt : null,
        };
        formattedChats.push(formattedChat);
      }
    }

    const sortByIsoDateDesc = (a, b) =>
      new Date(b.lastConversationTime) - new Date(a.lastConversationTime);

    const sortedDateArrayDesc = formattedChats.sort(sortByIsoDateDesc);
    res.status(200).json(sortedDateArrayDesc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const findChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.params;
    const result = await Chat.findOne({
      $or: [
        { "memberOne.id": firstId, "memberTwo.id": secondId },
        { "memberOne.id": secondId, "memberTwo.id": firstId },
      ],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getInfoByMemberType = async (req, res) => {
  const { memberId, type } = req.params;
  console.log(memberId, type);
  try {
    if (type === "Store") {
      const isStore = await Store.findById({ _id: memberId });
      res.status(200).json({
        status: true,
        message: "Data Retrieve Successful",
        data: isStore,
      });
    } else if (type === "User") {
      const isUser = await User.findById({ _id: memberId });
      res.status(200).json({
        status: true,
        message: "Data Retrieve Successful",
        data: isUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  createChat,
  userChats,
  getGlobalChats,
  findChat,
  getInfoByMemberType,
};
