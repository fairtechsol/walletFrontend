import { createSlice } from "@reduxjs/toolkit";
import { getRateMarketAnalysis } from "../../actions/horseRacing/analysisActions";

interface InitialState {
  raceMatchChilds: any;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  raceMatchChilds: null,
  loading: false,
  success: false,
  error: null,
};

const analysisRace = createSlice({
  name: "analysisRace",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRateMarketAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRateMarketAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.raceMatchChilds = action.payload;
      })
      .addCase(getRateMarketAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const analysisRaceReducers = analysisRace.reducer;
