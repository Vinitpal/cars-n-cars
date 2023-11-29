// next js imports
// import { useRef } from "react";

// components
import ProductCard from "../Cards/ProductCard";
import Carousel from "../Carousel/Carousel";
import { useCarListQuery } from "../../store/service/api";

const Recommended = () => {
  const { data: car, isLoading: carListLoading } = useCarListQuery();

  // console.log(car);
  return (
    <section
      className="featured-cards-container"
      style={{ marginBottom: "3.2rem" }}
    >
      <h2 className="header">Recommended For You</h2>

      <div className="featured-cards-wrapper">
        {!carListLoading && car && car.length > 0 && (
          <Carousel>
            {car.map((item, idx) => (
              <ProductCard
                key={idx}
                car={item}
                sliderClassName={`keen-slider__slide number-slide${idx + 1}`}
                url={`/usedCars/${item.brand + "_" + item.model}?id=${
                  item._id
                }`}
              />
            ))}
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default Recommended;
