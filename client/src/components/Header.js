import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import logo from "../../public/assets/logo.png";
import star from "../../public/assets/star1.png";
import message from "../../public/assets/message.png";
import man from "../../public/assets/profile.png";
import verification from "../../public/assets/verification.png";
import { AuthContext } from "./context/AuthContext";
import { useDispatch } from "react-redux";
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
  setOnline_users,
} from "@/redux/features/conversation/conversationSlice";
import { socket_url } from "@/utils/auth/global";
import { io } from "socket.io-client";

const Header = () => {
  const { user, signOut, setMsgOpen, msgOpen } = useContext(AuthContext);
  const { data } = useGetStoreInfoBySellerIdQuery(user?._id);
  const dispatch = useDispatch();
  const router = useRouter();
  const socket = useRef();
  const { pathname } = router;
  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  const handleSignout = () => {
    signOut();
    dispatch(handleClearConversations());
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
      socket.current.emit("addUser", user?._id);
      socket.current.on("getUsers", (users) => {
        dispatch(setOnline_users(users));
      });
    }
    if (user?._id) {
      socket.current.emit("addUser", user?._id);
      socket.current.on("getUsers", (users) => {
        dispatch(setOnline_users(users));
      });
    }
    if (data?.data) {
      socket.current.emit("addUser", data?.data?._id);
      socket.current.on("getUsers", (users) => {
        dispatch(setOnline_users(users));
      });
    }
    return () => {};
  }, [user, data]);

  return (
    <nav ref={navberRef} className="bg-white py-2 uppercase border-b ">
      <div className="relative cursor-pointer flex justify-between items-center gap-6 lg:gap-10 h-14 px-4 max-w-primary mx-auto container">
        <div className="flex-grow uppercase font-bold">
          <Link href="/">
            <img src={logo.src} alt="" />
          </Link>
        </div>
        {user?._id && data?.status === true && (
          <>
            {data?.data ? (
              <div
                style={{ color: "#E61C2B", fontWeight: "600" }}
                className="flex items-center gap-1"
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
                      className="flex items-center gap-1"
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
        <div onClick={() => setMsgOpen(!msgOpen)} className="hidden lg:block">
          <p
            className={`hover:text-pm duration-100 font-semibold text-sm flex items-center gap-2
            ${msgOpen ? "text-pm" : "text-gray-900"}`}
          >
            <img src={message.src} alt="" /> Messages
          </p>
        </div>

        {user?._id && (
          <>
            <Popover placement="bottom">
              <PopoverHandler>
                <Button className="bg-[#037D41] flex justify-center items-center gap-2 outline-none shadow-none">
                  <span>{user?.name}</span>
                </Button>
              </PopoverHandler>
              <PopoverContent className="w-44 p-2">
                <div className="max-w-[200px] text-center grid grid-cols-1 gap-2">
                  {data?.data && (
                    <Link href="/profile">
                      <Button className="w-full py-0 h-8 rounded shadow-none bg-pm hover:bg-pmd">
                        Profile
                      </Button>
                    </Link>
                  )}
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
          </>
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
          className="w-10 lg:hidden text-blue-600"
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
        className={`absolute z-50 duration-300 mt-[12px] lg:hidden flex flex-col items-center gap-4 w-full min-h-screen bg-white px-4 py-4
            ${open ? "left-0" : "-left-full"}`}
      >
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
        <div
          onClick={() => setMsgOpen(!msgOpen)}
          className="lg:hidden flex justify-center items-center px-2 text-center"
        >
          <p
            className={`hover:text-pm duration-100 font-semibold text-sm flex items-center gap-2
            ${msgOpen ? "text-pm" : "text-gray-900"}`}
          >
            <img src={message.src} alt="" /> Messages
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Header;
