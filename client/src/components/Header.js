import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import logo from "../../public/assets/logo.png";
import star from "../../public/assets/star1.png";
import man from "../../public/assets/profile.png";
import verification from "../../public/assets/verification.png";
import { AuthContext } from "./context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setSaveProducts } from "@/redux/features/products/productSlice";
import { useGetStoreInfoBySellerIdQuery } from "@/redux/features/stores/storeApi";
import { useRouter } from "next/router";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import {
  handleClearConversations,
  setChatUnseen,
  setChats,
  setInboxChatUnseen,
  setInboxLastMessages,
  setInboxMessagePush,
  setLastChat,
  setLastMessages,
  setMessagePush,
  setNewChat,
  setNtfAlert,
  setOnline_users,
} from "@/redux/features/conversation/conversationSlice";
import { socket_url } from "@/utils/auth/global";
import { io } from "socket.io-client";
import { setStoreInfo } from "@/redux/features/stores/storeSlice";
import {
  useGetGlobalChatDataQuery,
  useTotalUnseenQuery,
} from "@/redux/features/conversation/conversationApi";
import useAuth from "@/lib/useAuth";
import { SocketContext } from "./context/SocketContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { logout } = useAuth({ redirectTo: false });
  const { data } = useGetStoreInfoBySellerIdQuery(user?._id);
  const { refetch } = useTotalUnseenQuery();

  const { data: chatData } = useGetGlobalChatDataQuery();

  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname } = router;
  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  useMemo(() => {
    if (chatData && chatData?.length > 0) {
      dispatch(setChats(chatData));
    }
  }, [chatData]);

  const handleSignout = () => {
    logout();
    dispatch(handleClearConversations());
    setStoreInfo(null);
    router.reload();
  };
  useEffect(() => {
    const newProducts = JSON.parse(localStorage.getItem("save-products")) || [];
    dispatch(setSaveProducts(newProducts));
  }, []);

  const handleNavigate = () => {
    if (user?.role === "Seller" && !data?.data) {
      router.push("/seller-register");
    } else if (data?.data?.status) {
      router.push("/mystore");
    }
  };

  const [sellerReg, setSellerReg] = useState(false);

  useEffect(() => {
    if (user?.role === "Seller" && data?.status && !data?.data?._id) {
      setTimeout(() => {
        setSellerReg(true);
      }, 1500);
    }
  }, [user, data?.data]);

  let navberRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!navberRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    socket.current = io(socket_url, {
      credentials: true,
    });
    if (user?._id) {
      socket.current.emit("addUser", { id: user?._id, type: "Global" });
      socket.current.on("getUsers", (users) => {
        dispatch(setOnline_users(users));
      });
    }

    socket.current.on("getMessage", (receiveMessage) => {
      refetch();
      dispatch(setNtfAlert({ ...receiveMessage, userId: user?._id }));
      dispatch(setChatUnseen({ ...receiveMessage, userId: user?._id }));
      dispatch(setInboxChatUnseen({ ...receiveMessage, userId: user?._id }));
      dispatch(setMessagePush(receiveMessage));
      dispatch(setInboxMessagePush(receiveMessage));
      dispatch(setLastMessages(receiveMessage));
      dispatch(setInboxLastMessages(receiveMessage));
      // setLastChat();
    });

    socket.current.on("getChat", (receiveChat) => {
      dispatch(setNewChat(receiveChat));
    });
  }, [user]);

  return (
    <nav
      ref={navberRef}
      className={`bg-white py-2 uppercase border-b ${
        router.pathname.includes("/dashboard") && "hidden"
      }`}
    >
      <div className="relative cursor-pointer flex justify-between items-center gap-6 lg:gap-10 h-14 px-4 max-w-primary mx-auto container">
        <div className="flex-grow uppercase font-bold">
          <Link href="/">
            <img className="w-16 md:w-28" src={logo.src} alt="" />
          </Link>
        </div>
        {user?._id && data?.status === true && (
          <>
            {data?.data ? (
              <div
                style={{ color: "#E61C2B", fontWeight: "600" }}
                className="md:flex items-center gap-1 hidden md:block text-xs md:!text-[14px]"
                onClick={() => handleNavigate()}
              >
                {data?.data?.status !== "accept" && (
                  <img className="me-0" src={verification.src} alt="" />
                )}{" "}
                {data?.data?.status === "pending" &&
                  "Verification in progress!"}
                {data?.data?.status === "accept" && (
                  <Button size="sm" className="bg-pm rounded-md shadow-none">
                    My Store
                  </Button>
                )}
              </div>
            ) : (
              <>
                {user?.role === "Seller" &&
                  data?.status &&
                  !data?.data?._id &&
                  sellerReg && (
                    <div
                      style={{ color: "#E61C2B", fontWeight: "600" }}
                      className="flex items-center gap-1 text-xs md:!text-[14px]"
                      onClick={() => handleNavigate()}
                    >
                      Start Selling
                    </div>
                  )}
              </>
            )}
          </>
        )}

        <div className="hidden lg:block">
          <Link
            href="/save-products"
            className={`hover:text-pm duration-100 font-semibold text-sm flex items-center gap-2
            ${
              pathname.includes("/save-products") ? "text-pm" : "text-gray-900"
            }`}
          >
            <img src={star.src} alt="" /> Saved
          </Link>
        </div>
        {/* <div onClick={() => setMsgOpen(!msgOpen)} className="hidden lg:block">
          <p
            className={`hover:text-pm duration-100 font-semibold text-sm flex items-center gap-2
            ${msgOpen ? "text-pm" : "text-gray-900"}`}
          >
            <img src={message.src} alt="" /> Messages
          </p>
        </div> */}

        {/* {user?._id && (
          <Menu>
            <MenuHandler className="outline-none border-none">
              <button>
                <Badge content={totalNotifications}>
                  <IconButton
                    onClick={() => handleSeenNTF()}
                    color="red"
                    variant="outlined"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </IconButton>
                </Badge>
              </button>
            </MenuHandler>
            <Notifications />
          </Menu>
        )} */}

        {user?._id && (
          <div className="hidden md:block">
            <Popover placement="bottom">
              <PopoverHandler>
                <Button className="bg-[#037D41] flex justify-center items-center gap-2 outline-none shadow-none">
                  <span>{user?.name}</span>
                </Button>
              </PopoverHandler>
              <PopoverContent className="w-44 p-2">
                <div className="max-w-[200px] text-center grid grid-cols-1 gap-2">
                  <Link href="/profile">
                    <Button className="w-full py-0 h-8 rounded shadow-none bg-pm hover:bg-pmd">
                      Profile
                    </Button>
                  </Link>

                  <Link href="/inbox">
                    <Button className="w-full py-0 h-8 rounded shadow-none bg-pm hover:bg-pmd">
                      Inbox
                    </Button>
                  </Link>
                  <Link href="/settings">
                    <Button className="w-full py-0 h-8 rounded shadow-none bg-pm hover:bg-pmd">
                      Settings
                    </Button>
                  </Link>
                  <Link href="/orders">
                    <Button className="w-full py-0 h-8 rounded shadow-none bg-pm hover:bg-pmd">
                      Orders
                    </Button>
                  </Link>
                  <Link href="/transactions">
                    <Button className="w-full py-0 h-8 rounded shadow-none bg-pm hover:bg-pmd">
                      Transactions
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleSignout()}
                    className="w-full py-0 h-8 rounded shadow-none bg-red-600 hover:bg-red-700 mt-2"
                  >
                    Sign Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
        {!user?._id && (
          <Popover open={openPopover} handler={setOpenPopover}>
            <PopoverHandler {...triggers}>
              <Button className="bg-[#037D41] flex justify-center items-center gap-2 outline-none">
                <img src={man.src} alt="" /> <span>Sign In/ Register</span>
              </Button>
            </PopoverHandler>
            <PopoverContent {...triggers} className="w-fit">
              <div className="flex flex-col justify-center items-center gap-4">
                <Link href="/signin">
                  <Button className="bg-[#037D41] outline-none">Log In</Button>
                </Link>
                <Link className="" href="/register">
                  Register as a Buyer
                </Link>
                <Link className="" href="/register?type=seller">
                  Register as a Seller
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        )}

        <div
          onClick={() => setOpen(!open)}
          className="w-10 lg:hidden text-pm hover:text-pmd"
        >
          {open ? (
            <span>
              <svg
                className="w-8 "
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                ariaHidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          ) : (
            <span>
              <svg
                className="w-6 ml-2 "
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 12 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.41 9H.59C0 9 0 8.59 0 8c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zm0-4H.59C0 5 0 4.59 0 4c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM.59 11H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1H.59C0 13 0 12.59 0 12c0-.59 0-1 .59-1z"
                ></path>
              </svg>
            </span>
          )}
        </div>
      </div>

      <div
        className={`fixed top-0 z-[9999999] duration-300 md:hidden w-full min-h-screen h-full overflow-y-hidden bg-white
            ${open ? "left-0" : "-left-full"}`}
      >
        <div className="flex justify-end w-full p-2">
          <Button
            onClick={() => setOpen(false)}
            className="p-0 w-10 h-10 bg-white shadow-none text-red-600 font-bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>
        <div className="flex flex-col items-center gap-4 w-full  px-4 py-4">
          <div className="lg:hidden flex justify-center items-center px-2 text-center">
            <Link
              href="/save-products"
              className={`hover:text-pm duration-100 font-semibold text-sm flex items-center gap-2
            ${
              pathname.includes("/save-products") ? "text-pm" : "text-gray-900"
            }`}
            >
              <img src={star.src} alt="" /> Saved
            </Link>
          </div>
          {/* <div
            onClick={() => setMsgOpen(!msgOpen)}
            className="lg:hidden flex justify-center items-center px-2 text-center"
          >
            <p
              className={`hover:text-pm duration-100 font-semibold text-sm flex items-center gap-2
            ${msgOpen ? "text-pm" : "text-gray-900"}`}
            >
              <img src={message.src} alt="" /> Messages
            </p>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
