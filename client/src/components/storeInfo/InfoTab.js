import React, { useState } from "react";
import Item from "../Item";
import { storeItems } from "@/utils/datas/items";
import ContactInfo from "../SellerStore/ContactInfo/ContactInfo";
import StoreOverview from "../SellerStore/StoreOverview/StoreOverview";
import StoreCategories from "../SellerStore/StoreCategories";
import ChatMain from "../chatting/ChatMain";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { setPublicTab } from "@/redux/features/stores/storeSlice";
import Chatting from "../chatting/Chatting";
import StoreChat from "../SellerStore/StoreChat";
import { usePostNewChatMutation } from "@/redux/features/conversation/conversationApi";
import { useRouter } from "next/router";
import { setChat } from "@/redux/features/conversation/conversationSlice";

const tabs = [
  { name: "Products" },
  { name: "Categories" },
  { name: "Profile" },
  { name: "Chat Now" },
];

const InfoTab = ({ store }) => {
  const { user, setMsgOpen } = useContext(AuthContext);
  const { publicTab } = useSelector((state) => state.store);
  const [postNewChat] = usePostNewChatMutation();
  const dispatch = useDispatch();
  const [chatId, setChatId] = useState("");
  const router = useRouter();

  const handleTab = async (index) => {
    if (index !== 3) {
      dispatch(setPublicTab(index));
    }
    if (index === 3) {
      if (!user?._id) {
        router.push("/signin");
        return;
      }
      if (user?._id !== store?.user?._id) {
        const chatData = {
          members: [store?.user?._id, user?._id],
          requester: user?._id,
          receiver: store?.user?._id,
        };
        const options = {
          data: chatData,
        };

        const result = await postNewChat(options);
        // console.log(result);
        if (result?.data?.access) {
          dispatch(setChat(result?.data?.data));
          setMsgOpen(true);
        }
      }
    }
  };

  return (
    <div className="container store_tab mb-4">
      <div className="tab_container">
        <div className="flex justify-between items-center !w-full overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              className={`${
                publicTab === index && "active"
              } tab !mb-0 !w-full relative min-w-[200px] ${
                tab?.name === "Chat Now" &&
                store?.user?._id === user?._id &&
                "hidden"
              }`}
              key={index}
              onClick={() => handleTab(index)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="py-3">
          {publicTab === 0 && <StoreOverview store={store} />}
          {publicTab === 1 && <StoreCategories store={store} />}
          {publicTab === 2 && <ContactInfo store={store} />}
        </div>
      </div>
    </div>
  );
};

export default InfoTab;
