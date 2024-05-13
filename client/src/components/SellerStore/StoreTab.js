import React, { useState } from "react";
import StoreOverview from "./StoreOverview/StoreOverview";
import ContactInfo from "./ContactInfo/ContactInfo";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { setEditProduct } from "@/redux/features/products/productSlice";
import useAuth from "@/lib/useAuth";
import CustomCategories from "./CustomCategories";

const UploadProductMain = dynamic(
  () => import("./UploadProduct/UploadProductMain"),
  { ssr: false }
);
const EditProduct = dynamic(() => import("./EditProduct/EditProduct"), {
  ssr: false,
});

const StoreTab = ({ store }) => {
  const { user } = useAuth({ redirectTo: "/signin" });
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);

  const handleStep = (id) => {
    if (id === 3) {
      dispatch(setEditProduct(null));
    } else if (id === 4) {
      dispatch(setEditProduct(null));
    }
    setStep(id);
  };

  const tabs = [
    {
      id: 1,
      name: "Products",
    },
    {
      id: 2,
      name: "Custom Categories",
    },
    {
      id: 3,
      name: "Upload New Product",
    },
    {
      id: 4,
      name: "Continue On Draft",
    },
    {
      id: 5,
      name: "Edit Product",
    },
    {
      id: 6,
      name: "Profile",
    },
  ];

  return (
    <div className="container store_tab bg-white md:bg-transparent">
      <div className="tab_container ">
        <div className="flex justify-between items-center !w-full overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              onClick={() => handleStep(tab.id)}
              className={`${
                step === tab.id && "active"
              } tab !mb-0 !w-full relative min-w-[200px] !text-[16px]`}
              key={index}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="py-3 min-h-[400px]">
          {step === 1 && <StoreOverview store={store} />}
          {step === 2 && <CustomCategories store={store} />}

          {step === 3 && (
            <UploadProductMain
              store={store}
              step={step}
              setStep={setStep}
              user={user}
            />
          )}
          {step === 4 && (
            <UploadProductMain
              store={store}
              step={step}
              setStep={setStep}
              user={user}
            />
          )}
          {step === 5 && <EditProduct store={store} setStep={setStep} />}
          {step === 6 && <ContactInfo />}
        </div>
      </div>
    </div>
  );
};

export default StoreTab;
