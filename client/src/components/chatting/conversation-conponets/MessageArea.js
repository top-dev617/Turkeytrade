import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendMessageBox from "./SendMessageBox";
import SingleMessage from "./SingleMessage";
import {
  setChat,
  setChatSetting,
  setDocument,
  setImage,
  setImages,
  setInboxChatSetting,
  setMessagePush,
  setMessages,
  setVideo,
} from "@/redux/features/conversation/conversationSlice";
import {
  useGetGlobalChatMessagesQuery,
  usePostNewMessageMutation,
  useSeenAllMessagesByChatMutation,
  useToggleAlertMutation,
} from "@/redux/features/conversation/conversationApi";
import Link from "next/link";
import moment from "moment";
import Loading from "@/components/commons/Loading";
import { io } from "socket.io-client";
import { useRef } from "react";
import { socket_url } from "@/utils/auth/global";
import { useEffect } from "react";
import { iBack, iMute, iThreeDot, iUnMute } from "@/utils/icons/icons";
import useViewImage from "@/lib/hooks/useViewImage";
import { AuthContext } from "@/components/context/AuthContext";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import useLocalTime from "@/lib/hooks/useLocalTime";

const MessageArea = ({ messageClassName }) => {
  const { user } = useContext(AuthContext);
  const { chat, online_users, messages, images, video, document } = useSelector(
    (state) => state.conversation
  );
  const [toggleAlert] = useToggleAlertMutation();
  const { data, refetch, isLoading } = useGetGlobalChatMessagesQuery(chat?._id);
  const [postNewMessage] = usePostNewMessageMutation();
  const [seenAllMessagesByChat] = useSeenAllMessagesByChatMutation();
  const dispatch = useDispatch();
  const { viewImg } = useViewImage();
  const { fromNow } = useLocalTime();
  const socket = useRef();

  const [open, setOpen] = useState(null);

  const handleSeenAll = async () => {
    const options = {
      data: { chatId: chat?._id },
    };
    const result = await seenAllMessagesByChat(options);
    // console.log(result);
  };

  useEffect(() => {
    handleSeenAll();
    return () => {};
  }, [chat, messages]);

  useEffect(() => {
    refetch();
    return () => {};
  }, [chat]);

  useEffect(() => {
    dispatch(setMessages(data));

    return () => {};
  }, [data]);

  useEffect(() => {
    socket.current = io(socket_url, {
      credentials: true,
    });
    // socket.current.emit("addUser", { id: user?._id, type: "Chat" });
    // socket.current.on("getMessage", (receiveMessage) => {
    //   // console.log(receiveMessage);
    //   if (receiveMessage?.chatId === chat?._id) {
    //     dispatch(setMessagePush(receiveMessage));
    //   }
    // });
  }, []);

  const handleRemoveFiles = () => {
    dispatch(setImages([]));
    dispatch(setVideo(null));
    dispatch(setDocument(null));
  };

  const sendMessage = async (message) => {
    const newMessage = {
      message: message,
      chatId: chat?._id,
      senderId: user?._id,
      members: [chat?.receiverInfo?._id, user?._id],
    };

    const newMessageFormData = new FormData();
    newMessageFormData.append(`message`, JSON.stringify(newMessage));

    if (images?.length > 0) {
      images.forEach((file, index) => {
        newMessageFormData.append(`images`, file);
      });
    }
    if (video) {
      newMessageFormData.append(`video`, video);
    }
    if (document) {
      newMessageFormData.append(`document`, document);
    }

    const options = {
      data: newMessageFormData,
    };
    const result = await postNewMessage(options);
    if (result) {
      const sendMessage = {
        senderId: user?._id,
        receiverId: chat?.receiverInfo?._id,
        chatId: chat?._id,
        message: message,
        createdAt: Date.now(),
        images: result?.data?.images,
        video: result?.data?.video,
        document: result?.data?.document,
      };
      socket.current.emit("sendMessage", sendMessage);
      handleRemoveFiles();
    }
  };

  const handleBack = () => {
    dispatch(setChat(null));
  };

  // console.log(messages);
  const isOnline = online_users.some(
    (user) => user?.userId === chat?.receiverInfo?._id
  );

  const handleToggle = async (chatId) => {
    const options = {
      chatId: chatId,
      data: {},
    };
    const result = await toggleAlert(options);
    if (result?.data?.success) {
      dispatch(setChatSetting({ ...result?.data?.data, chatId: chatId }));
      dispatch(setInboxChatSetting({ ...result?.data?.data, chatId: chatId }));
    }
  };

  const scrollBottomRef = useRef();
  useEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  return (
    <>
      {chat && !isLoading ? (
        <>
          <div className="flex items-center justify-between border-b p-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBack()}
                className="inline-flex hover:bg-indigo-50 rounded-full p-2"
                type="button"
              >
                {iBack}
              </button>
              <div className="flex items-center">
                <button className="flex items-center justify-center min-w-[40px] !w-[40px] h-10 rounded-full bg-blue-600 object-cover text-white text-[18px]">
                  {chat?.storeInfo?.logo || chat?.receiverInfo?.image ? (
                    <img
                      className="w-full h-full rounded-full bg-white object-cover"
                      src={viewImg(
                        chat?.storeInfo?.logo || chat?.receiverInfo?.image
                      )}
                      alt=""
                    />
                  ) : (
                    <span className="uppercase">
                      {chat?.storeInfo?.store_name?.slice(0, 1) ||
                        chat?.receiverInfo?.name?.slice(0, 1)}{" "}
                    </span>
                  )}
                </button>
                <div className="pl-2">
                  <div className="font-semibold">
                    {chat?.storeInfo ? (
                      <Link href={`/store/${chat?.storeInfo?._id}`}>
                        {chat?.receiverInfo?.name?.length > 15
                          ? chat?.receiverInfo?.name?.slice(0, 15) + "..."
                          : chat?.receiverInfo?.name}
                        <small className="lowercase">
                          {" "}
                          - {chat?.storeInfo?.store_name}
                        </small>
                      </Link>
                    ) : (
                      <Link href={`/profile/${chat?.receiverInfo?._id}`}>
                        {chat?.receiverInfo?.name?.length > 15
                          ? chat?.receiverInfo?.name?.slice(0, 15) + "..."
                          : chat?.receiverInfo?.name}
                        <small className="lowercase">
                          {" "}
                          - {chat?.receiverInfo?.company_name}
                        </small>
                      </Link>
                    )}
                  </div>
                  {isOnline ? (
                    <span className="text-pm text-xs">online</span>
                  ) : (
                    <div className="text-xs text-gray-600">
                      {fromNow(chat?.createdAt)}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Popover
              open={open ? true : false}
              handler={() => setOpen(null)}
              placement="bottom-end"
            >
              <PopoverHandler onClick={() => setOpen(chat)}>
                <button className="inline-flex hover:bg-indigo-50 rounded-full p-2">
                  {iThreeDot}
                </button>
              </PopoverHandler>
              <PopoverContent className="w-32 h-fit bg-white rounded border z-[100000000] px-2 py-1">
                <h1 className="my-2 text-black font-bold text-left">
                  Sound Alert
                </h1>

                {/* <div className="flex items-center gap-2">
                  {chat?.receiver === user?._id
                    ? chat?.settings?.receiver?.isMute
                      ? iMute
                      : iUnMute
                    : chat?.settings?.sender?.isMute
                    ? iMute
                    : iUnMute}
                  <ReactSwitch
                    checked={
                      chat?.receiver === user?._id
                        ? chat?.settings?.receiver?.isMute
                          ? true
                          : false
                        : chat?.settings?.sender?.isMute
                        ? true
                        : false
                    }
                    onChange={(value) => handleToggle(chat?.chatId)}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                    className="react-switch"
                    id="material-switch"
                  />
                </div> */}

                <Button
                  onClick={() => handleToggle(chat?._id)}
                  className="flex items-center h-10 w-full rounded bg-white text-black gap-2 hover:!bg-pm hover:!text-white shadow-none hover:shadow-none border px-1 normal-case"
                >
                  {chat?.receiver === user?._id
                    ? chat?.settings?.receiver?.isMute
                      ? iUnMute
                      : iMute
                    : chat?.settings?.sender?.isMute
                    ? iUnMute
                    : iMute}

                  <h1 className="text-xs">
                    {chat?.receiver === user?._id
                      ? chat?.settings?.receiver?.isMute
                        ? "unMute"
                        : "Mute"
                      : chat?.settings?.sender?.isMute
                      ? "unMute"
                      : "Mute"}
                  </h1>
                </Button>
              </PopoverContent>
            </Popover>
          </div>

          <div
            className={`flex-1 px-2 py-4 scrollBar overflow-y-auto scroll_off ${messageClassName}`}
          >
            {isLoading ? (
              <Loading />
            ) : (
              messages?.map((message, i) => (
                <SingleMessage key={i} message={message} chat={chat} />
              ))
            )}
            <div ref={scrollBottomRef}></div>
          </div>

          <SendMessageBox sendMessage={sendMessage} />
        </>
      ) : (
        <div className="flex justify-center items-center">
          <img
            className="w-[300px] mx-auto"
            src="https://cdni.iconscout.com/illustration/free/thumb/free-no-messages-4085820-3385489.png"
          />
        </div>
      )}
    </>
  );
};

export default MessageArea;
