// next js imports
import { Spin } from "antd";
import React, { useState, useEffect, useCallback } from "react";

// components
import CarouselForBudget from "../Carousel/CarouselForBudget";
import FeaturedCard from "../Cards/FeaturedCard";

const CarsByBudget = ({ car, carLoading }) => {
  const [activeBudget, setActiveBudget] = useState(1);
  const [filterCars, setFilterCars] = useState([]);
  const [reload, setReload] = useState(false);
  const [maxBudget, setMaxBudget] = useState();
  const [budget, setBudget] = useState([
    {
      title: "",
      value: 0,
    },
    {
      title: "1-5 Lakh",
      value: 500000,
    },
    {
      title: "5-10 Lakh",
      value: 1000000,
    },
    {
      title: "10-15 Lakh",
      value: 1500000,
    },
    {
      title: "15-20 Lakh",
      value: 2000000,
    },
    {
      title: "20+ Lakh",
      value: 9999000000,
    },
  ]);

  const getMaxBudget = useCallback(() => {
    let max = 0;

    if (!carLoading) {
      car.forEach((item, idx) => {
        if (+item.price > +max) {
          max = item.price;
        }
      });

      budget.forEach((item, idx, arr) => {
        if (+item.value > +max) {
          max = item.value;
          // console.log(max);
          arr.length = idx + 1; // works like break statement
        }
      });

      setMaxBudget(max);
    }
  }, [car, carLoading, budget]);

  const sortByBudget = useCallback(() => {
    let cars = [];

    if (!carLoading) {
      cars = car.filter(
        (car) =>
          car.price > budget[activeBudget - 1]?.value &&
          car.price < budget[activeBudget]?.value
      );
    }

    setFilterCars(cars);
  }, [car, carLoading, activeBudget, budget]);

  useEffect(() => {
    let active = 0;

    if (!carLoading) {
      budget.forEach((item, idx) => {
        if (item.value === maxBudget) {
          active = idx;
        }
      });
    }

    setActiveBudget(active);
  }, [carLoading, maxBudget]);

  // console.log(activeBudget, filterCars);

  useEffect(() => {
    sortByBudget();
    getMaxBudget();
  }, [activeBudget, sortByBudget, getMaxBudget]);

  return (
    <section className="featured-cards-container">
      <h2 className="header">Trusted Used Car by Budget</h2>

      <div className="sort-by-price">
        {budget.slice(1).map((item, idx) => {
          if (item.value <= maxBudget) {
            return (
              <span
                key={idx}
                className={`${activeBudget === idx + 1 ? "active" : ""}`}
                onClick={() => {
                  setActiveBudget(idx + 1);
                  setReload(true);
                }}
              >
                {item.title}
              </span>
            );
          }
        })}
      </div>
      <div
        className="featured-cards-wrapper  budget"
        style={{ height: `${carLoading ? "200px" : ""}` }}
      >
        {carLoading ? (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        ) : filterCars && filterCars.length > 0 ? (
          <CarouselForBudget reload={reload} setReload={setReload}>
            {filterCars.map((item, idx) => (
              <FeaturedCard
                sliderClassName={`keen-slider__slide number-slide${idx + 1}`}
                key={idx}
                car={item}
                showBudget={true}
              />
            ))}
          </CarouselForBudget>
        ) : (
          <h3 style={{ textAlign: "center" }}>No Cars Found</h3>
        )}
      </div>
    </section>
  );
};

export default CarsByBudget;
