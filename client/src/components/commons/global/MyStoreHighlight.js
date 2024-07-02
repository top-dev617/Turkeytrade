import React from "react";
import Lottie from "react-lottie";
import * as animationData from "../../../assets/animations/upArrow.json";

const MyStoreHighlight = ({ open = true }) => {
  return (
    open && (
      <>
        <div className="rotate-[230deg] max-w-[40px] mx-auto">
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
        <p className="font-inter text-[20px] text-black normal-case font-bold text-nowrap text-center">
          Launch Mystore
        </p>
      </>
    )
  );
};

export default MyStoreHighlight;
