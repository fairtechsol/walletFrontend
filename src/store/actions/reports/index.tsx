import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";
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
          requestData.pageLimit
        }&searchBy=${requestData?.searchBy || ""}&keyword=${
          requestData?.keyword || ""
        }${requestData?.filter || ""}&sort=transaction.createdAt:DESC`
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
        `${ApiConstants.WALLET.REPORTS.CURRENT_BETS}?searchBy=${
          requestData?.searchBy || ""
        }&keyword=${requestData?.keyword || ""}&result=inArr${JSON.stringify([
          "PENDING",
        ])}`
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

export const getTotalProfitLoss = createAsyncThunk<any, any>(
  "totalProfitLoss/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.TOTAL_PROFIT_LOSS}?${requestData.filter}`
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
export const getDomainProfitLoss = createAsyncThunk<any, any>(
  "domainProfitLoss/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.DOMAIN_PROFIT_LOSS}?type=${requestData.type}${requestData.filter}`
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
export const getBetProfitLoss = createAsyncThunk<any, any>(
  "bet/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.BET_PROFIT_LOSS}?matchId=${requestData.matchId}${
          requestData.betId ? `&betId=${requestData.betId}` : ""
        }&isSession=${requestData.isSession}${
          requestData.id ? `&id=${requestData.id}` : ""
        }`
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
export const getSessionProfitLoss = createAsyncThunk<any, any>(
  "session/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.SESSION_PROFIT_LOSS}?matchId=${
          requestData.matchId
        }${requestData.id ? `&id=${requestData.id}` : ""}`
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

export const getTotalBetProfitLossForModal = createAsyncThunk<any, any>(
  "totalbetProfitLoss/ForModal",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.BET_PROFIT_LOSS}?matchId=${requestData?.matchId}${
          requestData.betId ? `&betId=${requestData.betId}` : ""
        }&isSession=${requestData.isSession}${
          requestData.id ? `&id=${requestData.id}` : ""
        }${requestData.url ? `&url=${requestData.url}` : ""}${
          requestData.userId
            ? `&userId=${requestData.userId}&roleName=${requestData.roleName}`
            : ""
        }`
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
export const getCommissionMatch = createAsyncThunk<any, any>(
  "commissionMatch/list",
  async (userId, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.COMMISSION_MATCH}/${userId}`
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
export const getCommissionBetPlaced = createAsyncThunk<any, any>(
  "commissionBetPlaced/list",
  async ({ userId, matchId }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.COMMISSION_BET_PLACED}/${userId}?matchId=${matchId}`
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
export const updateUserSearchId = createAsyncThunk<any, any>(
  "/maxLoss/updateUserSearchId",
  async (data) => {
    return data;
  }
);
export const resetAccountStatement = createAction("statement/reset");
export const resetSessionProfitLoss = createAction("sessionProfitLoss/reset");
export const resetBetProfitLoss = createAction("betProfitLoss/reset");
export const resetDomainProfitLoss = createAction("domainProfitLoss/reset");
export const resetUpdateUserSearchId = createAction("updateUserSearchId/reset");
