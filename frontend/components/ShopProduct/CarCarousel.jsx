import React, { useState, useEffect } from "react";
import DetailCarousel from "../Carousel/DetailCarousel";
import Image from "next/image";

// import { api_path } from "../../db/path";

const CarCarousel = ({ productData }) => {
  const [imgArr, setImgArr] = useState([]);

  useEffect(() => {
    console.log(productData.images);
    const carImgArr = [...productData.images];
    setImgArr(carImgArr.reverse());

    console.log(imgArr);
  }, [productData]);

  const getImgSrc = (id) => {
    if (imgArr) {
      return `${imgArr[id]}`;
    }
  };

  return (
    <div className="car-carousel border-pc">
      {imgArr && imgArr.length > 0 && (
        <DetailCarousel>
          {imgArr.map((_, id) => (
            <div
              key={id}
              className={`keen-slider__slide number-slide${id + 1}`}
            >
              <div className="image-container">
                <Image
                  className="img"
                  alt="Cars&Cars"
                  layout="fill"
                  loader={() => getImgSrc(id)}
                  src={getImgSrc(id) || "/images/bannerCar.webp"}
                  priority={true}
                />
              </div>
            </div>
          ))}
        </DetailCarousel>
      )}
    </div>
  );
};

export default CarCarousel;
