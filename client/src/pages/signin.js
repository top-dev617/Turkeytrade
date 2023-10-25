import React, { useContext, useState } from "react";
import login from "../../public/assets/login-banner.png";
import checkbox from "../../public/assets/checkbox.png";
import checked from "../../public/assets/checked.png";
import Link from "next/link";
import { AuthContext } from "@/components/context/AuthContext";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import { usePostLoginMutation } from "@/redux/features/auth/authApi";

const Login = () => {
  const router = useRouter();
  const [checkIcon, setCheckIcon] = useState(false);
  const { signIn, setUser } = useContext(AuthContext);
  const [postLogin, { isLoading }] = usePostLoginMutation()

  const { register, handleSubmit } = useForm()

  const handleLogin = async (data) => {
    const options = { data: data }
    const result = await postLogin(options)
    if (result?.data?.status) {
      localStorage.setItem("turkey-trade-market", result?.data?.accessToken)
      toast.success("User Login Successful")
      setUser(result?.data?.user)
      router.push("/");
    }
  };


  return (
    <div className="login">
      <div className="row m-0">
        <div className="col-12 col-lg-6 p-0 mb-5 mb-lg-0">
          <img
            style={{ height: "100vh" }}
            className="img-fluid w-100"
            src={login.src}
            alt=""
          />
        </div>
        <div className="col-12 col-lg-6 my-auto">
          <form onSubmit={handleSubmit(handleLogin)}>
            <div>
              <h6>Login</h6>
              <div className="d-flex gap-2">
                <p>Don’t have an account? </p>
                <span className="customTooltip">
                  <Link href="register">Register</Link>
                  <div className="tooltiptext">
                    <p>
                      <Link href="/register">Register as buyer</Link>
                    </p>
                    <p>
                      <Link href="/register?type=seller">
                        Register as seller
                      </Link>
                    </p>
                  </div>
                </span>
              </div>
              <div>
                <label for="exampleInputEmail1" className="form-label">
                  Email<span>*</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Email "
                  name="email"
                  required />
              </div>
              <div>
                <label for="exampleInputPassword1" className="form-label">
                  Password<span>*</span>
                </label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                />
              </div>
              <div
                style={{ marginBottom: "30px" }}
                className="d-flex align-items-center justify-content-between"
              >
                <div>
                  <div
                    className="d-flex gap-2 align-items-center"
                    onClick={() => setCheckIcon(!checkIcon)}
                  >
                    <img
                      style={{ objectFit: "contain" }}
                      width={20}
                      src={checkIcon ? checkbox.src : checked.src}
                      alt=""
                    />

                    <span className="remember">Remember me</span>
                  </div>
                </div>
                <Link href="/forgot-password">Forgot Password?</Link>
              </div>
              <button type="submit"
                disabled={isLoading}
                className="flex justify-center items-center"
              >
                {isLoading ? <Spinner color="white" /> : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
