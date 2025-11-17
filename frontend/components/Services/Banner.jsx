// next js importss
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Banner = () => {
  const router = useRouter();

  return (
    <div className="home-desktop-banner service-page-banner">
      <div className="hero-img">
        <div className="image-container">
          <Image
            className="img"
            src="/images/services/banner-image.png"
            alt="Cars&Cars"
            width={800}
            height={400}
          />
        </div>
      </div>

      <div className="hero-text">
        <div className="circle">
          <div className="text">
            <h2>Car Wash</h2>
            <h2>Subscription</h2>
            <p>Start @ ₹ 399</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
