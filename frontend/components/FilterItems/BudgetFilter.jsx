import { Collapse, Slider } from "antd";

const { Panel } = Collapse;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { budgetLimit } from "../../lib/filterOptions";
// import { setProductList } from "../../store/slices/shop/productSlice";
import { setClearFilter } from "../../store/slices/shop/filter/clearSlice";
import { setActiveBudget } from "../../store/slices/shop/filter/budgetSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const activeBudget = useSelector((state) => state.activeBudget.value);

  const [sliderText, setSliderText] = useState([
    {
      title: "All",
      text: "₹ 0 - ₹ 10+ Lakh",
      min: 0,
      max: 100,
    },
    {
      title: "0 - 2 Lakh",
      text: "₹ 0 - ₹ 2,00,000",
      min: 0,
      max: 20,
    },
    {
      title: "2 - 5 Lakh",
      text: "₹ 2,00,000 - ₹ 5,00,000",
      min: 20,
      max: 40,
    },
    {
      title: "5 - 8 Lakh",
      text: "₹ 5,00,000 - ₹ 8,00,000",
      min: 40,
      max: 60,
    },
    {
      title: "8 - 10 Lakh",
      text: "₹ 8,00,000 - ₹ 10,00,000",
      min: 60,
      max: 80,
    },
    {
      title: "10+ Lakh",
      text: "₹ 10+ Lakh",
      min: 80,
      max: 100,
    },
  ]);

  const handleSlider = (value) => {
    // console.log(value, activeBudget);
    dispatch(setClearFilter(false));
    let sliderValue = value[0];
    if (sliderValue === 0) dispatch(setActiveBudget(0));
    if (sliderValue > 0 && sliderValue < 20) dispatch(setActiveBudget(1));
    if (sliderValue > 20 && sliderValue < 40) dispatch(setActiveBudget(2));
    if (sliderValue > 40 && sliderValue < 60) dispatch(setActiveBudget(3));
    if (sliderValue > 60 && sliderValue < 80) dispatch(setActiveBudget(4));
    if (sliderValue > 80 && sliderValue < 100) dispatch(setActiveBudget(5));
  };

  return (
    <div>
      <div className="budget-slider">
        <h4>{sliderText[activeBudget].text}</h4>
        <Slider
          range
          defaultValue={[0, 100]}
          onChange={(value) => handleSlider(value)}
        />
      </div>
      <div className="budget-tags">
        {sliderText.map((item, id) => (
          <button
            key={id}
            onClick={() => {
              dispatch(setActiveBudget(id));
              dispatch(setClearFilter(false));
            }}
            className={`${activeBudget === id && "active"}`}
          >
            {sliderText[id].title}
          </button>
        ))}
      </div>
    </div>
  );
};

const BudgetFilter = () => {
  return (
    <div className="budget-container">
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition={"right"}
        bordered={false}
      >
        <Panel header="Budget" key="1">
          <Menu />
        </Panel>
      </Collapse>
    </div>
  );
};

export default BudgetFilter;
