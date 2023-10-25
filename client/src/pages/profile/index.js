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

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const { data } = useGetStoreInfoBySellerIdQuery(user?._id);

  const openModalRef = useRef(null);
  const [isWelcomeModal, setOpenModalRef] = useState(null);
  useEffect(() => {
    const storeModal = localStorage.getItem("storeModal");
    if (storeModal) {
      setOpenModalRef(JSON.parse(storeModal));
      openModalRef.current.click();

      setTimeout(() => {
        localStorage.removeItem("storeModal");
      }, 5000);
    }
  }, [data, user]);
  return (
    <AuthRoute>
      <div className="container mx-auto mt-4">
        <ContactInfo store={data?.data} />
      </div>
    </AuthRoute>
  );
};

export default ProfilePage;
