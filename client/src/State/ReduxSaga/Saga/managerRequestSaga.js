import {
  getAllPendingRequestForManagerApi,
  getAllAcceptedRequestForManagerApi,
  getAllRejectedRequestForManagerApi,
  acceptRequestForManagerApi,
  declineRequestForManagerApi,
} from "../Apis/managerRequestApi";
import {
  getAllRequestStart,
  getAllRequestSuccess,
  getAllRequestFail,
} from "../../ReduxToolkit/Slices/requestSlice";
import {
  GET_ALL_PENDING_REQUEST_FOR_MANAGER,
  GET_ALL_ACCEPTED_REQUEST_FOR_MANAGER,
  GET_ALL_DECLINED_REQUEST_FOR_MANAGER,
} from "../Types/managerRequestType";
import { call, put, takeEvery } from "redux-saga/effects";

export function* getAllPendingRequestForManagerSaga(action) {
  try {
    console.log("manager pending request action", action);
    yield put(getAllRequestStart());
    const request = yield call(getAllPendingRequestForManagerApi);
    console.log("manager pending requests", request);
    yield put(getAllRequestSuccess(request.data.Employee_Request));
  } catch (error) {
    console.log("error in manager pending", error);
    yield put(getAllRequestFail());
  }
}
export function* getAllAcceptedRequestForManagerSaga(action) {
  try {
    console.log(action);
    yield put(getAllRequestStart());
    const request = yield call(getAllAcceptedRequestForManagerApi);
    console.log("manager request accepted", request);
    yield put(getAllRequestSuccess(request.data.Employee_Request));
  } catch (error) {
    console.log(error);
    yield put(getAllRequestFail());
  }
}
export function* getAllDeclinedRequestForManagerSaga(action) {
  try {
    console.log(action);
    yield put(getAllRequestStart());
    const request = yield call(getAllRejectedRequestForManagerApi);
    console.log("manager declined request", request.data);
    yield put(getAllRequestSuccess(request.data));
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
    getAllAcceptedRequestForManagerSaga
  );
  yield takeEvery(
    GET_ALL_DECLINED_REQUEST_FOR_MANAGER,
    getAllDeclinedRequestForManagerSaga
  );
}
