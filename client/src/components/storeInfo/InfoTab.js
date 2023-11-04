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

const tabs = [
  { name: "Products" },
  { name: "Categories" },
  { name: "Profile" },
  { name: "Chat Now" },
];

const InfoTab = ({ store }) => {
  const { user } = useContext(AuthContext);
  const { publicTab } = useSelector((state) => state.store);
  const [postNewChat] = usePostNewChatMutation();
  const dispatch = useDispatch();
  const [chatId, setChatId] = useState("");
  const router = useRouter();

  const handleTab = async (index) => {
    dispatch(setPublicTab(index));
    if (index === 3) {
      if (!user?._id) {
        router.push("/signin");
        return;
      }
      const chatData = {
        memberOne: {
          member_type: "Store",
          id: store?._id,
        },
        memberTwo: {
          member_type: "User",
          id: user?._id,
        },
      };
      const options = {
        data: chatData,
      };
      const result = await postNewChat(options);
      if (result?.data?.access) {
        setChatId(result?.data?.data?._id);
      }
    }
  };

  return (
    <div className="store_tab">
      <div className="container mx-auto">
        <div className="tab_container">
          <div>
            {tabs.map((tab, index) => (
              <button
                className={`${publicTab === index && "active"} tab w-full ${
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
          {publicTab === 0 && <StoreOverview store={store} />}
          {publicTab === 1 && <StoreCategories store={store} />}
          {publicTab === 2 && <ContactInfo store={store} />}
          {publicTab === 3 && store?.user?._id !== user?._id && (
            <StoreChat store={store} chatId={chatId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoTab;
