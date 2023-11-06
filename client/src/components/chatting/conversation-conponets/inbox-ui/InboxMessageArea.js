import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setInboxChatId,
  setInboxReceiverData,
} from "@/redux/features/conversation/conversationSlice";
import {
  useGetMessagesQuery,
  usePostNewMessageMutation,
} from "@/redux/features/conversation/conversationApi";
import moment from "moment";
import Loading from "@/components/commons/Loading";
import SendMessageBox from "../SendMessageBox";
import InboxSingleMessage from "./InboxSingleMessage";

const InboxMessageArea = ({ auth, messageClassName }) => {
  const { inboxReceiverData, inboxChatId } = useSelector(
    (state) => state.conversation
  );
  const {
    data: messages,
    refetch,
    isLoading,
  } = useGetMessagesQuery(inboxChatId);
  const [postNewMessage] = usePostNewMessageMutation();
  const dispatch = useDispatch();

  const sendMessage = async (message) => {
    const newMessage = {
      text: message,
      storeId: inboxReceiverData?._id,
      chatId: inboxChatId,
      senderId: auth?._id,
      members: [inboxReceiverData?._id, auth?._id],
      productId: "",
    };

    const options = {
      data: newMessage,
    };
    const result = await postNewMessage(options);
  };

  const handleBack = () => {
    dispatch(setInboxReceiverData(null));
    dispatch(setInboxChatId(""));
  };

  const lastMessage = messages?.length > 0 && messages[messages?.length - 1];

  return (
    <>
      {inboxChatId && !isLoading ? (
        <>
          <div className="flex items-center justify-between border-b p-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBack()}
                className="inline-flex hover:bg-indigo-50 rounded-full p-2"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="currentColor"
                  className="w-5 h-5 hover:text-pm"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>
              </button>
              <div className="flex items-center">
                <button className="flex items-center justify-center min-w-[40px] h-10 rounded-full bg-blue-600 object-cover text-white text-[18px]">
                  <span>
                    {inboxReceiverData?.name?.slice(0, 1) ||
                      inboxReceiverData?.store_name?.slice(0, 1)}{" "}
                  </span>
                </button>
                <div className="pl-2">
                  <div className="font-semibold">
                    {inboxReceiverData?.name ? (
                      <p>
                        {(
                          inboxReceiverData?.name ||
                          inboxReceiverData?.store_name
                        )?.length > 12
                          ? (
                              inboxReceiverData?.name ||
                              inboxReceiverData?.store_name
                            ).slice(0, 12) + "..."
                          : inboxReceiverData?.name ||
                            inboxReceiverData?.store_name}
                      </p>
                    ) : (
                      <Link
                        href={`/store/${
                          inboxReceiverData?._id || inboxReceiverData?._id
                        }`}
                        className="hover:underline"
                      >
                        {(
                          inboxReceiverData?.name ||
                          inboxReceiverData?.store_name
                        )?.length > 12
                          ? (
                              inboxReceiverData?.name ||
                              inboxReceiverData?.store_name
                            ).slice(0, 12) + "..."
                          : inboxReceiverData?.name ||
                            inboxReceiverData?.store_name}
                      </Link>
                    )}
                  </div>
                  <div className="text-xs text-gray-600">
                    {moment(lastMessage?.createdAt).fromNow()}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button className="inline-flex hover:bg-indigo-50 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            className={`flex-1 px-4 py-4 scrollBar overflow-y-auto ${messageClassName}`}
          >
            {isLoading ? (
              <Loading />
            ) : (
              messages?.map((message, i) => (
                <InboxSingleMessage
                  key={i}
                  message={message}
                  auth={auth}
                  receiverData={inboxReceiverData}
                />
              ))
            )}
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

export default InboxMessageArea;
