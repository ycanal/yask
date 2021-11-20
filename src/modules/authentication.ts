import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { combineEpics } from "redux-observable";
import { Observable } from "rxjs";
import { delay, filter, map, tap } from "rxjs/operators";

export type State = {
  status: "unauthenticated" | "authenticating" | "authenticated";
  login?: string;
};

const initialState: State = {
  status: "unauthenticated",
};

const slice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loggin: (state: State, action: PayloadAction<{ login: string }>) => {
      state.status = "authenticating";
      state.login = action.payload.login;
    },
    logged: (state: State) => {
      state.status = "authenticated";
    },
  },
});

export default slice;
export const { loggin, logged } = slice.actions;

function logginEpic(action$: Observable<Action>) {
  return action$.pipe(
    filter(loggin.match),
    delay(5000),
    tap(({ payload: { login } }) => console.log(login)),
    map(() => logged())
  );
}

export const epic = combineEpics(logginEpic);
