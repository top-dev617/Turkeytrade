import { base_url } from "@/utils/auth/global";
import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";

const SingleMessageSingleImage = ({ images, img, setOpen }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div
      className={`relative overflow-hidden  bg-pmd
      ${
        images?.length < 2
          ? "max-w-[200px] max-h-[200px] w-full h-full"
          : "w-[100px] h-[100px]"
      }`}
    >
      <img
        onClick={() => setOpen(img)}
        className={`w-full h-full object-contain`}
        src={`${base_url}/uploads/${img}`}
        onLoad={() => setIsLoading(false)}
        alt="image"
      />
      {isLoading && (
        <div
          className={`absolute w-full h-full top-0 flex justify-center items-center backdrop-blur ${
            images.length < 2 ? "w-[200px] h-[200px]" : "w-[100px] h-[100px]"
          }`}
        >
          <RotatingLines
            visible={true}
            height="70"
            width="70"
            strokeWidth="2"
            strokeColor="white"
            animationDuration="0.80"
          />
        </div>
      )}
    </div>
  );
};

export default SingleMessageSingleImage;
