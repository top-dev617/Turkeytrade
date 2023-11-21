import React, { useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import sms from "../../../public/assets/sms.png";
import Chatting from "./Chatting";
import { useRouter } from "next/router";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";

const ChatMain = () => {
  const { user, msgOpen, setMsgOpen } = useContext(AuthContext);
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

  return (
    <>
      {!router.pathname.includes("/dashboard") && (
        <Popover open={msgOpen} handler={() => setMsgOpen(false)}>
          <PopoverContent className="p-0">
            {msgOpen && <Chatting user={user} setMsgOpen={setMsgOpen} />}
          </PopoverContent>
          <PopoverHandler onClick={() => handleMsg()}>
            <div className="sms_btn text-end mt-4 mt-lg-0 hidden md:block">
              <button>
                <img src={sms.src} alt="" /> Messages
              </button>
            </div>
          </PopoverHandler>
        </Popover>
      )}
    </>
  );
};

export default ChatMain;
