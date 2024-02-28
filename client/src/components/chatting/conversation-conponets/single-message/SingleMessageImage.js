import React from "react";
import SingleMessageSingleImage from "./SingleMessageSingleImage";

const SingleMessageImage = ({ images, setOpen }) => {
  return (
    <div
      className={`cursor-pointer w-fit grid ${
        images?.length === 1 ? "grid-cols-1" : "grid-cols-2"
      } gap-2`}
    >
      {images?.map((img, index) => (
        <SingleMessageSingleImage
          key={index}
          images={images}
          img={img}
          setOpen={setOpen}
        />
      ))}
    </div>
  );
};

export default SingleMessageImage;
