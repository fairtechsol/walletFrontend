import { createReducer } from "@reduxjs/toolkit";
import {
  addUser,
  changeAmmountUser,
  changePassword,
  changePasswordReset,
  getUsers,
  setCreditRefference,
  setExposureLimit,
  setLockUnlockUser,
} from "../../actions/user/userAction";

interface InitialState {
  data: any;
  success: boolean;
  loading: boolean;
  error: any;
  userList: any;
}

const initialState: InitialState = {
  data: null,
  success: false,
  loading: false,
  error: null,
  userList: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changePassword.pending, (state) => {
      state.loading = true;
    })
    .addCase(changePassword.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    })
    .addCase(changePassword.rejected, (state) => {
      state.loading = false;
    })
    .addCase(addUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      // state.data = action.payload;
    })
    .addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    })
    .addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.userList = action.payload;
    })
    .addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    })
    .addCase(changeAmmountUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(changeAmmountUser.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(changeAmmountUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    })
    .addCase(setCreditRefference.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(setCreditRefference.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(setCreditRefference.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    })
    .addCase(setExposureLimit.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(setExposureLimit.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(setExposureLimit.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    })

    .addCase(setLockUnlockUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(setLockUnlockUser.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(setLockUnlockUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    })
    .addCase(changePasswordReset, (state) => {
      // Reset the state to initial state
      return { ...state, success: false };
    });
});
