import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const locationBannerSlice = createSlice({
  name: "showLocationBanner",
  initialState,
  reducers: {
    setShowLocationBanner: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setShowLocationBanner } = locationBannerSlice.actions;
export default locationBannerSlice.reducer;
