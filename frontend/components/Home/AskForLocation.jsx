// next js imports
import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { api_path } from "../../db/path";
import Image from "next/image";

// state/context imports
import { useSelector, useDispatch } from "react-redux";
import { setShowLocationBanner } from "../../store/slices/homepage/locationBannerSlice";
import { setShowLocationMobile } from "../../store/slices/homepage/locationMobileSlice";
import { setUserCity } from "../../store/slices/global/userSlice";
// import { useLocationContext } from "../../context/location";

// component imports
import AskForLocationMobile from "./AskForLocationMobile";
import { Input } from "antd";
import { useCityQuery } from "../../store/service/api";

// icons imports
import { FaCity } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { useAppContext } from "../../context/state";

const AskForLocation = () => {
  const dispatch = useDispatch();

  const { data: City, isLoading: cityLoading } = useCityQuery();
  const { storeToLocal } = useAppContext();

  const showBanner = useSelector((state) => state.showLocationBanner.value);
  const screenWidth = useSelector((state) => state.screen.value);

  const [cities, setCities] = useState([]);
  const [filterCity, setFilterCity] = useState([]);

  useEffect(() => {
    if (!cityLoading) {
      setCities(City?.data);
      setFilterCity(City?.data?.slice(2));
    }
  }, [cities, cityLoading, City]);

  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    const handleSearch = (value) => {
      if (!cityLoading) {
        const filteredArr = cities.filter((city) => {
          let cityName = city.l_name;
          return cityName.toLowerCase().includes(value.toLowerCase());
        });
        setFilterCity(filteredArr);
        // console.log(filteredArr);
      }

      if (!cityLoading && value === "") {
        setFilterCity(City.data.slice(2));
      }
    };

    handleSearch(searchField);
  }, [searchField, City, cityLoading, cities]);

  return (
    <>
      <div className={`ask-for-location ${showBanner && "active"}`}>
        <div className="header">
          <div className="text">
            <h2>Please setup Location</h2>
            <p>Help us with your location so we can serve you better.</p>
          </div>
          <div
            className="close-icon"
            onClick={() => {
              dispatch(setShowLocationBanner(false));
              dispatch(setShowLocationMobile(false));
              setSearchField("");
            }}
          >
            <AiOutlineClose />
          </div>
        </div>
        <div className="location-searchBar">
          <button
            onClick={() => {
              dispatch(setShowLocationBanner(false));
              dispatch(setShowLocationMobile(false));
              setSearchField("");
            }}
          >
            <AiOutlineLeft className="icon" />
            Back
          </button>
          <Input
            placeholder="Search City"
            size="large"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          />
        </div>

        <small>Popular Cities</small>
        <div className="popular-cities">
          {cities &&
            cities.length > 0 &&
            [...cities].slice(0, 2).map((city, idx) => (
              <div
                className="popular-city-card"
                key={idx}
                onClick={() => {
                  dispatch(setUserCity(city.l_name));
                  storeToLocal("city", city.l_name);
                  dispatch(setShowLocationBanner(false));
                  dispatch(setShowLocationMobile(false));
                }}
              >
                <FaCity className="icon" />
                <p>{city.l_name}</p>
              </div>
            ))}
        </div>

        <small>Other Cities</small>
        <div className="other-cities">
          {cities &&
            cities.length > 0 &&
            [...filterCity].map((city, idx) => (
              <div
                className="other-city-card"
                key={idx}
                onClick={() => {
                  dispatch(setUserCity(city.l_name));
                  storeToLocal("city", city.l_name);
                  dispatch(setShowLocationBanner(false));
                  dispatch(setShowLocationMobile(false));
                }}
              >
                <Image
                  src={"/icons/pin.png"}
                  width={"12px"}
                  height={"12px"}
                  alt={city.l_name}
                  className={"icon"}
                />
                <p>{city.l_name}</p>
              </div>
            ))}
        </div>
      </div>
      {screenWidth < 700 && <AskForLocationMobile />}
    </>
  );
};

export default AskForLocation;
