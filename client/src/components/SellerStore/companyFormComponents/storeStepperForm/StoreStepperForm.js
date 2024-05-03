import { AuthContext } from "@/components/context/AuthContext";
import { useStoreUpdateAfterVerifyMutation } from "@/redux/features/stores/storeApi";
import React, { useContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import LogoInput from "./LogoInput";
import StoreVideoInputInStepper from "./StoreVideoInputInStepper";
import { store_stepper_data } from "@/utils/datas/globalData";
import StoreStepperOverview from "./StoreStepperOverview";
import { Spinner } from "@material-tailwind/react";

const StoreStepperForm = ({ store, refetch }) => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const [storeUpdateAfterVerify, { isLoading }] =
    useStoreUpdateAfterVerifyMutation();
  const [step, setStep] = useState(1);

  const [logo, setLogo] = useState(null);
  const [video, setVideo] = useState(null);

  const handleRegister = async (data) => {
    if (step === 4) {
      const formData = new FormData();

      if (data?.store_info) {
        formData.append("store_info", data?.store_info);
      }
      if (data?.store_name) {
        formData.append("store_name", data?.store_name);
      }
      if (video) {
        formData.append("store_presentation_video", video);
      }
      if (logo) {
        formData.append("logo", logo);
      }
      const options = {
        data: formData,
        id: store?._id,
      };
      const result = await storeUpdateAfterVerify(options);
      if (result?.data?.status === true) {
        setStep(4);
        refetch();
        setLogo(null);
        setVideo(null);
        reset();
      }
    } else {
      setStep(step + 1);
    }
  };

  useMemo(() => {
    if (store?.store_name) {
      setValue("store_name", store?.store_name);
    }
  }, [store]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="container">
      <div className="h-full w-full pt-[49px] !pb-[400px]">
        <div className="text-center">
          <h1 className="font-inter font-semibold leading-[48px] text-[26px] md:text-[40px] text-[#074801]">
            Let’s set up your MyStore!
          </h1>
          <h1 className="font-inter font-semibold leading-[24px] text-[17px] md:text-[20px] text-[#021D00]">
            Follow the steps bellow to get started
          </h1>
        </div>

        <div
          className="flex flex-col md:flex-row justify-between gap-y-[12px] gap-x-[12px] md:gap-x-[20px] lg:gap-x-[40px] mt-[55px] 
        lg:max-h-[578px]"
        >
          <div className="flex justify-center items-center md:max-w-[311px] min-w-[50px] md:min-w-[250px] lg:min-w-[311px] lg:h-[578px] bg-white rounded-[10px]">
            <div className="max-w-[280px] mx-auto py-4 md:py-0">
              {store_stepper_data.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-x-[20.51px] ${
                    item.id >= step && "mb-3 md:mb-[25px] lg:mb-[40.55px]"
                  }`}
                >
                  {step > item.id ? (
                    <div className="max-h-[80px] md:max-h-full">
                      {item?.active_icon}
                    </div>
                  ) : (
                    <div
                      className={`max-h-[80px] md:max-h-full ${
                        step === item.id && "text-[#20C374]"
                      }`}
                    >
                      {item?.icon}
                    </div>
                  )}

                  <div className="flex-col items-start gap-y-[3px]">
                    <h1 className="font-medium text-[14px] md:text-[16px] text-[#333333] font-sf-pro">
                      {item?.name}
                    </h1>
                    <h1 className="font-inter text-[12px] md:text-[14px] leading-[17px] text-[#888888]">
                      {item?.description}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit(handleRegister)}
            className="flex-grow w-full bg-white rounded-[10px] lg:max-h-[578px] px-[10px] md:px-[32px] lg:px-[58px]"
          >
            <div
              className={`pt-3 md:pt-[12px] lg:!pt-[32px] ${
                step !== 1 && "hidden"
              }`}
            >
              <h1 className="font-inter text-[16px] md:text-[18px] lg:text-[23.72px] leading-[29px] text-[#000000]">
                Share details about the products or services you provide.
              </h1>
              <div className="mt-3">
                <h1 className="text-[16px] font-inter font-semibold leading-[24px] text-[#021D00] mb-[6px]">
                  Company Name
                </h1>
                <input
                  {...register("store_name", { required: true })}
                  type="text"
                  placeholder="Write your company name"
                  required
                  className="!bg-white focus:!bg-white w-full h-[40px] md:h-[49px] rounded-[9.12px] border border-[#000000] resize-none p-[10px] md:p-[27px] mt-2 md:mt-[27px]
                  text-sm md:text-[16px] placeholder:text-[#B2B2B2] leading-[20px]"
                />
              </div>
              <div className="mt-2">
                <h1 className="text-[16px] font-inter font-semibold leading-[24px] text-[#021D00] mb-[6px]">
                  Description
                </h1>
                <textarea
                  {...register("store_info")}
                  className="bg-[#FFFFFF] w-full h-[200px] md:h-[180px] lg:h-[233px] outline-none rounded-[9.12px] border border-[#000000] resize-none p-[10px] md:p-[27px] mt-2 md:mt-[27px]
                 text-sm md:text-[16px] text-[#B2B2B2] leading-[20px]"
                  placeholder="Describe your company......."
                  required
                  minLength={150}
                ></textarea>
                <p className="text-[#074801] font-inter leading-[32px] font-medium text-xs md:text-sm mt-1 md:mt-[9px]">
                  Minimum 150 characters
                </p>
              </div>
            </div>

            <div className={`pt-3 md:pt-[24px] ${step !== 2 && "hidden"}`}>
              <LogoInput setLogo={setLogo} logo={logo} />
            </div>
            <div className={`pt-3 md:pt-[24px] ${step !== 3 && "hidden"}`}>
              <StoreVideoInputInStepper setVideo={setVideo} video={video} />
            </div>
            <div className={`pt-3 md:pt-[24px] ${step !== 4 && "hidden"}`}>
              <StoreStepperOverview
                storeName={watch("store_name")}
                logo={logo}
                video={video}
                description={watch("store_info")}
              />
            </div>

            <div className="flex justify-between items-start gap-2 pb-[32px]">
              {step === 1 ? (
                <span></span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleBack()}
                  className="bg-white text-[#20C374] w-[80px] md:w-[110px] lg:w-[142px] h-[35px] md:h-[40px] lg:h-[53px] border-[2px] border-[#20C374] font-semibold md:font-bold rounded-sm md:rounded-md font-inter text-sm"
                >
                  Back
                </button>
              )}

              <div className="flex justify-end md:items-start flex-wrap md:flex-nowrap gap-2">
                {step > 1 && step < 4 && (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="bg-white text-[#20C374] w-[80px] md:w-[110px] h-[35px] md:h-[40px] lg:h-[53px] border-[2px] border-[#20C374] font-semibold md:font-bold rounded-sm md:rounded-md font-inter text-sm"
                  >
                    Skip
                  </button>
                )}

                {step === 4 ? (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-pm hover:bg-pmd text-white w-[160px] md:w-[231px] h-[35px] md:h-[53px] rounded md:rounded-md font-inter flex justify-center items-center gap-2 text-sm"
                  >
                    {isLoading && <Spinner color="white" />} Create my store
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-pm hover:bg-pmd text-white w-[100px] md:w-[110px] lg:w-[140px] h-[35px] md:h-[40px] lg:h-[53px] rounded-sm md:rounded-md font-inter text-sm"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoreStepperForm;
