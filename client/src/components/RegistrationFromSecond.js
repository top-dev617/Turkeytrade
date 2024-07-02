import Link from "next/link";
import React, { useRef, useState } from "react";
import styles from "@/styles/Register.module.css";
import RegistrationVerificationModal from "@/utils/modals/RegistrationVerificationModal";
import { countries } from "@/utils/datas/countries";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostRegisterMutation } from "@/redux/features/auth/authApi";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Spinner,
} from "@material-tailwind/react";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  companyAddress: yup.string().required("Company Address is required"),
  city: yup.string().required("City is required"),
  zipCode: yup.string().required("Zip Code is required"),
  province: yup.string().required("Province is required"),
  country: yup.string().required("Country is required"),
});

const RegistrationFromSecond = ({ userData, setRegisterForm }) => {
  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const countryRef = useRef();

  const [postRegister, { isLoading }] = usePostRegisterMutation();

  const [time_format, setTime_format] = useState("");

  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [countryValue, setCountryValue] = useState("");

  const handleSetCountry = (country) => {
    if (!country.includes("Country Name")) {
      const result = countries.find((cn) => cn.label === country);
      if (result) {
        setCountryValue((result?.value).toLowerCase());
      }
    }
  };
  // console.log(countryValue);

  const registerButton = useRef(null);
  const [userAgreement, setUserAgreement] = useState(false);

  const handleUser = async (data) => {
    if (!time_format) {
      return;
    }
    const userFinalData = {
      ...userData,
      name: data?.name,
      companyAddress: data?.companyAddress,
      city: data?.city,
      zipCode: data?.zipCode,
      province: data?.province,
      country: data?.country,
      phoneNumber: number,
      time_format: time_format,
    };
    const options = { data: userFinalData };
    if (userAgreement) {
      const result = await postRegister(options);
      if (result?.data?.status === 200) {
        registerButton.current.click();
        setError("");
        return;
      }
    } else {
      setError("Please accept user agreement!");
    }
  };

  return (
    <>
      <form
        className={`${styles.registerFormSecondContainer}`}
        onSubmit={handleSubmit(handleUser)}
      >
        <div>
          <h6>Register</h6>
          <p style={{ marginBottom: "30px" }}>
            Already have an account? <Link href="signin">Login</Link>
          </p>

          <div className="mb-2">
            <label for="exampleInputEmail1" className="form-label mb-1">
              Full Name<span>*</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Full Name "
              className={`mb-0 ${
                errors.name ? "border !border-red-600" : "border-none"
              }`}
              autoComplete="off"
              name="name"
            />
            {errors.name && (
              <small className="text-red-600 text-sm">
                {errors.name.message}
              </small>
            )}
          </div>

          <div className="mb-2">
            <label for="exampleInputEmail1" className="form-label mb-1">
              Company Address<span>*</span>
            </label>
            <input
              {...register("companyAddress", { required: true })}
              type="text"
              placeholder="Company Address"
              className={`mb-0 ${
                errors.companyAddress ? "border !border-red-600" : "border-none"
              }`}
              autoComplete="off"
              name="companyAddress"
            />
            {errors.companyAddress && (
              <small className="text-red-600 text-sm">
                {errors.companyAddress.message}
              </small>
            )}
          </div>

          <div className="d-flex gap-3 mb-2">
            <div className="">
              <label for="exampleInputEmail1" className="form-label mb-1">
                City<span>*</span>
              </label>
              <input
                {...register("city", { required: true })}
                type="text"
                placeholder="City"
                className={`mb-0 ${
                  errors.city ? "border !border-red-600" : "border-none"
                }`}
                autoComplete="off"
                name="city"
              />
              {errors.city && (
                <small className="text-red-600 text-sm">
                  {errors.city.message}
                </small>
              )}
            </div>

            <div className="">
              <label for="exampleInputEmail1" className="form-label mb-1">
                Zip / Postal Code<span>*</span>
              </label>
              <input
                {...register("zipCode", { required: true })}
                type="text"
                placeholder="Zip / Postal Code"
                className={`mb-0 ${
                  errors.zipCode ? "border !border-red-600" : "border-none"
                }`}
                name="zipCode"
              />
              {errors.zipCode && (
                <small className="text-red-600 text-sm">
                  {errors.zipCode.message}
                </small>
              )}
            </div>
          </div>

          <div className="d-flex gap-3 mb-2">
            <div className="">
              <label for="exampleInputEmail1" className="form-label mb-1">
                Province<span>*</span>
              </label>
              <input
                {...register("province", { required: true })}
                type="text"
                placeholder="Province"
                className={`mb-0 ${
                  errors.province ? "border !border-red-600" : "border-none"
                }`}
                autoComplete="off"
                name="province"
              />
              {errors.province && (
                <small className="text-red-600 text-sm">
                  {errors.province.message}
                </small>
              )}
            </div>

            <div className="w-full">
              <label for="exampleInputEmail1" className="form-label mb-1">
                Country<span>*</span>
              </label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Popover placement="bottom-start">
                    <PopoverHandler ref={countryRef}>
                      <Button
                        {...field}
                        className={`input h-[62px] !text-[#94959B] shadow-none border-none normal-case text-left px-3 mb-1 !w-full !bg-[#f6f6f6] ${
                          errors.country ? "border !border-red-600" : ""
                        }`}
                      >
                        <span className="!text-[#94959B] font-normal">
                          {countries?.find(
                            (group) => group.label === field.value
                          )?.label || ""}
                        </span>
                      </Button>
                    </PopoverHandler>
                    <PopoverContent className="grid grid-cols-1 max-w-[250px] max-h-[350px] overflow-y-auto w-full p-0 shadow-none">
                      {countries?.map((value, index) => (
                        <Button
                          key={index}
                          className="h-8 bg-white text-black hover:!bg-pm rounded-none hover:!text-white shadow-none border-none normal-case text-left outline-none px-3 py-0"
                          onClick={() => {
                            field.onChange(value?.label);
                            handleSetCountry(value.label);
                            countryRef.current.click();
                          }}
                        >
                          {value?.label}
                        </Button>
                      ))}
                    </PopoverContent>
                  </Popover>
                )}
                {...register("country", { required: true })}
              />
              {/* <select
                onClick={(e) => handleSetCountry(e.target.value)}
                {...register("country", { required: true })}
                className={`mb-0 form-select w-100 py-[19px] bg-[#f6f6f6] ${
                  errors.province ? "border !border-red-600" : "border-none"
                }`}
                aria-label="Default select example"
                name="country"
              >
                {countries?.map((country, index) => (
                  <option key={index} value={country?.label}>
                    {country?.label}
                  </option>
                ))}
              </select> */}
              {errors.country && (
                <small className="text-red-600 text-sm">
                  {errors.country.message}
                </small>
              )}
            </div>
          </div>

          <div className="w-100 h-fit mb-8">
            <label for="exampleInputPassword1" className="form-label">
              Phone Number<span>*</span>
            </label>
            <PhoneInput
              inputProps={{
                name: "phoneNumber",
                required: true,
                autoFocus: true,
              }}
              onChange={(e) => setNumber(e)}
              name="phoneNumber"
              required={true}
              enableAreaCodes={true}
              country={countryValue && countryValue}
              className="input mb-0"
              buttonStyle={{
                border: "none",
                backgroundColor: "#f6f6f6",
                fontSize: "16px",
                borderRadius: "20px",
              }}
              inputStyle={{
                border: "none",
                backgroundColor: "#f6f6f6",
                fontSize: "16px",
              }}
              containerStyle={{ border: "none", boxShadow: "none" }}
            />
            {errors.phoneNumber && (
              <small className="text-red-600 text-sm">
                {errors.phoneNumber.message}
              </small>
            )}
          </div>

          <div className="w-100 h-fit mb-8">
            <label for="exampleInputPassword1" className="form-label">
              Choose 12 or 24 Hours Time Format<span>*</span>
            </label>
            <div className="flex items-center gap-4 relative">
              <div className="grid grid-cols-6 w-8 absolute -top-10 left-12 opacity-0 z-10">
                <input
                  type="text"
                  required={!time_format}
                  className="opacity-0"
                />
              </div>
              <div className="d-flex gap-2 align-items-center mb-3 z-50">
                <input
                  type="checkbox"
                  className="mb-0 cursor-pointer"
                  checked={time_format === "12h"}
                  onClick={() => setTime_format("12h")}
                />
                <p className={`mb-0 ${styles.agreementText}`}>12h</p>
              </div>
              <div className="d-flex gap-2 align-items-center mb-3 z-50">
                <input
                  type="checkbox"
                  className="mb-0 cursor-pointer"
                  checked={time_format === "24h"}
                  onClick={() => setTime_format("24h")}
                />
                <p className={`mb-0 ${styles.agreementText}`}>24h</p>
              </div>
            </div>
          </div>

          {error && <small className="text-red-600 text-sm">{error}</small>}
          <div className="d-flex gap-2 items-start mb-3">
            <input
              type="checkbox"
              className="mb-0"
              checked={userAgreement}
              onClick={() => setUserAgreement(!userAgreement)}
            />
            <p className={`mb-0 ${styles.agreementText}`}>
              I agree to the{" "}
              <Link target="_blank" href="/help/terms-and-conditions">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link target="_blank" href="/help/privacy-policy">
                Privacy policy
              </Link>
            </p>
          </div>
          <div className="d-flex gap-5">
            <button
              type="submit"
              style={{ backgroundColor: "#F2F2F2", color: "#222" }}
              onClick={() => setRegisterForm((prev) => prev - 1)}
            >
              Back
            </button>
            {userAgreement ? (
              <button
                type="submit"
                className="bg-pm hover:bg-pmd text-white flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? <Spinner color="white" /> : "Register"}
              </button>
            ) : (
              <button
                disabled
                className="!bg-gray-400  text-white flex justify-center items-center cursor-not-allowed"
              >
                Register
              </button>
            )}
          </div>
        </div>
      </form>

      <button
        className="btn btn-primary d-none"
        data-bs-target="#exampleModalToggle"
        data-bs-toggle="modal"
        ref={registerButton}
      >
        Open first modal
      </button>
      <RegistrationVerificationModal userRegistrationInfo={userData} />
    </>
  );
};

export default RegistrationFromSecond;
