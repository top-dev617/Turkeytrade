import { Comment } from "react-loader-spinner";
import SingleChatUser from "./SingleChatUser";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "@/redux/features/conversation/conversationSlice";

const ChatSidebar = ({ chatData, isLoading }) => {
  const { chat } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();
  // console.log(chatData);

  const handleSetData = (inputChat) => {
    dispatch(setChat(inputChat));
  };
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
        </>
      )}
    </div>
  );
};

export default ChatSidebar;
