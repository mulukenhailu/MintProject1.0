import { createSlice } from "@reduxjs/toolkit";

const manager = createSlice({
  name: "manager",
  initialState: {
    allManager: [],
  },
  reducers: {
    getAllManagerStart: (state) => {
      state.allManager = [];
    },
    getAllManagerSuccess: (state, action) => {
      console.log(action);
      state.allManager = action.payload;
    },
    getAllManagerFail: (state) => {
      state.allManager = [];
    },
  },
});
export const { getAllManagerStart, getAllManagerSuccess, getAllManagerFail } =
  manager.actions;
export default manager.reducer;
