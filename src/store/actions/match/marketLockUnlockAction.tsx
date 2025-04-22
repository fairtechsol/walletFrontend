import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

export const updateUserMatchLock = createAsyncThunk<any, any>(
  "/userMatchLock",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        ApiConstants.USER.USER_MATCH_LOCK,
        requestData?.payload
      );
      if (resp) {
        const response = {
          data: resp?.data?.returnData,
          role: requestData?.role,
        };
        return response;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getUserOfLock = createAsyncThunk<any, any>(
  "/getUserOfLock",
  async (id, thunkApi) => {
    try {
      const resp = await service.get(
        ApiConstants.USER.USER_CHECK_CHILD_ACTIVATE,
        {
          params: {
            matchId: id,
          },
        }
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
