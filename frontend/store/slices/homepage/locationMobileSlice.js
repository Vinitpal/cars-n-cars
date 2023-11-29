import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const locationMobileSlice = createSlice({
  name: "showLocationMobile",
  initialState,
  reducers: {
    setShowLocationMobile: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setShowLocationMobile } = locationMobileSlice.actions;
export default locationMobileSlice.reducer;
