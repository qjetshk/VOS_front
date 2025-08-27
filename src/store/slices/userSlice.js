import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("user")) || null;
console.log(initialState)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    update: (state, action) => {
      if (action.payload) return { ...action.payload };
      return null;
    },
  },
});

export const { update } = userSlice.actions;
export default userSlice.reducer;
