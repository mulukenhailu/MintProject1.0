import {
  getAllPendingRequestForStoreKeeperApi,
  getAllAcceptedRequestForStoreKeeperApi,
} from "../Apis/storeKeeperRequestApi";
import {
  getAllRequestStart,
  getAllRequestSuccess,
  getAllRequestFail,
} from "../../ReduxToolkit/Slices/requestSlice";
import {
  GET_ALL_ACCEPTED_REQUEST_FOR_STOREKEPPER,
  GET_ALL_PENDING_REQUEST_FOR_STOREKEEPER,
} from "../Types/storeKeeperRequestType";
import { call, put, takeEvery } from "redux-saga/effects";

export function* getAllPendingRequestForStoreKeeperSaga(action) {
  try {
    console.log(action);
    yield put(getAllRequestStart());
    const request = yield call(getAllPendingRequestForStoreKeeperApi);
    console.log(request);
    yield put(getAllRequestSuccess(request.data.storeHeadApprovedEmpRequest));
  } catch (error) {
    console.log(error);
    yield put(getAllRequestFail());
  }
}
export function* getAllSAcceptedRequestForStoreKeeperSaga(action) {
  try {
    console.log(action);
    yield put(getAllRequestStart());
    const request = yield call(getAllAcceptedRequestForStoreKeeperApi);
    console.log(request);
    yield put(getAllRequestSuccess(request.data));
  } catch (error) {
    console.log(error);
    yield put(getAllRequestFail());
  }
}

export function* watchStoreKeeperRequestAsync() {
  yield takeEvery(
    GET_ALL_PENDING_REQUEST_FOR_STOREKEEPER,
    getAllPendingRequestForStoreKeeperSaga
  );
  yield takeEvery(
    GET_ALL_ACCEPTED_REQUEST_FOR_STOREKEPPER,
    getAllSAcceptedRequestForStoreKeeperSaga
  );
}
