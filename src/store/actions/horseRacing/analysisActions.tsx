import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

export const getRateMarketAnalysis = createAsyncThunk<any, any>(
  "rateMarketAnalysis/get",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        ApiConstants.HORSERACING.MATCH.GET_RATE_MARKETANALYSIS,
        {
          params: {
            matchId: requestData,
          },
        }
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
