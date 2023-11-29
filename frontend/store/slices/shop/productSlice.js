import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setProductList } = productSlice.actions;
export default productSlice.reducer;
