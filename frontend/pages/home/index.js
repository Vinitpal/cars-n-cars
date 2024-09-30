// components
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Spin } from "antd";

// dynamic imports
const TopBarIcons = dynamic(() => import("../../components/Home/TopBarIcons"));
const HomeDesktopBanner = dynamic(() =>
  import("../../components/Home/HomeDesktopBanner")
);
const HomeMobileBanner = dynamic(() =>
  import("../../components/Home/HomeMobileBanner")
);
const LatestUsedCars = dynamic(() =>
  import("../../components/Home/LatestUsedCars")
);
const PerfectTwoWheelers = dynamic(() =>
  import("../../components/Home/PerfectTwoWheelers")
);
const CarsByBudget = dynamic(() =>
  import("../../components/Home/CarsByBudget")
);
// const AskForLocation = dynamic(() =>
//   import("../../components/Home/AskForLocation")
// );
const SearchContainer = dynamic(() =>
  import("../../components/Home/SearchContainer")
);

// icons
import { FiSearch } from "react-icons/fi";

// db
import { useSelector, useDispatch } from "react-redux";
import { setStartSearch } from "../../store/slices/homepage/startSearchSlice";
import { useCarListQuery, useBikeListQuery } from "../../store/service/api";

const Home = () => {
  const [isShrunk, setShrunk] = useState(false);
  const [filterCar, setFilterCar] = useState([]);

  const dispatch = useDispatch();

  const screenWidth = useSelector((state) => state.screen.value);
  const startSearch = useSelector((state) => state.startSearch.value);
  const { data: Car, isLoading: carLoading } = useCarListQuery();
  const { data: Bike, isLoading: bikeLoading } = useBikeListQuery();

  const [searchField, setSearchField] = useState("");

  // search handler
  useEffect(() => {
    const handleSearch = () => {
      // console.log(searchField);
      if (!carLoading && Car) {
        const filteredArr = Car.filter((item) => {
          const title = item.brand + " " + item.model;
          return title.toLowerCase().includes(searchField.toLowerCase());
        });
        setFilterCar(filteredArr);
      }
    };

    handleSearch();
  }, [searchField, Car, carLoading]);

  // shrunk handler
  useEffect(() => {
    const handler = () => {
      setShrunk((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20)
        ) {
          return true;
        }

        if (
          isShrunk &&
          document.body.scrollTop < 4 &&
          document.documentElement.scrollTop < 4
        ) {
          return false;
        }

        return isShrunk;
      });
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="home">
      {/*<AskForLocation />*/}

      {screenWidth > 899 && <HomeDesktopBanner />}

      <div
        className={`${isShrunk && "shrunk"} ${
          startSearch && "active"
        } search-bar-mobile`}
        onClick={() => {
          dispatch(setStartSearch(true));
          // console.log("search bar clicked");
        }}
      >
        {!carLoading && Car && <FiSearch className="icon" />}
        <input
          type="text"
          placeholder="Search"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        />
      </div>

      {screenWidth < 900 && <TopBarIcons />}
      {screenWidth < 900 && <HomeMobileBanner />}

      {screenWidth < 768 && (
        <SearchContainer
          show={startSearch}
          car={filterCar}
          setSearchField={setSearchField}
        />
      )}

      {carLoading && (
        <div className="loader" style={{ textAlign: "center" }}>
          <Spin />
        </div>
      )}

      {!carLoading && Car && Car.length > 0 && (
        <LatestUsedCars car={Car.slice(0, 10)} carLoading={carLoading} />
      )}

      {!carLoading && Car && Car.length > 0 && (
        <CarsByBudget car={Car.slice(0, 10)} carLoading={carLoading} />
      )}

      {!bikeLoading && Bike && Bike.length > 0 && (
        <PerfectTwoWheelers
          bike={Bike.slice(0, 10)}
          bikeLoading={bikeLoading}
        />
      )}
    </div>
  );
};

export default Home;
