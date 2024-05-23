import { combineReducers } from "@reduxjs/toolkit";
import { matchListReducer } from "./matchListSlice";
import { matchDetailReducer } from "./matchDetailReducer";
import { betPlacedReducer } from "./betPlacedHorseRacing";

export const horseRacingReducer = combineReducers({
  matchList: matchListReducer,
  matchDetail: matchDetailReducer,
  betPlaced: betPlacedReducer,
});
