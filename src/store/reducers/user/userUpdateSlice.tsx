import { createSlice } from "@reduxjs/toolkit";
import {
  addExpert,
  addUrlAdmin,
  addUser,
  getUsersDetail,
  updateReset,
  updateUser,
} from "../../actions/user/userAction";

interface InitialState {
  userDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  userDetail: null,
  loading: false,
  success: false,
  error: null,
};

const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(addExpert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExpert.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(addExpert.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(addUrlAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUrlAdmin.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(addUrlAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
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
      .addCase(updateReset, () => {
        return {
          userDetail: null,
          loading: false,
          success: false,
          error: null,
        };
      });
  },
});

export const userUpdateReducer = userUpdateSlice.reducer;
