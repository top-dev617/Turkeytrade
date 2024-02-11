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

  const handleEmoji = (e) => {
    setImoji(e.emoji);
    setOpen(false);
  };
  return (
    <>
      <Popover open={open} handler={() => setOpen(false)}>
        <PopoverHandler
          onClick={(e) => {
            setOpen(!open);
          }}
        >
          <div className="border-0 bg-transparent cursor-pointer">{iEmoji}</div>
        </PopoverHandler>
        <PopoverContent className="p-0 z-[9999999999] h-fit bg-white">
          <EmojiPicker
            open={open}
            onEmojiClick={(e) => handleEmoji(e)}
            emojiStyle="facebook"
            lazyLoadEmojis={false}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default EmojiInput;
