import { useStatusUpdateMutation } from "@/redux/features/stores/storeApi";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Spinner,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const statusItems = [
  { id: 1, name: "Accept", status: "accept" },
  { id: 2, name: "Pending", status: "pending" },
  { id: 3, name: "Decline", status: "decline" },
];

const StoreStatus = ({ store, index, refetch }) => {
  const [statusUpdate, { isLoading }] = useStatusUpdateMutation();
  const [openPopover, setOpenPopover] = useState("");

  const updateStatus = async (status) => {
    setOpenPopover("");
    const status_info = [
      ...store?.status_info,
      {
        old_status: store?.status,
        status: status,
        date: new Date().toISOString(),
      },
    ];
    const options = {
      id: store?._id,
      data: { status: status, status_info },
    };
    const result = await statusUpdate(options);
    if (result?.data?.status === true) {
      refetch();
      toast.success(result?.data?.message);
    } else {
      toast.error(result?.data?.message);
    }
    setOpenPopover("");
  };

  return (
    <Popover
      open={openPopover === index ? true : false}
      handler={() => setOpenPopover("")}
      placement="bottom"
    >
      <PopoverHandler onClick={() => setOpenPopover(index)}>
        <Button
          className={` py-2 rounded text-center shadow-none text-black ${
            (store?.status === "accept" && "bg-[#DAFFDA]") ||
            (store?.status === "pending" && "bg-[#D9DBDF]") ||
            (store?.status === "decline" && "bg-[#FFDCDC]")
          }`}
        >
          {isLoading ? <Spinner className="text-white" /> : `${store?.status}`}
        </Button>
      </PopoverHandler>
      <PopoverContent className="w-full mx-auto p-1 grid grid-cols-1 gap-1 max-w-[108px] rounded-[5px]">
        {statusItems?.map((item, i) => (
          <Button
            key={i}
            onClick={() => updateStatus(item?.status)}
            disabled={isLoading}
            className={`w-full rounded flex justify-center items-center shadow-none text-black h-10 ${
              (item?.status === "accept" && "bg-[#DAFFDA]") ||
              (item?.status === "pending" && "bg-[#D9DBDF]") ||
              (item?.status === "decline" && "bg-[#FFDCDC]")
            } ${item?.status === store?.status && "hidden"}`}
          >
            {item?.name}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default StoreStatus;
