import { useState, useEffect } from "react";
import React from "react";

// icon imports
import { FiFilter } from "react-icons/fi";
// import { IoLocationOutline } from "react-icons/io5";

// component imports
import { Modal } from "antd";
import BodyFilter from "./BodyFilter";
import BudgetFilter from "./BudgetFilter";
import DistanceFilter from "./DistanceFilter";
import FuelFilter from "./FuelFilter";
import LocationFilter from "./LocationFilter";
// import AskForLocation from "../Home/AskForLocation";
import { useDispatch, useSelector } from "react-redux";
// import { setShowLocationBanner } from "../../store/slices/homepage/locationBannerSlice";
import { setLocation } from "../../store/slices/shop/filter/locationSlice";
// import { useAppContext } from "../../context/state";

const ModalContent = ({ isBike }) => {
  return (
    <section className="filter-container-mobile">
      <div className="filter-items-container">
        <LocationFilter />
        <BudgetFilter />
        <DistanceFilter />
        <FuelFilter isBike={isBike} />
        {!isBike && <BodyFilter />}
      </div>
    </section>
  );
};

const FilterItemsMobile = ({ isBike }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dispatch = useDispatch();
  const userCity = useSelector((state) => state.user.city);

  useEffect(() => {
    dispatch(setLocation(userCity));
  }, [dispatch, userCity]);

  return (
    <div>
      {/*<AskForLocation />*/}

      <div className="filter-btn-container">
        {/*
        <button onClick={() => dispatch(setShowLocationBanner(true))}>
          <IoLocationOutline className="icon" /> Location
        </button>
        */}
        <button onClick={showModal}>
          <FiFilter className="icon" /> Filter
        </button>
      </div>
      <Modal
        title="Filter By"
        style={{
          top: "-10px",
          width: "100%",
          height: "100%",
        }}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ModalContent isBike={isBike} />
      </Modal>
    </div>
  );
};

export default FilterItemsMobile;
