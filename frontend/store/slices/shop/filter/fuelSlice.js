import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "All",
};

export const fuelSlice = createSlice({
  name: "fuel",
  initialState,
  reducers: {
    setFuelType: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setFuelType } = fuelSlice.actions;
export default fuelSlice.reducer;
