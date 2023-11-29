import {
  createOrderApi,
  getAllOrderApi,
  editOrderApi,
  deleteOrderApi,
} from "../Apis/orderApi";
import {
  createOrderStart,
  createOrderSuccess,
  createOrderFail,
  getAllOrderStart,
  getAllOrderSuccess,
  getAllOrderFail,
  editOrderStart,
  editOrderSuccess,
  editOrderFail,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFail,
  removeOrderError,
  removeNewOrder,
} from "../../ReduxToolkit/Slices/propertySlice";
import {
  CREATE_ORDER,
  GET_ORDERS,
  EDIT_ORDER,
  DELETE_ORDER,
} from "../Types/orderType";
import { call, put, takeEvery } from "redux-saga/effects";

export function* createOrderSaga(action) {
  try {
    console.log(action);
    yield put(createOrderStart());
    const Order = yield call(createOrderApi, action.Order);
    console.log(Order.data);
    yield put(createOrderSuccess(Order.data));
  } catch (error) {
    console.log(error);
    yield put(createOrderFail(error));
  }
}

export function* getAllOrderSaga(action) {
  try {
    console.log(action);
    yield put(getAllOrderStart());
    const allProperties = yield call(getAllPropertiesApi);
    console.log(allProperties);
    yield put(getAllOrderSuccess(allProperties.data.Item));
  } catch (error) {
    yield put(getAllOrderFail());
  }
}

export function* editOrderSaga(action) {
  try {
    yield put(editOrderStart());
    const Order = yield call(editOrderApi, action.editOrder);
    yield put(editOrderSuccess(Order.data));
  } catch (error) {
    yield put(editOrderFail());
  }
}
export function* deleteOrderSaga(action) {
  try {
    yield put(deleteOrderStart());
    const Order = yield call(deleteOrderApi, action.deleteId);
    yield put(deleteOrderSuccess(Order.data));
  } catch (error) {
    yield put(deleteOrderFail());
  }
}

export function* watchOrderAsync() {
  yield takeEvery(CREATE_ORDER, createOrderSaga);
  yield takeEvery(GET_ORDERS, getAllOrderSaga);
  yield takeEvery(EDIT_ORDER, editOrderSaga);
  yield takeEvery(DELETE_ORDER, deleteOrderSaga);
}
