import React, { useState } from "react";
import login from "../../public/assets/login-banner.png";
import Link from "next/link";
import RegistrationFromSecond from "@/components/RegistrationFromSecond";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCheckEmailMutation } from "@/redux/features/auth/authApi";
import { Spinner } from "@material-tailwind/react";
import { iEyeHide, iEyeShow } from "@/utils/icons/icons";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  companyName: yup.string().required("Company Name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).+$/,
      "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character"
    ),
  repeatPassword: yup
    .string()
    .required("Repeat Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const RegisterPage = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [registerForm, setRegisterForm] = useState(1);
  const router = useRouter();
  const isSeller = router.asPath.includes("type=seller");
  const [firstData, setFirstData] = useState(null);

  const [openPassword, setOpenPassword] = useState(false);
  const [openConfirmPassword, setOpenConfirmPassword] = useState(false);

  const [checkEmail, { isLoading }] = useCheckEmailMutation();

  const handleData = async (data) => {
    const options = { data: { email: data?.email } };
    const result = await checkEmail(options);
    if (result?.data?.success === false) {
      setError("email", {
        type: "manual",
        message: "Email Already Taken",
      });
      return;
    } else {
      const userData = {
        email: data?.email,
        password: data?.password,
        companyName: data?.companyName,
        role: isSeller ? "Seller" : "Buyer",
      };
      setFirstData(userData);
      setRegisterForm(2);
    }
  };

  return (
    <div className="login">
      <div className="row m-0">
        <div className="col-12 col-lg-6 my-auto">
          {registerForm === 1 && (
            <form onSubmit={handleSubmit(handleData)}>
              <div>
                <h6>Register</h6>
                <p>
                  Already have an account? <Link href="signin">Login</Link>
                </p>

                <div className="mb-2">
                  <label for="exampleInputEmail1" className="form-label mb-1">
                    Email<span>*</span>
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="Email "
                    className={`mb-0 ${
                      errors.email ? "border !border-red-600" : "border-none"
                    }`}
                    autoComplete="off"
                    name="email"
                  />
                  {errors.email && (
                    <small className="text-red-600 text-sm">
                      {errors.email.message}
                    </small>
                  )}
                </div>

                <div className="mb-2">
                  <label
                    for="exampleInputPassword1"
                    className="form-label mb-1"
                  >
                    Password<span>*</span>
                  </label>
                  <div className="relative">
                    <input
                      {...register("password", { required: true })}
                      type={openPassword ? "text" : "password"}
                      placeholder="Password "
                      className={`mb-0 !pr-10 ${
                        errors.password
                          ? "border !border-red-600"
                          : "border-none"
                      }`}
                      autoComplete="off"
                      name="password"
                    />
                    <div
                      onClick={() => setOpenPassword(!openPassword)}
                      className="absolute top-5 right-3 cursor-pointer"
                    >
                      {openPassword ? iEyeShow : iEyeHide}
                    </div>
                  </div>
                  {errors.password ? (
                    <small className="text-red-600 text-sm">
                      {errors.password.message}
                    </small>
                  ) : (
                    <small className="text-green-600 text-sm leading-3">
                      Password must contain at least one number, one uppercase
                      letter, one lowercase letter, and one special character
                    </small>
                  )}
                </div>

                <div className="mb-2">
                  <label
                    for="exampleInputPassword1"
                    className="form-label mb-1"
                  >
                    Repeat Password<span>*</span>
                  </label>
                  <div className="relative">
                    <input
                      {...register("repeatPassword", { required: true })}
                      type={openConfirmPassword ? "text" : "password"}
                      placeholder="Repeat Password "
                      className={`mb-0 !pr-10 ${
                        errors.repeatPassword
                          ? "border !border-red-600"
                          : "border-none"
                      }`}
                      autoComplete="off"
                      name="repeatPassword"
                    />
                    <div
                      onClick={() =>
                        setOpenConfirmPassword(!openConfirmPassword)
                      }
                      className="absolute top-5 right-3 cursor-pointer"
                    >
                      {openConfirmPassword ? iEyeShow : iEyeHide}
                    </div>
                  </div>
                  {errors.repeatPassword && (
                    <small className="text-red-600 text-sm">
                      {errors.repeatPassword.message}
                    </small>
                  )}
                </div>

                <div className="mb-2">
                  <label
                    for="exampleInputPassword1"
                    className="form-label mb-1"
                  >
                    Company Name<span>*</span>
                  </label>
                  <input
                    {...register("companyName", { required: true })}
                    type="text"
                    className={`mb-0 ${
                      errors.companyName
                        ? "border !border-red-600"
                        : "border-none"
                    }`}
                    placeholder="Company Name"
                    name="companyName"
                  />
                  {errors.companyName && (
                    <small className="text-red-600 text-sm">
                      {errors.companyName.message}
                    </small>
                  )}
                </div>

                <div className="d-flex gap-5 mt-4">
                  <button
                    onClick={() => router.back()}
                    type="button"
                    style={{ backgroundColor: "#F2F2F2", color: "#909090" }}
                    className="hover:!bg-[#e9e5e5]"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-pm hover:bg-pmd text-white flex justify-center items-center"
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner color="white" /> : "Continue"}
                  </button>
                </div>
              </div>
            </form>
          )}
          {registerForm === 2 && (
            <RegistrationFromSecond
              userData={firstData}
              setRegisterForm={setRegisterForm}
            />
          )}
        </div>

        <div className="col-12 col-lg-6 p-0 mb-5 mb-lg-0 d-none d-lg-block">
          <img
            style={{ height: "100vh" }}
            className="img-fluid w-100"
            src={login.src}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
