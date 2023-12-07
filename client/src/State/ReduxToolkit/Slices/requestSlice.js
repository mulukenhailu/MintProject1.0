import { createSlice } from "@reduxjs/toolkit";

const request = createSlice({
  name: "request",
  initialState: {
    allRequest: [],
    loadingRequest: false,
    errorRequest: false,
  },
  reducers: {
    getAllRequestStart: (state) => {
      state.allRequest = [];
      state.loadingRequest = true;
      state.errorRequest = false;
      return state;
    },
    getAllRequestSuccess: (state, action) => {
      console.log(action);
      state.allRequest = action.payload;
      state.loadingRequest = false;
      state.errorRequest = false;
      return state;
    },
    getAllRequestFail: (state) => {
      state.allRequest = [];
      state.loadingRequest = false;
      state.errorRequest = true;
      return state;
    },
  },
});
export const { getAllRequestStart, getAllRequestSuccess, getAllRequestFail } =
  request.actions;
export default request.reducer;
