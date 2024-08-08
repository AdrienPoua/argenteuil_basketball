// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import navbarReducer from "./slices/navbar";
import modalReducer from "./slices/modal";

const rootReducer = combineReducers({
  navbar: navbarReducer,
  modal: modalReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
