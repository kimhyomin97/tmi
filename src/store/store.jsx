import { combineReducers, configureStore } from "@reduxjs/toolkit";
import testReducer from "./slice/testSlice";

const rootReducer = combineReducers({
  testChecker: testReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
