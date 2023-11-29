import React from "react";

const OneTimeServiceCard = () => {
  return (
    <div className="product-card service-card one-time-service-card">
      <div className="detail">
        <h2>One Time Full Wash</h2>
        <div className="content">
          <div className="left">
            <h3>Sedan / Hatchback</h3>
            <p className="price">₹ 399</p>
          </div>
          <div className="mid"></div>
          <div className="right">
            <h3>SUV / 7 Seater</h3>
            <p className="price">₹ 499</p>
          </div>
        </div>
      </div>

      <div className="call-cta">
        <button className="cta">
          <a href="#" rel="noreferrer">
            Call Us
          </a>
        </button>
        <h1>7778889995</h1>
      </div>
    </div>
  );
};

export default OneTimeServiceCard;
