import { createSlice } from "@reduxjs/toolkit";
import {
  getMatchListInplay,
  matchListReset,
} from "../../actions/match/matchAction";

interface InitialState {
  matchListInplay: any;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  matchListInplay: [],
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
        state.loading = false;
        state.success = true;
        state.matchListInplay = action.payload;
      })
      .addCase(getMatchListInplay.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(matchListReset, (state) => {
        return { ...state, success: false };
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
