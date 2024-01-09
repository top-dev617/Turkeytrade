// import DStores from "@/components/dashboard-ui/DContentArea/DStores";
// import DWallcome from "@/components/dashboard-ui/DContentArea/DWallcome";
// import DSidebar from "@/components/dashboard-ui/DSidebar";
// import React from "react";
// import { useState } from "react";

// const DashboardPage = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedTab, setSelectedTab] = useState(0);
//   return (
//     <>
//       <div className="flex justify-between h-full w-full">
//         <div
//           className={`max-w-[250px] min-w-[80px] ${
//             isOpen ? "min-w-[250px] w-full" : "w-[80px]"
//           }`}
//         >
//           <DSidebar
//             selectedTab={selectedTab}
//             setSelectedTab={setSelectedTab}
//             isOpen={isOpen}
//             setIsOpen={setIsOpen}
//           />
//         </div>
//         <div className="scrollbar h-full w-full flex-grow px-4 max-h-screen min-h-screen overflow-y-auto max-w-[1500px] mx-auto">
//           {selectedTab === 0 && <DWallcome />}
//           {selectedTab === 1 && <DStores />}
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashboardPage;
