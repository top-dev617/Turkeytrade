import CompanyForm from "@/components/SellerStore/CompanyForm";
import StoreBanner from "@/components/SellerStore/StoreBanner";
import StoreTab from "@/components/SellerStore/StoreTab";
import { AuthContext } from "@/components/context/AuthContext";
import { useGetStoreInfoBySellerIdQuery } from "@/redux/features/stores/storeApi";
import SellerStoreModal from "@/utils/modals/SellerStoreModal";
import React, { useContext, useEffect, useRef } from "react";
import AuthRoute from "@/privete-routes/AuthRoute";
import { useState } from "react";
import ContactInfo from "@/components/SellerStore/ContactInfo/ContactInfo";
import { Button } from "@material-tailwind/react";
import UserInfo from "@/components/profile-ui/UserInfo";
import CompanyDetails from "@/components/profile-ui/CompanyDetails";
import useAuth from "@/lib/useAuth";
import Loading from "@/components/commons/Loading";

const tabs = [
  { id: 1, name: "Chat Profile Settings" },
  { id: 2, name: "Company Details" },
];

const ProfilePage = () => {
  const {
    user,
    isLoading,
    // refetch,
    // setUser,
  } = useAuth({
    redirectTo: "/signin",
  });
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mt-4 px-4 bg-white min-h-screen">
          <div className="flex justify-between items-center !w-full overflow-x-auto mb-2">
            {tabs?.map((tab, index) => (
              <Button
                key={index}
                onClick={() => setSelectedTab(tab.id)}
                className={`rounded-none shadow-none text-white w-full min-w-[200px] ${
                  selectedTab === tab.id ? "bg-pm" : "bg-[#ebf6f2] text-pmd"
                }`}
              >
                {tab.name}
              </Button>
            ))}
          </div>
          {selectedTab === 1 && <UserInfo user={user} />}
          {selectedTab === 2 && <CompanyDetails />}
        </div>
      )}
    </>
  );
};

export default ProfilePage;
