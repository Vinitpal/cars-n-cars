//icons
// import { FiSearch } from "react-icons/fi";
import React from "react";

import { Select } from "antd";
import { useCityQuery } from "../../store/service/api";
import { BiCurrentLocation } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../../store/slices/shop/filter/locationSlice";
import { setClearFilter } from "../../store/slices/shop/filter/clearSlice";
const { Option } = Select;

const LocationFilter = () => {
  const userCity = useSelector((state) => state.user.city);
  const location = useSelector((state) => state.location.value);
  const { data: City, isLoading: cityLoading } = useCityQuery();
  const dispatch = useDispatch();
  // console.log(userCity);
  // console.log(City);

  // by default raipur

  // <input type="text" placeholder="Raipur" autoComplete="false" />
  // <FiSearch className="icon" />;
  return (
    <div className="location-container">
      <h3>Location</h3>
      <div className="location-search-bar">
        <Select
          placeholder={location}
          value={location}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={(value) => {
            dispatch(setLocation(value));
            dispatch(setClearFilter(false));
          }}
        >
          <Option key={100000000000} value={"All"}>
            Show All
          </Option>
          {!cityLoading &&
            City.map((city, idx) => (
              <Option key={idx} value={city}>
                {city}
              </Option>
            ))}
        </Select>
      </div>
      <div
        className="gps"
        onClick={() => {
          dispatch(setLocation(userCity || "Raipur"));
          dispatch(setClearFilter(false));
        }}
      >
        <BiCurrentLocation className="icon" />
        <div className="text">
          <p>Use Current Location</p>
          <small>Using GPS</small>
        </div>
      </div>
    </div>
  );
};

export default LocationFilter;
