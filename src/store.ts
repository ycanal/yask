import { configureStore } from "@reduxjs/toolkit";
import { Router } from "@remix-run/router";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { createEpicMiddleware } from "redux-observable";

import rootEpic from "epics";
import rootReducer, { State } from "slices";

export const getStore = (router: Router) => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: { router },
  });

  const store = configureStore({
    reducer: rootReducer,
    middleware: [epicMiddleware],
    preloadedState: {},
    devTools: import.meta.env.DEV,
  });

  epicMiddleware.run(rootEpic);

  return store;
};

export type Dispatch = ReturnType<typeof getStore>["dispatch"];

export const useDispatch: () => Dispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;
