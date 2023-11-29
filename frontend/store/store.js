import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import logger from "redux-logger";

// global
import screenReducer from "./slices/global/screenSlice";
import scrollReducer from "./slices/global/scrollSlice";
import userReducer from "./slices/global/userSlice";

// shop
import productReducer from "./slices/shop/productSlice";
import budgetReducer from "./slices/shop/filter/budgetSlice";
import distanceReducer from "./slices/shop/filter/distanceSlice";
import fuelReducer from "./slices/shop/filter/fuelSlice";
import brandReducer from "./slices/shop/filter/brandSlice";
import clearReducer from "./slices/shop/filter/clearSlice";
import locationReducer from "./slices/shop/filter/locationSlice";
import bodyTypeReducer from "./slices/shop/filter/bodyTypeSlice";

// homepage
import locationBannerReducer from "./slices/homepage/locationBannerSlice";
import locationMobileReducer from "./slices/homepage/locationMobileSlice";
import startSearchReducer from "./slices/homepage/startSearchSlice";

// sell_your_car
import basicDetailReducer from "./slices/sell_your_car/basicDetailSlice";

// APIs
import { carsNcarsApi } from "./service/api";

export const store = configureStore({
  reducer: {
    screen: screenReducer,
    scroll: scrollReducer,
    basicDetail: basicDetailReducer,
    showLocationBanner: locationBannerReducer,
    showLocationMobile: locationMobileReducer,
    startSearch: startSearchReducer,
    user: userReducer,
    product: productReducer,
    activeBudget: budgetReducer,
    activeDistance: distanceReducer,
    fuelType: fuelReducer,
    brand: brandReducer,
    clearFilter: clearReducer,
    location: locationReducer,
    bodyType: bodyTypeReducer,
    [carsNcarsApi.reducerPath]: carsNcarsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(carsNcarsApi.middleware).concat(logger),
    getDefaultMiddleware().concat(carsNcarsApi.middleware),
});

// setupListeners(store.dispatch);
