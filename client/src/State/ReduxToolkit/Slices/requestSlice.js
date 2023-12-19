import { createSlice } from "@reduxjs/toolkit";

const request = createSlice({
  name: "request",
  initialState: {
    allRequest: [],
    loadingRequest: false,
    errorRequest: false,
    requestId: "",
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
    //for new code
    setRequestId: (state, action) => {
      state.requestId = action.payload;
    },
    setRequestStart: (state) => {
      state.allRequest = [];
      state.loadingRequest = true;
      state.errorRequest = false;
    },
    setRequestSuccess: (state, action) => {
      state.allRequest = action.payload;
      state.loadingRequest = false;
      state.errorRequest = false;
    },
    setRequestFail: (state, action) => {
      state.allRequest = [];
      state.loadingRequest = false;
      state.errorRequest = true;
    },
    removeAllRequest: (state) => {
      state.allRequest = [];
    },
  },
});
export const {
  getAllRequestStart,
  getAllRequestSuccess,
  getAllRequestFail,
  setRequestId,
  setRequestStart,
  setRequestSuccess,
  setRequestFail,
  removeAllRequest,
} = request.actions;
export default request.reducer;
