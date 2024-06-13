import React, { useContext, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendMessageBox from "./SendMessageBox";
import SingleMessage from "./SingleMessage";
import {
  setChat,
  setChatSeen,
  setChatSetting,
  setDocument,
  setImages,
  setInboxMessagePush,
  setLastMessages,
  setMessagePush,
  setMessages,
  setProductChat,
  setVideo,
} from "@/redux/features/conversation/conversationSlice";
import {
  useGetGlobalChatMessagesQuery,
  usePostNewMessageMutation,
  useSeenAllMessagesByChatMutation,
  useToggleAlertMutation,
} from "@/redux/features/conversation/conversationApi";
import Link from "next/link";
import Loading from "@/components/commons/Loading";
import { useRef } from "react";
import { useEffect } from "react";
import { iBack, iMute, iThreeDot, iUnMute } from "@/utils/icons/icons";
import useViewImage from "@/lib/hooks/useViewImage";
import { AuthContext } from "@/components/context/AuthContext";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Spinner,
} from "@material-tailwind/react";
import useLocalTime from "@/lib/hooks/useLocalTime";
import useGlobal from "@/lib/hooks/useGlobal";
import { SocketContext } from "@/components/context/SocketContext";

const MessageArea = ({ messageClassName }) => {
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { chat, online_users, messages, images, video, document, productChat } =
    useSelector((state) => state.conversation);
  const [toggleAlert] = useToggleAlertMutation();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const { data, refetch, isLoading } = useGetGlobalChatMessagesQuery({
    chatId: chat?._id,
    page: page,
  });
  const [postNewMessage] = usePostNewMessageMutation();
  const [seenAllMessagesByChat] = useSeenAllMessagesByChatMutation();
  const dispatch = useDispatch();
  const { viewImg } = useViewImage();
  const { fromNow } = useLocalTime();
  const { firstLatterUp } = useGlobal();

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
    dispatch(setChatSeen({ userId: user?._id, chatId: chat?._id }));
    return () => {};
  }, [chat, messages]);

  useEffect(() => {
    refetch();
    return () => {};
  }, [chat]);

  useMemo(() => {
    if (chat?._id) {
      setTotal(1);
      setPage(1);
    }
  }, [chat?._id]);

  useEffect(() => {
    if (data?.data?.messages?.length > 0) {
      if (data?.data?.page === 1) {
        dispatch(setMessages(data?.data?.messages));
        setTotal(data?.data?.total);
      } else {
        dispatch(setMessages([...data.data.messages, ...messages]));
      }
    }
    setLoadMore(false);
    return () => {};
  }, [data]);

  const handleRemoveFiles = () => {
    dispatch(setImages([]));
    dispatch(setVideo(null));
    dispatch(setDocument(null));
    dispatch(setProductChat(null));
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
      chatId: chat?._id,
      senderId: user?._id,
      members: [chat?.receiverInfo?._id, user?._id],
    };
    if (productChat?._id) {
      newMessage["product"] = productChat?._id;
    }

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
        product: result?.data?.product,
        members: [chat?.receiverInfo?._id, user?._id],
      };
      someAction(sendMessage);
      socket.current.emit("sendMessage", sendMessage);
      handleRemoveFiles();
    }
  };

  const handleBack = () => {
    dispatch(setChat(null));
    dispatch(setProductChat(null));
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
      // dispatch(setInboxChatSetting({ ...result?.data?.data, chatId: chatId }));
    }
  };

  const scrollBottomRef = useRef();
  useEffect(() => {
    if (!loadMore) {
      if (scrollBottomRef.current) {
        scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
        scrollBottomRef.current.scrollTop =
          scrollBottomRef.current.scrollHeight;
      }
    }
  }, [chat, messages]);

  const loadMoreMessages = async () => {
    setLoadMore(true);
    setPage(page + 1);
  };

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
                        chat?.receiverInfo?.name?.slice(0, 1)}
                    </span>
                  )}
                </button>
                <div className="pl-2 cursor-pointer">
                  <small className="font-semibold p-0 m-0 block leading-[10px] oneLine mb-1">
                    {firstLatterUp(chat?.receiverInfo?.name)}
                  </small>
                  <>
                    {chat?.storeInfo?.store_name ? (
                      <Link
                        className="text-[10px] p-0 m-0 text-pm underline oneLine"
                        href={`/store/${chat?.storeInfo?._id}`}
                      >
                        {chat?.storeInfo?.store_name}
                      </Link>
                    ) : (
                      <Link
                        className="text-[10px] p-0 m-0 text-pm underline oneLine"
                        href={`/profile/${chat?.receiverInfo?._id}`}
                      >
                        {chat?.receiverInfo?.company_name}
                      </Link>
                    )}
                  </>
                  {isOnline ? (
                    <span className="text-pm text-xs block">online</span>
                  ) : (
                    <span className="text-xs text-gray-600 block">
                      {fromNow(
                        chat?.receiver === user?._id
                          ? chat?.settings?.sender?.last_active
                          : chat?.settings?.receiver?.last_active
                      )}
                    </span>
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
            ref={scrollBottomRef}
            className={`flex-1 px-2 py-4 scrollBar overflow-y-auto scroll_off bg-gray-50/90 ${messageClassName}`}
            style={{
              backgroundImage: `url("https://t3.ftcdn.net/jpg/03/27/51/56/360_F_327515607_Hcps04aaEc7Ki43d1XZPxwcv0ZaIaorh.jpg")`,
              backgroundBlendMode: "soft-light",
            }}
          >
            {total - page * 50 > 0 && (
              <div className="flex justify-center">
                <button
                  onClick={() => loadMoreMessages()}
                  className="min-w-[80px] max-w-fit h-[35px] bg-pm hover:bg-pmd text-white rounded-md text-xs mx-auto my-1 flex items-center justify-center gap-2 px-2"
                >
                  {loadMore && <Spinner color="white" />} Load More
                </button>
              </div>
            )}
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
