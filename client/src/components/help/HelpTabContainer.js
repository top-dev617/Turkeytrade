import Link from "next/link";
import React from "react";
import cookie from "../../assets/icons/cookie.png";

const items = [
  { id: 1, name: "Terms and Conditions", path: "terms-and-conditions" },
  { id: 2, name: "Privacy Policy", path: "privacy-policy" },
  { id: 3, name: "Cookie Policy", path: "cookie-policy" },
  { id: 4, name: "Seller Agreement", path: "seller-agreement" },
];

const HelpTabContainer = ({ name, actionCookie }) => {
  const handleCookie = () => {
    if (actionCookie) {
      actionCookie(true);
    }
  };

  const isVisible = name === "Privacy Policy" || name === "Cookie Policy";
  return (
    <div className="md:max-w-[300px] w-full">
      <div className="w-full border-[1px] border-gray-200 bg-white rounded-[5px]">
        <div className="bg-gray-100 h-[40px] w-full flex items-center border-b-[1px] border-gray-200 pl-[12px]">
          <h1 className="text-[15px] font-semibold leading-normal font-poppins text-black">
            Related Links
          </h1>
        </div>
        {items.map((item, index) => (
          <div
            key={index}
            className={`h-[40px] w-full flex items-center pl-[12px] text-gray-600 hover:text-pm ${
              items.length === item.id ? "" : "border-b-[1px] border-gray-200"
            }
          ${name === item.name ? "text-pm" : ""}
          `}
          >
            <Link
              href={`/help/${item?.path}`}
              className="text-[13px] font-medium leading-normal hover:text-pm font-poppins text-current cursor-pointer"
            >
              {item.name}
            </Link>
          </div>
        ))}
      </div>
      {isVisible && (
        <button
          onClick={() => handleCookie()}
          className="flex items-center justify-center gap-1 bg-pm hover:bg-pmd py-2 px-2 rounded mx-auto mt-3"
        >
          {" "}
          <img src={cookie.src} className="w-[15px]" />{" "}
          <h1 className="font-medium text-[12px] font-inter text-white">
            Change Cookie Setting
          </h1>
        </button>
      )}
    </div>
  );
};

export default HelpTabContainer;
