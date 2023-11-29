import { getAllManagersApi } from "../Apis/managerApi";
import {
  getAllManagerStart,
  getAllManagerSuccess,
  getAllManagerFail,
} from "../../ReduxToolkit/Slices/managerSlice";
import { GET_ALL_MANAGERS } from "../Types/mangerType";
import { call, put, takeEvery } from "redux-saga/effects";

export function* getAllManagerSaga(action) {
  try {
    console.log(action);
    yield put(getAllManagerStart());
    const allManager = yield call(getAllManagersApi);
    console.log(allManager);
    yield put(getAllManagerSuccess(allManager));
  } catch (error) {
    console.log(error);
    yield put(getAllManagerFail());
  }
}

export function* watchManagerAsync() {
  yield takeEvery(GET_ALL_MANAGERS, getAllManagerSaga);
}
