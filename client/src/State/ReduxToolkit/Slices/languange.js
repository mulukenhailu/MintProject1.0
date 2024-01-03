import { createSlice } from "@reduxjs/toolkit";

const languange = createSlice({
  name: "languange",
  initialState: {
    languange: "ኣማ",
  },
  reducers: {
    setLanguange: (state, action) => {
      state.languange = action.payload;
      return state;
    },
  },
});
export const { setLanguange } = languange.actions;
export default languange.reducer;
