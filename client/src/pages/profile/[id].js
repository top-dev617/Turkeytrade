import SteelManufacturer from "@/components/SellerStore/ContactInfo/SteelManufacturer";
import Loading from "@/components/commons/Loading";
import { useGetUserQuery } from "@/redux/features/auth/authApi";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const CompanyDetailsById = () => {
  const { query } = useRouter();
  const { data: user, refetch, isLoading } = useGetUserQuery(query.id);

  useEffect(() => {
    if (!user) {
      refetch();
    }
  }, [query?.id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mt-4 px-4 bg-white min-h-screen">
          <div className="contact_info !px-0 md:!px-4">
            <SteelManufacturer
              store={null}
              isAuthor={false}
              company={user?.company_name}
              holderName={user?.name}
              joined_date={user?.createdAt}
            />
            <div className=" relative h-fit py-4">
              <div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="Email"
                      disabled
                      readOnly={true}
                      defaultValue={user?.email}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Telephone No </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      readOnly={true}
                      defaultValue={user?.phoneNumber}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Province</label>
                    <input
                      type="text"
                      name="province"
                      placeholder="Province"
                      readOnly={true}
                      defaultValue={user?.province}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      readOnly={true}
                      defaultValue={user?.city}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Address</label>
                    <input
                      type="text"
                      name="companyAddress"
                      placeholder="Company Address"
                      readOnly={true}
                      defaultValue={user?.companyAddress}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Postal code</label>
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="Zip Code / Postal Code"
                      readOnly={true}
                      defaultValue={user?.zipCode}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-fit w-full">
              <div className="flex flex-col gap-2 label-list mt-4 max-w-[400px]">
                <div className="grid md:grid-cols-2 gap-2">
                  <h1>Company name</h1>
                  <h1 className="font-bold">: {user?.company_name}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyDetailsById;
