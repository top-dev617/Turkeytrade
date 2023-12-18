import React, { useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import sms from "../../../public/assets/sms.png";
import Chatting from "./Chatting";
import { useRouter } from "next/router";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import {
  Badge,
  IconButton,
  Menu,
  MenuHandler,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useTotalUnseenQuery } from "@/redux/features/conversation/conversationApi";

const ChatMain = () => {
  const { data } = useTotalUnseenQuery();
  const { user, msgOpen, setMsgOpen, msgRef } = useContext(AuthContext);
  const { totalNotifications, notifications, messages } = useSelector(
    (state) => state.conversation
  );
  const router = useRouter();
  const chatCloseRef = useRef();
  const handleMsg = () => {
    if (!user?._id) {
      router.push("/signin");
      return;
    }
    setMsgOpen(!msgOpen);
  };

  const handleClose = () => {
    if (msgOpen) {
      setMsgOpen(!msgOpen);
    }
  };

  const hn = () => {
    setMsgOpen(false);
  };

  // console.log(data);
  return (
    <>
      {!router.pathname.includes("/dashboard") && (
        <Popover open={msgOpen} handler={() => hn()}>
          <PopoverContent className="p-0">
            {msgOpen && <Chatting user={user} setMsgOpen={setMsgOpen} />}
          </PopoverContent>
          <PopoverHandler onClick={() => handleMsg()}>
            <div className="sms_btn text-end mt-4 mt-lg-0 hidden md:block">
              <button>
                <img src={sms.src} alt="" />
                <p className="">
                  Messages{" "}
                  <span className="text-red-600 font-semibold">
                    ({data || 0})
                  </span>{" "}
                </p>
              </button>
            </div>
          </PopoverHandler>
        </Popover>
      )}
    </>
  );
};

export default ChatMain;
