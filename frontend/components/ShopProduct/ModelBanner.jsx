import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Image from "next/image";

import { Brands } from "../../db/car";

import { Spin } from "antd";

const FreeCarousel = dynamic(() => import("../Carousel/FreeCarousel"));
// import { api_path } from "../../db/path";
import { useDispatch, useSelector } from "react-redux";
import { setFilterBrand } from "../../store/slices/shop/filter/brandSlice";
import { setClearFilter } from "../../store/slices/shop/filter/clearSlice";

const BrandsCarousel = ({ Brands, isBike }) => {
  const [selectedBrand, setSelectedBrand] = useState(false);
  const [sliceValue, setSliceValue] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    isBike ? setSliceValue([18]) : setSliceValue([0, 17]);
  }, [isBike]);

  return [...Brands].slice(sliceValue[0], sliceValue[1]).map((brand, idx) => (
    <div
      className={`brand-card keen-slider__slide number-slide${idx + 1}`}
      key={idx}
    >
      <div
        className={`image-container ${
          brand.title === selectedBrand && "active"
        }`}
        onClick={(e) => {
          if (brand.title !== selectedBrand || selectedBrand === false) {
            dispatch(setFilterBrand(brand.title));
            setSelectedBrand(brand.title);
            dispatch(setClearFilter(false));
          } else {
            dispatch(setFilterBrand("All"));
            setSelectedBrand(false);
            dispatch(setClearFilter(false));
          }
        }}
      >
        <Image className="img" src={brand.image} alt="Cars&Cars" width={100} height={100} />
        <p>{brand.title}</p>
      </div>
    </div>
  ));
};

const ModelBanner = ({ isBike }) => {
  const [isShrunk, setShrunk] = useState(false);
  const [reload, setReload] = useState(false);
  const screenWidth = useSelector((state) => state.screen.value);

  // shrunk handler
  useEffect(() => {
    const handler = () => {
      setShrunk((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 300 ||
            document.documentElement.scrollTop > 300)
        ) {
          setReload(true);
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
    <section
      className={`brand-cards-container
    ${screenWidth < 768 && isShrunk && "shrunk"}
  `}
    >
      <h3 style={{ display: isShrunk && "hidden" }}> Pick Your Model</h3>
      <FreeCarousel reload={reload} setReload={setReload}>
        {!Brands ? (
          [...Array(9)].map((_, idx) => (
            <div
              className={`brand-card keen-slider__slide number-slide${idx + 1}`}
              key={idx}
            >
              <Spin />
            </div>
          ))
        ) : (
          <BrandsCarousel Brands={Brands} isBike={isBike} />
        )}
      </FreeCarousel>
    </section>
  );
};

export default ModelBanner;
