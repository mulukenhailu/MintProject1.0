import { uploadImageAPI } from "../Apis/uploadImageApi";
import {
  uploadImageStart,
  uploadImageSuccess,
  uploadImageFail,
} from "../../ReduxToolkit/Slices/uploadImageSlice";
import { UPLOAD_IMAGE } from "../Types/uploadImageType";
import { call, put, takeEvery } from "redux-saga/effects";

export function* imageUploadSaga(action) {
  try {
    console.log(action);
    yield put(uploadImageStart());
    const image = yield call(uploadImageAPI, action.sendImage);
    console.log(image);
    yield put(uploadImageSuccess(image.data));
  } catch (error) {
    console.log(error);
    yield put(uploadImageFail(error.response.data));
  }
}

export function* watchImageUploadAsync() {
  yield takeEvery(UPLOAD_IMAGE, imageUploadSaga);
}
