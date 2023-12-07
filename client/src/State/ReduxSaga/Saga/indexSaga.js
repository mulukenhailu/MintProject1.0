import { all } from "redux-saga/effects";
import { watchUsersAsync } from "./userSaga";
import { watchPropertyAsync } from "./propertySaga";
import { watchManagerAsync } from "./managerSaga";
import { watchOrderAsync } from "./orderSaga";
import { watchManagerRequestAsync } from "./managerRequestSaga";
import { watchStoreHeadRequestAsync } from "./storeHeadRequest";
import { watchStoreKeeperRequestAsync } from "./storeKeeperSaga";
import { watchImageUploadAsync } from "./uploadImageSaga";

export function* rootSaga() {
  yield all([
    watchUsersAsync(),
    watchPropertyAsync(),
    watchManagerAsync(),
    watchOrderAsync(),
    watchManagerRequestAsync(),
    watchStoreHeadRequestAsync(),
    watchStoreKeeperRequestAsync(),
    watchImageUploadAsync(),
  ]);
}
