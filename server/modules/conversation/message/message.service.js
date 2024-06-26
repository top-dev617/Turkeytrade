const User = require("../../../models/Users");
const {
  sendFirstMessage,
  sendFirstRespondMessage,
  sendMailForUnseenMsg,
} = require("../../../utils/sendEmailForChat");
const Chat = require("../chat/chat.model");
const Message = require("./message.model");

const firstMessage = async (user, data) => {
  const result = await User.findOne({
    _id:
      data?.members[0] === data?.senderId ? data?.members[1] : data?.members[0],
  }).select("name email secondaryEmail emailChatNotification");

  if (result?.emailChatNotification) {
    const chat = await Chat.findById({ _id: data?.chatId });

    let firstResData = await Message.findOne({
      chatId: data?.chatId,
      senderId: { $ne: data?.senderId },
    });

    let flag = "";
    if (chat && chat?.sendMailAction === true) {
      flag = "Send";
    }
    if (
      chat &&
      chat?.responseMailAction &&
      data?.senderId !== firstResData?.senderId
    ) {
      flag = "Res";
    }

    if (flag) {
      var userData = { email: null, name: result?.name, buyerName: user?.name };
      if (result?.user_type === "Social") {
        userData["email"] = result?.secondaryEmail;
      } else {
        userData["email"] = result?.email;
      }
    }

    if (flag === "Send") {
      await Chat.findByIdAndUpdate(
        { _id: chat?._id },
        {
          $set: {
            sendMailAction: false,
            responseMailAction: true,
          },
        }
      );
      sendFirstMessage(userData, data, userData?.email);
    }

    if (flag === "Res") {
      await Chat.findByIdAndUpdate(
        { _id: chat?._id },
        {
          $set: {
            sendMailAction: false,
            responseMailAction: false,
          },
        }
      );
      sendFirstRespondMessage(userData, data, userData?.email);
    }
  }

  return { success: true };
};

const getUnreadMessagesOlderThan24Hours = async () => {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); //* 24h
  // const twentyFourHoursAgo = new Date(now.getTime() - 1 * 60 * 1000); //* for 1 hour

  const chats = await Chat.find({}).exec();
  for (let i = 0; i < chats.length; i++) {
    const element = chats[i];
    await Message.findOne({
      chatId: element?._id.toString(),
      isSeen: false,
      createdAt: { $lt: twentyFourHoursAgo },
      members: { $exists: true },
    })
      .sort({ _id: -1 })
      .limit(1)
      .populate(
        "members",
        "email secondaryEmail name user_type emailChatNotification"
      )
      .then(async function (currentItem) {
        if (currentItem) {
          const userData =
            currentItem?.members[0]?._id !== currentItem?.senderId
              ? currentItem?.members[0]
              : currentItem?.members[1];
          const buyerName =
            currentItem?.members[0]?._id === currentItem?.senderId
              ? currentItem?.members[0]?.name
              : currentItem?.members[1]?.name;
          const data = {
            userId: userData?._id,
            email:
              userData?.user_type === "Social"
                ? userData?.secondaryEmail
                : userData?.email,
            name: userData?.name,
            buyerName: buyerName,
            message: currentItem?.message,
          };
          if (userData?.emailChatNotification) {
            await sendMailForUnseenMsg(data);
          }
          return data;
        } else {
          return null;
        }
      });
  }

  return;
};

module.exports = {
  firstMessage,
  getUnreadMessagesOlderThan24Hours,
};
// buyerName
