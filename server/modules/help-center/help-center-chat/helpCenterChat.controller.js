const HelpCenterChat = require("./helpCenterChat.model");

const createHelpCenterChat = async (req, res) => {
  try {
    const { id, type } = req.body;
    const isExist = await HelpCenterChat.findOne({
      "member.id": id,
    });
    if (isExist) {
      res.status(200).json({
        status: false,
        access: true,
        message: "Already Friend",
        data: isExist,
      });
    } else {
      const newChat = new HelpCenterChat({
        help_center: true,
        member: {
          member_type: type,
          id: id,
        },
      });
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

// const userHelpCenterChats = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const chats = await Chat.find({
//       $or: [{ "memberOne.id": userId }, { "memberTwo.id": userId }],
//     }).sort({ createdAt: 1 });

//     const formattedChats = [];

//     for (const chat of chats) {
//       const lastMessage = await Message.findOne({ chatId: chat._id })
//         .sort({ createdAt: -1 })
//         .populate({
//           path: "senderId",
//           select: "username",
//         })
//         .populate("product");
//       const formattedChat = {
//         _id: chat._id,
//         memberOne: chat.memberOne,
//         memberTwo: chat.memberTwo,
//         lastMessage: lastMessage ? lastMessage.text : null,
//         lastConversationTime: lastMessage ? lastMessage.createdAt : null,
//       };
//       formattedChats.push(formattedChat);
//     }
//     const sortByIsoDateDesc = (a, b) =>
//       new Date(b.lastConversationTime) - new Date(a.lastConversationTime);

//     const sortedDateArrayDesc = formattedChats.sort(sortByIsoDateDesc);
//     res.status(200).json(sortedDateArrayDesc);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const findHelpCenterChat = async (req, res) => {
//   try {
//     const { firstId, secondId } = req.params;
//     const result = await Chat.findOne({
//       $or: [
//         { "memberOne.id": firstId, "memberTwo.id": secondId },
//         { "memberOne.id": secondId, "memberTwo.id": firstId },
//       ],
//     });
//     res.status(200).send(result);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// const getHelpCenterInfoByMemberType = async (req, res) => {
//   const { memberId, type } = req.params;
//   try {
//     if (type === "Store") {
//       const isStore = await Store.findById({ _id: memberId });
//       res.status(200).json({
//         status: true,
//         message: "Data Retrieve Successful",
//         data: isStore,
//       });
//     } else if (type === "User") {
//       const isUser = await User.findById({ _id: memberId });
//       res.status(200).json({
//         status: true,
//         message: "Data Retrieve Successful",
//         data: isUser,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

module.exports = {
  createHelpCenterChat,
  //   userHelpCenterChats,
  //   findHelpCenterChat,
  //   getHelpCenterInfoByMemberType,
};
