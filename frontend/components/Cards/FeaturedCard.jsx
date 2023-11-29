// next js imports
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

// icons
import { IoSpeedometerOutline } from "react-icons/io5";
import { GiGearStick } from "react-icons/gi";
// import { api_path } from "../../db/path";

const FeaturedCard = ({ car, sliderClassName, isBike }) => {
  // const [imgArr, setImgArr] = useState([]);
  // const [imgSrc, setImgSrc] = useState("");

  // useEffect(() => {
  //   const carImgArr = car?.images?.split(",");
  //   setImgArr(carImgArr);
  // }, [car]);

  // useEffect(() => {
  //   if (imgArr) {
  //     setImgSrc(
  //       `https://res.cloudinary.com/cgherbals/image/upload/${imgArr[1]}`
  //     );
  //   } else {
  //     setImgSrc("");
  //   }
  // }, [imgArr, imgSrc]);

  // <Link href={`/usedCars/${car.title}`}>
  return (
    <>
      <Link
        href={
          isBike
            ? `/usedBikes/${car.brand + "_" + car.model}?id=${car._id}`
            : `/usedCars/${car.brand + "_" + car.model}?id=${car._id}`
        }
        passHref
      >
        <a
          className={`featured-card ${sliderClassName} ${
            car.is_active === "0" && "disabled-link"
          }`}
        >
          <div className="img">
            <div className="image-container">
              <Image
                className="img"
                src={car.images[0] || "carsNcars.png"}
                alt="Cars&Cars"
                layout="fill"
                loading="lazy"
                blurDataURL="/images/bannerCar.webp"
                placeholder="blur"
              />

              {car && car.is_active === "0" && (
                <div className="overlay-icon">
                  <Image
                    src={"/icons/sold.png"}
                    alt="Cars&Cars"
                    width={80}
                    height={60}
                  />
                </div>
              )}

              {/** ************* **/}
            </div>
          </div>
          <div className="text">
            <h2>{car.brand + " " + car.model}</h2>
            <div className="car-engine-wrapper">
              <small>{car.variant}</small>
              <div className="vertical-hr"></div>
              <small>{car.bodyType}</small>
            </div>

            <div className="price-container">
              <p className="distance">
                <IoSpeedometerOutline className="icon" />{" "}
                {car.kilometerDriven || 999} Kms
              </p>
              <div className="vertical-hr"></div>
              <p className="price">
                <span>₹ </span> {car.price}
              </p>
            </div>
          </div>
          <div className="specs">
            <small>
              <GiGearStick className="icon" /> {car.fuelType}
            </small>
            <p>View Details</p>
          </div>
        </a>
      </Link>
    </>
  );
};

export default FeaturedCard;
