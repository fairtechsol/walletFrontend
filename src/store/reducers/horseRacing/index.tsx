import { combineReducers } from "@reduxjs/toolkit";
import { matchListReducer } from "./matchListSlice";

export const horseRacingReducer = combineReducers({
    matchList: matchListReducer
});
