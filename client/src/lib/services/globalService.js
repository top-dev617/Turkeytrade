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
  var audio = new Audio(
    "https://cdn.freesound.org/sounds/320/320654-86c83ec2-7954-42e2-89f6-bdbb2b752777?filename=320654__rhodesmas__level-up-02.wav"
  );
  audio.play();
};
