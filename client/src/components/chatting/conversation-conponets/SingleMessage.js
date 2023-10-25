import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const SingleMessage = ({ message, auth }) => {
  const { receiverData } = useSelector((state) => state.conversation);

  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      {message?.members[1] === auth?._id ? (
        <div
          ref={scroll}
          class="flex items-center flex-row-reverse justify-start gap-2 mb-4"
        >
          <div class="flex-none flex flex-col items-center justify-center space-y-1">
            <button className="flex items-center justify-center min-w-[40px] h-10 rounded-full bg-blue-600 object-cover text-white text-[18px]">
              <span>
                {auth?.name?.slice(0, 1) || auth?.store_name?.slice(0, 1)}
              </span>
            </button>
          </div>
          <div class="w-fit max-w-[70%] h-fit  bg-indigo-400 text-white p-2 rounded-lg relative">
            {/* {
                            message?.productId && (
                                <div>
                                    <img className='w-44 h-20 object-cover' src={product?.images[0]} alt="" />
                                </div>
                            )
                        } */}

            <div>{message?.text}</div>
            <div class="absolute -right-2 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
          </div>
        </div>
      ) : (
        <div ref={scroll} class="flex items-center gap-2 mb-4">
          <div class="flex-none flex flex-col items-center justify-center space-y-1">
            <button className="flex items-center justify-center min-w-[40px] h-10 rounded-full bg-blue-600 object-cover text-white text-[18px]">
              <span>
                {receiverData?.name?.slice(0, 1) ||
                  receiverData?.store_name?.slice(0, 1)}{" "}
              </span>
            </button>
          </div>

          <div class="w-fit max-w-[70%] h-fit bg-indigo-100 text-gray-800 p-2 rounded-lg relative">
            {/* {
                                message?.productId && (
                                    <div>
                                        <img className='w-44 h-20 object-cover' src={product?.images[0]} alt="" />
                                    </div>
                                )
                            } */}

            <div>{message?.text}</div>

            <div class="absolute -left-2 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleMessage;
