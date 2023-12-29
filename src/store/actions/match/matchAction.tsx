import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../../service";
import { AxiosError } from "axios";
import { ApiConstants, Constants } from "../../../utils/Constants";

export const getMatchListInplay = createAsyncThunk<any, any>(
  "matchList/inplay",
  async (requestData) => {
    try {
      const resp = await service.get(
        `${ApiConstants.INPLAY.MATCHLIST}?page=${requestData?.currentPage}&limit=${Constants.pageLimit}`
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);
export const getMatchDetail = createAsyncThunk<any, any>(
  "match/detail",
  async (requestData) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.GET}/${requestData}`
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  }
);

export const matchListReset = createAction("matchList/reset");
