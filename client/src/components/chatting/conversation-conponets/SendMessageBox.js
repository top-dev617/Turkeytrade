import EmojiInput from "@/components/commons/conversations/EmojiInput";
import ImageInput from "@/components/commons/conversations/ImageInput";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SendMessageBox = ({ sendMessage }) => {
  const { handleSubmit, register, reset, setValue } = useForm();
  const handleMessage = (data) => {
    sendMessage(data.message);
    reset();
  };

  const setNewImoji = (input) => {
    setValue("message", input);
  };
  return (
    <form onSubmit={handleSubmit(handleMessage)} className="chatting_footer">
      <input
        {...register("message", { required: true })}
        className="w-100 border-0 bg-transparent p-3 border-top border-black"
        type="text"
        name="message"
        placeholder="Send a message"
      />
      <div className="d-flex justify-content-between p-3">
        <div className="flex items-center w-fit gap-2">
          <EmojiInput setImoji={setNewImoji} />
          <ImageInput sendMessage={sendMessage} />
        </div>
        <button type="submit" className="border-0 bg-transparent">
          <i className="fa-solid fa-paper-plane text-secondary"></i>
        </button>
      </div>
    </form>
  );
};

export default SendMessageBox;
