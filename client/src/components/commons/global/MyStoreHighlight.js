import React from "react";
import Lottie from "react-lottie";
import * as animationData from "../../../assets/animations/upArrow.json";

const MyStoreHighlight = ({ open = true }) => {
  return (
    open && (
      <div className="tdisabled max-w-[100px] w-full bg-transparent absolute -left-16 top-5 z-[999999]">
        <div className="rotate-[230deg] max-w-[80px]">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
          />
        </div>
        <p className="font-inter text-[20px] text-black normal-case font-bold text-nowrap">
          Launch Mystore
        </p>
      </div>
    )
  );
};

export default MyStoreHighlight;
