import { base_url } from "@/utils/auth/global";

const useViewImage = () => {
  const viewImg = (img) => {
    if (img instanceof File && img.type.startsWith("image/")) {
      return URL.createObjectURL(
        new Blob([img], { type: "application/octet-stream" })
      );
    } else {
      return `${base_url}/uploads/${img}`;
    }
  };
  return { viewImg };
};

export default useViewImage;
