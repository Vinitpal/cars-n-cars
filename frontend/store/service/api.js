import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_path, old_api_path } from "../../db/path";

export const carsNcarsApi = createApi({
  reducerPath: "carsNcarsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api_path,
  }),
  endpoints: (builder) => ({
    brands: builder.query({
      query: () => "/api/get_brand",
    }),
    models: builder.query({
      query: () => "/api/get_model",
    }),
    city: builder.query({
      query: () => "/api/v1/locations/list",
    }),
    carList: builder.query({
      query: () => "/api/v1/cars/list",
    }),
    bikeList: builder.query({
      query: () => "/api/v1/bikes/list",
    }),
    bodyType: builder.query({
      query: () => "/api/get_bodyType",
    }),
    blog: builder.query({
      query: () => "/api/v1/blogs/list",
    }),
  }),
});

export const {
  useBrandsQuery,
  useModelsQuery,
  useCityQuery,
  useCarListQuery,
  useBikeListQuery,
  useBodyTypeQuery,
  useBlogQuery,
} = carsNcarsApi;
