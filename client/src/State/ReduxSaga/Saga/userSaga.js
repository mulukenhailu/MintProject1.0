import {
  createUserApi,
  loginApi,
  getAllUserApi,
  editUserApi,
  deleteUserApi,
} from "../Apis/userApi";
import {
  createUserStart,
  createUserSuccess,
  createUserFail,
  loginUserStart,
  loginUserSuccess,
  loginUserFail,
  getAllUserStart,
  getAllUserSuccess,
  getAllUserFail,
  editUserStart,
  editUserSuccess,
  editUserFail,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFail,
} from "../../ReduxToolkit/Slices/userSlice";
import {
  LOGIN_USER,
  CREATE_USER,
  GET_ALL_USERS,
  EDIT_USER,
  DELETE_USER,
} from "../Types/userTypes";
import { call, put, takeEvery } from "redux-saga/effects";

export function* createUserSaga(action) {
  try {
    console.log(action);
    yield put(createUserStart());
    const user = yield call(createUserApi, action.user);
    console.log(user);
    yield put(createUserSuccess(user.data));
  } catch (error) {
    yield put(createUserFail(error.response.data.msg));
  }
}
export function* loginUserSaga(action) {
  try {
    yield put(loginUserStart());
    const user = yield call(loginApi, action.credentials);
    yield put(loginUserSuccess(user.data));
  } catch (error) {
    yield put(loginUserFail(error.response.data));
  }
}

export function* getAllUsersSaga(action) {
  try {
    yield put(getAllUserStart());
    const currentUserId = { currentUserId: action.currentUserId };
    const otherUsers = yield call(getAllUserApi, currentUserId);
    yield put(getAllUserSuccess(otherUsers.data));
  } catch (error) {
    yield put(getAllUserFail());
  }
}

export function* editUserSaga(action) {
  try {
    yield put(editUserStart());
    const users = yield call(editUserApi, action.payload);
    yield put(editUserSuccess(users.data));
  } catch (error) {
    yield put(editUserFail());
  }
}

export function* deleteUserSaga(action) {
  try {
    yield put(deleteUserStart());
    const users = yield call(deleteUserApi);
    yield put(deleteUserSuccess(users.data));
  } catch (error) {
    yield put(deleteUserFail());
  }
}

export function* watchUsersAsync() {
  yield takeEvery(CREATE_USER, createUserSaga);
  yield takeEvery(LOGIN_USER, loginUserSaga);
  yield takeEvery(GET_ALL_USERS, getAllUsersSaga);
  yield takeEvery(EDIT_USER, editUserSaga);
  yield takeEvery(DELETE_USER, deleteUserSaga);
}
