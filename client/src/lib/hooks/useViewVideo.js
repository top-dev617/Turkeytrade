import { base_url } from "@/utils/auth/global";

const useViewVideo = () => {
  const viewVideo = (file) => {
    if (file instanceof File && file.type.startsWith("video/")) {
      return URL.createObjectURL(
        new Blob([file], { type: "application/octet-stream" })
      );
    } else {
      return `${base_url}/uploads/${file}`;
    }
  };

  return {
    viewVideo,
  };
};

export default useViewVideo;
