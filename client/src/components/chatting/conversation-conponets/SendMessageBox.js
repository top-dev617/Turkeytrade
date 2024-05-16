import DocumentInput from "@/components/commons/conversations/DocumentInput";
import EmojiInput from "@/components/commons/conversations/EmojiInput";
import ImageInput from "@/components/commons/conversations/ImageInput";
import VideoInput from "@/components/commons/conversations/VideoInput";
import { setProductChat } from "@/redux/features/conversation/conversationSlice";
import { base_url } from "@/utils/auth/global";
import { iCloseProductChat } from "@/utils/datas/icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const SendMessageBox = ({ sendMessage }) => {
  const { productChat } = useSelector((state) => state.conversation);
  const { handleSubmit, register, reset, setValue, watch, setFocus } =
    useForm();
  const handleMessage = (data) => {
    sendMessage(data.message);
    reset();
  };

  const dispatch = useDispatch();

  const [imgFile, setImgFile] = useState(null);

  const setNewImoji = (input) => {
    const currentMessage = watch("message");
    setFocus("message");
    setValue("message", currentMessage + input);
    setFocus("message");
  };

  const onPaste = (event) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    const items = clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const imageFile = items[i].getAsFile();
        setImgFile(imageFile);
      }
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit(handleMessage)}
        className="chatting_footer w-full"
        ref={(ref) => {
          if (ref) {
            ref.addEventListener("paste", onPaste);
          }
        }}
      >
        <input
          {...register("message", { required: true })}
          className="w-full border-0 bg-transparent p-3 border-top border-black"
          type="text"
          name="message"
          placeholder="Send a message"
        />
        <div className="flex justify-between items-center p-3">
          <div className="flex items-center w-fit gap-2">
            <EmojiInput setImoji={setNewImoji} />
            <ImageInput
              sendMessage={sendMessage}
              pastImage={imgFile}
              resetImage={setImgFile}
            />
            <VideoInput sendMessage={sendMessage} />
            <DocumentInput sendMessage={sendMessage} />
          </div>
          <button type="submit" className="border-0 bg-transparent">
            <i className="fa-solid fa-paper-plane text-secondary"></i>
          </button>
        </div>
      </form>

      {productChat?._id && (
        <div className="bg-white shadow max-w-[340px] w-full min-w-[250px] h-[100px] rounded-t absolute -top-[100px] px-2 py-1">
          <div className="flex  !items-start gap-2 h-fit cursor-pointer mb-3 w-full relative">
            <div className="bg-gray-50 flex items-start justify-start w-[100px] overflow-hidden max-h-[90px] relative">
              <img
                className="w-full h-full object-contain"
                src={
                  productChat?.images?.length &&
                  `${base_url}/uploads/${productChat?.images[0]}`
                }
                loading="lazy"
                alt=""
              />
            </div>
            <div className="flex-grow w-full">
              <h1 className="text-black font-semibold mb-2 text-sm pt-0 mt-0 font-inter twoLine all_break hover:!text-pm">
                {productChat?.title}
              </h1>

              <>
                <div className="flex items-center flex-wrap gap-1">
                  {productChat?.price?.price_type === "ladder_price" ? (
                    <h1 className="font-semibold !text-red-600 text-base">
                      € {productChat.minPrice} - {productChat.maxPrice}
                    </h1>
                  ) : (
                    <>
                      {parseInt(productChat?.price?.one_price?.from) ===
                      parseInt(productChat?.price?.one_price?.to) ? (
                        <h1 className="label-list ">
                          <span className="text-base !font-bold">
                            {productChat?.price?.one_price?.from}
                          </span>{" "}
                          <span className="!text-xs">
                            euro/
                            {productChat?.unit?.singular.toLowerCase()}
                          </span>
                        </h1>
                      ) : (
                        <h1 className="label-list !text-red-600">
                          <span className="text-base !font-bold">
                            {productChat?.price?.one_price?.from} -{" "}
                            {productChat?.price?.one_price?.to}
                          </span>{" "}
                          <span className="!text-xs">
                            euro/
                            {productChat?.unit?.singular.toLowerCase()}
                          </span>
                        </h1>
                      )}
                    </>
                  )}
                </div>
              </>
            </div>

            <div
              onClick={() => dispatch(setProductChat(null))}
              className="w-[28px] h-[28px] rounded-full bg-red-600 text-white flex justify-center items-center absolute -top-2 -right-2"
            >
              {iCloseProductChat}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendMessageBox;
