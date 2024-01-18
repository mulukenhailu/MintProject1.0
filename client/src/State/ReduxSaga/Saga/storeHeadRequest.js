import {
  getAllPendingRequestForStoreHeadApi,
  getAllAcceptedRequestForStoreHeadApi,
  getAllDeclinedRequestForStoreHeadApi,
} from "../Apis/storeHeadRequestApi";
import {
  getAllRequestStart,
  getAllRequestSuccess,
  getAllRequestFail,
} from "../../ReduxToolkit/Slices/requestSlice";
import {
  GET_ALL_PENDING_REQUEST_FOR_STOREHEAD,
  GET_ALL_ACCEPTED_REQUEST_FOR_STOREHEAD,
  GET_ALL_DECLINED_REQUEST_FOR_STOREHEAD,
} from "../Types/storeHeadRequestTypes";
import { call, put, takeEvery } from "redux-saga/effects";

export function* getAllPendingRequestForStoreHeadSaga(action) {
  try {
    console.log("pending store", action);
    yield put(getAllRequestStart());
    const request = yield call(getAllPendingRequestForStoreHeadApi);
    console.log("store head pending", request);
    yield put(getAllRequestSuccess(request.data.ManagerAndEmpRequest));
  } catch (error) {
    console.log(error);
    yield put(getAllRequestFail());
  }
}
export function* getAllSAcceptedRequestForStoreHeadSaga(action) {
  try {
    console.log(action);
    yield put(getAllRequestStart());
    const request = yield call(getAllAcceptedRequestForStoreHeadApi);
    console.log(" store head", request);
    yield put(getAllRequestSuccess(request.data));
  } catch (error) {
    console.log(error);
    yield put(getAllRequestFail());
  }
}
export function* getAllDeclinedRequestForStoreHeadSaga(action) {
  try {
    console.log(action);
    yield put(getAllRequestStart());
    const request = yield call(getAllDeclinedRequestForStoreHeadApi);
    console.log(" store head rejected", request);
    yield put(getAllRequestSuccess(request.data.ManagerAndEmpRequest));
  } catch (error) {
    console.log(error);
    yield put(getAllRequestFail());
  }
}

export function* watchStoreHeadRequestAsync() {
  yield takeEvery(
    GET_ALL_PENDING_REQUEST_FOR_STOREHEAD,
    getAllPendingRequestForStoreHeadSaga
  );
  yield takeEvery(
    GET_ALL_ACCEPTED_REQUEST_FOR_STOREHEAD,
    getAllSAcceptedRequestForStoreHeadSaga
  );
  yield takeEvery(
    GET_ALL_DECLINED_REQUEST_FOR_STOREHEAD,
    getAllDeclinedRequestForStoreHeadSaga
  );
}
