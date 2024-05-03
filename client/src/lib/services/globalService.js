import { base_url } from "@/utils/auth/global";

export const handleDownload = (endpoint) => {
  const fileUrl = `${base_url}/uploads/${endpoint}`;
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = "downloaded.ext";
  link.target = "_blank";
  link.click();
};

export const playNtf = async () => {
  const audio = document.createElement("audio");
  audio.setAttribute("src", `${base_url}/notification`);
  await audio.play();
};

export const isValidImageForJpg = async (file) => {
  if (file && file.name.endsWith(".JPG")) {
    return false;
  } else {
    return true;
  }
};

export const isAcceptableFile = async (extensions, file) => {
  const extensionName = file.name.split(".").pop();
  return await extensions.some((ext) => ext === extensionName);
};
