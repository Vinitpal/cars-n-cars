import { createContext, useContext, useState, useEffect } from "react";

import Geocode from "react-geocode";

const LocationContext = createContext();

export function LocationWrapper({ children }) {
  const [userCity, setUserCity] = useState("");
  const [position, setPosition] = useState();
  Geocode.setApiKey("AIzaSyCr8EfZOIDu61dCIDQQATtldtDYjmJ5l58");
  Geocode.setLanguage("en");
  Geocode.setRegion("In");
  Geocode.setLocationType("ROOFTOP");

  // console.log(position);

  useEffect(() => {
    if (position) {
      const [lat, long] = position;

      Geocode.fromLatLng(lat, long).then(
        (response) => {
          const address = response.results[0].formatted_address;
          let addressArr = address.split(",");
          setUserCity(addressArr[addressArr.length - 3].trim());
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [position]);

  let sharedState = { userCity, setUserCity, setPosition };

  return (
    <LocationContext.Provider value={sharedState}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  return useContext(LocationContext);
}
