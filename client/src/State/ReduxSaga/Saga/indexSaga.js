import { all } from "redux-saga/effects";
import { watchUsersAsync } from "./userSaga";
import { watchPropertyAsync } from "./propertySaga";
import { watchManagerAsync } from "./managerSaga";

export function* rootSaga() {
  yield all([watchUsersAsync(), watchPropertyAsync(), watchManagerAsync()]);
}
