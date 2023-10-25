import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "@/components/context/AuthContext";
import { useGetChatDataQuery } from "@/redux/features/conversation/conversationApi";
import HelpCenterMessageArea from "@/components/chatting/conversation-conponets/HelpCenterMessageArea";
import ChatSidebar from "@/components/chatting/conversation-conponets/ChatSidebar";
import MessageArea from "@/components/chatting/conversation-conponets/MessageArea";
import { useGetStoreInfoBySellerIdQuery } from "@/redux/features/stores/storeApi";

const InboxPage = () => {
  const { user, setMsgOpen } = useContext(AuthContext);
  const { data: storeData } = useGetStoreInfoBySellerIdQuery(user?._id);
  const { receiverData, chatId, openHelpCenter } = useSelector(
    (state) => state.conversation
  );
  const { data, refetch, isLoading } = useGetChatDataQuery(
    storeData?.data?._id
  );
  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
  }, [storeData]);

  return (
    <div className="container mx-auto flex justify-between gap-2 h-full max-h-[90%] w-full">
      <div className="lg:w-[350px] w-full h-full">
        <ChatSidebar chatData={data} isLoading={isLoading} type={"Store"} />
      </div>
      <div className="flex-grow h-full mt-6 bg-white border rounded-md hidden lg:block">
        {openHelpCenter ? (
          <>
            <HelpCenterMessageArea auth={storeData?.data} />
          </>
        ) : (
          <>
            {chatId && receiverData && (
              <MessageArea
                chatId={chatId}
                auth={storeData?.data}
                messageClassName="min-h-[500px]"
              />
            )}
          </>
        )}
        {!openHelpCenter && !chatId && !receiverData && (
          <div className="flex justify-center items-center w-full min-h-screen">
            <p className="text-center h-full">Welcome</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxPage;
