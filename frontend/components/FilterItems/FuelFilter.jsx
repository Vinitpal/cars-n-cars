import { useState } from "react";
import { Collapse, Radio, Space } from "antd";
import { useDispatch } from "react-redux";
import { setFuelType } from "../../store/slices/shop/filter/fuelSlice";
import { setClearFilter } from "../../store/slices/shop/filter/clearSlice";
const { Panel } = Collapse;

const Menu = ({ changeRadioValue, value, isBike }) => {
  return (
    <div>
      <Radio.Group onChange={(e) => changeRadioValue(e)} value={value}>
        <Space direction="vertical">
          {isBike ? (
            <>
              <Radio value={0}>Show All</Radio>
              <Radio value={1}>Petrol</Radio>
              <Radio value={3}>Electric</Radio>
            </>
          ) : (
            <>
              <Radio value={0}>Show All</Radio>
              <Radio value={1}>Petrol</Radio>
              <Radio value={2}>Diesel</Radio>
              <Radio value={3}>Electric</Radio>
            </>
          )}
        </Space>
      </Radio.Group>
    </div>
  );
};

const FuelFilter = ({ isBike }) => {
  const [radioValue, setRadioValue] = useState(0);
  const dispatch = useDispatch();

  const changeRadioValue = (e) => {
    // console.log("radio checked", e.target.value);
    setRadioValue(e.target.value);
    dispatch(setClearFilter(false));
    if (e.target.value === 0) dispatch(setFuelType("All"));
    if (e.target.value === 1) dispatch(setFuelType("petrol"));
    if (e.target.value === 2) dispatch(setFuelType("diesel"));
    if (e.target.value === 3) dispatch(setFuelType("electric"));
  };

  return (
    <div className="fuel-container">
      <Collapse
        defaultActiveKey={["0"]}
        expandIconPosition={"right"}
        bordered={false}
      >
        <Panel header="Fuel Type" key="1">
          <Menu
            changeRadioValue={changeRadioValue}
            value={radioValue}
            isBike={isBike}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default FuelFilter;
