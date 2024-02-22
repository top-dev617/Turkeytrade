import useViewImage from "@/lib/hooks/useViewImage";
import { iClose } from "@/utils/icons/icons";
import { Button } from "@material-tailwind/react";
import React from "react";

const ShowImage = ({ url, close, open }) => {
  const { viewImg } = useViewImage();
  return (
    <>
      {open && (
        <div className="bg-[#000000] bg-opacity-95 w-full full fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-[10000000000000000]">
          <img
            src={viewImg(url)}
            className="max-w-[1000px] h-full object-contain"
            alt=""
          />

          <div className="absolute focus:absolute top-5 right-5">
            <Button
              onClick={() => close("")}
              className=" bg-gray-200/20 text-white shadow-none w-14 h-12 p-0 flex justify-center items-center hover:bg-pm"
            >
              {iClose}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowImage;
