import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ProductSlider = ({ images, handleImageClick }) => {

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    // slidesToShow: 4,
    // slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (

    <Slider {...settings}>
      {
        images?.map((img, i) => (
          <img key={i}
            onClick={() => handleImageClick(img)}
            className="pointer" style={{ paddingRight: "10px" }} src={img} alt="image" />
        ))
      }
    </Slider>
  );
};

export default ProductSlider;
