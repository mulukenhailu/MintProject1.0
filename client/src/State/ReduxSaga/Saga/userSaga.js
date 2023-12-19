import {
  createUserApi,
  loginApi,
  getSingleUserApi,
  getAllUserApi,
  editUserApi,
  editUserByAdminApi,
  deleteUserApi,
} from "../Apis/userApi";
import {
  createUserStart,
  createUserSuccess,
  createUserFail,
  loginUserStart,
  loginUserSuccess,
  loginUserFail,
  getSingleUserStart,
  getSingleUserSuccess,
  getSingleUserFail,
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
  GET_SINGLE_USER,
  GET_ALL_USERS,
  EDIT_USER,
  EDIT_USER_BY_ADMIN,
  DELETE_USER,
} from "../Types/userTypes";
import { call, put, takeEvery } from "redux-saga/effects";

export function* createUserSaga(action) {
  try {
    console.log(action);
    yield put(createUserStart());
    const user = yield call(createUserApi, action.user);
    console.log(user);
    yield put(createUserSuccess(user.data.insert_User_one));
  } catch (error) {
    yield put(createUserFail(error.response.data));
  }
}
export function* loginUserSaga(action) {
  try {
    yield put(loginUserStart());
    const user = yield call(loginApi, action.credentials);
    console.log(user);
    yield put(loginUserSuccess(user.data.logged_in_user));
  } catch (error) {
    yield put(loginUserFail(error.response.data));
  }
}

export function* getSingleUserSaga(action) {
  try {
    console.log(action);
    yield put(getSingleUserStart());
    const singleUser = yield call(getSingleUserApi, action.user_name);
    console.log("singleuser", singleUser);
    yield put(getSingleUserSuccess(singleUser.data));
  } catch (error) {
    yield put(getSingleUserFail(error));
  }
}

export function* getAllUsersSaga(action) {
  try {
    console.log(action);
    yield put(getAllUserStart());
    const users = yield call(getAllUserApi);
    console.log(users);
    yield put(getAllUserSuccess(users.data));
  } catch (error) {
    console.log(error);
    yield put(getAllUserFail());
  }
}

export function* editUserSaga(action) {
  try {
    console.log(action);
    yield put(editUserStart());
    const user = yield call(editUserApi, action.updatedProfileInfo);
    console.log(user.data);
    yield put(editUserSuccess(user.data.update_User_by_pk));
  } catch (error) {
    console.log(error);
    yield put(editUserFail(error.response.data));
  }
}

export function* editUserbyAdminSaga(action) {
  try {
    console.log(action);
    yield put(editUserStart());
    const users = yield call(editUserByAdminApi, action.user);
    console.log(users.data);
    yield put(editUserSuccess(users.data.update_User_by_pk));
  } catch (error) {
    console.log(error);
    yield put(editUserFail(error.response.data));
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
  yield takeEvery(GET_SINGLE_USER, getSingleUserSaga);
  yield takeEvery(GET_ALL_USERS, getAllUsersSaga);
  yield takeEvery(EDIT_USER, editUserSaga);
  yield takeEvery(EDIT_USER_BY_ADMIN, editUserbyAdminSaga);
  yield takeEvery(DELETE_USER, deleteUserSaga);
}
