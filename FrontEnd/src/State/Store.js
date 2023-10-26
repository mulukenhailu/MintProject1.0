import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
// import userReducer from "./slices/songListSlice";
// import {
//   addUserSaga,
//   deleteUserSaga,
//   editUserSaga,
//   usersSaga,
// } from "./songListSagas";
import { all } from "redux-saga/effects";

const saga = createSagaMiddleware();

// function* rootSaga() {
//   yield all([usersSaga(), addUserSaga(), editUserSaga(), deleteUserSaga()]);
// }

const Store = configureStore({
  reducer: {
    // Users: userReducer,
  },
//   middleware: [saga],
});

// saga.run(rootSaga);

export default Store;
