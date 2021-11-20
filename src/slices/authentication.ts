import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
