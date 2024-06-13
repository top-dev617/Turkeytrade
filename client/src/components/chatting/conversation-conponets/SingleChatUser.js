import { AuthContext } from "@/components/context/AuthContext";
import { DATE_FORMATE } from "@/lib/constants/globalConstant";
import useGlobal from "@/lib/hooks/useGlobal";
import useLocalTime from "@/lib/hooks/useLocalTime";
import useViewImage from "@/lib/hooks/useViewImage";
import { setChat } from "@/redux/features/conversation/conversationSlice";
import { iMute } from "@/utils/icons/icons";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

const SingleChatUser = ({ chatData, handleSetData, chat }) => {
  const { inputTime } = useLocalTime();
  const { user } = useContext(AuthContext);
  const { online_users } = useSelector((state) => state.conversation);
  const { viewImg } = useViewImage();
  const { firstLatterUp } = useGlobal();

  const isOnline = online_users.some(
    (user) => user?.userId === chatData?.receiverInfo?._id
  );
  return (
    <button
      onClick={() => handleSetData(chatData)}
      className={`w-full max-h-[80px] flex items-start px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer
            ${
              chatData?._id === chat?._id
                ? "bg-blue-gray-50"
                : "hover:bg-gray-100"
            }
            
            ${!chatData?.lastMessage && "hidden"} `}
    >
      <button className="flex items-center justify-center min-w-[40px] !w-[40px] h-10 rounded-full bg-blue-600 object-cover text-white text-[18px] relative">
        {chatData?.storeInfo?.logo || chatData?.receiverInfo?.image ? (
          <img
            className="w-full h-full rounded-full bg-white object-cover"
            src={viewImg(
              chatData?.storeInfo?.logo || chatData?.receiverInfo?.image
            )}
            alt=""
          />
        ) : (
          <span className="uppercase">
            {chatData?.storeInfo?.store_name?.slice(0, 1) ||
              chatData?.receiverInfo?.name?.slice(0, 1)}{" "}
          </span>
        )}
        {isOnline && (
          <div className="h-4 w-4 rounded-full bg-green-500 absolute -right-1 bottom-0 border-[2px] border-white"></div>
        )}
      </button>

      <div className="w-full flex flex-col h-full items-start ml-2">
        <div className="flex items-center justify-between w-full gap-x-[4px]">
          <span className="font-semibold text-black flex items-center gap-1 oneLine">
            {chatData?.receiver === user?._id
              ? chatData?.settings?.receiver?.isMute && iMute
              : chatData?.settings?.sender?.isMute && iMute}
            {firstLatterUp(chatData?.receiverInfo?.name)}
          </span>
          <span className="block text-[10px] text-pm text-nowrap">
            {chatData?.lastMessage &&
              inputTime(chatData?.lastMessage?.createdAt, DATE_FORMATE)}
          </span>
        </div>

        <div className="flex justify-between items-start w-full">
          <small className="text-[10px] oneLine">
            {firstLatterUp(
              chatData?.storeInfo?.store_name ||
                chatData?.receiverInfo?.company_name
            )}
          </small>
          {chatData?.total_unseen > 0 && (
            <div className="h-fit w-fit px-1 rounded-full bg-red-500 border-[2px] border-white flex justify-center items-center">
              <small className="text-white text-xs">
                {chatData?.total_unseen}
              </small>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className="block text-xs text-black text-left oneLine break-all">
            {chatData?.lastMessage && chatData?.lastMessage?.message}
          </span>
        </div>
      </div>
    </button>
  );
};

export default SingleChatUser;

// {lastMessage && moment(chatData?.lastConversationTime).fromNow()}
