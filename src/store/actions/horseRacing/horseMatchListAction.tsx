import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";
import { AxiosError } from "axios";

export const getHorseRacingCountryWiseList = createAsyncThunk<any>(
  "horseRacing/countryWiseList",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.HORSERACING.MATCH.GET_COUNTRY_WISE_LIST}?racingMatch.stopAt=isNull`
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
        `${ApiConstants.HORSERACING.MATCH.GET_RACING_LIST}?racingMatch.countryCode=${requestData.countryCode}&stopAt=isNull`
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
