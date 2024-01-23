import { Button } from "@material-tailwind/react";
import React from "react";

const CateSidebarLoader = () => {
  const classStyle = `outline-none flex items-center justify-between shadow-none bg-blue-gray-50 rounded-sm duration-150 gap-5 h-8 w-full animate-pulse`;
  return (
    <div className="grid grid-cols-1 gap-2 max-h-[585px] overflow-y-auto relative animate-pulse">
      <Button className={classStyle}></Button>
      <Button className={classStyle}></Button>
      <Button className={classStyle}></Button>
      <Button className={classStyle}></Button>
      <Button className={classStyle}></Button>
      <Button className={classStyle}></Button>
      <Button className={classStyle}></Button>
      <Button className={classStyle}></Button>
      <Button className={classStyle}></Button>
      <Button className={classStyle}></Button>
      <Button className={classStyle}></Button>
      <Button className={classStyle}></Button>
      <Button className={classStyle}></Button>
    </div>
  );
};

export default CateSidebarLoader;
