import { createSlice } from "@reduxjs/toolkit";

const order = createSlice({
  name: "order",
  initialState: {
    Order: {},
    newOrder: null,
    allOrder: [],
    loadingOrder: false,
    errorOrder: false,
  },
  reducers: {
    createOrderStart: (state) => {
      state.loadingOrder = true;
      state.errorOrder = false;
      state.newOrder = null;
      return state;
    },
    createOrderSuccess: (state, action) => {
      state.loadingOrder = false;
      state.newOrder = action.payload;
      state.errorOrder = false;
      return state;
    },
    createOrderFail: (state, action) => {
      state.errorOrder = true;
      state.loadingOrder = false;
      state.newOrder = null;
      return state;
    },

    getAllOrderStart: (state) => {
      state.errorOrder = false;
      state.allOrder = [];
      state.loadingOrder = true;
    },
    getAllOrderSuccess: (state, action) => {
      console.log(action);
      state.errorOrder = false;
      state.allOrder = action.payload;
      state.loadingOrder = false;
    },
    getAllOrderFail: (state) => {
      state.errorOrder = true;
      state.allOrder = [];
      state.loadingOrder = false;
    },

    editOrderStart: (state) => {
      state.loadingOrder = true;
      state.errorOrder = false;
      state.Order = {};
    },
    editOrderSuccess: (state, action) => {
      state.loadingOrder = false;
      state.errorOrder = false;
      state.Order = action.payload;
    },
    editOrderFail: (state) => {
      state.loadingOrder = false;
      state.errorOrder = true;
      state.Order = {};
    },
    deleteOrderStart: (state) => {
      state.loadingOrder = true;
      state.errorOrder = false;
      state.Order = {};
    },
    deleteOrderSuccess: (state, action) => {
      state.loadingOrder = false;
      state.errorOrder = false;
      state.Order = action.payload;
    },
    deleteOrderFail: (state) => {
      state.loadingOrder = false;
      state.Order = {};
      state.errorOrder = true;
    },

    removeOrderError: (state) => {
      state.errorOrder = false;
    },
    removeNewOrder: (state) => {
      state.newOrder = null;
      return state;
    },
  },
});
export const {
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
} = order.actions;
export default order.reducer;
