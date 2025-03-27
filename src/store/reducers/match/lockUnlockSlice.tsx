import { createSlice } from "@reduxjs/toolkit";
import {
  getMatchLockAllChild,
  getUserDetailsForParent,
  getUserDetailsOfLock,
  getUserOfLock,
  updateUserMatchLock,
} from "../../actions/match/marketLockUnlockAction";

interface InitialState {
  childStatus: any;
  userMatchLock: any;
  userSessionLock: any;
  matchLockAllChild: any;
  userDetailsForParent: any;
  success: boolean;
  statusSuccess: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  childStatus: {},
  userMatchLock: null,
  userSessionLock: null,
  matchLockAllChild: [],
  userDetailsForParent: [],
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
      .addCase(getUserDetailsOfLock.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getUserDetailsOfLock.fulfilled, (state, action) => {
        state.success = true;
        state.childStatus = action.payload;
        state.loading = false;
      })
      .addCase(getUserDetailsOfLock.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateUserMatchLock.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.statusSuccess = false;
      })
      .addCase(updateUserMatchLock.fulfilled, (state, action) => {
        state.loading = false;
        state.statusSuccess = true;
        if (action.payload?.role === "fairGameWallet") {
          state.userMatchLock = {
            parentBlock: false,
            selfBlock: action.payload?.data?.matchLock,
          };
          state.userSessionLock = {
            parentBlock: false,
            selfBlock: action.payload?.data?.sessionLock,
          };
        } else {
          state.userMatchLock = {
            parentBlock: state.userMatchLock?.parentBlock,
            selfBlock: action.payload?.data?.matchLock,
          };
          state.userSessionLock = {
            parentBlock: state.userSessionLock?.parentBlock,
            selfBlock: action.payload?.data?.sessionLock,
          };
        }
      })
      .addCase(updateUserMatchLock.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getMatchLockAllChild.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMatchLockAllChild.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.matchLockAllChild = action.payload;
      })
      .addCase(getMatchLockAllChild.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getUserDetailsForParent.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getUserDetailsForParent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userDetailsForParent = action.payload;
      })
      .addCase(getUserDetailsForParent.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getUserOfLock.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getUserOfLock.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userMatchLock = action.payload?.match;
        state.userSessionLock = action.payload?.session;
      })
      .addCase(getUserOfLock.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const lockUnlockReducer = lockUnlockSlice.reducer;
