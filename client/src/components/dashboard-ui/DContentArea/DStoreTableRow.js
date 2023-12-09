import { useStatusUpdateMutation } from "@/redux/features/stores/storeApi";
import { base_url } from "@/utils/auth/global";
import {
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Chip,
  Spinner,
  Button,
  PopoverContent,
  PopoverHandler,
  Popover,
} from "@material-tailwind/react";

import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const statusItems = [
  { id: 1, name: "Accept", status: "accept" },
  { id: 2, name: "Pending", status: "pending" },
  { id: 3, name: "Decline", status: "decline" },
];

const DStoreTableRow = ({ index, data, refetch }) => {
  const [statusUpdate, { isLoading }] = useStatusUpdateMutation();
  const [openPopover, setOpenPopover] = useState(false);

  const updateStatus = async (status) => {
    setOpenPopover(false);
    const options = {
      id: data?._id,
      data: { status: status },
    };
    const result = await statusUpdate(options);
    if (result?.data?.status === true) {
      refetch();
      toast.success(result?.data?.message);
    } else {
      toast.error(result?.data?.message);
    }
    setOpenPopover(false);
  };
  return (
    <tr
      key={index}
      className="w-full py-2 bg-blue-gray-50 border-b border-white"
    >
      <td className="text-gray-900 px-4 py-1">
        <div className="flex items-center gap-3">
          {data?.logo ? (
            <Avatar
              src={`${base_url}/uploads/${data?.logo}`}
              alt=""
              size="md"
              className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain w-12 h-12 rounded-full p-1"
            />
          ) : (
            <div className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain w-12 h-12 rounded-full flex justify-center items-center text-xl font-bold p-1">
              {data?.store_name.slice(0, 1)}
            </div>
          )}
        </div>
      </td>
      <td className="text-gray-900 px-4 py-1">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {data?.store_name}
        </Typography>
      </td>
      <td className="text-gray-900 px-4 py-1">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {data?.user?.name}
        </Typography>
      </td>
      <td className="text-gray-900 px-4 py-1">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {data?.user?.role}
        </Typography>
      </td>
      <td className="text-gray-900 px-4 py-1">
        <Popover open={openPopover} handler={setOpenPopover} placement="bottom">
          <PopoverHandler>
            <Button
              className={` py-2 rounded text-center shadow-none
            ${
              (data?.status === "accept" && "bg-pm") ||
              (data?.status === "pending" && "bg-indigo-600") ||
              (data?.status === "decline" && "bg-red-600")
            }`}
            >
              {isLoading ? (
                <Spinner className="text-white" />
              ) : (
                `${data?.status}`
              )}
            </Button>
          </PopoverHandler>
          <PopoverContent className="w-44 mx-auto p-1 grid grid-cols-1 gap-1">
            {statusItems?.map((item, i) => (
              <Button
                key={i}
                onClick={() => updateStatus(item?.status)}
                disabled={isLoading}
                className={`w-full rounded flex justify-center items-center shadow-none h-10 ${
                  (item?.status === "accept" && "bg-pm") ||
                  (item?.status === "pending" && "bg-indigo-600") ||
                  (item?.status === "decline" && "bg-red-600")
                } ${item?.status === data?.status && "hidden"}`}
              >
                {item?.name}
              </Button>
            ))}
          </PopoverContent>
        </Popover>
      </td>

      <td className="text-gray-900 px-4 py-1">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {moment(data?.createdAt).format("DD/MMM/YYYY")}
        </Typography>
      </td>

      <td className="text-gray-900 px-4 py-1">
        <div>
          <IconButton
            variant="text"
            color="blue"
            className="font-bold bg-blue-50"
          >
            <svg
              class="w-6 h-6 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </IconButton>
        </div>
      </td>
    </tr>
  );
};

export default DStoreTableRow;
