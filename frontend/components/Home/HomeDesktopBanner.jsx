// next js importss
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const HomeDesktopBanner = () => {
  const router = useRouter();

  return (
    <div className="home-desktop-banner">
      <div className="left">
        <div>
          <h2>
            Are you looking to
            <br />
            buy a car?
          </h2>
          <p>Searching our inventory that includes 3k+ cars</p>
          <button onClick={() => router.push("/usedCars")}>
            Buy Used Cars
          </button>
        </div>
      </div>
      <div className="mid">
        <div className="image-container" style={{ width: "600px" }}>
          <Image className="img" src="/images/bannerCar.webp" alt="Cars&Cars" width={600} height={400} />
        </div>
      </div>
      <div className="right">
        <div>
          <h2>
            Do you want to
            <br />
            sell a car?
          </h2>
          <p>Add car to our inventory and reach 3k+ buyers</p>
          <button onClick={() => router.push("/sellYourCar")}>
            Sell Used Car
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeDesktopBanner;
