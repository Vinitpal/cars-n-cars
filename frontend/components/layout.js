// next js components
import Head from "next/head";
import Script from "next/script";

import dynamic from "next/dynamic";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { width } from "../store/slices/global/screenSlice";
import { scrollWidth } from "../store/slices/global/scrollSlice";
import { setShowLocationBanner } from "../store/slices/homepage/locationBannerSlice";
import { setShowLocationMobile } from "../store/slices/homepage/locationMobileSlice";

// components
const Navbar = dynamic(() => import("./Navbar"));
const Footer = dynamic(() => import("./Footer/Footer"));
import { useAppContext } from "../context/state";
import {
  setUserCity,
  setUserPhone,
  setUserName,
} from "../store/slices/global/userSlice";

export const siteTitle = "Cars&Cars";

function Layout({ children }) {
  const [pageLoading, setPageLoading] = useState(true);
  const screenWidthValue = useSelector((state) => state.screen.value);
  const { userName, userPhone, userCity } = useSelector((state) => state.user);

  const { getFromLocal } = useAppContext();
  const dispatch = useDispatch();

  useEffect(() => {
    window.onload = setPageLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // screenWidth Dispatch
  // run only once
  useEffect(() => {
    window.onload = dispatch(width(window.innerWidth));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // run when resize
  useEffect(() => {
    const onResize = () => {
      dispatch(width(window.innerWidth));
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  // scrollWidth Dispatch
  useEffect(() => {
    dispatch(scrollWidth(screenWidthValue));
  }, [dispatch, screenWidthValue]);

  // location banner
  useEffect(() => {
    const city = getFromLocal("city");
    if (city) return;

    if (screenWidthValue >= 700) {
      dispatch(setShowLocationMobile(false));
      dispatch(setShowLocationBanner(true));
    }
  }, [dispatch, screenWidthValue, getFromLocal]);

  useEffect(() => {
    const city = getFromLocal("city");
    if (city) return;

    if (screenWidthValue < 700) {
      dispatch(setShowLocationBanner(false));
      dispatch(setShowLocationMobile(true));
    }
  }, [dispatch, screenWidthValue, getFromLocal]);

  useEffect(() => {
    const city = getFromLocal("city");
    const name = getFromLocal("name");
    const phone = getFromLocal("phone");

    if (city && !userCity) dispatch(setUserCity(city));
    if (name && !userName) dispatch(setUserName(name));
    if (phone && !userPhone) dispatch(setUserPhone(phone));
  }, [dispatch, getFromLocal, userCity, userName, userPhone]);

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Are you looking to Buy or Sell Used Car?"
        />
        <meta property="og:title" content={siteTitle} />
        <meta
          property="og:description"
          content="Are you looking to Buy or Sell Used Car?"
        />
        <meta property="og:image" content="/logo.png" />
        <meta name="og:title" content={siteTitle} />
        <title>{siteTitle}</title>
      </Head>

      {/*<!-- Google Tag Manager -->*/}
      <Script
        strategy="lazyOnload"
        async
        dangerouslySetInnerHTML={{
          __html: `
          (
            // Function to perform after loading the script
            function (w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({
                "gtm.start": new Date().getTime(),
                event: "gtm.js",
              });
              var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != "dataLayer" ? "&l=" + l : "";
              j.async = true;
              j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, "script", "dataLayer", "GTM-MCR22XL")
          ;
        `,
        }}
        onError={(err) => {
          console.error("Error", err);
        }}
      />
      {/*<!-- End Google Tag Manager -->*/}

      <Navbar />
      <main>{children}</main>
      <Footer />
      {/*<!-- Google Tag Manager (noscript) -->*/}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MCR22XL"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      {/*<!-- End Google Tag Manager (noscript) -->*/}
    </div>
  );
}

export default Layout;
