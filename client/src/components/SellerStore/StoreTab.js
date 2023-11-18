import React, { useState } from "react";
import StoreOverview from "./StoreOverview/StoreOverview";
import ContactInfo from "./ContactInfo/ContactInfo";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { setEditProduct } from "@/redux/features/products/productSlice";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";

const UploadProductMain = dynamic(
  () => import("./UploadProduct/UploadProductMain"),
  { ssr: false }
);
const EditProduct = dynamic(() => import("./EditProduct/EditProduct"), {
  ssr: false,
});

const StoreTab = ({ store }) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(0);
  const [selectDrop, setSelectDrop] = useState("Upload New Product");
  const [open, setOpen] = useState(false);

  const handleStep = (index) => {
    if (index === 1) {
      dispatch(setEditProduct(null));
      setOpen(!open);
      setStep(index);
    } else if (index === 2) {
      dispatch(setEditProduct(null));
      setStep(index);
      setOpen(false);
    } else {
      setStep(index);
      setOpen(false);
    }
  };

  const handleDropdown = (v) => {
    console.log(v);
    setSelectDrop(v);
    setOpen(false);
  };
  const tabs = [
    {
      name: "Store overview",
    },
    {
      name: selectDrop,
      dropdowns: [
        selectDrop === "Continue On Draft"
          ? "Upload New Product"
          : "Continue On Draft",
      ],
    },
    {
      name: "Edit Product",
    },
    {
      name: "Profile",
    },
  ];

  return (
    <div className="container store_tab ">
      <div className="tab_container">
        <div className="flex justify-between items-center !w-full overflow-x-auto">
          {tabs.map((tab, index) => (
            <Popover open={tab?.dropdowns && open} placement="bottom">
              <PopoverHandler onClick={() => handleStep(index)}>
                <button
                  className={`${
                    step === index && "active"
                  } tab !mb-0 !w-full relative min-w-[200px]`}
                  key={index}
                >
                  {tab.name}
                </button>
              </PopoverHandler>
              <PopoverContent
                className={`p-0 ${tab?.dropdowns && open ? "" : "opacity-0"}`}
              >
                {tab?.dropdowns && open && (
                  <div className="p-0 min-w-[200px] max-w-[200px] grid grid-cols-1 bg-white">
                    {tab?.dropdowns.map((v, i) => (
                      <button
                        key={i}
                        className={`cursor-pointer tab ${
                          v === selectDrop
                            ? "bg-pm text-white"
                            : "bg-gray-100 text-gray-900"
                        }  h-14`}
                        onClick={() => handleDropdown(v)}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                )}
              </PopoverContent>
            </Popover>
          ))}
        </div>

        <div className="py-3">
          {step === 0 && <StoreOverview store={store} />}
          {step === 1 && (
            <UploadProductMain store={store} selectDrop={selectDrop} />
          )}
          {step === 2 && <EditProduct store={store} />}
          {step === 3 && <ContactInfo />}
        </div>
      </div>
    </div>
  );
};

export default StoreTab;
