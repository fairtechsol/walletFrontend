import { createSlice } from "@reduxjs/toolkit";
import {
  changeAmmountUser,
  changePasswordRow,
  getAlreadyUserExist,
  getModalUserList,
  getSearchClientList,
  getTotalBalance,
  getUserList,
  handleExport,
  handleModelActions,
  handleSettleCommission,
  setCreditRefference,
  setExposureLimit,
  setLockUnlockUser,
  userListSuccessReset,
} from "../../actions/user/userAction";

interface InitialState {
  userDetail: any;
  userAlreadyExist: boolean;
  userList: any;
  userModalList: any;
  searchUserList: any;
  success: boolean;
  loading: boolean;
  error: any;
  totalBalance: any;
  openModal:boolean;
  domain:any;
  userElement:any;
  isUrl : boolean;
}

const initialState: InitialState = {
  userDetail: null,
  userAlreadyExist: false,
  userList: null,
  userModalList: null,
  searchUserList: [],
  success: false,
  loading: false,
  error: null,
  totalBalance: null,
  openModal:false,
  domain:null,
  userElement:null,
  isUrl:false,
};

export const userList = createSlice({
  name: "userList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleExport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleExport.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handleExport.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.userList = action.payload;
        state.loading = false;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getModalUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getModalUserList.fulfilled, (state, action) => {
        state.userModalList = action.payload;
        state.loading = false;
      })
      .addCase(getModalUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(handleModelActions.fulfilled, (state, action) => {
        const {openModal,domain} = action.payload
        state.openModal = openModal;
        let obj = {
          roleName : action.payload.roleName,
          id: action.payload.userId,
          domain : domain,
          title: action.payload.title
        }
        state.userElement=obj
        state.isUrl = action.payload.isUrl
        if (domain !== undefined && domain !== null && domain !== '' && openModal) {
          state.domain = domain;
        } else if(!openModal) {
          state.domain = ''
        }
        state.loading = false;
      })
      .addCase(changeAmmountUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeAmmountUser.fulfilled, (state) => {
        state.success = true;
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
        state.success = true;
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
        state.success = true;
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
        state.success = true;
        state.loading = false;
      })
      .addCase(setLockUnlockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(changePasswordRow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordRow.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(changePasswordRow.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(handleSettleCommission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleSettleCommission.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(handleSettleCommission.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getAlreadyUserExist.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getAlreadyUserExist.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userAlreadyExist = action.payload;
      })
      .addCase(getAlreadyUserExist.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getSearchClientList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getSearchClientList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.searchUserList = action.payload;
      })
      .addCase(getSearchClientList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(userListSuccessReset, (state) => {
        return { ...state, success: false };
      })
      .addCase(getTotalBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTotalBalance.fulfilled, (state, action) => {
        state.totalBalance = action.payload;
        state.loading = false;
      })
      .addCase(getTotalBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const userListReducers = userList.reducer;
