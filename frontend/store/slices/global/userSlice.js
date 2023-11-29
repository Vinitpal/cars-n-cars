import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: "",
  name: "",
  phone: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserCity: (state, action) => {
      state.city = action.payload;
    },
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setUserPhone: (state, action) => {
      state.phone = action.payload;
    },
  },
});

export const { setUserCity, setUserPhone, setUserName } = userSlice.actions;
export default userSlice.reducer;
