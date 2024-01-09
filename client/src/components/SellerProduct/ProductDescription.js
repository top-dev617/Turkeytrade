import { base_url } from "@/utils/auth/global";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";
import VideoPlayer from "../commons/video-player/VideoPlayer";

const ProductDescription = ({ product }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [product?._id]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="product_description md:p-2">
      <div className="product_inner mt-0 p-2 md:!p-10">
        <h4>Product Description </h4>
        {product?.video && (
          <div>
            <h6>Product Video:</h6>

            <VideoPlayer
              url={`${base_url}/uploads/${product?.video}`}
              className="object-contain h-fit max-w-[400px]"
            />
          </div>
        )}

        <br />
        <div>
          <h6>Product Overview:</h6>
          <div
            className="overflow-hidden"
            dangerouslySetInnerHTML={{ __html: product?.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
{
  /* <video
              controls
              loop
              autoPlay
              muted
              className="object-contain max-h-[350px]"
            >
              <source
                src={`${base_url}/uploads/${product?.video}`}
                type="video/mp4"
              />
            </video> */
}
