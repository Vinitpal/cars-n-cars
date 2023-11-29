// next js imports
import { Spin } from "antd";
import React from "react";

// components
import FeaturedCard from "../Cards/FeaturedCard";
import Carousel from "../Carousel/Carousel";

const LatestUsedCars = ({ car, carLoading }) => {
  return (
    <section className="featured-cards-container">
      <h2 className="header">Latest Used Cars</h2>
      <div
        className="featured-cards-wrapper"
        style={{ height: `${carLoading ? "200px" : ""}` }}
      >
        {carLoading ? (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        ) : (
          <Carousel>
            {car &&
              car.length > 0 &&
              [...car].map((item, idx) => (
                <FeaturedCard
                  sliderClassName={`keen-slider__slide number-slide${idx + 1}`}
                  key={idx}
                  car={item}
                />
              ))}
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default LatestUsedCars;
