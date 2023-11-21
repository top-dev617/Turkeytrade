import { Button, IconButton } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import logo from "../../../public/assets/logo.png";
import {
  iCategories,
  iGroups,
  iLeft_arrow_circle,
  iOrder,
  iProducts,
  iRight_arrow_circle,
  iSetting,
  iStore,
  iUsers,
} from "@/utils/datas/icons";

const routes = [
  { id: 1, name: "Stores", icon: iStore },
  { id: 2, name: "Users", icon: iUsers },
  { id: 3, name: "Orders", icon: iOrder },
  { id: 4, name: "Products", icon: iProducts },
  { id: 5, name: "Categories", icon: iCategories },
  { id: 6, name: "Groups", icon: iGroups },
  { id: 7, name: "Settings", icon: iSetting },
];

const DSidebar = ({ selectedTab, setSelectedTab, isOpen, setIsOpen }) => {
  return (
    <div className="h-full w-full bg-pmd text-white min-h-screen flex flex-col justify-start items-center relative">
      <div onClick={() => setIsOpen(!isOpen)} className="absolute -right-5 ">
        <IconButton className="bg-transparent shadow-none text-pmd">
          {isOpen ? iLeft_arrow_circle : iRight_arrow_circle}
        </IconButton>
      </div>
      <div className="flex justify-center items-center max-h-[150px] w-full py-2 bg-white">
        <Link href="/">
          <img className={!isOpen && "w-10 mx-auto"} src={logo.src} alt="" />
        </Link>
      </div>
      <div
        className={`w-full grid grid-cols-1 gap-1 mt-2 ${
          isOpen ? "px-3" : "px-2"
        }`}
      >
        {routes.map((route, index) => (
          <Button
            key={index}
            onClick={() => setSelectedTab(route.id)}
            className={`rounded-md h-12 w-full flex justify-start items-center gap-3 px-[20px] shadow-none ${
              selectedTab === route.id
                ? "!bg-white !text-pmd opacity-100"
                : "bg-pmd hover:bg-gray-100 hover:!text-gray-900"
            }`}
          >
            <div>{route.icon}</div>
            <h6
              className={`duration-100 ${
                isOpen ? "inline-block" : "hidden opacity-0"
              }`}
            >
              {route.name}
            </h6>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DSidebar;
