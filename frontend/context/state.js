import { createContext, useContext } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const wait = (time) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  let sharedState = {
    wait,
    storeToLocal: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getFromLocal: (key) => {
      return JSON.parse(localStorage.getItem(key));
    },
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
