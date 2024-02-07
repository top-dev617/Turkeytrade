import InboxChatSidebar from "@/components/chatting/conversation-conponets/inbox-ui/InboxChatSidebar";
import InboxMessageArea from "@/components/chatting/conversation-conponets/inbox-ui/InboxMessageArea";
import React from "react";

const InboxPage = () => {
  return (
    <div className="container mx-auto h-[91vh] flex items-start justify-between">
      <InboxChatSidebar />

      <div className="flex-grow w-full h-full border-r">
        <InboxMessageArea />
      </div>
    </div>
  );
};

export default InboxPage;
