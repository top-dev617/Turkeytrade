import { base_url } from "@/utils/auth/global";
import { trash } from "@/utils/datas/icons";
import React, { useCallback, useState } from "react";
import picIcon from "../../../../public/assets/pic-icon.png";
import { useDropzone } from "react-dropzone";
import {
  ACCEPTABLE_IMAGE_EXTENSIONS,
  ACCEPTABLE_IMAGE_FILE,
} from "@/lib/constants/globalConstant";
import {
  isAcceptableFile,
  isValidImageForJpg,
} from "@/lib/services/globalService";
import FileExtInfoDialog from "@/components/commons/dialogs/FileExtInfoDialog";

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
  const [open, setOpen] = useState("");

  const onLogo = useCallback(async (acceptedFiles) => {
    if (acceptedFiles) {
      const isTrue = await isAcceptableFile(
        ACCEPTABLE_IMAGE_EXTENSIONS,
        acceptedFiles[0]
      );
      if (isTrue) {
        if (acceptedFiles[0]?.size > 10 * 1024 * 1024) {
          setOpen("File size must be 10 MB or less.");
          return;
        } else {
          setLogo(acceptedFiles[0]);
        }
      } else {
        setOpen("Please upload JPG, JPEG, PNG, or WEBP files only. Thank you!");
        return;
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onLogo,
    multiple: false,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".webp"],
    },
  });
  return (
    <>
      <div
        className={`rounded-[8px] max-h-[270px] relative h-full ${
          !isEdit && "!bg-white"
        }`}
      >
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
                className="h-full flex justify-center items-center"
              >
                <img
                  className="max-w-[180px] max-h-[180px] object-contain"
                  loading="lazy"
                  src={`${base_url}/uploads/${store?.data?.logo}`}
                  alt="store logo"
                />
              </div>
            ) : (
              <div className="flex justify-center items-center h-full">
                <img
                  className="max-w-[180px] max-h-[180px] object-contain"
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
              <div className="rounded-[8px] flex justify-center items-center h-full">
                <img
                  className="max-w-[180px] max-h-[180px] object-contain"
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
          accept={ACCEPTABLE_IMAGE_FILE}
          disabled={isEdit ? false : true}
        />
      </div>
      <FileExtInfoDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default CompanyLogoInput;
