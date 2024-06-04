import { combineReducers } from "@reduxjs/toolkit";
import { matchListReducer } from "./matchListSlice";
import { matchDetailReducer } from "./matchDetailReducer";
import { betPlacedReducer } from "./betPlacedHorseRacing";
import { userProfitLossRaceReducer } from "./userProfitLossRace";
import { analysisRaceReducers } from "./analysisReducer";

export const horseRacingReducer = combineReducers({
  matchList: matchListReducer,
  matchDetail: matchDetailReducer,
  betPlaced: betPlacedReducer,
  userProfitLoss: userProfitLossRaceReducer,
  analysisRace: analysisRaceReducers,
});
