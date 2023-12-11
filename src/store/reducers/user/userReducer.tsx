import { createReducer } from "@reduxjs/toolkit";
import {
  addUser,
  changePassword,
  changePasswordReset,
  updateUser,
  getUsers,
  getUsersDetail,
} from "../../actions/user/userAction";

interface InitialState {
  userDetail: any;
  childUserDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
  userList: any;
}

const initialState: InitialState = {
  userDetail: null,
  childUserDetail: null,
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
      state.success = true;
      state.loading = false;
    })
    .addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    })
    .addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.userDetail = action.payload;
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    })
    .addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.userList = action.payload;
    })
    .addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    })
    .addCase(getUsersDetail.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getUsersDetail.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.userDetail = action.payload;
    })
    .addCase(getUsersDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    })
    .addCase(changePasswordReset, (state) => {
      // Reset the state to initial state
      return { ...state, success: false };
    });
});
