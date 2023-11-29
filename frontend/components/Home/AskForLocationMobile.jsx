import React,{ useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useLocationContext } from "../../context/location";
import { useSelector, useDispatch } from "react-redux";
import { setShowLocationBanner } from "../../store/slices/homepage/locationBannerSlice";
import { setShowLocationMobile } from "../../store/slices/homepage/locationMobileSlice";
import { setUserCity } from "../../store/slices/global/userSlice";
import { useAppContext } from "../../context/state";

const AskForLocationMobile = () => {
  const { setPosition, userCity } = useLocationContext();
  const { storeToLocal } = useAppContext();
  const showInMobile = useSelector((state) => state.showLocationMobile.value);

  const dispatch = useDispatch();

  const getPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;   
        setPosition([lat, long]);
      });
    } else {
      dispatch(setUserCity("Raipur"));
      storeToLocal("city", "Raipur");
    }
    dispatch(setShowLocationMobile(false));
    dispatch(setShowLocationBanner(false));
  };

  useEffect(() => {
    if (userCity) {
      dispatch(setUserCity(userCity));
      storeToLocal("city", userCity);
      dispatch(setShowLocationMobile(false));
      dispatch(setShowLocationBanner(false));
    }
  }, [userCity, dispatch, storeToLocal]);

  //   console.log(userCity);

  return (
    <div className={`bg-wrapper ${!showInMobile && "active"}`}>
      <div className={`ask-for-location-mobile ${showInMobile && "active"}`}>
        <div className="header">
          <div className="text">
            <h2>Please setup Location</h2>
            <p>Tell us your preferred location so we can serve you better.</p>
          </div>
          <div
            className="close-icon"
            onClick={() => dispatch(setShowLocationMobile(false))}
          >
            <AiOutlineClose />
          </div>
        </div>

        <div className="location-cta">
          <button className="current" onClick={() => getPosition()}>
            Use my current location
          </button>
          <button
            className="manual"
            onClick={() => dispatch(setShowLocationBanner(true))}
          >
            select manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskForLocationMobile;
