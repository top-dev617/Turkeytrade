import Link from "next/link";
import React from "react";

const HelpBreadcrumb = ({ name = "" }) => {
  return (
    <div className="h-[50px] w-full flex justify-start items-center gap-1">
      <Link
        href="/"
        className="font-medium font-inter leading-normal text-black text-[14px] hover:!text-pm"
      >
        Home
      </Link>

      {name && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-[15px] mt-[2px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
          <p className="font-medium font-inter leading-normal text-gray-600 text-[14px] cursor-pointer">
            {name}
          </p>
        </>
      )}
    </div>
  );
};

export default HelpBreadcrumb;
