import {
  createPropertyApi,
  getAllPropertiesApi,
  editPropertyApi,
  deletePropertyApi,
} from "../Apis/propertyApi";
import {
  createPropertyStart,
  createPropertySuccess,
  createPropertyFail,
  getAllPropertyStart,
  getAllPropertySuccess,
  getAllPropertyFail,
  editPropertyStart,
  editPropertySuccess,
  editPropertyFail,
  deletePropertyStart,
  deletePropertySuccess,
  deletePropertyFail,
  removePropertyError,
} from "../../ReduxToolkit/Slices/propertySlice";
import {
  CREATE_PROPERTY,
  GET_PROPERTIES,
  EDIT_PROPERTY,
  DELETE_PROPERTY,
} from "../Types/propertyType";
import { call, put, takeEvery } from "redux-saga/effects";

export function* createPropertySaga(action) {
  try {
    console.log(action);
    yield put(createPropertyStart());
    const property = yield call(createPropertyApi, action.property);
    console.log(property.data);
    yield put(createPropertySuccess(property.data));
  } catch (error) {
    console.log(error);
    yield put(createPropertyFail(error));
  }
}

export function* getAllPropertySaga(action) {
  try {
    console.log(action);
    yield put(getAllPropertyStart());
    const allProperties = yield call(getAllPropertiesApi);
    console.log(allProperties);
    yield put(getAllPropertySuccess(allProperties.data.Item));
  } catch (error) {
    yield put(getAllPropertyFail());
  }
}

export function* editPropertySaga(action) {
  try {
    yield put(editPropertyStart());
    const Property = yield call(editPropertyApi, action.editProperty);
    yield put(editPropertySuccess(Property.data));
  } catch (error) {
    yield put(editPropertyFail());
  }
}
export function* deletePropertySaga(action) {
  try {
    yield put(deletePropertyStart());
    const Property = yield call(deletePropertyApi, action.deleteId);
    yield put(deletePropertySuccess(Property.data));
  } catch (error) {
    yield put(deletePropertyFail());
  }
}

export function* watchPropertyAsync() {
  yield takeEvery(CREATE_PROPERTY, createPropertySaga);
  yield takeEvery(GET_PROPERTIES, getAllPropertySaga);
  yield takeEvery(EDIT_PROPERTY, editPropertySaga);
  yield takeEvery(DELETE_PROPERTY, deletePropertySaga);
}
