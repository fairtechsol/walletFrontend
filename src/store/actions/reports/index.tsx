import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../../service";
import { ApiConstants, Constants } from "../../../utils/Constants";
import { AxiosError } from "axios";

interface AccountStatement {
  id: string;
  searchBy?: any;
  page: number;
  keyword?: any;
  filter?: any;
  pageLimit?: any;
}
interface currentBets {
  searchBy?: any;
  keyword?: any;
  filter?: any;
}

export const getAccountStatement = createAsyncThunk<any, AccountStatement>(
  "accountStatement/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.WALLET.REPORTS.GETACCOUNTSTATEMENT}/${
          requestData?.id
        }?page=${requestData?.page ? requestData?.page : 1}&limit=${
          requestData.pageLimit ? requestData.pageLimit : Constants.pageLimit
        }&searchBy=${requestData?.searchBy || ""}&keyword=${
          requestData?.keyword || ""
        }${requestData?.filter || ""}`
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
export const getCurrentBets = createAsyncThunk<any, currentBets>(
  "currentBets/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.WALLET.REPORTS.CURRENT_BETS}?&searchBy=${
          requestData?.searchBy || ""
        }&keyword=${requestData?.keyword || ""}`
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

export const resetAccountStatement = createAction("statement/reset");
