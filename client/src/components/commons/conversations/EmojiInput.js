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
  const handleEmoji = (emoji) => {
    setImoji(emoji);
    setOpen(false);
  };
  return (
    <>
      <Popover open={open} handler={() => setOpen(false)}>
        <PopoverHandler>
          <p className="opacity-0 absolute w-1"></p>
        </PopoverHandler>
        <PopoverContent className="p-0 z-[9999999999]">
          {open && (
            <EmojiPicker
              onEmojiClick={(e) => handleEmoji(e.emoji)}
              emojiStyle="facebook"
              style={{ position: "absolute" }}
            />
          )}
        </PopoverContent>
      </Popover>
      <div
        onClick={() => setOpen(!open)}
        className="border-0 bg-transparent cursor-pointer"
      >
        {iEmoji}
      </div>
    </>
  );
};

export default EmojiInput;
