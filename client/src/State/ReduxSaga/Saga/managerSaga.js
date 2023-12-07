import { getAllManagersApi } from "../Apis/managerApi";
import { GET_ALL_MANAGERS } from "../Types/mangerType";
import {
  getAllManagersStart,
  getAllManagersSuccess,
  getAllManagersFail,
} from "../../ReduxToolkit/Slices/managerSlice";

import { call, put, takeEvery } from "redux-saga/effects";

export function* getAllManagerSaga(action) {
  try {
    console.log(action);
    yield put(getAllManagersStart());
    const managers = yield call(getAllManagersApi);
    console.log(managers);
    yield put(getAllManagersSuccess(managers.data));
  } catch (error) {
    console.log(error);
    yield put(getAllManagersFail());
  }
}

export function* watchManagerAsync() {
  yield takeEvery(GET_ALL_MANAGERS, getAllManagerSaga);
}
