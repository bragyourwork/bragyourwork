import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist"
import { combineReducers } from '@reduxjs/toolkit';
import { version } from "react";

const persistConfig = {
  key:"root",
  version:1,
  storage
};

const reducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig,reducer)

export const store = configureStore({
  reducer: persistedReducer,
});
