import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideMenu: "", // 선택한 snb 매뉴를 관리하는 state
};

export const headerSlice = createSlice({
  name: "headerChecker",
  initialState,
  reducers: {
    setHeaderReducer: (state, action) => {
      state.sideMenu = action.payload.sideMenu;
    },
  },
});

export const { setHeaderReducer } = headerSlice.actions;

export default headerSlice.reducer;
