import React, { useState } from "react";
import PhotoAlbum from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { base_url } from "@/utils/auth/global";
import { IconButton } from "@material-tailwind/react";
import { iView } from "@/utils/datas/icons";

const StoreCertificates = ({ saveCertificates }) => {
  const [index, setIndex] = useState(-1);
  const certificates = saveCertificates?.map((certificate) => {
    return {
      src: `${base_url}/uploads/${certificate}`,
      width: 800,
      height: 600,
      href: `${base_url}/uploads/${certificate}`, // You can customize this URL
    };
  });
  return (
    <div className="w-full h-fit relative">
      <div className="bg-pm absolute rounded right-0 -top-10 z-50">
        <IconButton className="bg-pm" size="sm" onClick={() => setIndex(0)}>
          {iView}
        </IconButton>
      </div>
      <div className="grid grid-cols-3 gap-3 flex-wrap w-full h-fit my-2 overflow-y-auto max-h-[300px]">
        {saveCertificates?.map((img, index) => (
          <div
            onClick={() => setIndex(index)}
            key={index}
            className="relative w-full bg-gray-100  max-h-[140px] p-2 flex justify-start items-center rounded-md border"
          >
            <img
              className="w-full h-full object-contain"
              src={`${base_url}/uploads/${img}`}
              alt=""
            />
          </div>
        ))}
      </div>

      {/* <PhotoAlbum
        photos={certificates}
        layout="rows"
        targetRowHeight={150}
        onClick={({ index }) => setIndex(index)}
      /> */}

      <Lightbox
        slides={certificates}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </div>
  );
};

export default StoreCertificates;
