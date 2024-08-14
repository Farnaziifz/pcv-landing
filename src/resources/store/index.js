import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { apiInstance } from "../services/index";

const appReducer = combineReducers({
  [apiInstance.reducerPath]: apiInstance.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === "app/isAuthenticated" && action.payload === false) {
    state = undefined;
  }

  return appReducer(state, action);
};

export const setupStore = (preloadedState) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(apiInstance.middleware)
        .concat(rtkQueryErrorLogger),
    preloadedState,
  });
  setupListeners(store.dispatch);
  return store;
};

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (isRejectedWithValue(action) && action.payload?.status !== 401) {
    toast.error(
      action.payload?.message ||
        `Internal Server Error (${action.payload?.status})`
    );
  } else if (action.error?.message) {
    toast.error(
      action.error?.message ||
        `Internal Server Error (${action.payload?.status})`
    );
  }

  return next(action);
};
