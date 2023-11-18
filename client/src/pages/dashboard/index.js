import DStores from "@/components/dashboard-ui/DContentArea/DStores";
import DWallcome from "@/components/dashboard-ui/DContentArea/DWallcome";
import DSidebar from "@/components/dashboard-ui/DSidebar";
import React from "react";
import { useState } from "react";

const DashboardPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <>
      <div className="flex justify-between h-full w-full">
        <div className="max-w-[350px] w-full">
          <DSidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>
        <div className="h-full w-ull flex-grow px-4 max-h-screen min-h-screen overflow-y-auto max-w-[1500px] mx-auto">
          {selectedTab === 0 && <DWallcome />}
          {selectedTab === 1 && <DStores />}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
