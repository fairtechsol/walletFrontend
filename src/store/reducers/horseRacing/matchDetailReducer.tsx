import { createSlice } from "@reduxjs/toolkit";
import {
  getMatchDetailHorseRacing,
  updateMatchRatesForHorseRacing,
  updateTeamRatesForHorseRacing,
} from "../../actions/horseRacing/horseMatchDetailActions";

interface InitialState {
  matchDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  matchDetail: null,
  loading: false,
  success: false,
  error: null,
};

const matchDetailSlice = createSlice({
  name: "matchDetailHorseRacing",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMatchDetailHorseRacing.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMatchDetailHorseRacing.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.matchDetail = action.payload;
      })
      .addCase(getMatchDetailHorseRacing.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateMatchRatesForHorseRacing.fulfilled, (state, action) => {
        const { matchOdd } = action.payload;

        state.matchDetail = {
          ...state.matchDetail,
          matchOdd: {
            ...state.matchDetail.matchOdd,
            ...matchOdd,
            runners: state?.matchDetail?.matchOdd?.runners?.map((item: any) => {
              const runnersData = matchOdd?.runners?.find(
                (items: any) => items?.selectionId == item?.selectionId
              );
              return {
                ...item,
                ...runnersData,
              };
            }),
          },
        };
      })
      .addCase(updateTeamRatesForHorseRacing.fulfilled, (state, action) => {
        state.matchDetail = action.payload;
      });
  },
});

export const matchDetailReducer = matchDetailSlice.reducer;
