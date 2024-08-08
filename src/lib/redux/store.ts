// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import navbarReducer from "./slices/navbar";

const rootReducer = combineReducers({
  navbar: navbarReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
