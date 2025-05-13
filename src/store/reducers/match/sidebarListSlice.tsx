import { createSlice } from "@reduxjs/toolkit";
import {
  AllBetDelete,
  AllBetDeletePermanent,
  editBetDeleteReason,
  getCompetitionDates,
  getCompetitionList,
  getCompetitionMatches,
  resetCompetitionDates,
  resetCompetitionMatches,
  resetPermanentDeleteSuccess,
  resetcompetitionList,
} from "../../actions/match/matchAction";

interface InitialState {
  competitionList: Array<object>;
  competitionDates: Array<object>;
  betDeleteAll: Array<object>;
  competitionMatches: Array<object>;
  loading: boolean;
  success: boolean;
  error: any;
  permanentDeleteSuccess: boolean;
}

const initialState: InitialState = {
  competitionList: [],
  competitionDates: [],
  betDeleteAll: [],
  competitionMatches: [],
  loading: false,
  success: false,
  error: null,
  permanentDeleteSuccess: false,
};

const sidebarListSlice = createSlice({
  name: "sidebar",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompetitionList.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getCompetitionList.fulfilled, (state, action) => {
        state.success = true;
        state.competitionList = action.payload;
        state.loading = false;
      })
      .addCase(getCompetitionList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getCompetitionDates.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getCompetitionDates.fulfilled, (state, action) => {
        state.success = true;
        state.competitionDates = action.payload;
        state.loading = false;
      })
      .addCase(getCompetitionDates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(AllBetDelete.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(AllBetDelete.fulfilled, (state, action) => {
        state.success = true;
        state.betDeleteAll = action.payload;
        state.loading = false;
      })
      .addCase(AllBetDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(AllBetDeletePermanent.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(AllBetDeletePermanent.fulfilled, (state) => {
        state.permanentDeleteSuccess = true;
        state.loading = false;
      })
      .addCase(AllBetDeletePermanent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(resetPermanentDeleteSuccess, (state) => {
        state.permanentDeleteSuccess = false;
      })
      .addCase(editBetDeleteReason.pending, (state) => {
        state.loading = true;
      })
      .addCase(editBetDeleteReason.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editBetDeleteReason.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getCompetitionMatches.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getCompetitionMatches.fulfilled, (state, action) => {
        state.success = true;
        state.competitionMatches = action.payload;
        state.loading = false;
      })
      .addCase(getCompetitionMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(resetcompetitionList, (state) => {
        state.competitionList = [];
      })
      .addCase(resetCompetitionDates, (state) => {
        state.competitionDates = [];
      })
      .addCase(resetCompetitionMatches, (state) => {
        state.competitionMatches = [];
      });
  },
});

export const sidebarListReducer = sidebarListSlice.reducer;
