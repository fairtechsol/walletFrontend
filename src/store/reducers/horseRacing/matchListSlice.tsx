import { createSlice } from "@reduxjs/toolkit";
import {
    getHorseRacingCountryWiseList,
    getHorseRacingMatchList,
} from "../../actions/horseRacing/horseMatchListAction";

interface InitialState {
  countryWiseList: any;
  racingList: any;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  countryWiseList: [],
  racingList: [],
  loading: false,
  success: false,
  error: null,
};

const matchListSlice = createSlice({
  name: "matchListHorseRacing",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHorseRacingCountryWiseList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHorseRacingCountryWiseList.fulfilled, (state, action) => {
        state.loading = false;
        state.countryWiseList = action.payload;
      })
      .addCase(getHorseRacingCountryWiseList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getHorseRacingMatchList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getHorseRacingMatchList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.racingList = action.payload;
      })
      .addCase(getHorseRacingMatchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
