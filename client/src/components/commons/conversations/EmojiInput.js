import { iEmoji } from "@/utils/datas/icons";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import EmojiPicker from "emoji-picker-react";
import React from "react";
import { useState } from "react";

const EmojiInput = ({ setImoji }) => {
  const [open, setOpen] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);

  const handleEmoji = (e) => {
    setImoji(e.emoji);
    setOpen(false);
    setEmojiOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setEmojiOpen(false);
  };
  const handleOpen = () => {
    setOpen(!open);
    setTimeout(() => {
      setEmojiOpen(true);
    }, 500);
  };
  return (
    <>
      <Popover open={open} handler={() => handleClose()}>
        <PopoverHandler
          onClick={(e) => {
            handleOpen();
          }}
        >
          <div className="border-0 bg-transparent cursor-pointer">{iEmoji}</div>
        </PopoverHandler>
        <PopoverContent className="p-0 z-[9999999999] h-fit bg-white">
          <div className={`w-full h-full ${emojiOpen ? "block" : "hidden"}`}>
            <EmojiPicker
              open={open}
              onEmojiClick={(e) => handleEmoji(e)}
              emojiStyle="facebook"
              lazyLoadEmojis={false}
            />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default EmojiInput;
