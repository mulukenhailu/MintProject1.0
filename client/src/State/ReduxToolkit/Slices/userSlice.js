import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    user: {},
    loadingUser: false,
    errorUser: false,
  },
  reducers: {
    createUserStart: (state) => {
      state.loadingUser = true;
      state.errorUser = false;
      state.user = {};
      return state;
    },
    createUserSuccess: (state, action) => {
      state.loadingUser = false;
      state.user = action.payload;
      state.errorUser = false;
      return state;
    },
    createUserFail: (state, action) => {
      state.errorUser = action.payload;
      state.loadingUser = false;
      state.user = {};
      return state;
    },
    editUserStart: (state) => {
      state.loadingUser = true;
      state.errorUser = false;
      state.user = {};
      return state;
    },
    editUserSuccess: (state, action) => {
      state.loadingUser = false;
      state.user = action.payload;
      state.errorUser = false;
      return state;
    },
    editUserFail: (state, action) => {
      state.errorUser = action.payload;
      state.loadingUser = false;
      state.user = {};
      return state;
    },
    deleteUserStart: (state) => {
      state.loadingUser = true;
      state.errorUser = false;
      state.user = {};
      return state;
    },
    deleteUserSuccess: (state, action) => {
      state.loadingUser = false;
      state.user = action.payload;
      state.errorUser = false;
      return state;
    },
    deleteUserFail: (state, action) => {
      state.errorUser = action.payload;
      state.loadingUser = false;
      state.user = {};
      return state;
    },
    loginUserStart: (state) => {
      state.loadingUser = true;
      state.errorUser = false;
      state.user = {};
      return state;
    },
    loginUserSuccess: (state, action) => {
      state.loadingUser = false;
      state.user = action.payload;
      state.errorUser = false;
      return state;
    },
    loginUserFail: (state, action) => {
      console.log("login fail");
      console.log(action);
      state.errorUser = action.payload.message;
      state.loadingUser = false;
      state.user = {};
      return state;
    },
    getAllrUserStart: (state) => {
      state.errorUser = false;
      state.allOtherUsers = [];
      state.loadingUser = true;
    },
    getAllUserSuccess: (state, action) => {
      state.errorUser = false;
      state.allOtherUsers = action.payload;
      state.loadingUser = false;
    },
    getAllUserFail: (state) => {
      state.errorUser = true;
      state.allOtherUsers = [];
      state.loadingUser = false;
    },
    removeUserError: (state) => {
      state.errorUser = false;
    },
  },
});
export const {
  createUserStart,
  createUserSuccess,
  createUserFail,
  loginUserStart,
  loginUserSuccess,
  loginUserFail,
  getAllUserStart,
  getAllUserSuccess,
  getAllUserFail,
  editUserStart,
  editUserSuccess,
  editUserFail,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFail,
  removeUserError,
} = user.actions;
export default user.reducer;
