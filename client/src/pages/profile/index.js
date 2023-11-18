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

const tabs = [
  { id: 1, name: "My Profile" },
  { id: 2, name: "Store" },
];

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const { data } = useGetStoreInfoBySellerIdQuery(user?._id);
  const [selectedTab, setSelectedTab] = useState(1);
  return (
    <AuthRoute>
      <div className="container mt-4 px-4 bg-white min-h-screen">
        <div className="grid grid-cols-2 w-full h-12 mb-4">
          {tabs?.map((tab, index) => (
            <Button
              key={index}
              onClick={() => setSelectedTab(tab.id)}
              className={`rounded-none shadow-none text-white ${
                selectedTab === tab.id ? "bg-pm" : "bg-[#ebf6f2] text-pmd"
              }`}
            >
              {tab.name}
            </Button>
          ))}
        </div>
        {selectedTab === 1 && <UserInfo user={user} />}
        {selectedTab === 2 && <ContactInfo store={data?.data} />}
      </div>
    </AuthRoute>
  );
};

export default ProfilePage;
