import "../styles/globals.scss";
import "antd/dist/antd.css";

import { AppWrapper } from "../context/state";
import { LocationWrapper } from "../context/location";
import Layout from "../components/layout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { store } from "../store/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  // to take the scroll to top
  const { pathname } = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <LocationWrapper>
      <AppWrapper>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </AppWrapper>
    </LocationWrapper>
  );
}

export default MyApp;
