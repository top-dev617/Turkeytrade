import React, { useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import sms from "../../../public/assets/sms.png";
import Chatting from "./Chatting";
import { useRouter } from "next/router";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

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

  useOnClickOutside(chatCloseRef, () => handleClose());

  return (
    <div ref={chatCloseRef} className="">
      {msgOpen && <Chatting user={user} setMsgOpen={setMsgOpen} />}

      <div className="sms_btn text-end mt-4 mt-lg-0 hidden md:block">
        <button onClick={() => handleMsg()}>
          <img src={sms.src} alt="" /> Messages
        </button>
      </div>
    </div>
  );
};

export default ChatMain;
