// next js imports
import { Spin } from "antd";
import React from "react";

// components
import FeaturedCard from "../Cards/FeaturedCard";
import Carousel from "../Carousel/Carousel";

const PerfectTwoWheelers = ({ bike, bikeLoading }) => {
  return (
    <section className="featured-cards-container">
      <h2 className="header">Find your perfect two wheeler</h2>

      <div
        className="featured-cards-wrapper bike-container"
        style={{ height: `${bikeLoading ? "200px" : ""}` }}
      >
        {bikeLoading ? (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        ) : (
          <Carousel>
            {bike &&
              bike.length > 0 &&
              bike.map((item, idx) => (
                <FeaturedCard isBike={true} key={idx} car={item} />
              ))}
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default PerfectTwoWheelers;
