import CompanyForm from "@/components/SellerStore/CompanyForm";
import StoreBanner from "@/components/SellerStore/StoreBanner";
import StoreTab from "@/components/SellerStore/StoreTab";
import { AuthContext } from "@/components/context/AuthContext";
import { useGetStoreInfoBySellerIdQuery } from "@/redux/features/stores/storeApi";
import SellerStoreModal from "@/utils/modals/SellerStoreModal";
import React, { useContext, useEffect, useRef } from "react";
import wait from "../assets/icons/wait.json"
import AuthRoute from "@/privete-routes/AuthRoute";
import { useState } from "react";

const sellerStore = () => {
  const { user } = useContext(AuthContext)
  const { data } = useGetStoreInfoBySellerIdQuery(user?._id)


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
      <div>
        {
          data && data?.data?.status === "pending" ? (
            <div className="d-flex" style={{ minHeight: "400px", justifyContent: "center", alignItems: "center" }}>
              <h4 style={{ color: "rgb(3,125,65)" }}>Wait for Admin Approve</h4>
            </div>
          )
            :
            <>
              <StoreBanner store={data?.data} />
              <CompanyForm store={data?.data} />
              <StoreTab store={data?.data} />

              {/* <!-- Button trigger modal --> */}
              <button
                ref={openModalRef}
                type="button"
                className="d-none btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Launch demo modal
              </button>

              {/* <!-- Modal --> */}
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-body">
                      {" "}
                      <button
                        style={{ position: "absolute", right: "40px" }}
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                      <SellerStoreModal />
                    </div>
                  </div>
                </div>
              </div>
            </>
        }

      </div>
    </AuthRoute>
  );
};

export default sellerStore;
