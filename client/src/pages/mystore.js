import CompanyForm from "@/components/SellerStore/CompanyForm";
import StoreBanner from "@/components/SellerStore/StoreBanner";
import StoreTab from "@/components/SellerStore/StoreTab";
import { useGetStoreInfoBySellerIdQuery } from "@/redux/features/stores/storeApi";
import SellerStoreModal from "@/utils/modals/SellerStoreModal";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import useAuth from "@/lib/useAuth";
import Loading from "@/components/commons/Loading";
import store from "@/redux/store";
import StoreStepperForm from "@/components/SellerStore/companyFormComponents/storeStepperForm/StoreStepperForm";
import Link from "next/link";
import { useRouter } from "next/router";

const sellerStore = () => {
  const {
    user,
    isLoading,
    // refetch,
    // setUser,
  } = useAuth({
    redirectTo: "/signin",
  });
  const {
    data,
    isLoading: storeLoading,
    refetch,
  } = useGetStoreInfoBySellerIdQuery(user?._id);
  const router = useRouter();

  const openModalRef = useRef(null);
  useEffect(() => {
    const storeModal = localStorage.getItem("storeModal");
    if (
      storeModal &&
      data?.data?.status === "accept" &&
      data?.data?.initialize_status === "Done"
    ) {
      openModalRef.current.click();
      setTimeout(() => {
        localStorage.removeItem("storeModal");
      }, 5000);
    }
  }, [data, user]);

  if (data && !data?.data && !storeLoading && !isLoading) {
    // console.log(data?.data);
    router.push("/seller-register");
  }

  return (
    <div className="min-h-screen h-full">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <>
            {data &&
              data?.data?.status === "accept" &&
              data?.data?.initialize_status === "Done" && (
                <>
                  <StoreBanner store={data?.data} />
                  <CompanyForm store={data?.data} />
                  <StoreTab store={data?.data} />
                </>
              )}
          </>

          <div className="bg-[#EFF4ED] min-h-screen w-full md:pb-4">
            {data &&
              data?.data?.status === "accept" &&
              data?.data?.initialize_status === "None" && (
                <StoreStepperForm store={data?.data} refetch={refetch} />
              )}

            {data && data?.data?.status === "pending" && (
              <div className="flex justify-center w-full container min-h-screen">
                <div className="max-h-[553px] h-[553px] w-full bg-white rounded-md flex flex-col justify-center items-center mt-[80px]">
                  <h4 className="font-inter text-center font-semibold !text-black text-[42.2px]">
                    Thank you for your application.
                  </h4>
                  <p className="font-inter text-center font-semibold !text-black text-[21.2px]">
                    Your request is under review, and we aim to complete the
                    process
                  </p>
                  <p className="font-inter text-center font-semibold !text-black text-[21.2px]">
                    within 24 hours. You will receive an email about your
                    approval status.
                  </p>

                  <Link href="/">
                    <button className="w-[243px] h-[53px] mt-[28px] rounded-[5px] text-white font-inter bg-[#037D41]">
                      Back to main page
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      )}

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
    </div>
  );
};

export default sellerStore;
