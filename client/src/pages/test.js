import { base_url } from "@/utils/auth/global";
import { iStep1Active, iStep4 } from "@/utils/icons/icons";
import React, { useRef, useState } from "react";
const Test = () => {
  const playNtf = async () => {
    const audio = document.createElement("audio");
    audio.setAttribute("src", `${base_url}/notification`);
    await audio.play();
  };
  return (
    <>
      <div>
        <button onClick={playNtf}>Trigger Notification</button>
      </div>
      <div className="bg-!black">
        <div>{iStep1Active}</div>
      </div>
    </>
  );
};

export default Test;
