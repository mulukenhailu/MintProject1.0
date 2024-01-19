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
    setNewPropertyList: (state, action) => {
      console.log("action in slice", action);
      state.allProperty = state.allProperty.map((item) => {
        if (
          parseInt(item?.item_number) === parseInt(action.payload.item_number)
        ) {
          const productquantitynumber = parseInt(item?.productquantitynumber);
          const quantity = parseInt(action.payload.quantity);

          if (parseInt(productquantitynumber) - parseInt(quantity) === 0) {
            return {
              ...item,
              productquantitynumber: 0,
            };
          } else {
            return {
              ...item,
              productquantitynumber:
                parseInt(productquantitynumber) - parseInt(quantity),
            };
          }
        }

        return item;
      });

      console.log("updatedProperty in slice", state.allProperty);
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
  setNewPropertyList,
  removePropertyError,
  removeNewProperty,
} = property.actions;
export default property.reducer;
