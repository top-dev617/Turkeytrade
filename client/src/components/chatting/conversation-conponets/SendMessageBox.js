import DocumentInput from "@/components/commons/conversations/DocumentInput";
import EmojiInput from "@/components/commons/conversations/EmojiInput";
import ImageInput from "@/components/commons/conversations/ImageInput";
import VideoInput from "@/components/commons/conversations/VideoInput";
import { setImages } from "@/redux/features/conversation/conversationSlice";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SendMessageBox = ({ sendMessage }) => {
  const { handleSubmit, register, reset, setValue, watch } = useForm();
  const handleMessage = (data) => {
    sendMessage(data.message);
    reset();
  };

  const [imgFile, setImgFile] = useState(null);

  const setNewImoji = (input) => {
    const currentMessage = watch("message");
    setValue("message", currentMessage + input);
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
    <form
      onSubmit={handleSubmit(handleMessage)}
      className="chatting_footer w-full"
    >
      <input
        {...register("message", { required: true })}
        className="w-full border-0 bg-transparent p-3 border-top border-black"
        type="text"
        name="message"
        ref={(ref) => {
          if (ref) {
            ref.addEventListener("paste", onPaste);
          }
        }}
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
  );
};

export default SendMessageBox;
