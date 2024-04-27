const User = require("../../../models/Users");
const Store = require("../../store/store.model");
const Message = require("../message/message.model");
const Chat = require("./chat.model");
const { getChatByUserId } = require("./chat.service");

const createChat = async (req, res) => {
  try {
    const { members } = req.body;
    const isExist = await Chat.findOne({ members: { $all: members } });
    const exFinder = await isExist?.members?.find(
      (member) => member?.toString() !== req.body?.requester
    );
    const receiverInfo = await User.findOne({
      _id: exFinder?.toString(),
    }).select("role name company_name image");

    const storeInfo = await Store.findOne({
      user: exFinder,
    }).select("store_name logo");

    if (isExist) {
      const exFormattedChat = {
        ...isExist.toObject(),
        receiverInfo: receiverInfo,
        storeInfo: storeInfo,
        lastMessage: "",
      };
      res.status(200).json({
        status: false,
        access: true,
        message: "Already Friend",
        data: exFormattedChat,
      });
    } else {
      const newChat = new Chat(req.body);
      const result = await newChat.save();

      const finder = await result?.members?.find(
        (member) => member?.toString() !== req.body?.requester
      );
      const receiverInfo = await User.findOne({
        _id: finder?.toString(),
      }).select("role name company_name image");

      const storeInfo = await Store.findOne({
        user: finder,
      }).select("store_name logo");
      const formattedChat = {
        ...result.toObject(),
        receiverInfo: receiverInfo,
        storeInfo: storeInfo,
        lastMessage: "",
      };
      const receiver_Chat = await getChatByUserId(
        receiverInfo?._id?.toString(),
        result?._id.toString()
      );
      res.status(200).json({
        status: true,
        access: true,
        message: "Chat Created",
        data: formattedChat,
        receiver_Chat: receiver_Chat,
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

const toggleNotificationSound = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user?._id;
    const isExist = await Chat.findOne({ _id: chatId });
    if (isExist) {
      const receiverId = isExist?.receiver?.toString();
      if (receiverId === userId) {
        const rsData = {
          settings: {
            sender: isExist?.settings?.sender,
            receiver: {
              isMute: isExist?.settings?.receiver?.isMute ? false : true,
              last_active: isExist?.settings?.receiver?.last_active,
            },
          },
        };
        const result = await Chat.updateOne(
          { _id: chatId, receiver: userId },
          rsData,
          { new: true }
        );
        res.status(200).json({
          success: true,
          message: "Notification Setting Change Success",
          data: rsData,
        });
      } else {
        const snData = {
          settings: {
            receiver: isExist?.settings?.receiver,
            sender: {
              isMute: isExist?.settings?.sender?.isMute ? false : true,
              last_active: isExist?.settings?.sender?.last_active,
            },
          },
        };
        const result = await Chat.updateOne(
          { _id: chatId, requester: userId },
          snData,
          { new: true }
        );
        res.status(200).json({
          success: true,
          message: "Notification Setting Change Success",
          data: snData,
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Chat Not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Notification Setting Change Failed",
      error_message: error.message,
    });
  }
};

const inboxChats = async (req, res) => {
  const userId = req.user?._id;
  try {
    const userChats = await Chat.find({ receiver: userId });
    const formattedChats = [];
    for (const chat of userChats) {
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
      formattedChats.push(formattedChat);
    }
    res.status(200).json(formattedChats);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get global chats
const getGlobalChats = async (req, res) => {
  const userId = req.user?._id;
  try {
    const userChats = await Chat.find({ members: { $all: [userId] } });
    const formattedChats = [];
    for (const chat of userChats) {
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
        receiverInfo: receiverInfo || {
          name: "Unknown User",
          company_name: "",
          isExist: false,
        },
        storeInfo: storeInfo || { store_name: "" },
        lastMessage: lastMessage,
        total_unseen: total,
      };

      formattedChats.push(formattedChat);
    }
    res.status(200).json(formattedChats);
  } catch (error) {
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
  inboxChats,
  getGlobalChats,
  findChat,
  getInfoByMemberType,
  toggleNotificationSound,
};
