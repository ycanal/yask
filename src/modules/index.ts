import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory, History } from "history";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import authenticationSlice, {
  epic as authenticationEpic,
} from "./authentication";

export const history: History = createBrowserHistory();

const getStore = () => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: { history },
  });

  const store = configureStore({
    reducer: combineReducers({
      [authenticationSlice.name]: authenticationSlice.reducer,
    }),
    middleware: [epicMiddleware],
    preloadedState: {},
    devTools: process.env.NODE_ENV !== "production",
  });

  epicMiddleware.run(combineEpics(authenticationEpic));

  return store;
};

export const store = getStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
