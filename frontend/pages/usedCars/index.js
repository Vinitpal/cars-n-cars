// lib imports
import Link from "next/link";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { api_path } from "../../db/path";
import { useAppContext } from "../../context/state";
import { useSelector } from "react-redux";
import { distanceLimit, budgetLimit } from "../../lib/filterOptions";

// components
import ProductCard from "../../components/Cards/ProductCard";
// import { setClearFilter } from "../../store/slices/shop/filter/clearSlice";
// import { car } from "../../db/car";

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
const BodyFilter = dynamic(() =>
  import("../../components/FilterItems/BodyFilter")
);
const FilterItemsMobile = dynamic(() =>
  import("../../components/FilterItems/FilterItemsMobile")
);
const Recommended = dynamic(() =>
  import("../../components/ShopProduct/Recommended")
);

const Shop = () => {
  // const dispatch = useDispatch();

  const screenWidth = useSelector((state) => state.screen.value);
  const activeDistance = useSelector((state) => state.activeDistance.value);
  const activeBudget = useSelector((state) => state.activeBudget.value);
  const fuelType = useSelector((state) => state.fuelType.value);
  const brand = useSelector((state) => state.brand.value);
  const location = useSelector((state) => state.location.value);
  const bodyType = useSelector((state) => state.bodyType.value);
  const clearFilter = useSelector((state) => state.clearFilter.value);

  const [Car, setCar] = useState([]);
  const [carLoading, setCarLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(true);
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(10);
  const { wait } = useAppContext();

  useEffect(() => {
    if (!carLoading) {
      setProductList(Car);
    }
  }, [carLoading, Car]);

  // --------------------------------------------------------------------
  // console.log(Carlist, Car, "---test");

  useEffect(() => {
    setCarLoading(true);
    getMoreCar(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleGetMoreCar() {
    if (!carLoading) {
      setPage(+Car[Car.length - 1].v_id + 10);

      // console.log(page);

      setFetchingMore(true);
      wait(500)
        .then(() => {
          getMoreCar(+Car[Car.length - 1].v_id + 10);
        })
        .then(() => window.scrollTo(0, 0));
    }
  }

  const getMoreCar = async (id) => {
    setFetchingMore(true);
    try {
      const axios = (await import("axios")).default;

      await axios(`${api_path}/api/v1/cars/list`).then(function (response) {
        // console.log("order :", response.data);
        // console.log("reverse: :", response.data.reverse());
        setCar(response.data);
        setCarLoading(false);
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
    if (!carLoading) {
      // console.log(clearFilter);

      if (clearFilter) {
        setProductList(Car);
        return;
      }

      // console.log("check by kirua 1", productList);

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
      filterArr = [...Car]
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
    Car,
    carLoading,
    activeBudget,
    fuelType,
    brand,
    location,
    bodyType,
    clearFilter,
  ]);

  // --------------------------------------------------------------------

  if (carLoading) {
    return (
      <div className="shop-page-loading">
        <Spin />
      </div>
    );
  }

  return (
    <div className="shop">
      <div className="header">
        <h2>Latest Used Cars</h2>
        <div className="breadcrumb">
          <Link href="/">
            <a className="active">Home</a>
          </Link>

          <span>{">"}</span>

          <Link href="/usedCars">
            <a className="active">Used Cars</a>
          </Link>

          <span>{">"}</span>

          <Link href="/usedCars">
            <a>{location === "All" ? "All Cars" : `Cars in ${location}`}</a>
          </Link>
        </div>
      </div>
      {screenWidth < 900 && <FilterItemsMobile />}
      <div className="container">
        <section className="filter-container">
          <h3 className="filter-title">Filter By :</h3>
          <div className="filter-items-container">
            <LocationFilter />
            <BudgetFilter />
            <DistanceFilter />
            <FuelFilter />
            <BodyFilter />
          </div>
        </section>

        <section className="shop-container hide-when-filter-mobile">
          {/* <h2>Latest Used Cars</h2> */}
          <ModelBanner isBike={false} />
          <div className="shop-items-container">
            {carLoading ? (
              <div>
                <Spin />
              </div>
            ) : productList && productList.length > 0 ? (
              productList
                .sort((a, b) => +b.is_active - +a.is_active)
                .map((car, idx) => (
                  <ProductCard
                    key={idx}
                    car={car}
                    url={`/usedCars/${
                      car.brand + "_" + car.model + "_in_" + car.location
                    }?id=${car._id}`}
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
          <div className="show-more" onClick={() => handleGetMoreCar()}>
            <button>Show More</button>
          </div>
        </section>
      </div>

      <Recommended />
    </div>
  );
};

export default Shop;
