import { createSlice } from "@reduxjs/toolkit";
import { getUsersProfile, profileReset } from "../../actions/user/userAction";

interface InitialState {
  profileDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  profileDetail: null,
  loading: false,
  success: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getUsersProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profileDetail = action.payload;
      })
      .addCase(getUsersProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(profileReset, (state) => {
        return { ...state, success: false };
      });
  },
});

export const profileReducer = profileSlice.reducer;
