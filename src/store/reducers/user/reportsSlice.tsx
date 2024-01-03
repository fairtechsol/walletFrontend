import { createSlice } from "@reduxjs/toolkit";
import {
  getAccountStatement,
  resetAccountStatement,
} from "../../actions/reports";

interface InitialState {
  accountStatement: any;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  accountStatement: null,
  success: false,
  loading: false,
  error: null,
};

export const reportSlice = createSlice({
  name: "userList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccountStatement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAccountStatement.fulfilled, (state, action) => {
        state.success = true;
        state.accountStatement = action.payload;
        state.loading = false;
      })
      .addCase(getAccountStatement.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(resetAccountStatement, (state) => {
        return { ...state, success: false };
      });
  },
});

export const reportSliceReducers = reportSlice.reducer;
