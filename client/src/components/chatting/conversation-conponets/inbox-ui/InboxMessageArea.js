import { iBack, iMute, iThreeDot, iUnMute } from "@/utils/icons/icons";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import SendMessageBox from "../SendMessageBox";
import { useDispatch, useSelector } from "react-redux";
import {
  setChatSeen,
  setChatSetting,
  setDocument,
  setImages,
  setInboxChat,
  setInboxChatSetting,
  setInboxLastMessages,
  setInboxMessagePush,
  setInboxMessages,
  setLastMessages,
  setMessagePush,
  setMessages,
  setVideo,
} from "@/redux/features/conversation/conversationSlice";
import useLocalTime from "@/lib/hooks/useLocalTime";
import useViewImage from "@/lib/hooks/useViewImage";
import {
  useGetGlobalChatMessagesQuery,
  usePostNewMessageMutation,
  useSeenAllMessagesByChatMutation,
  useToggleAlertMutation,
} from "@/redux/features/conversation/conversationApi";
import { AuthContext } from "@/components/context/AuthContext";
import Link from "next/link";

import SingleMessage from "../SingleMessage";
import Loading from "@/components/commons/Loading";
import useGlobal from "@/lib/hooks/useGlobal";
import { SocketContext } from "@/components/context/SocketContext";

