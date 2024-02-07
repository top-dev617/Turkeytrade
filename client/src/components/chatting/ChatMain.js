import React, { useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import sms from "../../../public/assets/sms.png";
import Chatting from "./Chatting";
import { useRouter } from "next/router";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useTotalUnseenQuery } from "@/redux/features/conversation/conversationApi";

const ChatMain = () => {
  const { data } = useTotalUnseenQuery();
  const { user, msgOpen, setMsgOpen, msgRef } = useContext(AuthContext);

  const router = useRouter();
  const handleMsg = () => {
    if (!user?._id) {
      router.push("/signin");
      return;
    }
    setMsgOpen(!msgOpen);
  };

  const hn = () => {
    setMsgOpen(false);
  };

  // console.log(data);
  return (
    <>
      <Popover open={msgOpen} handler={() => hn()}>
        <PopoverContent className="p-0">
          {msgOpen && <Chatting />}
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
    </>
  );
};

export default ChatMain;
