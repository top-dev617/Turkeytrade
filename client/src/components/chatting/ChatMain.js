import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import sms from "../../../public/assets/sms.png";
import Chatting from "./Chatting";
import { useRouter } from "next/router";

const ChatMain = () => {
  const { user } = useContext(AuthContext);
  const { msgOpen, setMsgOpen } = useContext(AuthContext);

  const router = useRouter();
  const handleMsg = () => {
    if (!user?._id) {
      router.push("/signin");
      return;
    }
    setMsgOpen(!msgOpen);
  };

  console.log(router);

  return (
    <>
      {!router?.asPath.includes("/inbox") && (
        <div>
          {msgOpen && <Chatting />}

          <div className="sms_btn text-end mt-4 mt-lg-0">
            <button onClick={() => handleMsg()}>
              <img src={sms.src} alt="" /> Messages
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatMain;
