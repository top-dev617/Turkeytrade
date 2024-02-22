import React, { useEffect } from "react";

const sendNotification = (message = "...") => {
  if ("Notification" in window && Notification.permission === "granted") {
    console.log(message);
    new Notification("New Message", {
      body: message,
      icon: "https://static.vecteezy.com/system/resources/previews/014/441/089/original/chat-message-icon-design-in-blue-circle-png.png",
    });
  }
};

const handleNtf = (message) => {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        sendNotification(message);
      }
    });
  } else {
    sendNotification(message);
  }
};

const hdd = () => {};

const makePermit = async () => {
  await Notification.requestPermission();
};

function NotificationExample() {
  useEffect(() => {
    makePermit();
  }, []);

  return (
    <div>
      <button onClick={() => handleNtf("Hello, world!")}>
        Show Notification
      </button>
    </div>
  );
}

export default NotificationExample;
