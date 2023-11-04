import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import sms from "../../../public/assets/sms.png";
import Chatting from "./Chatting";
import { useRouter } from "next/router";

const ChatMain = () => {
  const { user, msgOpen, setMsgOpen } = useContext(AuthContext);
  const router = useRouter();
  const handleMsg = () => {
    if (!user?._id) {
      router.push("/signin");
      return;
    }
    setMsgOpen(!msgOpen);
  };

  return (
    <div>
      {msgOpen && <Chatting user={user} setMsgOpen={setMsgOpen} />}

      <div className="sms_btn text-end mt-4 mt-lg-0">
        <button onClick={() => handleMsg()}>
          <img src={sms.src} alt="" /> Messages
        </button>
      </div>
    </div>
  );
};

export default ChatMain;
