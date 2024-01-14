import React from "react";

const labels = [
  { name: "Logo", isBorder: true, col: "1" },
  { name: "Company", isBorder: true, col: "2" },
  { name: "Account Holder", isBorder: true, col: "2" },
  { name: "Role", isBorder: true, col: "1" },
  { name: "Status", isBorder: true, col: "1" },
  { name: "Application Date", isBorder: true, col: "2" },
  { name: "Decision Date", isBorder: true, col: "2" },
  { name: "More", isBorder: false, col: "1" },
];

const StoreTableHeader = () => {
  return (
    <div>
      <div className="h-[75px] w-full rounded-[10px] grid grid-cols-12 items-center bg-[#EBEBEB]">
        {labels.map((item, index) => (
          <div
            className={`flex justify-center items-center h-[30px] col-span-${
              item.col
            } w-full ${item.isBorder && "border-r-2 border-[#D9D9D9]"}`}
          >
            <h1 className="text-[#004423] font-inter text-[15px] font-semibold tracking-[0.2px]">
              {item.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreTableHeader;
