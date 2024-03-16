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
  audio.setAttribute(
    "src",
    "https://proxy.notificationsounds.com/message-tones/relax-message-tone/download/file-sounds-1217-relax.mp3"
  );
  document.body.appendChild(audio);
  await audio.play();
};
