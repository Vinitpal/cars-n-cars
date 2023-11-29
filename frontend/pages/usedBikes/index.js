// lib imports
import { Spin } from "antd";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import axios from "axios";
import { api_path } from "../../db/path";
import { useAppContext } from "../../context/state";
import { useBikeListQuery } from "../../store/service/api";
import { distanceLimit, budgetLimit } from "../../lib/filterOptions";
import { useDispatch, useSelector } from "react-redux";

// components
const ProductCard = dynamic(() => import("../../components/Cards/ProductCard"));
const LocationFilter = dynamic(() =>
  import("../../components/FilterItems/LocationFilter")
);
const BudgetFilter = dynamic(() =>
  import("../../components/FilterItems/BudgetFilter")
);
const ModelBanner = dynamic(() =>
  import("../../components/ShopProduct/ModelBanner")
);
const DistanceFilter = dynamic(() =>
  import("../../components/FilterItems/DistanceFilter")
);
const FuelFilter = dynamic(() =>
  import("../../components/FilterItems/FuelFilter")
);
const FilterItemsMobile = dynamic(() =>
  import("../../components/FilterItems/FilterItemsMobile")
);
const Recommended = dynamic(() =>
  import("../../components/ShopProduct/Recommended")
);

const Shop = () => {
  const dispatch = useDispatch();

  const screenWidth = useSelector((state) => state.screen.value);
  const activeDistance = useSelector((state) => state.activeDistance.value);
  const activeBudget = useSelector((state) => state.activeBudget.value);
  const fuelType = useSelector((state) => state.fuelType.value);
  const brand = useSelector((state) => state.brand.value);
  const location = useSelector((state) => state.location.value);
  const bodyType = useSelector((state) => state.bodyType.value);
  const clearFilter = useSelector((state) => state.clearFilter.value);
  const { data: Bikelist, isLoading: bikeListLoading } = useBikeListQuery();

  const [Bike, setBike] = useState([]);
  const [bikeLoading, setBikeLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(true);
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(10);
  const { wait } = useAppContext();

  useEffect(() => {
    if (!bikeLoading) {
      setProductList(Bike);
    }
  }, [bikeLoading, Bike]);

  // --------------------------------------------------------------------

  useEffect(() => {
    setBikeLoading(true);
    getMoreBike(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleGetMoreBike() {
    if (!bikeLoading) {
      setPage(+Car[Car.length - 1].v_id + 10);

      console.log(page);

      setFetchingMore(true);
      wait(500).then(() => {
        getMoreCar(+Bike[Bike.length - 1].v_id + 10);
      });
    }
  }

  const getMoreBike = async (id) => {
    setFetchingMore(true);
    try {
      const axios = (await import("axios")).default;

      await axios(`${api_path}/api/v1/bikes/list`).then(function (response) {
        // console.log("order :", response.data);
        // console.log("reverse: :", response.data.reverse());
        setBike(response.data);
        setBikeLoading(false);
        setFetchingMore(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // --------------------------------------------------------------------

  // --------------------------------------------------------------------

  // Filter useEffect
  useEffect(() => {
    if (!bikeLoading) {
      if (clearFilter) {
        setProductList(Bike);
        return;
      }

      const fitlerFunc = (filterArr, filters) => {
        const filterOptions = ["fuelType", "brand", "location", "bodyType"];

        let newArr = [...filterArr];
        filters.forEach((element, idx) => {
          const filterOption = filterOptions[idx];

          if (element !== "All") {
            newArr = [...newArr].filter((item) => {
              if (typeof element === "boolean")
                return item[filterOption] === element;
              else
                return (
                  item[filterOption].toLowerCase() === element.toLowerCase()
                );
            });
          }
        });

        return newArr;
      };

      let filterArr;
      filterArr = [...Bike]
        .filter(
          (item) =>
            item.kilometerDriven >= distanceLimit[activeDistance].min &&
            item.kilometerDriven < distanceLimit[activeDistance].max
        )
        .filter(
          (item) =>
            item.price >= budgetLimit[activeBudget].min &&
            item.price < budgetLimit[activeBudget].max
        );

      const filters = [fuelType, brand, location, bodyType];
      filterArr = fitlerFunc(filterArr, filters);
      setProductList(filterArr);
    }
  }, [
    activeDistance,
    Bike,
    bikeLoading,
    activeBudget,
    fuelType,
    brand,
    location,
    bodyType,
    clearFilter,
  ]);

  // --------------------------------------------------------------------

  if (bikeLoading) {
    return (
      <div className="shop-page-loading">
        <Spin />
      </div>
    );
  }

  return (
    <div className="shop">
      <div className="header">
        <h2>Latest Used Bikes</h2>
        <div className="breadcrumb">
          <Link href="/">
            <a className="active">Home</a>
          </Link>

          <span>{">"}</span>

          <Link href="/usedBikes">
            <a className="active">Used Bikes</a>
          </Link>

          <span>{">"}</span>

          <Link href="/usedBikes">
            <a>{location === "All" ? "All Bikes" : `Bikes in ${location}`}</a>
          </Link>
        </div>
      </div>
      {screenWidth < 900 && <FilterItemsMobile isBike={true} />}
      <div className="container">
        <section className="filter-container">
          <h3 className="filter-title">Filter By :</h3>
          <div className="filter-items-container">
            <LocationFilter />
            <BudgetFilter />
            <DistanceFilter />
            <FuelFilter isBike={true} />
          </div>
        </section>

        <section className="shop-container hide-when-filter-mobile">
          <h2>Latest Used Bikes</h2>
          <ModelBanner isBike={true} />
          <div className="shop-items-container">
            {bikeLoading ? (
              <div>
                <Spin />
              </div>
            ) : productList && productList.length > 0 ? (
              productList.map((bike, idx) => (
                <ProductCard
                  key={idx}
                  car={bike}
                  url={`/usedBikes/${
                    bike.brand + "_" + bike.model + "_in_" + bike.location
                  }?id=${bike._id}`}
                />
              ))
            ) : (
              <div className="no-match-found">No Match Found</div>
            )}
            {fetchingMore && (
              <div className="load-more-container">
                <Spin />
              </div>
            )}
          </div>
          <div className="show-more" onClick={() => handleGetMoreBike()}>
            <button>Show More</button>
          </div>
        </section>
      </div>

      {!bikeListLoading && <Recommended car={Bikelist} />}
    </div>
  );
};

export default Shop;
