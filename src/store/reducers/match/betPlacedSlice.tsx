import { createSlice } from "@reduxjs/toolkit";
import {
  getPlacedBets,
  getRunAmount,
  updateBetsPlaced,
} from "../../actions/match/matchAction";

interface InitialState {
  placedBets: Array<object>;
  runAmount: Array<object>;
  loading: boolean;
  success: boolean;
  error: any;
}

const initialState: InitialState = {
  placedBets: [],
  runAmount: [],
  loading: false,
  success: false,
  error: null,
};

const betsSlice = createSlice({
  name: "bets",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlacedBets.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getPlacedBets.fulfilled, (state, action) => {
        state.success = true;
        state.placedBets = action.payload;
        state.loading = false;
      })
      .addCase(getPlacedBets.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getRunAmount.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getRunAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.runAmount = action.payload;
      })
      .addCase(getRunAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateBetsPlaced.fulfilled, (state, action) => {
        const { newBet, myStake } = action.payload;
        const betId = action.payload.betId;
        if (!state.placedBets.some((item: any) => item.id === betId)) {
          newBet.myStake = myStake;

          state.placedBets = [newBet, ...state.placedBets];
        }
      });
  },
});

export const betsReducer = betsSlice.reducer;
