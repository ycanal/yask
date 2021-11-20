import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Router } from "@remix-run/router";
import { combineEpics } from "redux-observable";
import { Observable } from "rxjs";
import { filter, ignoreElements, tap } from "rxjs/operators";

export type Todo = {
  id: number;
  title?: string;
  content: string;
};

export type State = {
  list: Array<Todo>;
};

const initialState: State = {
  list: [
    {
      id: Math.random(),
      title: "faire la vaisselle",
      content: "les mouches tournent autour",
    },
    {
      id: Math.random(),
      content: "charger batterie",
    },
  ],
};

const slice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    create: (
      state: State,
      action: PayloadAction<{ title?: string; content: string }>
    ) => {
      const { title, content } = action.payload;
      state.list.push({
        id: Math.random(),
        title,
        content,
      });
    },
  },
});

export default slice;
export const { create } = slice.actions;

function createEpic(
  action$: Observable<Action>,
  state$: Observable<any>,
  { router }: { router: Router }
) {
  return action$.pipe(
    filter(create.match),
    tap(() => router.navigate("/todo")),
    ignoreElements()
  );
}

export const epic = combineEpics(createEpic);
