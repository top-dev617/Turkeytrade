import {
  useCheckSocialEmailMutation,
  useSocialLoginMutation,
} from "@/redux/features/auth/authApi";
import { iGoogle } from "@/utils/datas/icons";
import {
  Button,
  Dialog,
  Popover,
  PopoverContent,
  PopoverHandler,
  Spinner,
} from "@material-tailwind/react";
import { useGoogleLogin } from "@react-oauth/google";
import React, { useContext, useRef, useState } from "react";
import styles from "@/styles/Register.module.css";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { countries } from "@/utils/datas/countries";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Header from "@/components/Header";
import { AuthContext } from "@/components/context/AuthContext";
import tickMark from "/public/assets/tickMark.png";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import filled from "../../assets/icons/failed.png";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  companyAddress: yup.string().required("Company Address is required"),
  company_name: yup.string().required("Company Name is Required"),
  city: yup.string().required("City is required"),
  zipCode: yup.string().required("Zip Code is required"),
  province: yup.string().required("Province is required"),
  country: yup.string().required("Country is required"),
});

const GoogleLoginButton = () => {
  const { setUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [socialUser, setSocialUser] = useState(null);
  const [success, setSuccess] = useState(false);
  const [socialLogin, { isLoading }] = useSocialLoginMutation();
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

  const router = useRouter();
  const isSeller = router.asPath.includes("type=seller");

  const countryRef = useRef();
  const [time_format, setTime_format] = useState("");

  const [number, setNumber] = useState("");
  const [countryValue, setCountryValue] = useState("");

  const [checkSocialEmail] = useCheckSocialEmailMutation();

  const handleIsExistUser = async (email) => {
    const options = { data: { email: email } };
    const result = await checkSocialEmail(options);
    if (result?.data?.success === false) {
      setIsExist(true);
      return;
    }
    if (result?.data?.success) {
      if (result?.data?.login) {
        localStorage.setItem("turkey-trade-market", result?.data?.access_token);
        setUser(result?.data?.user);
        setSocialUser(null);
        setSuccess(true);
        return;
      }
      setOpen(true);
    }
  };

  console.log(watch("company_name"));

  const handleSetCountry = (country) => {
    if (!country.includes("Country Name")) {
      const result = countries.find((cn) => cn.label === country);
      if (result) {
        setCountryValue((result?.value).toLowerCase());
      }
    }
  };

  const handleSocialLogin = async (data) => {
    console.log(data);
    if (!time_format) {
      return;
    }
    const userFinalData = {
      email: socialUser?.email,
      user_type: socialUser?.user_type,
      name: data?.name,
      company_name: data?.company_name,
      companyAddress: data?.companyAddress,
      city: data?.city,
      zipCode: data?.zipCode,
      province: data?.province,
      country: data?.country,
      phoneNumber: number,
      time_format: time_format,
      role: socialUser?.role,
      otp: 12345,
      isVerified: true,
    };
    const options = {
      data: userFinalData,
    };
    const result = await socialLogin(options);
    if (result?.data?.success) {
      localStorage.setItem("turkey-trade-market", result?.data?.access_token);
      setUser(result?.data?.user);
      setSocialUser(null);
      setSuccess(true);
    } else {
      if (result?.data?.isExist) {
        toast.error("Email Already in use");
      }
    }
    // console.log(result);
  };

  const getUserInfo = (access_token) => {
    fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.email) {
          setSocialUser({
            email: data?.email,
            name: data?.name,
            user_type: "Social",
            isVerified: true,
            role: isSeller ? "Seller" : "Buyer",
          });
          setValue("name", data?.name);
          handleIsExistUser(data?.email);
        }
      });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => getUserInfo(codeResponse.access_token),
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleGoTradeMarket = () => {
    setOpen(false);
    setSocialUser(null);
    router.push("/");
  };

  const handleOkay = () => {
    setOpen(false);
    setSocialUser(null);
    setSuccess(false);
    setIsExist(false);
  };

  return (
    <>
      <div className="mt-4">
        <button
          onClick={() => login()}
          type="button"
          className="w-full h-[56px] rounded-[4px] text-[#332C20] text-[18px] font-medium bg-white border flex justify-between items-center px-[22px]"
        >
          {iGoogle}
          <span className="flex-grow text-nowrap !text-[#332C20]">
            Continue with Google
          </span>
          <span></span>
        </button>
      </div>

      {success && (
        <Dialog
          open={success}
          size="xs"
          className="flex justify-center items-center px-2 py-4 w-full"
        >
          <div className="">
            <div className="flex flex-col justify-center items-center gap-2">
              <img className="w-[100px]" src={tickMark.src} alt="" />
              <h3 className="font-bold font-inter text-pm">
                Logged in Successfully!
              </h3>
            </div>

            <button
              onClick={() => handleGoTradeMarket()}
              className="w-full h-[52px] bg-pm hover:bg-pmd text-white cursor-pointer rounded-md max-w-fit px-4 mt-4 font-inter font-semibold"
            >
              Go to my Turkeytrademarket
            </button>
          </div>
        </Dialog>
      )}

      {isExist && (
        <Dialog
          open={isExist}
          size="xs"
          className="flex justify-center items-center px-2 py-4 w-full"
        >
          <div className="">
            <div className="flex flex-col justify-center items-center gap-2">
              <img className="w-[80px]" src={filled.src} alt="" />
              <h3 className="font-bold font-inter text-red-600">
                Email Already in use!
              </h3>
            </div>

            <div className="flex justify-center items-center">
              <button
                onClick={() => handleOkay()}
                className="w-[150px] h-[42px] mx-auto bg-pm hover:bg-pmd text-white cursor-pointer rounded-md px-4 mt-4 font-inter font-semibold"
              >
                Okay
              </button>
            </div>
          </div>
        </Dialog>
      )}

      <Dialog open={open} size="xxl" className="p-0 fixed overflow-y-auto">
        <Header />
        <div className="login container">
          <form
            className={`!max-w-[600px] mt-4`}
            onSubmit={handleSubmit(handleSocialLogin)}
          >
            <div>
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

              <div className="flex flex-col md:flex-row gap-3 mb-2">
                <div className="">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mb-1"
                  >
                    Company Name<span>*</span>
                  </label>
                  <input
                    {...register("company_name", { required: true })}
                    type="text"
                    placeholder="Company Name"
                    className={`mb-0 ${
                      errors.company_name
                        ? "border !border-red-600"
                        : "border-none"
                    }`}
                    autoComplete="off"
                  />
                  {errors.company_name && (
                    <small className="text-red-600 text-sm">
                      {errors.company_name.message}
                    </small>
                  )}
                </div>
                <div className="">
                  <label for="exampleInputEmail1" className="form-label mb-1">
                    Company Address<span>*</span>
                  </label>
                  <input
                    {...register("companyAddress", { required: true })}
                    type="text"
                    placeholder="Company Address"
                    className={`mb-0 ${
                      errors.companyAddress
                        ? "border !border-red-600"
                        : "border-none"
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
                        <PopoverContent className="!z-[99999999] grid grid-cols-1 max-w-[250px] max-h-[350px] overflow-y-auto w-full p-0 shadow-none">
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

              <button
                type="submit"
                className="bg-pm hover:bg-pmd text-white flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? <Spinner color="white" /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default GoogleLoginButton;
