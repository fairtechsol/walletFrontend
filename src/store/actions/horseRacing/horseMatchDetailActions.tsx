import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

export const getMatchDetailHorseRacing = createAsyncThunk<any, string>(
  "horseRacing/matchDetail",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.HORSERACING.MATCH.GET_MATCH_DETAIL}/${requestData}`
      );
      if (resp?.data) {
        return {
          ...resp.data,
          matchOdd: {
            ...resp.data.matchOdd,
            runners: resp.data.runners,
          },
        };
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getUserProfitLossForRace = createAsyncThunk<any, any>(
  "userProfitLossData/forRace",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.HORSERACING.MATCH.GET_USER_PROFIT_LOSS}/${requestData}`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateMatchRatesForHorseRacing = createAsyncThunk<any, any>(
  "horseRacing/matchRatesUpdate",
  async (data) => {
    return data;
  }
);
export const updateTeamRatesForHorseRacing = createAsyncThunk<any, any>(
  "horseRacing/teamRatesUpdate",
  async (data) => {
    return data;
  }
);
export const updateTeamRatesForHorseRacingOnDelete = createAsyncThunk<any, any>(
  "horseRacing/teamRatesUpdateOnDelete",
  async (data) => {
    return data;
  }
);

export const resetUserProfitLossForRace = createAction(
  "reset/userProfitLossForRace"
);
