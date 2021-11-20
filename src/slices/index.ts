import { combineReducers } from "@reduxjs/toolkit";

import authenticationSlice from "./authentication";

const rootReducer = combineReducers({
  [authenticationSlice.name]: authenticationSlice.reducer,
});
export default rootReducer;

export type State = ReturnType<typeof rootReducer>;
