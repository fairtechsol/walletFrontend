import { combineReducers } from "@reduxjs/toolkit";
import { matchListReducer } from "./matchListSlice";
import { analysisListReducer } from "./matchAnalysisSlice";
import { sidebarListReducer } from "./sidebarListSlice";
import { betsReducer } from "./betPlacedSlice";
import { userProfitLossReducer } from "./userProfitLoss";
import { lockUnlockReducer } from "./lockUnlockSlice";

export const matchReducer = combineReducers({
  matchList: matchListReducer,
  analysisList: analysisListReducer,
  sideBarList: sidebarListReducer,
  bets: betsReducer,
  userProfitLoss: userProfitLossReducer,
  lockUnlock: lockUnlockReducer,
});
