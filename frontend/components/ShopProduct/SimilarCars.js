// next js imports
// import { useRef } from "react";

// components
import FeaturedCard from "../Cards/FeaturedCard";
import Carousel from "../Carousel/Carousel";

const SimilarCars = ({ car }) => {
  return (
    <section className="featured-cards-container">
      <h2 className="header">Similar priced used cars near Raipur</h2>

      <div className="featured-cards-wrapper similar-car">
        {car && car.length > 0 && (
          <Carousel>
            {[...car].map((item, idx) => (
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

export default SimilarCars;
