import { Button } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import logo from "../../../public/assets/logo.png";

const routes = [
  { id: 1, name: "Stores" },
  { id: 2, name: "Users" },
  { id: 3, name: "Orders" },
  { id: 4, name: "Products" },
];

const DSidebar = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="h-full max-w-[350px] w-full bg-pm text-white min-h-screen flex flex-col justify-start items-center ">
      <div className="flex justify-center items-center max-h-[150px] w-full py-2 border-b">
        <Link href="/">
          <img src={logo.src} alt="" />
        </Link>
      </div>
      <div className="w-full grid grid-cols-1">
        {routes.map((route, index) => (
          <Button
            key={index}
            onClick={() => setSelectedTab(route.id)}
            className={`rounded-none h-12 w-full flex justify-start items-center px-4 shadow-none ${
              selectedTab === route.id
                ? "bg-white !text-gray-900"
                : "bg-pm hover:bg-gray-100 hover:!text-gray-900"
            }`}
          >
            {route.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DSidebar;
