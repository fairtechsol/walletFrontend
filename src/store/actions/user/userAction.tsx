import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";

interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface AddUser {
  userName: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  city: string;
  roleName: string;
  myPartnership: string;
  createdBy: string;
  creditRefrence: string;
  exposureLimit: string;
  maxBetLimit: string;
  minBetLimit: string;
}

export const changePassword = createAsyncThunk<any, ChangePassword>(
  "user/changePassword",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post("/user/changePassword", requestData);
      if (resp) {
        console.log(resp.data, "data");
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const addUser = createAsyncThunk<any, AddUser>(
  "user/add",
  async (requestData) => {
    try {
      const resp = await service.post("/user/add", requestData);
      if (resp) {
        console.log(resp.data, "data");
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);

export const updateUser = createAsyncThunk<any, any>(
  "user/updateUser",
  async (requestData) => {
    try {
      const resp = await service.post("/user/updateUser", requestData);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);

export const getUsers = createAsyncThunk("user/list", async () => {
  try {
    const resp = await service.get("/user/list");
    if (resp) {
      console.log(resp.data, "data");
      return resp?.data;
    }
  } catch (error: any) {
    const err = error as AxiosError;
    throw err;
  }
});
export const getUsersDetail = createAsyncThunk("user/profile", async () => {
  try {
    const resp = await service.get(`/user/profile`);
    if (resp) {
      return resp?.data[0][0];
    }
  } catch (error: any) {
    const err = error as AxiosError;
    throw err;
  }
});

export const changePasswordReset = createAction("changePassword/reset");
export const userDetailReset = createAction("userDetail/reset");
