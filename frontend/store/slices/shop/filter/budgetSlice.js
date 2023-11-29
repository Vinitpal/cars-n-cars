import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setActiveBudget: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setActiveBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
