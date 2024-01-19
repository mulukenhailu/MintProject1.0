import { createSlice } from "@reduxjs/toolkit";

const request = createSlice({
  name: "request",
  initialState: {
    allRequest: [],
    loadingRequest: false,
    errorRequest: false,
    requestId: "",
    newResponseId: "",
    currentRequestPage: "pending",
  },
  reducers: {
    getAllRequestStart: (state) => {
      state.allRequest = [];
      state.loadingRequest = true;
      state.errorRequest = false;
    },
    getAllRequestSuccess: (state, action) => {
      console.log(action);
      state.allRequest = action.payload;
      state.loadingRequest = false;
      state.errorRequest = false;
    },
    getAllRequestFail: (state) => {
      state.allRequest = [];
      state.loadingRequest = false;
      state.errorRequest = true;
    },
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
    setRequestFail: (state) => {
      state.allRequest = [];
      state.loadingRequest = false;
      state.errorRequest = true;
    },
    getNewRequestList: (state, action) => {
      state.allRequest = state.allRequest.filter(
        (item) => item.id !== action.payload
      );
    },
    removeAllRequest: (state) => {
      state.allRequest = [];
    },
    setCurrentRequestPage: (state, action) => {
      state.currentRequestPage = action.payload;
    },
    removeCurrentRequestPage: (state) => {
      state.currentRequestPage = "pending";
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
  getNewRequestList,
  removeAllRequest,
  setCurrentRequestPage,
  removeCurrentRequestPage,
} = request.actions;
export default request.reducer;
