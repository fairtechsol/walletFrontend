import { createSlice } from "@reduxjs/toolkit";
import {
  getBetProfitLoss,
  getDomainProfitLoss,
  getSessionProfitLoss,
  getTotalProfitLoss,
} from "../../actions/reports";

interface InitialState {
  totalProfitLossList: any;
  domainProfitLossList: any;
  betProfitLossList: any;
  sessionProfitLossList: any;
  loading: boolean;
  success: boolean;
  error: any;
}

const initialState: InitialState = {
  totalProfitLossList: null,
  domainProfitLossList: null,
  betProfitLossList: null,
  sessionProfitLossList: null,
  loading: false,
  success: false,
  error: null,
};

const profitLossReportSlice = createSlice({
  name: "profitLossReport",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTotalProfitLoss.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getTotalProfitLoss.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.totalProfitLossList = action.payload;
      })
      .addCase(getTotalProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getDomainProfitLoss.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getDomainProfitLoss.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.domainProfitLossList = action.payload;
      })
      .addCase(getDomainProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getBetProfitLoss.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getBetProfitLoss.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.betProfitLossList = action.payload;
      })
      .addCase(getBetProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getSessionProfitLoss.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getSessionProfitLoss.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.sessionProfitLossList = action.payload;
      })
      .addCase(getSessionProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const profitLossReportReducer = profitLossReportSlice.reducer;
