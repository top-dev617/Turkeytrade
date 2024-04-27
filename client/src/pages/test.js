import { iStep1Active, iStep4 } from "@/utils/icons/icons";
import React, { useRef, useState } from "react";
const Test = () => {
  const playNtf = async () => {
    const audio = document.createElement("audio");
    audio.setAttribute(
      "src",
      "https://proxy.notificationsounds.com/message-tones/relax-message-tone/download/file-sounds-1217-relax.mp3"
    );
    document.body.appendChild(audio); // Append the audio element to the DOM
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
