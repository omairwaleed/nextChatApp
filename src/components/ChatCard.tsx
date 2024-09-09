import React from "react";
import { Avatar } from "@mantine/core";
import Image from "../../assets/image.png";
const ChatCard = () => {
  return (
    <div className="hover:bg-slate-300 cursor-pointer items-center justify-between px-3 flex flex-row my-3 h-20 rounded-md">
      <div className="flex flex-row w-4/6">
        <Avatar src={"./images/image.png"} size={"lg"} alt="it's me" />
        <div className="ml-4 w-full">
          <p className="font-bold w-full overflow-hidden whitespace-nowrap text-ellipsis">
            Omair Waleed
          </p>
          <p className="w-full overflow-hidden whitespace-nowrap text-ellipsis">
            Hi there
          </p>
        </div>
      </div>
      <div>
        <p className="text-gray-400">1M</p>
      </div>
    </div>
  );
};

export default ChatCard;
