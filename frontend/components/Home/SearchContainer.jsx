import React from "react";
import { useDispatch } from "react-redux";
import { setStartSearch } from "../../store/slices/homepage/startSearchSlice";
import { AiOutlineLeft } from "react-icons/ai";
import FeaturedCard from "../Cards/FeaturedCard";

const SearchContainer = ({ show, car, setSearchField }) => {
  const dispatch = useDispatch();

  return (
    <div className={`search-container ${show && "active"}`}>
      <button
        className="back-btn"
        onClick={() => {
          dispatch(setStartSearch(false));
          setSearchField("");
        }}
      >
        <AiOutlineLeft className="icon" /> Back
      </button>
      <div className="search-cards-container">
        {car &&
          car.length > 0 &&
          [...car].map((item, idx) => <FeaturedCard key={idx} car={item} />)}
      </div>
    </div>
  );
};

export default SearchContainer;
