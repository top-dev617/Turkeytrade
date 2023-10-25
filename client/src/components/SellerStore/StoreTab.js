import React, { useState } from "react";
import StoreOverview from "./StoreOverview/StoreOverview";
import ContactInfo from "./ContactInfo/ContactInfo";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { setEditProduct } from "@/redux/features/products/productSlice";

const UploadProductMain = dynamic(() => import("./UploadProduct/UploadProductMain"), { ssr: false });
const EditProduct = dynamic(() => import("./EditProduct/EditProduct"), { ssr: false });



const StoreTab = ({ store }) => {
  const dispatch = useDispatch()

  const [step, setStep] = useState(0);
  const [selectDrop, setSelectDrop] = useState("Upload New Product");
  const [open, setOpen] = useState(false);

  const handleStep = (index) => {
    if (index === 1) {
      dispatch(setEditProduct(null))
      setOpen(!open)
      setStep(index)
    } else if (index === 2) {
      dispatch(setEditProduct(null))
      setStep(index)
      setOpen(false)
    }
    else {
      setStep(index)
      setOpen(false)
    }
  }

  const handleDropdown = (v) => {
    console.log(v)
    setSelectDrop(v)
    setOpen(false)
  }
  const tabs = [
    {
      name: "Store overview",
    },
    {
      name: selectDrop,
      dropdowns: [selectDrop === "Upload On Draft" ? "Upload New Product" : "Upload On Draft"]
    },
    {
      name: "Edit Product",
    },
    {
      name: "Profile",
    },
  ];



  return (
    <div className="store_tab">
      <div className="container">

        <div className="tab_container">
          <div>
            {tabs.map((tab, index) => (
              <button
                className={`${step === index && "active"} tab relative`}
                key={index}
                onClick={() => handleStep(index)}
              >
                {tab.name}

                {
                  tab?.dropdowns && open && <div className="grid grid-cols-1 max-w-full absolute top-16 right-0 left-0 bg-white h-fit">

                    {
                      tab?.dropdowns.map((v, i) => (
                        <button
                          key={i}
                          className={`${v === selectDrop ? "bg-pm text-white" : "bg-gray-100 text-gray-900"}  h-14`}
                          onClick={() => handleDropdown(v)}
                        >{v}</button>
                      ))
                    }

                  </div>
                }
              </button>
            ))}
          </div>

          {step === 0 && <StoreOverview store={store} />}
          {step === 1 && <UploadProductMain store={store} selectDrop={selectDrop} />}
          {step === 2 && <EditProduct store={store} />}
          {step === 3 && <ContactInfo />}
        </div>


      </div>
    </div>
  );
};

export default StoreTab;
