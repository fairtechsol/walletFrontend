import { combineReducers } from "@reduxjs/toolkit";
import { betsReducer } from "./betPlacedSlice";
import { lockUnlockReducer } from "./lockUnlockSlice";
import { analysisListReducer } from "./matchAnalysisSlice";
import { matchListReducer } from "./matchListSlice";
import { sidebarListReducer } from "./sidebarListSlice";
import { userProfitLossReducer } from "./userProfitLoss";

export const matchReducer = combineReducers({
  matchList: matchListReducer,
  analysisList: analysisListReducer,
  sideBarList: sidebarListReducer,
  bets: betsReducer,
  userProfitLoss: userProfitLossReducer,
  lockUnlock: lockUnlockReducer,
});
