import StoreBanner from "@/components/SellerStore/StoreBanner";
import Loading from "@/components/commons/Loading";
import CompanyInfo from "@/components/storeInfo/CompanyInfo";
import InfoTab from "@/components/storeInfo/InfoTab";
import { useGetStoreInfoQuery } from "@/redux/features/stores/storeApi";
import { useRouter } from "next/router";
import React from "react";

const sellerStoreInfo = () => {
  const router = useRouter();
  const { storeId } = router.query;
  const { data, isLoading } = useGetStoreInfoQuery(storeId);

  return (
    <div className="pt-8">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <StoreBanner store={data?.data} />
          <CompanyInfo store={data?.data} />
        </>
      )}

      <InfoTab store={data?.data} />
    </div>
  );
};

export default sellerStoreInfo;
