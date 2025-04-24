import { createSlice } from "@reduxjs/toolkit";
import {
    getUserProfitLossForRace,
    resetUserProfitLossForRace,
} from "../../actions/horseRacing/horseMatchDetailActions";

interface InitialState {
  userProfitLossData: any;
  loading: boolean;
  success: boolean;
  error: any;
}

const initialState: InitialState = {
  userProfitLossData: [],
  loading: false,
  success: false,
  error: null,
};

const userProfitLossRace = createSlice({
  name: "userProfitLossRace",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfitLossForRace.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getUserProfitLossForRace.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.userProfitLossData = action.payload;
      })
      .addCase(getUserProfitLossForRace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(resetUserProfitLossForRace, (state) => {
        return { ...state, userProfitLossData: [] };
      });
  },
});

export const userProfitLossRaceReducer = userProfitLossRace.reducer;
