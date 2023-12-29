import { combineReducers } from "@reduxjs/toolkit";
import { matchListReducer } from "./matchListSlice";

export const matchReducer = combineReducers({
  matchList: matchListReducer,
});
