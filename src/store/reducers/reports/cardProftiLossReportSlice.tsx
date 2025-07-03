import { createSlice } from "@reduxjs/toolkit";
import {
  getBetProfitLossCard,
  getDomainProfitLossCard,
  getTotalProfitLossCard,
  resetBetProfitLossCard,
  resetDomainProfitLossCard,
  resetSessionProfitLossCard,
} from "../../actions/reports";

interface InitialState {
  totalProfitLossListCard: any;
  domainProfitLossListCard: any;
  betProfitLossListCard: any;
  sessionProfitLossListCard: any;
  totalBetProfitLossModalCard: any;
  commissionMatchListCard: any;
  commissionBetPlacedListCard: any;
  loading: boolean;
  success: boolean;
  error: any;
  user: any;
}

const initialState: InitialState = {
  totalProfitLossListCard: [],
  domainProfitLossListCard: [],
  betProfitLossListCard: [],
  sessionProfitLossListCard: [],
  totalBetProfitLossModalCard: [],
  commissionMatchListCard: [],
  commissionBetPlacedListCard: [],
  loading: false,
  success: false,
  error: null,
  user: {},
};

const profitLossReportCardSlice = createSlice({
  name: "profitLossReportCard",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTotalProfitLossCard.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.totalProfitLossListCard = [];
        state.error = null;
      })
      .addCase(getTotalProfitLossCard.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.totalProfitLossListCard = action.payload;
      })
      .addCase(getTotalProfitLossCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getDomainProfitLossCard.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.domainProfitLossListCard = [];
        state.error = null;
      })
      .addCase(getDomainProfitLossCard.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.domainProfitLossListCard = action.payload;
      })
      .addCase(getDomainProfitLossCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getBetProfitLossCard.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.betProfitLossListCard = [];
        state.error = null;
      })
      .addCase(getBetProfitLossCard.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.betProfitLossListCard = action.payload;
      })
      .addCase(getBetProfitLossCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(resetDomainProfitLossCard, (state) => {
        state.domainProfitLossListCard = [];
      })
      .addCase(resetSessionProfitLossCard, (state) => {
        state.sessionProfitLossListCard = [];
      })
      .addCase(resetBetProfitLossCard, (state) => {
        state.betProfitLossListCard = [];
      });
  },
});

export const profitLossReportCardReducer = profitLossReportCardSlice.reducer;
