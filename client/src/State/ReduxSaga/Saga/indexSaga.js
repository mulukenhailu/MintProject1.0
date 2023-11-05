import { all } from "redux-saga/effects";
import { watchUsersAsync } from "./userSaga";
import { watchPropertyAsync } from "./propertySaga";

export function* rootSaga() {
  yield all([watchUsersAsync(),watchPropertyAsync()]);
}
