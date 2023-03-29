import { combineReducers, configureStore } from "@reduxjs/toolkit";
import setTestMultipleReducer from "./slice/testMultipleSlice";
import testReducer from "./slice/testSlice";

const rootReducer = combineReducers({
  testChecker: testReducer,
  testMultipleChecker: setTestMultipleReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
