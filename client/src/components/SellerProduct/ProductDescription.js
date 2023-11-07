import { base_url } from "@/utils/auth/global";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";

const ProductDescription = ({ product }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div className="product_description p-2">
      <div className="product_inner mt-0 p-4 !md:p-10">
        <h4>Product Description </h4>
        {product?.video && (
          <div>
            <h6>Product Video:</h6>

            <ReactPlayer
              url={`${base_url}/uploads/${product?.video}`}
              className="object-contain max-h-[350px] w-fit"
              width="fit-content"
              height="fit-content"
              playing={true}
              loop
              controls={true}
              volume={0.8}
              muted
              playbackRate={1.5}
              progressInterval={1000}
              playsinline
              pip
              stopOnUnmount={false}
              config={{
                youtube: {
                  playerVars: { showinfo: 1, controls: 1 },
                },
              }}
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
