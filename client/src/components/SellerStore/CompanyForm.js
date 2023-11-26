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
import ReactPlayer from "react-player";
import VideoPlayer from "../commons/video-player/VideoPlayer";

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
  // Certificates functions

  const uploadImagesToImageBB = async (files) => {
    let images = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=932ae96b4af949bccda61ebea8105393",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      images.push(data?.data?.url);
    }
    return images;
  };

  const handleRegister = async (data) => {
    const imagesData = await uploadImagesToImageBB(certificates);
    if (logo) {
      var logoImage = await uploadImagesToImageBB([logo]);
    }
    const images = imagesData.filter(Boolean);

    const companyInfo = {
      store_info: data?.store_info ? data?.store_info : store?.data?.store_info,
      certificates:
        images.length > 0 ? [...saveCertificates, ...images] : saveCertificates,
      store_presentation_video: video
        ? video
        : store?.data?.store_presentation_video,
      logo: logoImage ? logoImage[0] : store?.data?.logo,
    };

    const newStoreInfo = new FormData();
    if (video) {
      newStoreInfo.append("store_presentation_video", video);
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

  const onDrop = useCallback((acceptedFiles) => {
    handleSetImages(acceptedFiles);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
  });
  // console.log(isEdit, video);
  return (
    <div className="company_form">
      <div className="container">
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="grid md:grid-cols-2 gap-4 mx-auto">
            <div className="w-full">
              <label>Company info</label>
              <textarea
                {...register("store_info")}
                rows="7"
                className={`${!isEdit && "!bg-white"}`}
                name="store_info"
                disabled={isEdit ? false : true}
                defaultValue={
                  store?.data?.store_info && store?.data?.store_info
                }
              ></textarea>
            </div>

            <div className="w-full">
              <label>Logo</label>
              <div className={`input_box relative ${!isEdit && "!bg-white"}`}>
                {store?.data?.logo && !logo ? (
                  <div className="flex justify-center items-center">
                    <img
                      className="w-full h-full max-w-[200px] max-h-[150px] object-contain"
                      loading="lazy"
                      src={store?.data?.logo}
                      alt="store logo"
                    />
                  </div>
                ) : (
                  <>
                    {logo ? (
                      <div className="input_inner">
                        <img
                          className="w-full h-full object-cover"
                          src={viewFile(logo)}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div className="input_inner">
                        <img className="img-fluid " src={picIcon.src} alt="" />
                        <p>Drop your image here or browse</p>
                      </div>
                    )}
                  </>
                )}
                <input
                  {...register("logo")}
                  name="logo"
                  type="file"
                  className="absolute top-0 right-0 bottom-0 left-0 w-full h-full opacity-0"
                  accept="image/*"
                  disabled={isEdit ? false : true}
                  onChange={(e) => setLogo(e.target.files[0])}
                />
              </div>
            </div>

            <div className="w-full">
              <label>Add Certificates</label>

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
                            className="w-20 h-20 object-cover"
                            src={img}
                            alt=""
                          />
                          {
                            <div
                              onClick={() => removeSaveCertificateImage(index)}
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
                        {certificates.map((img, index) => (
                          <div
                            key={index}
                            className="relative w-24 h-24 bg-green-50 p-1 flex justify-start items-center rounded-md"
                          >
                            <img
                              className="w-20 h-20 object-cover"
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
                  <div className="grid grid-cols-3 gap-3 flex-wrap w-full h-fit my-2">
                    {saveCertificates?.map((img, index) => (
                      <div
                        key={index}
                        className="relative w-full bg-gray-100 p-2 flex justify-start items-center rounded-md border"
                      >
                        <img className="w-full h-full" src={img} alt="" />
                      </div>
                    ))}
                  </div>
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
                    accept=".jpg, .jpeg, .png"
                    multiple
                  />
                </div>
              )}
            </div>

            <div className="w-full">
              <label>Upload a video presentation of your company</label>
              <div className={`input_box relative ${!isEdit && "!bg-white"}`}>
                {isEdit && video && (
                  <div
                    onClick={() => setVideo(null)}
                    className="absolute -top-2 -right-2 z-50 rounded-full bg-white text-red-600 p-1 w-8"
                  >
                    {" "}
                    {trash}{" "}
                  </div>
                )}

                {store?.data?.store_presentation_video && !video ? (
                  <VideoPlayer
                    url={`${base_url}/uploads/${store?.data?.store_presentation_video}`}
                    className="object-contain w-100 h-100"
                  />
                ) : (
                  <>
                    {video ? (
                      <VideoPlayer
                        url={viewFile(video)}
                        className="object-contain w-100 h-100"
                      />
                    ) : (
                      <div className="input_inner">
                        <img src={videoIcon.src} alt="" />
                        <p>Drop your video here or browse</p>
                      </div>
                    )}
                  </>
                )}
                <input
                  ref={videoRef}
                  type="file"
                  multiple={false}
                  className="absolute top-0 right-0 bottom-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".mp4, .mkv"
                  disabled={isEdit ? false : true}
                  onChange={(e) => handleVideo(e.target.files[0])}
                />
              </div>
            </div>
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
  );
};

export default CompanyForm;
