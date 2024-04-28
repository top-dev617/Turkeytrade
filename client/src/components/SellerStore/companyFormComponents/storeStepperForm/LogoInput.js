import FileExtInfoDialog from "@/components/commons/dialogs/FileExtInfoDialog";
import { ACCEPTABLE_IMAGE_FILE } from "@/lib/constants/globalConstant";
import useViewImage from "@/lib/hooks/useViewImage";
import { isValidImageForJpg } from "@/lib/services/globalService";
import { trash } from "@/utils/datas/icons";
import { iUpload } from "@/utils/icons/icons";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

const LogoInput = ({ setLogo, logo }) => {
  const { viewImg } = useViewImage();
  const logoRef = useRef();

  const [open, setOpen] = useState("");

  const onLogo = useCallback(async (acceptedFiles) => {
    if (acceptedFiles) {
      const isValidCheck = await isValidImageForJpg(acceptedFiles[0]);
      if (!isValidCheck) {
        return;
      } else {
        if (acceptedFiles[0]?.size > 10 * 1024 * 1024) {
          setOpen("File size must be 10 MB or less.");
          return;
        } else {
          setLogo(acceptedFiles[0]);
        }
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onLogo,
    multiple: false,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif", ".webp"],
    },
  });
  return (
    <>
      <div>
        <h1 className="font-inter font-semibold text-[18px] md:text-[25px] leading-[32px] text-[#000000] text-center">
          Upload your Company logo
        </h1>
        <div
          {...getRootProps()}
          className="flex flex-col justify-center items-center border-[2px] border-dashed border-spacing-[32px] rounded-[20px] border-[#000000] h-[250px] md:h-[343px] max-h-[250px] md:max-h-[343px] !mt-5 md:!mt-[44px] mb-4 lg:!mb-[35px] relative"
        >
          {logo && (
            <div
              onClick={() => setLogo(null)}
              className="absolute -top-4 -right-4 w-[40px] bg-red-600 rounded-full p-[8px] text-white cursor-pointer"
            >
              {trash}
            </div>
          )}
          {logo ? (
            <>
              <img
                src={viewImg(logo)}
                alt=""
                className="!object-contain h-full w-full"
              />
            </>
          ) : (
            <>
              <div>{iUpload}</div>
              <h1 className="mt-[15px] font-inter font-medium text-[18px] md:text-[26px] md:leading-[32px] text-[#000000] text-center">
                Choose a file or drag & drop here{" "}
              </h1>
              <p className="mt-1 md:mt-[12px] font-inter font-medium text-[12px] md:text-[16px] lg:text-[18px] leading-[22px] text-[#9F9F9F] text-center">
                JPEG, PNG, WebP - Maximum 10 MB.
              </p>
              <button
                type="button"
                className="mt-[30px] w-[150px] md:w-[207px] h-[35px] md:h-[60px] bg-[#037D41] rounded md:!rounded-[5px] font-inter font-medium text-[14px] md:text-[22px] text-white"
              >
                Browse file
              </button>
            </>
          )}
        </div>

        <input
          {...getInputProps()}
          type="file"
          multiple={false}
          accept={ACCEPTABLE_IMAGE_FILE}
          className="hidden"
        />
      </div>

      <FileExtInfoDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default LogoInput;
