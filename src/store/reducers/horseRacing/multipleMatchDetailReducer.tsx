import { createSlice } from "@reduxjs/toolkit";
import {
  getMultipleMatchDetailHorseRacing,
  updateMultiMatchRatesForHorseRacing,
  updateTeamRatesOfMultipleMatchForHorseRacing,
  updateTeamRatesOnDeleteForMultiMatchRace,
} from "../../actions/horseRacing/multiplematchDetailAction";

interface InitialState {
  multipleMatchDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  multipleMatchDetail: null,
  loading: false,
  success: false,
  error: null,
};

const multipleMatchDetailSlice = createSlice({
  name: "multipleMatchDetailHorseRacing",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMultipleMatchDetailHorseRacing.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMultipleMatchDetailHorseRacing.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.multipleMatchDetail = action.payload;
      })
      .addCase(getMultipleMatchDetailHorseRacing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(
        updateMultiMatchRatesForHorseRacing.fulfilled,
        (state, action) => {
          const { matchOdd, id } = action.payload;

          state.multipleMatchDetail = state.multipleMatchDetail.map(
            (match: any) => {
              if (match?.id !== id) return match;
              return {
                ...match,
                matchOdd: {
                  ...match.matchOdd,
                  ...matchOdd,
                  runners: match?.matchOdd?.runners?.map((item: any) => {
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
            }
          );
        }
      )
      .addCase(
        updateTeamRatesOfMultipleMatchForHorseRacing.fulfilled,
        (state, action) => {
          const { userRedisObj, jobData } = action.payload;
          state.multipleMatchDetail = state.multipleMatchDetail.map(
            (match: any) => {
              if (match?.id !== jobData?.newBet?.matchId) return match;
              return {
                ...match,
                profitLossDataMatch: userRedisObj,
              };
            }
          );
        }
      )
      .addCase(
        updateTeamRatesOnDeleteForMultiMatchRace.fulfilled,
        (state, action) => {
          const { teamRate, matchId } = action.payload;
          state.multipleMatchDetail = state.multipleMatchDetail.map(
            (match: any) => {
              if (match?.id !== matchId) return match;
              return {
                ...match,
                profitLossDataMatch: teamRate,
              };
            }
          );
        }
      );
  },
});

export const multipleMatchDetailReducer = multipleMatchDetailSlice.reducer;
