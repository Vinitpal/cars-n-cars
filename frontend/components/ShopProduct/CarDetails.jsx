import React from "react";
import { Tabs, Row, Col } from "antd";

const CarDetails = ({ productData, bike }) => {
  // console.log(productData.insurance);

  const overViewArray = [
    {
      title: "Year of purchase",
      value: productData.yearOfPurchase,
    },
    {
      title: "Km's Driven",
      value: `${productData.kilometerDriven} kms`,
    },
    // {
    //   title: "Reg. Number",
    //   value: productData.reg_number,
    // },
    {
      title: "Reg. State",
      value: productData.regState,
    },
    {
      title: "City",
      value: productData.location,
    },
    {
      title: "Engine",
      value: productData.cc + " cc",
    },
    {
      title: "No. Of Owners",
      value: productData.numOfOwners,
    },
    {
      title: "Make year",
      value: productData.manufacturingYear,
    },
    {
      title: "Insurance",
      value: productData.insurance ? "Yes" : "No",
    },
  ];

  const specificationArray = [
    {
      title: "Fuel Type",
      value: productData.fuelType,
    },
    {
      title: "Color",
      value: productData.color,
    },
    {
      title: "Seater",
      value: productData.seater,
    },
    {
      title: "Body Type",
      value: productData.bodyType,
    },
  ];

  const carDetails = [
    {
      title: "Brand",
      value: productData.brand,
    },
    {
      title: "Model",
      value: productData.model,
    },
    {
      title: "Variant",
      value: productData.variant,
    },
    {
      title: "Price",
      value: `₹ ${productData.price}`,
    },
    {
      title: "Current On Road Price",
      value: `₹ ${productData.currentOnRoad}`,
    },
  ];

  const Overview = ({ bike }) => {
    return (
      <div className="overview">
        <h2>{(bike ? "Bike" : "Car") + " Overview"}</h2>
        <Row gutter={{ xs: 8, sm: 8, md: 16 }}>
          {[...overViewArray].map((item, index) => (
            <Col
              key={index}
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
            >
              <div>
                <h3>{item.title}</h3>
                <p>{item.value}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  const Specification = ({ bike }) => {
    return (
      <div className="specification">
        <h2>{(bike ? "Bike" : "Car") + " Specification"}</h2>
        <Row gutter={{ xs: 8, sm: 8, md: 16 }}>
          {[...specificationArray].map((item, index) => (
            <Col
              key={index}
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
            >
              <div>
                <h3>{item.title}</h3>
                <p>{item.value}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  const Features = ({ bike }) => {
    return (
      <div className="features">
        <h2>{(bike ? "Bike" : "Car") + " Features"}</h2>
        <Row gutter={{ xs: 8, sm: 8, md: 16 }}>
          {[...carDetails].map((item, index) => (
            <Col
              key={index}
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
            >
              <div>
                <h3>{item.title}</h3>
                <p>{item.value}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  const items = [
    {
      label: "Overview",
      key: "1",
      children: <Overview bike={bike} />,
    },
    {
      label: "Specification",
      key: "2",
      children: <Specification bike={bike} />,
    },
    {
      label: "Features",
      key: "3",
      children: <Features bike={bike} />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default CarDetails;
