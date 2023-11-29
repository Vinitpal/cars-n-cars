import { Spin } from "antd";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
// import { api_path } from "../../db/path";
import { setFilterBrand } from "../../store/slices/shop/filter/brandSlice";

const BrandIconsFooter = ({ Brands }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // console.log(Brands);

  return (
    <div className="brand-icons-footer">
      <h2>Popular Car Brands</h2>
      <div className="brand-icons-container">
        {Brands?.slice(0, 18).map((brand, id) => (
          <div key={id} className="brand-icon">
            <div
              className={"image-container"}
              style={{
                width: "70px",
                height: "70px",
                position: "relative",
              }}
              onClick={(e) => {
                dispatch(setFilterBrand(brand.b_name));
                router.push("/usedCars");
              }}
            >
              <Image
                className="img"
                src={brand.image}
                alt="Cars&Cars"
                layout="fill"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandIconsFooter;
