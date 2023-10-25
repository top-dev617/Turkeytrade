import { Comment } from "react-loader-spinner";
import SingleChatUser from "./SingleChatUser";
import img from "../../../../public/assets/help-center.png";
import { useDispatch } from "react-redux";
import {
  handelClosePopup,
  setChatId,
  setOpenHelpCenter,
  setReceiverData,
} from "@/redux/features/conversation/conversationSlice";

const ChatSidebar = ({ chatData, isLoading, type }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full bg-white h-screen">
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
          <ul className="overflow-auto h-[32rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
            <li>
              <button
                onClick={() => {
                  dispatch(setOpenHelpCenter(true));
                  dispatch(setChatId(""));
                  dispatch(setReceiverData(null));
                }}
                className={`w-full flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer
                bg-pm`}
              >
                <button className="flex items-center justify-center min-w-[40px] h-10 rounded-full bg-blue-600 object-cover text-white text-[18px]">
                  <img
                    src={img.src}
                    className="w-full h-full rounded-full"
                    alt=""
                  />
                </button>

                <div className="w-full flex flex-col">
                  <div className="flex justify-between">
                    <span className="ml-2 font-semibold text-white">
                      Help Center
                    </span>
                    <span className="block ml-2 text-sm text-white">
                      {/* {moment(chatData?.lastConversationTime).fromNow()} */}
                    </span>
                  </div>
                  <span className="block ml-2 text-sm text-white text-left">
                    {/* {chatData?.lastMessage} */}...
                  </span>
                </div>
              </button>
              {chatData &&
                chatData?.map((chatId) => (
                  <SingleChatUser chatData={chatId} type={type} />
                ))}
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default ChatSidebar;
