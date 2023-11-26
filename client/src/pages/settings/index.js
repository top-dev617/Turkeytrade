import Loading from "@/components/commons/Loading";
import ChangePassword from "@/components/dashboard/settings/ChangePassword";
import DeleteAccount from "@/components/dashboard/settings/DeleteAccount";
import PaymentCard from "@/components/dashboard/settings/PaymentCard";
import useAuth from "@/lib/useAuth";
import { Button } from "@material-tailwind/react";
import React from "react";
import { useState } from "react";
const tabs = ["Change Password", "Delete Account"];
// "Change Payment Card",
const SettingsPage = () => {
  const { isLoading } = useAuth({
    redirectTo: "/signin",
  });
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mt-4 px-4 bg-white min-h-screen">
          <div className="flex justify-between items-center !w-full overflow-x-auto">
            {tabs?.map((tab, index) => (
              <Button
                key={index}
                onClick={() => setSelectedTab(index)}
                className={`rounded-none shadow-none text-white relative min-w-[170px] w-full ${
                  selectedTab === index ? "bg-pm" : "bg-[#ebf6f2] text-pmd"
                }`}
              >
                {tab}
              </Button>
            ))}
          </div>
          {selectedTab === 0 && <ChangePassword />}
          {selectedTab === 1 && <DeleteAccount />}
          {selectedTab === 2 && <PaymentCard />}
        </div>
      )}
    </>
  );
};

export default SettingsPage;
