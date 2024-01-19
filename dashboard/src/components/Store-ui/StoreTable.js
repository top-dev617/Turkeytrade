import React, { useEffect, useState } from "react";
import StoreHeader from "./StoreHeader";
import StoreTableHeader from "./StoreTableHeader";
import {
  useGetStoresQuery,
  useStatusUpdateMutation,
} from "@/redux/features/stores/storeApi";
import { base_url } from "@/lib/global";

import StoreStatus from "./StoreStatus";
// import moment from "moment";
const moment = require("moment-timezone");
import { iArrowDown, iArrowUp } from "@/utils/icons/icons";
import StoreViewInfo from "./StoreViewInfo";
import storeLogo from "../../../public/assets/store.png";
import { DATE_FORMATE, TIME_FORMATE } from "@/lib/constants";

const StoreTable = ({ logout }) => {
  const { data, refetch } = useGetStoresQuery();
  const [stores, setStores] = useState([]);
  const [openRow, setOpenRow] = useState(null);
  //   console.log(data);

  useEffect(() => {
    setStores(data?.data);
  }, [data]);

  const handleOpenRow = (value) => {
    if (openRow && openRow?._id === value?._id) {
      setOpenRow(null);
    } else {
      setOpenRow(value);
    }
  };

  // console.log(openRow);
  // console.log(data?.data);

  return (
    <div className="w-full px-2">
      <StoreHeader stores={data?.data} setStores={setStores} logout={logout} />
      <div className="min-w-[1225px] overflow-x-auto w-full">
        <StoreTableHeader />

        <div className="grid grid-cols-1 gap-[28px] mt-[28px]">
          {stores?.map((store, index) => (
            <div key={index}>
              <div className="h-[75px] w-full rounded-[10px] grid grid-cols-12 items-center bg-white border border-black">
                <div
                  className={`flex justify-center items-center h-[30px] col-span-1 w-full border-r-2 border-[#D9D9D9]`}
                >
                  {store?.logo ? (
                    <img
                      className="h-full w-full object-contain rounded-lg object-center"
                      src={`${base_url}/uploads/${store?.logo}`}
                      alt="nature image"
                      onError={(e) => (e.target.src = storeLogo.src)}
                    />
                  ) : (
                    <div className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain w-12 h-12 rounded-full flex justify-center items-center text-xl font-bold p-1">
                      {store?.store_name?.slice(0, 1)}
                    </div>
                  )}
                </div>
                <div
                  className={`flex justify-center items-center h-[30px] col-span-2 w-full border-r-2 border-[#D9D9D9] px-2`}
                >
                  <h1 className="text-black font-inter text-[15px] font-medium tracking-[0.2px] text-break text-center">
                    {store?.store_name}
                  </h1>
                </div>
                <div
                  className={`flex justify-center items-center h-[30px] col-span-2 w-full border-r-2 border-[#D9D9D9] px-2`}
                >
                  <h1 className="text-black font-inter text-[15px] font-medium tracking-[0.2px] text-break text-center">
                    {store?.user?.name}
                  </h1>
                </div>
                <div
                  className={`flex justify-center items-center h-[30px] col-span-1 w-full border-r-2 border-[#D9D9D9]`}
                >
                  <h1 className="text-black font-inter text-[15px] font-medium tracking-[0.2px] text-break">
                    {store?.user?.role}
                  </h1>
                </div>
                <div
                  className={`flex justify-center items-center h-[30px] col-span-1 w-full border-r-2 border-[#D9D9D9]`}
                >
                  <StoreStatus store={store} index={index} refetch={refetch} />
                </div>
                <div
                  className={`flex justify-center items-center h-[30px] col-span-2 w-full border-r-2 border-[#D9D9D9]`}
                >
                  <h1 className="text-black font-inter text-[15px] font-medium tracking-[0.2px] text-break text-center">
                    <small className="text-xs text-center block">
                      {moment(store?.joined_date)
                        .tz("Europe/Stockholm")
                        .format(TIME_FORMATE)}
                    </small>
                    <p className="font-inter font-semibold text-sm text-black">
                      {moment(store?.joined_date)
                        .tz("Europe/Stockholm")
                        .format(DATE_FORMATE)}
                    </p>
                  </h1>
                </div>

                <div
                  className={`flex justify-center items-center h-[30px] col-span-2 w-full border-r-2 border-[#D9D9D9]`}
                >
                  <h1 className="text-black font-inter text-[15px] font-medium tracking-[0.2px] text-break">
                    <small className="text-xs text-center block">
                      {store?.status_info?.length > 0
                        ? moment(
                            store?.status_info[store?.status_info?.length - 1]
                              ?.date
                          )
                            .tz("Europe/Stockholm")
                            .format(TIME_FORMATE)
                        : moment(store?.joined_date)
                            .tz("Europe/Stockholm")
                            .format(TIME_FORMATE)}
                    </small>
                    <p className="font-inter font-semibold text-sm text-black">
                      {store?.status_info?.length > 0
                        ? moment(
                            store?.status_info[store?.status_info?.length - 1]
                              ?.date
                          )
                            .tz("Europe/Stockholm")
                            .format(DATE_FORMATE)
                        : moment(store?.joined_date)
                            .tz("Europe/Stockholm")
                            .format(DATE_FORMATE)}
                    </p>
                  </h1>
                </div>
                <div
                  className={`flex justify-center items-center h-[30px] col-span-1 w-full`}
                >
                  <div
                    onClick={() => handleOpenRow(store)}
                    className="cursor-pointer"
                  >
                    <h1 className="text-black font-inter text-[15px] font-medium tracking-[0.2px] text-break hover:text-pm">
                      {openRow?._id === store?._id ? iArrowUp : iArrowDown}
                    </h1>
                  </div>
                </div>
              </div>
              {openRow?._id === store?._id && <StoreViewInfo store={store} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreTable;
