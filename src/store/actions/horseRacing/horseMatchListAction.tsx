import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";
import { AxiosError } from "axios";

export const getHorseRacingCountryWiseList = createAsyncThunk<any, any>(
  "horseRacing/countryWiseList",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.HORSERACING.MATCH.GET_COUNTRY_WISE_LIST}?racingMatch.stopAt=isNull&matchType=${requestData.matchType}`
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
export const getHorseRacingMatchList = createAsyncThunk<any, any>(
  "horseRacing/matchList",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.HORSERACING.MATCH.GET_RACING_LIST}?racingMatch.countryCode=${requestData.countryCode}&stopAt=isNull&matchType=eq${requestData.matchType}`
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
