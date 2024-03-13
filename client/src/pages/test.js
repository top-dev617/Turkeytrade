import { playNtf } from "@/lib/services/globalService";
import React, { useEffect, useState } from "react";

const NotificationExample = () => {
  const [time, setTime] = useState("");
  const [format, setFormate] = useState(null);

  function is24HourFormat() {
    const d = new Date();
    const formattedTime = d.toLocaleTimeString();
    setTime(formattedTime);
    const is24 = !formattedTime.includes("AM") && !formattedTime.includes("PM");
    setFormate(is24);
  }

  useEffect(() => {
    is24HourFormat();
  }, []);

  // const processImage = (imageFile) => {
  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     console.log(event.target.result);
  //     setImageDataURL(event.target.result);
  //   };
  //   reader.readAsDataURL(imageFile);
  // };

  return (
    <div>
      {time && (
        <p>
          is 24 Hour Format:{" "}
          <div className="bg-red-100 w-fit rounded-md inline p-1">
            {format ? "True" : "False"}
          </div>{" "}
          = {time}
        </p>
      )}

      <button onClick={() => playNtf()}>Play</button>
    </div>
  );
};

export default NotificationExample;
