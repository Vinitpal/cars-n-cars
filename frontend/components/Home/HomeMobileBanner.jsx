// next js imports
import React from "react";
import { useRouter } from "next/router";

const HomeMobileBanner = () => {
  const router = useRouter();

  return (
    <div className="home-mobile-banner">
      <div className="container">
        <div>
          <h2>Are you looking for?</h2>
          <p>build your deal to fit your needs</p>
          <button
            className="buy-used-car"
            onClick={() => router.push("/usedCars")}
          >
            Buy Used Car
          </button>
          <p>OR</p>
          <button
            className="sell-your-car"
            onClick={() => router.push("/sellYourCar")}
          >
            Sell Used Car
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeMobileBanner;
