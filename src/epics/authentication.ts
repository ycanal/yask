import { Action } from "@reduxjs/toolkit";
import { combineEpics } from "redux-observable";
import { Observable } from "rxjs";
import { delay, filter, map, tap } from "rxjs/operators";
import { logged, loggin } from "slices/authentication";

function logginEpic(action$: Observable<Action>) {
  return action$.pipe(
    filter(loggin.match),
    delay(5000),
    tap(({ payload: { login } }) => console.log(login)),
    map(() => logged())
  );
}

export default combineEpics(logginEpic);
