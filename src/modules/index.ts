import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Router } from "@remix-run/router";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import authenticationSlice, {
  epic as authenticationEpic,
} from "./authentication";
import todoSlice, { epic as todoEpic } from "./todo";

export const getStore = (router: Router) => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: { router },
  });

  const store = configureStore({
    reducer: combineReducers({
      [authenticationSlice.name]: authenticationSlice.reducer,
      [todoSlice.name]: todoSlice.reducer,
    }),
    middleware: [epicMiddleware],
    preloadedState: {},
    devTools: process.env.NODE_ENV !== "production",
  });

  epicMiddleware.run(combineEpics(authenticationEpic, todoEpic));

  return store;
};

type StoreType = ReturnType<typeof getStore>;
export type RootState = ReturnType<StoreType["getState"]>;
export type AppDispatch = StoreType["dispatch"];
