import { Comment } from "react-loader-spinner";
import SingleChatUser from "./SingleChatUser";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "@/redux/features/conversation/conversationSlice";
import emptyChats from "../../../assets/icons/no_chats.png";
import Image from "next/image";

const ChatSidebar = ({ chatData, isLoading }) => {
  const { chat } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();
  // console.log(chatData);

  const handleSetData = (inputChat) => {
    dispatch(setChat(inputChat));
  };

  const isLength = chatData?.some((c) => !!c.lastMessage === true);
  // console.log(isLength);
  return (
    <div className={`w-full bg-white h-screen ${chat && "hidden"}`}>
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
        <>
          {chatData?.length > 0 && isLength && (
            <ul className={`overflow-auto h-[32rem] ${chat && "hidden"}`}>
              <li>
                {chatData &&
                  chatData?.map((item, index) => (
                    <SingleChatUser
                      key={index}
                      chatData={item}
                      handleSetData={handleSetData}
                      chat={chat}
                    />
                  ))}
              </li>
            </ul>
          )}
        </>
      )}

      {!isLoading && !isLength && (
        <div className="flex flex-col justify-center items-center h-full">
          <Image src={emptyChats} className="max-w-[200px] object-contain" />
          <h1 className="font-semibold text-[#1E2024]">
            You have no messages yet
          </h1>
        </div>
      )}
    </div>
  );
};

export default ChatSidebar;
