import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    user: {},
    newUser: null,
    singleUser: null,
    loadingUser: false,
    errorUser: false,
  },
  reducers: {
    createUserStart: (state) => {
      state.loadingUser = true;
      state.errorUser = false;
      state.newUser = null;
      return state;
    },
    createUserSuccess: (state, action) => {
      state.loadingUser = false;
      state.newUser = action.payload;
      state.errorUser = false;
      return state;
    },
    createUserFail: (state, action) => {
      state.errorUser = action.payload.error;
      state.loadingUser = false;
      state.newUser = null;
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
      state.errorUser = action.payload.error;
      state.loadingUser = false;
      state.user = {};
      return state;
    },
    getSingleUserStart: (state, action) => {
      state.loadingUser = true;
      state.singleUser = null;
      state.errorUser = false;
    },
    getSingleUserSuccess: (state, action) => {
      state.loadingUser = false;
      state.singleUser = action.payload;
      state.errorUser = false;
    },
    getSingleUserFail: (state, action) => {
      state.loadingUser = false;
      state.singleUser = null;
      state.errorUser = true;
    },
    getAllUserStart: (state) => {
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
    removeUserError: (state) => {
      state.errorUser = false;
      return state;
    },
    removeNewUser: (state) => {
      state.newUser = null;
      return state;
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
  getSingleUserStart,
  getSingleUserSuccess,
  getSingleUserFail,
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
  removeNewUser,
} = user.actions;
export default user.reducer;
