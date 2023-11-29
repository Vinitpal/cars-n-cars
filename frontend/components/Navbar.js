// module imports
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { FiSearch, FiMenu } from "react-icons/fi";
import {
  AiOutlineHome,
  AiOutlineCar,
  AiOutlineBook,
  AiOutlineTool,
} from "react-icons/ai";
// import { RiMotorbikeLine } from "react-icons/ri";
import { Drawer } from "antd";

const SearchContainer = dynamic(() => import("./Home/SearchContainer"));

import { useSelector, useDispatch } from "react-redux";
import { api_path } from "../db/path";
import { setStartSearch } from "../store/slices/homepage/startSearchSlice";
import { setClearFilter } from "../store/slices/shop/filter/clearSlice";

// next js imports
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [car, setCar] = useState([]);
  const [filterCar, setFilterCar] = useState([]);

  const screenWidth = useSelector((state) => state.screen.value);
  const startSearch = useSelector((state) => state.startSearch.value);

  const dispatch = useDispatch();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  // console.log(car);

  useEffect(() => {
    if (car.length <= 0) {
      getData();
    }
  }, [car]);

  async function getData() {
    const axios = (await import("axios")).default;

    await axios.get(`${api_path}/api/v1/cars/list`).then((res) => {
      setCar(res.data);
    });
  }

  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    const handleSearch = () => {
      // console.log(searchField);
      if (car && car.length > 0) {
        const filteredArr = car.filter((item) => {
          const title = item.brand + " " + item.model;
          return title.toLowerCase().includes(searchField.toLowerCase());
        });
        setFilterCar(filteredArr);
      }
    };

    handleSearch();
  }, [searchField, car]);

  return (
    <div className="navbar">
      {/******** Desktop Navbar ********/}
      <div className="navbar-desktop">
        <Link href="/">
          <a>
            <div
              className="image-container"
              style={{ width: "120px" }}
              onClick={() => dispatch(setStartSearch(false))}
            >
              <Image
                className="img"
                src={"/images/logo.png"}
                alt="Cars&Cars"
                layout="fill"
                priority={true}
              />
            </div>
          </a>
        </Link>
        <div
          className="searchBar"
          onClick={() => dispatch(setStartSearch(true))}
        >
          <FiSearch className="icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          />
        </div>

        <div
          className="links"
          onClick={() => {
            dispatch(setStartSearch(false));
            dispatch(setClearFilter(true));
          }}
        >
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/usedCars">
            <a>Used Car</a>
          </Link>
          {/*
          <Link href="/usedBikes">
            <a>Used Bike</a>
          </Link>
          */}
          <Link href="/services">
            <a>Services</a>
          </Link>
          <a href={`${api_path}/admin`} className="login-link">
            <button className="login-btn">Login</button>
          </a>
          <Link href="/auth/SignUp" className="login-link">
            {/* <button className="sellcar-btn">Sell Used Car</button> */}
            <button className="sellcar-btn">Register</button>
          </Link>
        </div>
      </div>

      {screenWidth > 768 && (
        <SearchContainer
          show={startSearch}
          car={filterCar}
          setSearchField={setSearchField}
        />
      )}

      {/******** Mobile Navbar ********/}
      <div className="navbar-mobile">
        <Link href="/">
          <a>
            <div className="image-container" style={{ width: "120px" }}>
              <Image
                className="img"
                src={"/images/logo.png"}
                alt="Cars&Cars"
                layout="fill"
                priority={true}
              />
            </div>
          </a>
        </Link>

        <div className="menu-btn">
          {!visible && <FiMenu className="icon" onClick={showDrawer} />}
        </div>

        <Drawer placement="right" onClose={onClose} visible={visible}>
          <div
            className="links"
            onClick={() => {
              dispatch(setStartSearch(false));
              dispatch(setClearFilter(true));
              setVisible(false);
            }}
          >
            <Link href="/">
              <a onClick={() => setVisible(false)}>
                <AiOutlineHome className="icon" /> Home
              </a>
            </Link>
            <Link href="/usedCars">
              <a>
                <AiOutlineCar className="icon" /> Used Car
              </a>
            </Link>
            {/*
            <Link href="/usedBikes">
              <a onClick={() => setVisible(false)}>
                <RiMotorbikeLine className="icon" />
                Used Bike
              </a>
            </Link>
          */}
            <Link href="/service">
              <a onClick={() => setVisible(false)}>
                <AiOutlineTool className="icon" />
                Services
              </a>
            </Link>
            <Link href="/blog">
              <a onClick={() => setVisible(false)}>
                <AiOutlineBook className="icon" />
                Blog
              </a>
            </Link>
          </div>

          <div className="btns">
            {/* <Link href="/auth/SignUp">
                <button onClick={() => setVisible(false)} className="login-btn">
                  Register
                </button>
              </Link> */}

            <a
              href={`${api_path}/admin`}
              target="_blank"
              className="login-link admin"
            >
              <button onClick={() => setVisible(false)} className="login-btn">
                Login
              </button>
            </a>

            <Link href={"/auth/SignUp"} className="login-link">
              {/* <button onClick={() => setVisible(false)} className="sellcar-btn">
                Sell Used Car
              </button> */}
              <button onClick={() => setVisible(false)} className="sellcar-btn">
                Register
              </button>
            </Link>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;
