import React from "react";
import banner from "../../public/assets/banner.jpg";
import { useSelector } from "react-redux";

const CategorySlider = () => {
  const { catesShow } = useSelector((state) => state.helper);
  // console.log(catesShow);
  return (
    <div className="h-full">
      {catesShow ? (
        <img src={banner.src} className="d-block w-100" alt="..." />
      ) : (
        <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="2000">
              <img src={banner.src} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src={banner.src} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src={banner.src} className="d-block w-100" alt="..." />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySlider;
