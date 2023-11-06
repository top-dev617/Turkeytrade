import React, { useContext, useEffect, useRef, useState } from "react";

const HelpCenterSingleMessage = ({ message, auth }) => {
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      {auth?._id ? (
        <>
          <div
            ref={scroll}
            className="flex items-center flex-row-reverse justify-start gap-2 mb-4"
          >
            <div className="flex-none flex flex-col items-center justify-center space-y-1">
              <button className="flex items-center justify-center min-w-[40px] h-10 rounded-full bg-blue-600 object-cover text-white text-[18px]">
                <span>
                  {auth?.store_name?.slice(0, 1) || auth?.name.slice(0, 1)}
                </span>
              </button>
            </div>
            <div className="w-fit max-w-[70%] h-fit  bg-indigo-400 text-white p-2 rounded-lg relative">
              <div>Hallow</div>
              <div className="absolute -right-2 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
            </div>
          </div>

          <div ref={scroll} className="flex items-center gap-2 mb-4">
            <div className="flex-none flex flex-col items-center justify-center space-y-1">
              <button className="flex items-center justify-center min-w-[40px] h-10 rounded-full bg-blue-600 object-cover text-white text-[18px]">
                <span>H</span>
              </button>
            </div>

            <div className="w-fit max-w-[70%] h-fit bg-indigo-100 text-gray-800 p-2 rounded-lg relative">
              <div>Need Help</div>
              <div className="absolute -left-2 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"></div>
            </div>
          </div>
        </>
      ) : (
        <div ref={scroll} className="flex items-center gap-2 mb-4">
          <div className="flex-none flex flex-col items-center justify-center space-y-1">
            <button className="flex items-center justify-center min-w-[40px] h-10 rounded-full bg-blue-600 object-cover text-white text-[18px]">
              <span>Help Center</span>
            </button>
          </div>

          <div className="w-fit max-w-[70%] h-fit bg-indigo-100 text-gray-800 p-2 rounded-lg relative">
            <div>Need Help</div>
            <div className="absolute -left-2 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpCenterSingleMessage;
