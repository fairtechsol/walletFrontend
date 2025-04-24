import { createSlice } from "@reduxjs/toolkit";
import {
  getUserOfLock,
  updateUserMatchLock,
} from "../../actions/match/marketLockUnlockAction";

interface InitialState {
  userMatchLock: any;
  userSessionLock: any;
  success: boolean;
  statusSuccess: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  userMatchLock: null,
  userSessionLock: null,
  loading: false,
  success: false,
  statusSuccess: false,
  error: null,
};

const lockUnlockSlice = createSlice({
  name: "lockUnlock",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserMatchLock.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.statusSuccess = false;
      })
      .addCase(updateUserMatchLock.fulfilled, (state, action) => {
        state.loading = false;
        state.statusSuccess = true;
        const { role, data } = action.payload;
        if (role === "fairGameWallet") {
          state.userMatchLock = {
            parentBlock: false,
            selfBlock: data?.matchLock,
          };
          state.userSessionLock = {
            parentBlock: false,
            selfBlock: data?.sessionLock,
          };
        } else {
          state.userMatchLock = {
            parentBlock: state.userMatchLock?.parentBlock,
            selfBlock: data?.matchLock,
          };
          state.userSessionLock = {
            parentBlock: state.userSessionLock?.parentBlock,
            selfBlock: data?.sessionLock,
          };
        }
      })
      .addCase(updateUserMatchLock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })

      .addCase(getUserOfLock.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getUserOfLock.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const { match, session } = action.payload;
        state.userMatchLock = match;
        state.userSessionLock = session;
      })
      .addCase(getUserOfLock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
  },
});

export const lockUnlockReducer = lockUnlockSlice.reducer;
