import { Collapse } from "antd";
import React from "react";

import { useDispatch } from "react-redux";
import { useState } from "react";
const { Panel } = Collapse;
import { setBodyType } from "../../store/slices/shop/filter/bodyTypeSlice";
import { setClearFilter } from "../../store/slices/shop/filter/clearSlice";
import { bodyType } from "../../db/car";

const Menu = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  // console.log(bodyType);

  return (
    <div className="car-body-container">
      {bodyType.map((car, idx) => (
        <div
          key={idx}
          className={`car-body ${active === car.bt_name && "active"}`}
          onClick={() => {
            if (active === "All" || active !== car.bt_name) {
              dispatch(setBodyType(car.bt_name));
              dispatch(setClearFilter(false));
              setActive(car.bt_name);
            } else {
              dispatch(setBodyType("All"));
              dispatch(setClearFilter(false));
              setActive("All");
            }
          }}
        >
          {/*          <div className="image-container" style={{ width: "50px" }}>
            <Image
              className="img"
              src="/images/hatchback.jpg"
              alt="Cars&Cars"
               
            />
        </div>*/}
          <small>{car.bt_name}</small>
        </div>
      ))}
    </div>
  );
};

const BodyFilter = () => {
  return (
    <div className="body-type-container">
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition={"right"}
        bordered={false}
      >
        <Panel header="Body Type" key="1">
          <Menu />
        </Panel>
      </Collapse>
    </div>
  );
};

export default BodyFilter;
