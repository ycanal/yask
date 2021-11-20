import { combineEpics } from "redux-observable";

import authenticationEpic from "./authentication";

const rootEpic = combineEpics(authenticationEpic);
export default rootEpic;

export type Epic = ReturnType<typeof rootEpic>;
