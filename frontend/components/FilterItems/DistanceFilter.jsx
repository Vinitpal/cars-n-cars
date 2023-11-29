import { Collapse, Slider } from "antd";
import React,{ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const { Panel } = Collapse;
// import { distanceLimit } from "../../lib/filterOptions";
// import { setProductList } from "../../store/slices/shop/productSlice";
import { setClearFilter } from "../../store/slices/shop/filter/clearSlice";
import { setActiveDistance } from "../../store/slices/shop/filter/distanceSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const activeDistance = useSelector((state) => state.activeDistance.value);

  const [sliderText, setSliderText] = useState([
    {
      text: "All Kms",
      min: 0,
      max: 100,
    },
    {
      text: "Upto 10,000 Km",
      min: 0,
      max: 15,
    },
    {
      text: "10,000 Km - 20,000 Km",
      min: 15,
      max: 30,
    },
    {
      text: "20,000 Km - 40,000 Km",
      min: 30,
      max: 45,
    },
    {
      text: "40,000 Km - 70,000 Km",
      min: 45,
      max: 60,
    },
    {
      text: "70,000 Km - 100,000 Km",
      min: 60,
      max: 75,
    },
    {
      text: "100,000 Km - 120,000 Km",
      min: 75,
      max: 85,
    },
    {
      text: "above 120,000 Km",
      min: 85,
      max: 100,
    },
  ]);

  const handleSlider = (value) => {
    // console.log(value, activeDistance);
    dispatch(setClearFilter(false));
    let sliderValue = value[0];
    if (sliderValue === 0) dispatch(setActiveDistance(0));
    if (sliderValue > 0 && sliderValue < 15) dispatch(setActiveDistance(1));
    if (sliderValue > 15 && sliderValue < 30) dispatch(setActiveDistance(2));
    if (sliderValue > 30 && sliderValue < 45) dispatch(setActiveDistance(3));
    if (sliderValue > 45 && sliderValue < 60) dispatch(setActiveDistance(4));
    if (sliderValue > 60 && sliderValue < 75) dispatch(setActiveDistance(5));
    if (sliderValue > 75 && sliderValue < 85) dispatch(setActiveDistance(6));
    if (sliderValue > 85 && sliderValue < 100) dispatch(setActiveDistance(7));
  };

  return (
    <div>
      <div className="distance-slider">
        <h4>{sliderText[activeDistance].text}</h4>
        <Slider
          range
          defaultValue={[0, 100]}
          onChange={(value) => handleSlider(value)}
        />
      </div>
      <div className="distance-tags">
        {sliderText.map((item, id) => (
          <button
            key={id}
            onClick={() => {
              dispatch(setActiveDistance(id));
              dispatch(setClearFilter(false));
            }}
            className={`${activeDistance === id && "active"}`}
          >
            {sliderText[id].text}
          </button>
        ))}
      </div>
    </div>
  );
};

const DistanceFilter = () => {
  return (
    <div className="distance-container">
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition={"right"}
        bordered={false}
      >
        <Panel header="Kilometer Driven" key="1">
          <Menu />
        </Panel>
      </Collapse>
    </div>
  );
};

export default DistanceFilter;