const InboxMessageArea = () => {
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { inboxChat, online_users, inboxMessages, images, video, document } =
    useSelector((state) => state.conversation);
  const [toggleAlert] = useToggleAlertMutation();
  const { data, refetch, isLoading } = useGetGlobalChatMessagesQuery(
    inboxChat?._id
  );
  const [postNewMessage] = usePostNewMessageMutation();
  const [seenAllMessagesByChat] = useSeenAllMessagesByChatMutation();
  const dispatch = useDispatch();
  const { viewImg } = useViewImage();
  const { fromNow } = useLocalTime();
  const { firstLatterUp } = useGlobal();

  const handleBack = () => {
    dispatch(setInboxChat(null));
  };

  const [open, setOpen] = useState(null);

  const handleSeenAll = async () => {
    const options = {
      data: { chatId: inboxChat?._id },
    };
    const result = await seenAllMessagesByChat(options);
    // console.log(result);
  };

  useEffect(() => {
    handleSeenAll();
    dispatch(setChatSeen({ userId: user?._id, chatId: inboxChat?._id }));
    return () => {};
  }, [inboxChat, inboxMessages]);

  useEffect(() => {
    refetch();
    return () => {};
  }, [inboxChat]);

  useEffect(() => {
    dispatch(setInboxMessages(data));

    return () => {};
  }, [data]);

  const handleRemoveFiles = () => {
    dispatch(setImages([]));
    dispatch(setVideo(null));
    dispatch(setDocument(null));
  };

  const someAction = (msg) => {
    dispatch(setMessagePush(msg));
    dispatch(setInboxMessagePush(msg));
    dispatch(setLastMessages(msg));
    // dispatch(setInboxLastMessages(msg));
  };

  const sendMessage = async (message) => {
    const newMessage = {
      message: message,
      chatId: inboxChat?._id,
      senderId: user?._id,
      members: [inboxChat?.receiverInfo?._id, user?._id],
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
        receiverId: inboxChat?.receiverInfo?._id,
        chatId: inboxChat?._id,
        message: message,
        createdAt: Date.now(),
        images: result?.data?.images,
        video: result?.data?.video,
        document: result?.data?.document,
        members: [inboxChat?.receiverInfo?._id, user?._id],
      };
      someAction(sendMessage);
      socket.current.emit("sendMessage", sendMessage);
      handleRemoveFiles();
    }
  };

  // console.log(messages);
  const isOnline = online_users.some(
    (user) => user?.userId === inboxChat?.receiverInfo?._id
  );

  const handleToggle = async (chatId) => {
    const options = {
      chatId: chatId,
      data: {},
    };
    const result = await toggleAlert(options);
    if (result?.data?.success) {
      // dispatch(setInboxChatSetting({ ...result?.data?.data, chatId: chatId }));
      dispatch(setChatSetting({ ...result?.data?.data, chatId: chatId }));
    }
  };

  const scrollBottomRef = useRef();
  useEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [inboxChat]);

  return (
    <>
      {inboxChat && !isLoading ? (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex items-center justify-between border-b p-2 bg-blue-gray-50">
            <div className="flex items-center gap-2 ">
              <button
                onClick={() => handleBack()}
                className="inline-flex hover:bg-indigo-50 rounded-full p-2"
                type="button"
              >
                {iBack}
              </button>
              <div className="flex items-center">
                <button className="flex items-center justify-center min-w-[40px] !w-[40px] h-10 rounded-full bg-blue-600 object-cover text-white text-[18px]">
                  {inboxChat?.storeInfo?.logo ||
                  inboxChat?.receiverInfo?.image ? (
                    <img
                      className="w-full h-full rounded-full bg-white object-cover"
                      src={viewImg(
                        inboxChat?.storeInfo?.logo ||
                          inboxChat?.receiverInfo?.image
                      )}
                      alt=""
                    />
                  ) : (
                    <span className="uppercase">
                      {inboxChat?.storeInfo?.store_name?.slice(0, 1) ||
                        inboxChat?.receiverInfo?.name?.slice(0, 1)}{" "}
                    </span>
                  )}
                </button>

                <div className="pl-2 cursor-pointer">
                  <small className="font-semibold text-[14px] p-0 m-0 block leading-[10px]">
                    {firstLatterUp(
                      inboxChat?.receiverInfo?.name?.length > 15
                        ? inboxChat?.receiverInfo?.name?.slice(0, 15) + "..."
                        : inboxChat?.receiverInfo?.name
                    )}
                  </small>
                  <>
                    {inboxChat?.storeInfo ? (
                      <Link
                        className="text-[11px] p-0 m-0"
                        href={`/store/${inboxChat?.storeInfo?._id}`}
                      >
                        {firstLatterUp(inboxChat?.storeInfo?.store_name)}
                      </Link>
                    ) : (
                      <Link
                        className="text-[11px] p-0 m-0"
                        href={`/profile/${inboxChat?.receiverInfo?._id}`}
                      >
                        {firstLatterUp(inboxChat?.receiverInfo?.company_name)}
                      </Link>
                    )}
                  </>
                  {isOnline ? (
                    <span className="text-pm text-xs block">online</span>
                  ) : (
                    <span className="text-xs text-gray-600 block">
                      {fromNow(
                        inboxChat?.receiver === user?._id
                          ? inboxChat?.settings?.sender?.last_active
                          : inboxChat?.settings?.receiver?.last_active
                      )}
                    </span>
                  )}
                </div>
                {/* <div className="pl-2">
                  <div className="font-semibold">
                    {inboxChat?.storeInfo ? (
                      <Link href={`/store/${inboxChat?.storeInfo?._id}`}>
                        {inboxChat?.receiverInfo?.name?.length > 15
                          ? inboxChat?.receiverInfo?.name?.slice(0, 15) + "..."
                          : inboxChat?.receiverInfo?.name}
                        <small className="lowercase">
                          {" "}
                          - {inboxChat?.storeInfo?.store_name}
                        </small>
                      </Link>
                    ) : (
                      <Link href={`/profile/${inboxChat?.receiverInfo?._id}`}>
                        {inboxChat?.receiverInfo?.name?.length > 15
                          ? inboxChat?.receiverInfo?.name?.slice(0, 15) + "..."
                          : inboxChat?.receiverInfo?.name}
                        <small className="lowercase">
                          {" "}
                          - {inboxChat?.receiverInfo?.company_name}
                        </small>
                      </Link>
                    )}
                  </div>
                  {isOnline ? (
                    <span className="text-pm text-xs">online</span>
                  ) : (
                    <div className="text-xs text-gray-600">
                      {fromNow(inboxChat?.createdAt)}
                    </div>
                  )}
                </div> */}
              </div>
            </div>
            <Popover
              open={open ? true : false}
              handler={() => setOpen(null)}
              placement="bottom-end"
            >
              <PopoverHandler onClick={() => setOpen(inboxChat)}>
                <button className="inline-flex hover:bg-indigo-50 rounded-full p-2">
                  {iThreeDot}
                </button>
              </PopoverHandler>
              <PopoverContent className="w-32 h-fit bg-white rounded border z-[100000000] px-2 py-1">
                <h1 className="my-2 text-black font-bold text-left">
                  Sound Alert
                </h1>

                <Button
                  onClick={() => handleToggle(inboxChat?._id)}
                  className="flex items-center h-10 w-full rounded bg-white text-black gap-2 hover:!bg-pm hover:!text-white shadow-none hover:shadow-none border px-1 normal-case"
                >
                  {inboxChat?.receiver === user?._id
                    ? inboxChat?.settings?.receiver?.isMute
                      ? iUnMute
                      : iMute
                    : inboxChat?.settings?.sender?.isMute
                    ? iUnMute
                    : iMute}

                  <h1 className="text-xs">
                    {inboxChat?.receiver === user?._id
                      ? inboxChat?.settings?.receiver?.isMute
                        ? "unMute"
                        : "Mute"
                      : inboxChat?.settings?.sender?.isMute
                      ? "unMute"
                      : "Mute"}
                  </h1>
                </Button>
              </PopoverContent>
            </Popover>
          </div>
          <div
            className={`flex-grow px-2 scrollBar overflow-y-auto scroll_off bg-gray-50/90`}
            style={{
              backgroundImage: `url("https://t3.ftcdn.net/jpg/03/27/51/56/360_F_327515607_Hcps04aaEc7Ki43d1XZPxwcv0ZaIaorh.jpg")`,
              backgroundBlendMode: "soft-light",
            }}
          >
            {isLoading ? (
              <Loading />
            ) : (
              inboxMessages?.map((message, i) => (
                <SingleMessage key={i} message={message} chat={inboxChat} />
              ))
            )}
            <div ref={scrollBottomRef}></div>
          </div>

          <SendMessageBox sendMessage={sendMessage} />
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <img
            className="w-[300px] mx-auto"
            src="https://cdni.iconscout.com/illustration/free/thumb/free-no-messages-4085820-3385489.png"
          />
        </div>
      )}
    </>
  );
};

export default InboxMessageArea;
