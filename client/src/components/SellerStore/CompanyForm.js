import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import picIcon from "../../../public/assets/pic-icon.png";
import plusIcon from "../../../public/assets/plus-icon.png";
import videoIcon from "../../../public/assets/vedio-icon.png";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  useGetStoreInfoBySellerIdQuery,
  usePatchStoreInfoByIdMutation,
} from "@/redux/features/stores/storeApi";
import { useDropzone } from "react-dropzone";
import { Spinner } from "@material-tailwind/react";
import { trash } from "@/utils/datas/icons";
import { base_url } from "@/utils/auth/global";
import VideoPlayer from "../commons/video-player/VideoPlayer";
import StoreCertificates from "./StoreCertificates";
import CompanyLogoInput from "./companyFormComponents/CompanyLogoInput";
import CompanyVideoInput from "./companyFormComponents/CompanyVideoInput";
import {
  ACCEPTABLE_IMAGE_EXTENSIONS,
  ACCEPTABLE_IMAGE_FILE,
} from "@/lib/constants/globalConstant";
import {
  isAcceptableFile,
  isValidImageForJpg,
} from "@/lib/services/globalService";
import FileExtInfoDialog from "../commons/dialogs/FileExtInfoDialog";

const CompanyForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);
  const { data: store, refetch } = useGetStoreInfoBySellerIdQuery(user?._id);
  const [patchStoreInfoById, { isLoading }] = usePatchStoreInfoByIdMutation();

  const viewFile = (file) => {
    return URL.createObjectURL(
      new Blob([file], { type: "application/octet-stream" })
    );
  };

  const [openMsg, setOpenMsg] = useState("");

  const [logo, setLogo] = useState(null);
  const [video, setVideo] = useState(null);
  const videoRef = useRef();

  const [isEdit, setIsEdit] = useState(false);

  // Certificates functions
  const [certificates, setCertificates] = useState([]);
  const [saveCertificates, setSaveCertificates] = useState([]);

  const handleVideo = (file) => {
    if (file) {
      if (file.size > 150 * 1024 * 1024) {
        toast.error("File size must be 150 MB or less.");
        videoRef.current.value = null;
        return;
      } else {
        setVideo(file);
      }
    } else {
      videoRef.current.value = null;
      return;
    }
  };

  const [storeVideo, setStoreVideo] = useState(true);
  const [storeLogo, setStoreLogo] = useState(true);

  const removeVideo = () => {
    if (video) {
      setVideo(null);
    } else {
      setStoreVideo(false);
    }
  };
  const removeLogo = () => {
    if (logo) {
      setLogo(null);
    } else {
      setStoreLogo(false);
    }
  };

  useEffect(() => {
    setSaveCertificates(store?.data?.certificates);
  }, [store]);

  const removeCertificateImage = (index) => {
    const data = [...certificates];
    data.splice(index, 1);
    setCertificates(data);
  };
  const removeSaveCertificateImage = (index) => {
    const data = [...saveCertificates];
    data.splice(index, 1);
    setSaveCertificates(data);
  };

  const handleRegister = async (data) => {
    const companyInfo = {
      store_info: data?.store_info ? data?.store_info : store?.data?.store_info,
      certificates: saveCertificates,
    };

    const newStoreInfo = new FormData();
    if (video) {
      newStoreInfo.append("store_presentation_video", video);
    }
    if (!storeVideo) {
      companyInfo["store_presentation_video"] = "";
    }
    if (logo) {
      newStoreInfo.append("logo", logo);
    }
    if (!storeLogo) {
      companyInfo["logo"] = "";
    }
    if (certificates?.length > 0) {
      certificates.forEach((file, index) => {
        newStoreInfo.append(`certificates`, file);
      });
    }

    newStoreInfo.append("storeData", JSON.stringify(companyInfo));
    const options = {
      data: newStoreInfo,
      id: store?.data?._id,
    };
    const result = await patchStoreInfoById(options);
    setIsEdit(false);
    if (result?.data?.status === true) {
      refetch();
      setCertificates([]);
      setLogo(null);
      setVideo(null);
      setStoreVideo(true);
      reset();
      toast.success("Store info Add Successfully");
    } else {
      toast.error("Store info add unsuccessfully");
    }
  };

  const handleSetImages = (files) => {
    let images = [];
    for (let i = 0; i < files.length; i++) {
      images.push(files[i]);
    }
    setCertificates((current) => [...current, ...images]);
  };

  const onCTF = useCallback(async (acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      let isValid = true;
      for (let i = 0; i < acceptedFiles.length; i++) {
        const isValidCheck = await isAcceptableFile(
          ACCEPTABLE_IMAGE_EXTENSIONS,
          acceptedFiles[i]
        );
        if (!isValidCheck) {
          isValid = isValidCheck;
          break;
        }
      }
      if (!isValid) {
        setOpenMsg(
          "Please upload JPG, JPEG, PNG, or WEBP files only. Thank you!"
        );
        return;
      } else {
        let isExistMemory = false;
        for (let i = 0; i < acceptedFiles.length; i++) {
          const img = acceptedFiles[i];
          if (img.size > 10 * 1024 * 1024) {
            isExistMemory = true;
            break;
          }
        }
        if (isExistMemory) {
          setOpenMsg("File size must be 10 MB or less.");
          return;
        } else {
          handleSetImages(acceptedFiles);
        }
      }
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: onCTF,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".webp"],
    },
  });
  // console.log(isEdit, video);

  const isShowVideo = store?.data?.store_presentation_video || isEdit;
  return (
    <>
      <div className="company_form">
        <div className="container">
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="grid md:grid-cols-1 gap-8 mx-auto">
              {isEdit ? (
                <div className="w-full max-w-[400px]">
                  <label className="!font-semibold !font-inter">Logo</label>
                  <CompanyLogoInput
                    register={register}
                    isEdit={isEdit}
                    store={store}
                    storeLogo={storeLogo}
                    logo={logo}
                    setLogo={setLogo}
                    viewFile={viewFile}
                    removeLogo={removeLogo}
                  />
                </div>
              ) : (
                <>
                  {store?.data?.logo && (
                    <div className="flex justify-start items-center max-h-[320px]">
                      <img
                        className="max-w-[180px] max-h-[180px] object-contain"
                        loading="lazy"
                        src={`${base_url}/uploads/${store?.data?.logo}`}
                        alt="store logo"
                      />
                    </div>
                  )}
                </>
              )}

              {isEdit ? (
                <div className="w-full max-h-[400px] min-h-[400px] mt-4">
                  <label className="!font-semibold !font-inter">
                    Company Description
                  </label>
                  <textarea
                    {...register("store_info")}
                    className={`max-h-[380px] min-h-[380px] !font-inter text-black ${
                      !isEdit && "!bg-white p-0"
                    }`}
                    disabled={isEdit ? false : true}
                    defaultValue={
                      store?.data?.store_info && store?.data?.store_info
                    }
                  ></textarea>
                </div>
              ) : (
                <div className="max-h-[400px] h-fit relative">
                  <label className="!font-inter">Company Description</label>
                  <div className="max-h-[380px] h-fit mt-1 overflow-y-auto">
                    <p className="bg-white whitespace-pre-wrap all_break !font-inter">
                      {store?.data?.store_info && store?.data?.store_info}
                    </p>
                  </div>
                </div>
              )}

              {/* <div className="w-full">
                <label className="!font-semibold !font-inter">Add Certificates</label>

                {isEdit ? (
                  <>
                    <div>
                      {saveCertificates.length > 0 && (
                        <p className="text-[12px]">Old Certificates</p>
                      )}
                      <div className="flex items-center gap-3 flex-wrap w-full h-fit my-2">
                        {saveCertificates?.map((img, index) => (
                          <div
                            key={index}
                            className="relative w-24 h-24 bg-green-50 p-1 flex justify-start items-center rounded-md"
                          >
                            <img
                              className="w-20 h-20 object-contain"
                              src={`${base_url}/uploads/${img}`}
                              alt=""
                            />
                            {
                              <div
                                onClick={() =>
                                  removeSaveCertificateImage(index)
                                }
                                className="absolute -top-2 -right-2 z-50 rounded-full bg-white text-red-600 p-1 w-8"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-full h-full"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </div>
                            }
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      {certificates.length > 0 && (
                        <p className="text-[12px]">New Certificates</p>
                      )}
                      {certificates.length > 0 && (
                        <div className="flex items-center gap-3 flex-wrap w-full h-fit my-2">
                          {certificates?.map((img, index) => (
                            <div
                              key={index}
                              className="relative w-24 h-24 bg-green-50 p-1 flex justify-start items-center rounded-md"
                            >
                              <img
                                className="w-20 h-20 object-contain"
                                src={viewFile(img)}
                                alt=""
                              />
                              {
                                <div
                                  onClick={() => removeCertificateImage(index)}
                                  className="absolute -top-2 -right-2 z-50 rounded-full bg-white text-red-600 p-1 w-8"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-full h-full"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </div>
                              }
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <StoreCertificates saveCertificates={saveCertificates} />
                  </>
                )}

                {isEdit && (
                  <div
                    {...getRootProps()}
                    className={`dropzone input_box relative
                ${isDragActive ? "bg-green-50" : ""} 
                ${
                  isDragAccept ? "border border-green-600 rounded-[20px]" : ""
                } ${isDragReject ? "border border-red-600" : ""}`}
                  >
                    <div className="input_inner">
                      <img src={plusIcon.src} alt="" />
                    </div>
                    <input
                      {...getInputProps()}
                      type="file"
                      className="absolute top-0 right-0 bottom-0 left-0 w-full h-full opacity-0"
                      accept={ACCEPTABLE_IMAGE_FILE}
                      multiple
                    />
                  </div>
                )}
              </div> */}

              {isShowVideo && (
                <div className="w-full max-w-[614px]">
                  {isEdit && (
                    <label className="!font-semibold !font-inter !mb-1">
                      Upload a video presentation of your company
                    </label>
                  )}

                  <div className="w-full h-full max-h-[320px]">
                    <CompanyVideoInput
                      isEdit={isEdit}
                      removeVideo={removeVideo}
                      store={store}
                      storeVideo={storeVideo}
                      video={video}
                      viewFile={viewFile}
                      videoRef={videoRef}
                      handleVideo={handleVideo}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="d-flex gap-4 justify-content-end align-items-center mt-8">
              {isEdit && (
                <>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="register_btn flex justify-center items-center"
                  >
                    {isLoading ? <Spinner color="white" /> : "Save"}
                  </button>
                </>
              )}

              <div
                onClick={() => setIsEdit(!isEdit)}
                className="register_btn pointer"
              >
                Edit
              </div>
            </div>
          </form>
        </div>
      </div>
      <FileExtInfoDialog open={openMsg} setOpen={setOpenMsg} />
    </>
  );
};

export default CompanyForm;
