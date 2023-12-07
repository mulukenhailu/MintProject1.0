import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../ReduxSaga/Saga/indexSaga";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./Slices/userSlice";
import propertyReducer from "./Slices/propertySlice";
import managerReducer from "./Slices/managerSlice";
import requestReducer from "./Slices/requestSlice";
import uploadReducer from "./Slices/uploadImageSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  property: propertyReducer,
  manager: managerReducer,
  request: requestReducer,
  upload: uploadReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export let persistor = persistStore(store);

export default store;
