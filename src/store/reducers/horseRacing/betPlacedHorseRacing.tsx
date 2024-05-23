import { createSlice } from "@reduxjs/toolkit";
import { deleteHorseRacingBets } from "../../actions/horseRacing/horseMatchDetailActions";

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

const betPlacedSlice = createSlice({
  name: "betPlacedHorseRacing",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteHorseRacingBets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHorseRacingBets.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteHorseRacingBets.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const betPlacedReducer = betPlacedSlice.reducer;
