import { combineReducers } from "@reduxjs/toolkit";
import { profileReducer } from "./profileSlice";
import { reportSliceReducers } from "./reportsSlice";
import { userListReducers } from "./userListSlice";
import { userUpdateReducer } from "./userUpdateSlice";

export const userReducer = combineReducers({
  profile: profileReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducers,
  reportList: reportSliceReducers,
});
