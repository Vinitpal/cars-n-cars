import { api_path } from "../db/path";

export const getCarPath = async () => {
  const carList = await getCarList();

  const paths = carList.map((car) => ({
    params: {
      productId: car.v_id,
    },
  }));

  return paths;
};

export const getCarById = async (id) => {
  try {
    const axios = (await import("axios")).default;

    const carData = await axios(`${api_path}/api/v1/cars/get/${id}`).then(
      function (response) {
        return response.data;
      }
    );

    return carData;
  } catch (error) {
    console.log(error);
  }
};

export const getCarList = async () => {
  try {
    const axios = (await import("axios")).default;
    const carList = await axios
      .get(`${api_path}/api/v1/cars/list`)
      .then((res) => {
        return res.data;
      });

    return carList;
  } catch (error) {
    console.log(error);
  }
};

export const getBikeById = async (id) => {
  try {
    const axios = (await import("axios")).default;

    const bikeData = await axios(`${api_path}/api/v1/bikes/get/${id}`).then(
      function (response) {
        return response.data;
      }
    );

    return bikeData;
  } catch (error) {
    console.log(error);
  }
};

export const getBikeList = async () => {
  try {
    const axios = (await import("axios")).default;
    const bikeList = await axios
      .get(`${api_path}/api/v1/bikes/list`)
      .then((res) => {
        return res.data;
      });

    return bikeList;
  } catch (error) {
    console.log(error);
  }
};
