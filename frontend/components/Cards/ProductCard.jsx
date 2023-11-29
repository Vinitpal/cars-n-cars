// next js imports
import React from "react";

import Image from "next/image";
import { useEffect, useState } from "react";

import Link from "next/link";
// import { useRouter } from "next/router";

// icons
import { IoSpeedometerOutline } from "react-icons/io5";
import { GiGearStick } from "react-icons/gi";
import { MdOutlineVerifiedUser, MdVerified } from "react-icons/md";
import { VscSymbolColor } from "react-icons/vsc";
import { AiOutlineCar } from "react-icons/ai";
// import { api_path } from "../../db/path";

const ProductCard = ({ car, sliderClassName, url }) => {
  // const router = useRouter();
  const [imgArr, setImgArr] = useState([]);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    setImgArr(car.images);
    // console.log(car);
  }, [car]);

  useEffect(() => {
    if (imgArr) {
      setImgSrc(imgArr[0]);
    } else {
      setImgSrc("");
    }
  }, [imgArr, imgSrc]);

  // <Link href={`/usedCars/${car.title}`} passHref>
  return (
    <>
      <Link href={url || "/"} passHref>
        <a
          className={`product-card ${sliderClassName} ${
            car.is_active === "0" && "disabled-link"
          }`}
        >
          {/* Image */}
          <div className="image-container" style={{ width: "100%" }}>
            <Image
              loader={() => imgSrc}
              src={imgSrc || "carsNcars.png"}
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
            {car.verified && <MdVerified className="icon" />}
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
                <IoSpeedometerOutline className="icon" />
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
            <small>
              <MdOutlineVerifiedUser className="icon" />
              Insurance : {car.insurance ? "Yes" : "No"}
            </small>
            <small>
              <VscSymbolColor className="icon" />
              Color : {car.color}
            </small>
            <small>
              <AiOutlineCar className="icon" />
              {car.owner || "1st"} Owner
            </small>
          </div>
        </a>
      </Link>
    </>
  );
};

export default ProductCard;
