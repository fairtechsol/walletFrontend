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
        state.totalProfitLossListCard = action?.payload;
      })
      .addCase(getTotalProfitLossCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
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
        state.domainProfitLossListCard = action?.payload;
      })
      .addCase(getDomainProfitLossCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
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
        state.betProfitLossListCard = action?.payload;
      })
      .addCase(getBetProfitLossCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      // .addCase(getTotalBetProfitLossForModal.pending, (state) => {
      //   state.loading = true;
      //   state.success = false;
      //   state.totalBetProfitLossModalCard = [];
      // })
      // .addCase(getTotalBetProfitLossForModal.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.success = true;
      //   state.totalBetProfitLossModalCard = action?.payload;
      // })
      // .addCase(getSessionProfitLoss.pending, (state) => {
      //   state.loading = false;
      //   state.success = false;
      //   state.error = null;
      //   state.sessionProfitLossListCard = [];
      // })
      // .addCase(getSessionProfitLoss.fulfilled, (state, action) => {
      //   state.success = true;
      //   state.loading = false;
      //   state.sessionProfitLossListCard = action?.payload;
      // })
      // .addCase(getSessionProfitLoss.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action?.error?.message;
      // })
      // .addCase(getCommissionMatch.pending, (state) => {
      //   state.loading = false;
      //   state.success = false;
      //   state.error = null;
      //   state.commissionMatchListCard = [];
      // })
      // .addCase(getCommissionMatch.fulfilled, (state, action) => {
      //   state.success = true;
      //   state.loading = false;
      //   state.commissionMatchListCard = action?.payload;
      // })
      // .addCase(getCommissionMatch.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action?.error?.message;
      // })
      // .addCase(getCommissionBetPlaced.pending, (state) => {
      //   state.loading = false;
      //   state.success = false;
      //   state.error = null;
      //   state.commissionBetPlacedListCard = [];
      // })
      // .addCase(getCommissionBetPlaced.fulfilled, (state, action) => {
      //   state.success = true;
      //   state.loading = false;
      //   state.commissionBetPlacedListCard = action?.payload;
      // })
      // .addCase(getCommissionBetPlaced.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action?.error?.message;
      // })
      .addCase(resetDomainProfitLossCard, (state) => {
        return { ...state, domainProfitLossList: [] };
      })
      .addCase(resetSessionProfitLossCard, (state) => {
        return { ...state, sessionProfitLossList: [] };
      })
      .addCase(resetBetProfitLossCard, (state) => {
        return { ...state, betProfitLossList: [] };
      })
      // .addCase(updateUserSearchId.fulfilled, (state, action) => {
      //   state.success = true;
      //   state.loading = false;
      //   state.user = action?.payload?.search;
      // })
      // .addCase(resetUpdateUserSearchId, (state) => {
      //   return { ...state, user: {} };
      // });
  },
});

export const profitLossReportCardReducer = profitLossReportCardSlice.reducer;
