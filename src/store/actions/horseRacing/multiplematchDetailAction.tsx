import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";
import { AxiosError } from "axios";

export const getMultipleMatchDetailHorseRacing = createAsyncThunk<any, any>(
  "horseRacing/multipleMatchDetail",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.HORSERACING.MATCH.GET_MATCH_DETAIL}/${requestData.ids}?matchType=${requestData.matchType}`
      );
      if (resp?.data) {
        return resp?.data?.map((match: any) => {
          return {
            ...match,
            matchOdd: {
              ...match.matchOdd,
              runners: match.runners,
            },
          };
        });
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateMultiMatchRatesForHorseRacing = createAsyncThunk<any, any>(
  "horseRacing/multiMatchRatesUpdate",
  async (data) => {
    return data;
  }
);

export const updateTeamRatesOfMultipleMatchForHorseRacing = createAsyncThunk<
  any,
  any
>("/maxLoss/updateTeamRatesOfMultipleMatchForHorseRacing", async (data) => {
  return data;
});

export const updateTeamRatesOnDeleteForMultiMatchRace = createAsyncThunk<any, any>(
  "/maxLoss/updateTeamRatesOnDeleteForMultiMatchRace",
  async (data) => {
    return data;
  }
);
