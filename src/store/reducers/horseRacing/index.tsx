import { combineReducers } from "@reduxjs/toolkit";
import { analysisRaceReducers } from "./analysisReducer";
import { matchDetailReducer } from "./matchDetailReducer";
import { matchListReducer } from "./matchListSlice";
import { multipleMatchDetailReducer } from "./multipleMatchDetailReducer";
import { userProfitLossRaceReducer } from "./userProfitLossRace";

export const horseRacingReducer = combineReducers({
  matchList: matchListReducer,
  matchDetail: matchDetailReducer,
  userProfitLoss: userProfitLossRaceReducer,
  analysisRace: analysisRaceReducers,
  multipleMatch: multipleMatchDetailReducer,
});
