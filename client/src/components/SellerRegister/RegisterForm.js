import RegistrationSuccess from "@/utils/modals/RegistrationSuccess";
import Link from "next/link";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { usePostStoreRequestMutation } from "@/redux/features/stores/storeApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import { countries } from "@/utils/datas/countries";

const RegisterForm = ({ user, store }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const closeModalRef = useRef(null);
  const router = useRouter();

  const [postStoreRequest, { isLoading }] = usePostStoreRequestMutation();

  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleRegister = async (data) => {
    setLoading(true);
    const registerData = {
      user: user?._id,
      store_name: data?.store_name,
      company_address: {
        country: data?.country,
        province: data?.province,
        city: data?.city,
        address: data?.address,
        postal_code: data?.postal_code,
      },
      business_information: {
        business_registration_certificate: "",
        business_certificate_number: data?.business_certificate_number,
        company_website: data?.company_website,
      },
      tax_information: {
        kdv_number: data?.kdv_number,
      },
    };

    const newData = new FormData();
    newData.append("storeData", JSON.stringify(registerData));
    if (data?.business_registration_certificate) {
      newData.append(
        "business_registration_certificate",
        data?.business_registration_certificate[0]
      );
    }

    const options = {
      data: newData,
    };
    const result = await postStoreRequest(options);
    // console.log(result)
    setLoading(false);
    if (result?.data?.status === true) {
      localStorage.setItem("storeModal", JSON.stringify("on"));
      toast.success("Selling Request Successfully");
      router.push("/mystore");
    } else {
      toast.error("Selling Request unsuccessfully");
    }
  };

  return (
    <div className="sr_form">
      <div className="container">
        <p className="title">Please fill in this form</p>
        <form onSubmit={handleSubmit(handleRegister)}>
          {/* Company Address part */}
          <div className="form_gap">
            <p className="subtitle">Company Address</p>
            <div className="row">
              <div className="col-12 col-md-6">
                <div>
                  <label>
                    Country <span>*</span>
                  </label>
                  <select
                    {...register("country", { required: true })}
                    aria-label="Default select example"
                    name="country"
                    className={`px-2 input block py-4 ${
                      errors.country && "border !border-red-600"
                    }`}
                  >
                    <option value="" style={{ color: "#94959B" }}>
                      Country Name
                    </option>
                    {countries?.map((country) => (
                      <option
                        value={country?.label}
                        selected={user?.country === country?.label}
                      >
                        {country?.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div>
                  <label>
                    Province <span>*</span>
                  </label>
                  <input
                    {...register("province", { required: true })}
                    type="text"
                    placeholder="Province"
                    defaultValue={user?.province}
                    className={`px-2 ${
                      errors.province && "border !border-red-600"
                    }`}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div>
                  <label>
                    City <span>*</span>
                  </label>
                  <input
                    {...register("city", { required: true })}
                    type="text"
                    placeholder="City"
                    defaultValue={user?.city}
                    className={`px-2 ${
                      errors.city && "border !border-red-600"
                    }`}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div>
                  <label>
                    Address <span>*</span>
                  </label>
                  <input
                    {...register("address", { required: true })}
                    className={`px-2 ${
                      errors.address && "border !border-red-600"
                    }`}
                    type="text"
                    placeholder="Address"
                    defaultValue={user?.companyAddress}
                  />
                </div>
              </div>
              <div className="col-12">
                <div>
                  <label>
                    Postal Code <span>*</span>
                  </label>
                  <input
                    {...register("postal_code", { required: true })}
                    className={`px-2 ${
                      errors.postal_code && "border !border-red-600"
                    }`}
                    type="text"
                    placeholder="Postal Code"
                    defaultValue={user?.zipCode}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Business information part */}
          <div className="form_gap">
            <p className="subtitle">Business information </p>
            <div className="row">
              <div className="col-12">
                <div>
                  <label>
                    Business name <span>*</span>
                  </label>
                  <input
                    {...register("store_name", { required: true })}
                    className={`px-2 ${
                      errors.store_name && "border !border-red-600"
                    }`}
                    type="text"
                    placeholder="Business Name"
                    defaultValue={user?.company_name}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div>
                  <label>
                    Trade Registry Certificate / Ticaret Sicil Belgesi{" "}
                    <span>*</span>
                  </label>
                  <input
                    {...register("business_registration_certificate", {
                      required: true,
                    })}
                    className={`px-2 ${
                      errors.business_registration_certificate &&
                      "border !border-red-600"
                    }`}
                    type="file"
                    multiple={false}
                    accept=".png, .jpg, .jpeg"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div>
                  <label>
                    Central Registration System Number / MERSIS No{" "}
                    <span>*</span>
                  </label>
                  <input
                    {...register("business_certificate_number", {
                      required: true,
                    })}
                    className={`px-2 ${
                      errors.business_certificate_number &&
                      "border !border-red-600"
                    }`}
                    type="text"
                    placeholder="Central Registration System Number / MERSIS No"
                  />
                </div>
              </div>
              <div className="col-12">
                <div>
                  <label>Company website</label>
                  <input
                    {...register("company_website", {
                      required: false,
                      pattern: {
                        value: /^(ftp|http|https):\/\/[^ "]+$/,
                        message: "Invalid URL format",
                      },
                    })}
                    className={`px-2 ${
                      errors.company_website && "border !border-red-600"
                    }`}
                    type="url"
                    placeholder="Company website"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Tax information part */}
          <div className="form_gap">
            <p className="subtitle">Tax information </p>
            <div className="row">
              <div className="col-12 col-md-6">
                <div>
                  <label>
                    Tax Number / Vergi No <span>*</span>
                  </label>
                  <input
                    {...register("kdv_number", { required: true })}
                    className={`px-2 ${
                      errors.kdv_number && "border !border-red-600"
                    }`}
                    type="number"
                    placeholder="Tax Number / Vergi No"
                  />
                </div>
              </div>
            </div>
            {!store && (
              <div className="d-flex gap-1 align-items-center">
                <input
                  onClick={() => setAgree(!agree)}
                  style={{ width: "unset" }}
                  type="checkbox"
                  checked={agree}
                  className="mb-0 cursor-pointer"
                />
                <p
                  onClick={() => setAgree(!agree)}
                  className="agree cursor-pointer"
                >
                  I agree to Turkeytrademarket{" "}
                  <Link href="#"> Terms and conditions</Link>{" "}
                </p>
              </div>
            )}
            {!store && (
              <div className="text-center mt-4">
                {agree ? (
                  <button
                    className=" submit_btn flex justify-center items-center"
                    type="submit"
                    disabled={isLoading || loading}
                  >
                    {isLoading || loading ? (
                      <Spinner color="white" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                ) : (
                  <button
                    className=" submit_btn flex justify-center items-center !bg-blue-gray-300"
                    disabled
                  >
                    Submit
                  </button>
                )}
              </div>
            )}
          </div>
        </form>

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
                  ref={closeModalRef}
                  style={{ position: "absolute", right: "40px" }}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
                <RegistrationSuccess closeModalRef={closeModalRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
