import { base_url } from "@/utils/auth/global";
import { trash } from "@/utils/datas/icons";
import React, { useCallback } from "react";
import picIcon from "../../../../public/assets/pic-icon.png";
import { useDropzone } from "react-dropzone";

const CompanyLogoInput = ({
  register,
  isEdit,
  store,
  storeLogo,
  logo,
  setLogo,
  viewFile,
  removeLogo,
}) => {
  const onLogo = useCallback((acceptedFiles) => {
    if (acceptedFiles) {
      setLogo(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onLogo,
    multiple: false,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
  });
  return (
    <div className={`input_box relative ${!isEdit && "!bg-white"}`}>
      {isEdit && (
        <div
          onClick={() => removeLogo()}
          className="absolute -top-2 -right-2 z-50 rounded-full bg-white text-red-600 p-1 w-8 cursor-pointer"
        >
          {trash}
        </div>
      )}
      {store?.data?.logo && storeLogo && !logo ? (
        <>
          {isEdit ? (
            <div
              {...getRootProps()}
              className="flex justify-center items-center"
            >
              <img
                className="w-full h-full max-w-[200px] max-h-[150px] object-contain"
                loading="lazy"
                src={`${base_url}/uploads/${store?.data?.logo}`}
                alt="store logo"
              />
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <img
                className="w-full h-full max-w-[200px] max-h-[150px] object-contain"
                loading="lazy"
                src={`${base_url}/uploads/${store?.data?.logo}`}
                alt="store logo"
              />
            </div>
          )}
        </>
      ) : (
        <>
          {logo ? (
            <div className="input_inner">
              <img
                className="w-full h-full object-contain"
                src={viewFile(logo)}
                alt=""
              />
            </div>
          ) : (
            <>
              {isEdit ? (
                <div {...getRootProps()} className="input_inner">
                  <img className="img-fluid " src={picIcon.src} alt="" />
                  <p>Drop your image here or browse</p>
                </div>
              ) : (
                <div className="input_inner">
                  <img className="img-fluid " src={picIcon.src} alt="" />
                  <p>Drop your image here or browse</p>
                </div>
              )}
            </>
          )}
        </>
      )}
      <input
        {...register("logo")}
        {...getInputProps()}
        name="logo"
        type="file"
        multiple={false}
        className="absolute top-0 right-0 bottom-0 left-0 w-full h-full opacity-0"
        accept=".png, .jpg, .jpeg"
        disabled={isEdit ? false : true}
      />
    </div>
  );
};

export default CompanyLogoInput;
