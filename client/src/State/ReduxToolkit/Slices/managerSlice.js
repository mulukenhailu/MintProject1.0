import { createSlice } from "@reduxjs/toolkit";

const manager = createSlice({
  name: "manager",
  initialState: {
    allManagers: [],
  },
  reducers: {
    getAllManagersStart: (state) => {
      state.allManagers = [];
      return state;
    },
    getAllManagersSuccess: (state, action) => {
      state.allManagers = action.payload;
      return state;
    },
    getAllManagersFail: (state) => {
      state.allManagers = [];
      return state;
    },
  },
});
export const {
  getAllManagersStart,
  getAllManagersSuccess,
  getAllManagersFail,
} = manager.actions;
export default manager.reducer;
