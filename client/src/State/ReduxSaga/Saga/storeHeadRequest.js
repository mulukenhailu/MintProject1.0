import {
  getAllPendingRequestForStoreHeadApi,
  getAllSAcceptedRequestForStoreHeadApi,
} from "../Apis/storeHeadRequestApi";
import {
  getAllRequestStart,
  getAllRequestSuccess,
  getAllRequestFail,
} from "../../ReduxToolkit/Slices/requestSlice";
import {
  GET_ALL_PENDING_REQUEST_FOR_STOREHEAD,
  GET_ALL_ACCEPTED_REQUEST_FOR_STOREHEAD,
} from "../Types/storeHeadRequestTypes";
import { call, put, takeEvery } from "redux-saga/effects";

export function* getAllPendingRequestForStoreHeadSaga(action) {
  try {
    console.log(action);
    yield put(getAllRequestStart());
    const request = yield call(getAllPendingRequestForStoreHeadApi);
    console.log(request);
    yield put(getAllRequestSuccess(request.data.ManagerAppEmpRequest));
  } catch (error) {
    console.log(error);
    yield put(getAllRequestFail());
  }
}
export function* getAllSAcceptedRequestForStoreHeadSaga(action) {
  try {
    console.log(action);
    yield put(getAllRequestStart());
    const request = yield call(getAllSAcceptedRequestForStoreHeadApi);
    console.log(request);
    yield put(getAllRequestSuccess(request.data));
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
}
