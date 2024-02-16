import React, { useEffect, useMemo, useState } from "react";
import SingleChatUser from "../SingleChatUser";
import { useGetChatDataQuery } from "@/redux/features/conversation/conversationApi";
import { Comment } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  setInboxChat,
  setInboxChats,
} from "@/redux/features/conversation/conversationSlice";

const InboxChatSidebar = () => {
  const { data, isLoading } = useGetChatDataQuery();
  const { inboxChats, inboxChat, chats } = useSelector(
    (state) => state.conversation
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  useMemo(() => {
    if (data && data?.length > 0) {
      dispatch(setInboxChats(data));
    }
  }, [data]);

  const handleSetData = (inputChat) => {
    dispatch(setInboxChat(inputChat));
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 626) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className={`border-x min-w-[300px] max-w-[300px] h-full bg-gray-100 ${
        open || !inboxChat ? "block" : "hidden"
      }`}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Comment
            visible={true}
            height="60"
            width="60"
            ariaLabel="comment-loading"
            wrapperStyle={{}}
            wrapperClass="comment-wrapper"
            color="#fff"
            backgroundColor="#037d41"
          />
        </div>
      ) : (
        <ul className={`overflow-y-auto h-full`}>
          <li>
            {chats &&
              chats?.map((item, index) => (
                <SingleChatUser
                  key={index}
                  chatData={item}
                  handleSetData={handleSetData}
                  chat={inboxChat}
                />
              ))}
          </li>
        </ul>
      )}
    </div>
  );
};

export default InboxChatSidebar;
