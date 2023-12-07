import {
  getAllPendingRequestForManagerApi,
  getAllSAcceptedRequestForManagerApi,
} from "../Apis/managerRequestApi";
import {
  getAllRequestStart,
  getAllRequestSuccess,
  getAllRequestFail,
} from "../../ReduxToolkit/Slices/requestSlice";
import {
  GET_ALL_PENDING_REQUEST_FOR_MANAGER,
  GET_ALL_ACCEPTED_REQUEST_FOR_MANAGER,
} from "../Types/managerRequestType";
import { call, put, takeEvery } from "redux-saga/effects";

export function* getAllPendingRequestForManagerSaga(action) {
  try {
    console.log(action);
    yield put(getAllRequestStart());
    const request = yield call(getAllPendingRequestForManagerApi);
    console.log(request);
    yield put(getAllRequestSuccess(request.data));
  } catch (error) {
    console.log(error);
    yield put(getAllRequestFail());
  }
}
export function* getAllSAcceptedRequestForManagerSaga(action) {
  try {
    console.log(action);
    yield put(getAllRequestStart());
    const request = yield call(getAllSAcceptedRequestForManagerApi);
    console.log(request);
    yield put(getAllRequestSuccess(request.data.ManagerAppEmpRequest));
  } catch (error) {
    console.log(error);
    yield put(getAllRequestFail());
  }
}

export function* watchManagerRequestAsync() {
  yield takeEvery(
    GET_ALL_PENDING_REQUEST_FOR_MANAGER,
    getAllPendingRequestForManagerSaga
  );
  yield takeEvery(
    GET_ALL_ACCEPTED_REQUEST_FOR_MANAGER,
    getAllSAcceptedRequestForManagerSaga
  );
}
