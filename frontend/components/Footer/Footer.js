// next js imports
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// component imports
const QuickFooterLinks = dynamic(() => import("./QuickFooterLinks"));
const BrandIconsFooter = dynamic(() => import("./BrandIconsFooter"));
import { FiPhoneCall } from "react-icons/fi";

// db
import { footerLinks, socialLinks } from "../../db/footerLinks";
import { Brands } from "../../db/car";
import { useCityQuery } from "../../store/service/api";
import { setFilterBrand } from "../../store/slices/shop/filter/brandSlice";
// import { setLocation } from "../../store/slices/shop/filter/locationSlice";
import { useDispatch } from "react-redux";
import { useAppContext } from "../../context/state";

const Footer = () => {
  // const { data: Brands, isLoading: brandLoading } = useBrandsQuery();
  const { data: City, isLoading: cityLoading } = useCityQuery();
  const dispatch = useDispatch();
  const router = useRouter();
  const { wait } = useAppContext();

  return (
    <>
      <BrandIconsFooter Brands={Brands} />
      <footer>
        <div className="logo">
          <div className="image-container" style={{ width: "150px" }}>
            <Image
              className="img"
              src={"/images/logoWhite.png"}
              alt="Cars&Cars"
              layout="fill"
            />
          </div>
        </div>

        <div className="wrapper">
          {[...footerLinks].map((item, index) => (
            <div className="footer-links" key={index}>
              <h2>{item.title}</h2>
              <ul>
                {[...item.links].map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.route} passHref>
                      <a>{link.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* // Brands // */}
          <div className="footer-links">
            <h2>Top Brands</h2>
            <ul>
              {Brands &&
                Brands.slice(0, 7).map((item, index) => (
                  <li key={index}>
                    <p
                      onClick={() => {
                        dispatch(setFilterBrand(item.title));
                        wait(500).then(() => router.push("/usedCars"));
                      }}
                    >
                      {item.title}
                    </p>
                  </li>
                ))}
            </ul>
          </div>

          {/* // City // */}
          {/*
          <div className="footer-links">
            <h2>Top Cities</h2>
            <ul>
              {!cityLoading &&
                City.data.slice(0, 7).map((item, index) => (
                  <li key={index}>
                    <a
                      onClick={() => {
                        dispatch(setLocation(item.l_name));
                        wait(500).then(() => router.push("/usedCars"));
                      }}
                    >
                      {item.l_name}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          */}

          <div className="social">
            <h2>Follow us</h2>
            <ul className="social-container">
              {socialLinks &&
                [...socialLinks].map((item, idx) => (
                  <li key={idx}>
                    <a href={item.link} target={"_blank"} rel="noreferrer">
                      {item.icon}
                    </a>
                  </li>
                ))}
            </ul>
            <ul className="social-container">
              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <FiPhoneCall
                    aria-label="call us at"
                    style={{ fontSize: "1.5rem" }}
                  />
                  <span
                    style={{
                      fontSize: "1rem",
                      marginLeft: "10px",
                      fontWeight: 700,
                    }}
                  >
                    7778889995
                  </span>
                </a>
              </li>
            </ul>
          </div>
          {/** */}
        </div>
        <QuickFooterLinks />
      </footer>
    </>
  );
};

export default Footer;
