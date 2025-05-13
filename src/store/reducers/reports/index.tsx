import { combineReducers } from "@reduxjs/toolkit";
import { profitLossReportCardReducer } from "./cardProftiLossReportSlice";
import { profitLossReportReducer } from "./profitLossReportSlice";

export const reportReducer = combineReducers({
  reportList: profitLossReportReducer,
  cardReport: profitLossReportCardReducer,
});
