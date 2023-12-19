import { createSlice } from "@reduxjs/toolkit";

const upload = createSlice({
  name: "upload",
  initialState: {
    uploadedImage: "",
    loadingUploadingImage: false,
    errorImage: false,
  },
  reducers: {
    uploadImageStart: (state) => {
      state.loadingUploadingImage = true;
      state.errorImage = false;
      state.uploadedImage = "";
      return state;
    },
    uploadImageSuccess: (state, action) => {
      state.loadingUploadingImage = false;
      state.uploadedImage = action.payload;
      state.errorImage = false;
      return state;
    },
    uploadImageFail: (state, action) => {
      state.errorImage = action.payload;
      state.loadingUploadingImage = false;
      state.uploadedImage = "";
      return state;
    },
    removeUploadError: (state) => {
      state.errorImage = false;
    },
    removeUploadImage: (state) => {
      state.uploadedImage = "";
    },
  },
});
export const {
  uploadImageStart,
  uploadImageSuccess,
  uploadImageFail,
  removeUploadError,
  removeUploadImage,
} = upload.actions;
export default upload.reducer;
