import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const devMode = process.env.NODE_ENV === "development";

export const createStore = (preloadedState = {}) => {
  return configureStore({
    reducer: rootReducer,
    devTools: devMode,
    preloadedState,
  });
};

export let store: any;

export const initializeStore = (preloadedState) => {
  let _store = store ?? createStore(preloadedState);

  if (preloadedState && store) {
    _store = createStore({ ...store.getState(), ...preloadedState });
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") {
    return _store;
  }
  // Create the store once in the client
  if (!store) {
    store = _store;
    return store;
  }

  return _store;
};
