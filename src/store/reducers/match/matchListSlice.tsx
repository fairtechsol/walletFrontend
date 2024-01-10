import { createSlice } from "@reduxjs/toolkit";
import {
  getMatchDetail,
  getMatchListInplay,
  matchListReset,
  updateMatchListRates,
  updateMatchRates,
} from "../../actions/match/matchAction";

interface InitialState {
  matchListInplay: any;
  matchDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  matchListInplay: [],
  matchDetail: null,
  loading: false,
  success: false,
  error: null,
};

const matchListSlice = createSlice({
  name: "matchListInplay",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMatchListInplay.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMatchListInplay.fulfilled, (state, action) => {
        state.matchListInplay = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getMatchListInplay.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getMatchDetail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMatchDetail.fulfilled, (state, action) => {
        state.matchDetail = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getMatchDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateMatchListRates.fulfilled, (state, action) => {
        const { id, matchOdd } = action.payload; // Assuming action.payload contains matchId and updatedOdd

        // Find the index of the match in state.matchlistinplay.matchlist
        const matchListIndex = state.matchListInplay.findIndex(
          (match: any) => match?.id === id
        );

        // If the match is found, update the specific field (e.g., bookmaker)
        if (matchListIndex !== -1) {
          const updatedMatchlist = [...state.matchListInplay];

          let matchOdds =
            state?.matchListInplay?.matchOdds &&
            state?.matchListInplay?.matchOdds.length > 0
              ? state.matchListInplay?.matchOdds[0]
              : state.matchListInplay?.matchOdds;
          updatedMatchlist[matchListIndex] = {
            ...updatedMatchlist[matchListIndex],
            matchOdds: [
              {
                ...matchOdds,
                ...matchOdd,
              },
            ],
          };
          return {
            ...state,
            matchListInplay: updatedMatchlist,
          };
        }
        return state;
      })
      .addCase(updateMatchRates.fulfilled, (state, action) => {
        const {
          apiSession,
          apiTiedMatch,
          bookmaker,
          manualTideMatch,
          marketCompleteMatch,
          matchOdd,
          quickbookmaker,
          sessionBettings,
        } = action.payload;
        state.matchDetail = {
          ...state.matchDetail,
          apiSession: apiSession,
          apiTideMatch: { ...state.matchDetail.apiTideMatch, ...apiTiedMatch },
          bookmaker: { ...state.matchDetail.bookmaker, ...bookmaker },
          manualTiedMatch: manualTideMatch,
          marketCompleteMatch: marketCompleteMatch,
          matchOdd: { ...state.matchDetail.matchOdd, ...matchOdd },
          quickBookmaker: quickbookmaker,
          sessionBettings: sessionBettings,
        };
      })
      .addCase(matchListReset, (state) => {
        return { ...state, success: false };
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
