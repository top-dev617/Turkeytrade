import React, { useContext, useRef, useState } from "react";
import styles from "@/styles/RegisterModal.module.css";
import tickMark from "/public/assets/tickMark.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "@/components/context/AuthContext";
import { useHandleOtpMutation, useHandleResendOtpMutation } from "@/redux/features/auth/authApi";
import { Spinner } from "@material-tailwind/react";

const RegistrationVerificationModal = ({ userRegistrationInfo }) => {
  const { user, setUser, setIsSignedIn } = useContext(AuthContext)

  const [completeStep, setCompleteStep] = useState(0);
  const router = useRouter();

  const closeModalRef = useRef(null);

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [isResend, setIsResend] = useState("")

  const inputRefs = useRef([]);
  const handleChange = async (index, value) => {
    if (value.length > 1) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const isFilled = otp.every((digit) => digit !== "");

  const handleGoTradeMarket = () => {
    closeModalRef.current.click();
    localStorage.setItem("welcomeModal", JSON.stringify("on"));
    router.push("/");
  };


  const [handleOtp, { isLoading }] = useHandleOtpMutation()
  const [handleResendOtp] = useHandleResendOtpMutation()


  const handleOTP = async () => {
    const otpData = { email: userRegistrationInfo?.email, otp: otp.join("") }

    const options = { data: otpData }
    const result = await handleOtp(options)
    if (result?.error?.data?.success === false) {
      setIsResend(result?.error?.data.message)
    }
    if (result?.data?.accessToken) {
      localStorage.setItem("turkey-trade-market", result?.data?.accessToken)
      setIsResend("")
      setUser(result?.data?.user)
      setCompleteStep((prev) => prev + 1)
      setIsSignedIn(true)
    }
  }

  const handleResend = async () => {
    const options = { data: userRegistrationInfo }
    const result = await handleResendOtp(options)
    if (result?.data?.status === 200) {
      setIsResend("Resend OTP")
    }
  }

  return (
    <div>
      <div
        className="modal fade "
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close d-none"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeModalRef}
              ></button>
              {completeStep === 0 && (
                <div className={styles.modalContainer}>
                  <p className={styles.title}>
                    Please enter the Verification code received in your email,{" "}
                    <span>{userRegistrationInfo?.email}</span>
                  </p>
                  <div className={styles.otpInputContainer}>
                    <div className={`d-flex gap-2 mb-5 ${styles.otpInput}`}>
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          // disabled={isOtpVerified}
                          type="number"
                          maxLength="1"
                          value={digit}
                          min={0}
                          onChange={(e) => handleChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          ref={(ref) => (inputRefs.current[index] = ref)}
                          autoComplete="off"
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className={styles.resendButtonContainer} style={{ marginBottom: "10px" }}>
                      <button onClick={() => handleResend()}>Resend Code</button>

                    </div>
                    {
                      isResend && <p
                        style={{
                          textAlign: "center",
                          fontSize: "14px",
                          marginBottom: "10px",
                          color: "red"
                        }}>{isResend}</p>
                    }
                  </div>
                  <div className={styles.completeButtonContainer}>
                    <button
                      disabled={!isFilled || isLoading}
                      // onClick={() => setCompleteStep((prev) => prev + 1)}
                      onClick={handleOTP}
                      className="flex justify-center items-center"
                    >
                      {
                        isLoading ? <Spinner color="white" /> : "Complete Verification"
                      }
                    </button>
                  </div>
                </div>
              )}
              {completeStep === 1 && (
                <div className={styles.modalContainer}>
                  <div className={styles.otpSuccessContainer}>
                    <img src={tickMark.src} alt="" />
                    <h3>Registered Successfully!</h3>

                    <button onClick={handleGoTradeMarket}>
                      Go to my Turkeytrademarket
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationVerificationModal;
