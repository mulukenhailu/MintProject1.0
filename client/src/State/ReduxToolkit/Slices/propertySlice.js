import { createSlice } from "@reduxjs/toolkit";

const property = createSlice({
  name: "property",
  initialState: {
    property: {},
    newProperty: null,
    allProperty: [],
    loadingProperty: false,
    errorProperty: false,
  },
  reducers: {
    createPropertyStart: (state) => {
      state.loadingProperty = true;
      state.errorProperty = false;
      state.newProperty = null;
      return state;
    },
    createPropertySuccess: (state, action) => {
      state.loadingProperty = false;
      state.newProperty = action.payload;
      state.errorProperty = false;
      return state;
    },
    createPropertyFail: (state, action) => {
      state.errorProperty = true;
      state.loadingProperty = false;
      state.newProperty = null;
      return state;
    },

    getAllPropertyStart: (state) => {
      state.errorProperty = false;
      state.allProperty = [];
      state.loadingProperty = true;
    },
    getAllPropertySuccess: (state, action) => {
      console.log(action);
      state.errorProperty = false;
      state.allProperty = action.payload;
      state.loadingProperty = false;
    },
    getAllPropertyFail: (state) => {
      state.errorProperty = true;
      state.allProperty = [];
      state.loadingProperty = false;
    },

    editPropertyStart: (state) => {
      state.loadingProperty = true;
      state.errorProperty = false;
      state.property = {};
    },
    editPropertySuccess: (state, action) => {
      state.loadingProperty = false;
      state.errorProperty = false;
      state.property = action.payload;
    },
    editPropertyFail: (state) => {
      state.loadingProperty = false;
      state.errorProperty = true;
      state.property = {};
    },
    deletePropertyStart: (state) => {
      state.loadingProperty = true;
      state.errorProperty = false;
      state.property = {};
    },
    deletePropertySuccess: (state, action) => {
      state.loadingProperty = false;
      state.errorProperty = false;
      state.property = action.payload;
    },
    deletePropertyFail: (state) => {
      state.loadingProperty = false;
      state.property = {};
      state.errorProperty = true;
    },

    removePropertyError: (state) => {
      state.errorProperty = false;
    },
    removeNewProperty: (state) => {
      state.newProperty = null;
      return state;
    },
  },
});
export const {
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
  removeNewProperty,
} = property.actions;
export default property.reducer;
