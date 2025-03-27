import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants, Constants } from "../../../utils/Constants";

interface RequestData {
  userName?: string;
  currentPage?: number;
  url?: any;
  searchBy?: string;
  userId?: string;
  roleName?: string;
  domain?: string;
}

interface SearchUsers {
  userName?: string;
  isUser?: boolean;
}

export const changePassword = createAsyncThunk<any, any>(
  "user/changePassword",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${requestData.url}`,
        requestData.payload
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const changePasswordRow = createAsyncThunk<any, any>(
  "user/changePasswordRow",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${requestData.url}`,
        requestData.payload
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getMyAccountDetails = createAsyncThunk<any>(
  "user/getMyAccountDetails",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(`${ApiConstants.USER.BALANCE}`);
      if (resp) {
        const data = resp?.data?.response;
        return data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getUserList = createAsyncThunk<any, RequestData | undefined>(
  "user/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${requestData?.url?.endpoint}?searchBy=${
          requestData?.searchBy ? requestData?.searchBy : ""
        }&keyword=${requestData?.userName ? requestData?.userName : ""}&${
          requestData?.url?.endpoint === ApiConstants.USER.EXPERTLIST
            ? "offset"
            : "page"
        }=${requestData?.currentPage}&limit=${
          Constants.pageLimit
        }&sort=user.betBlock:ASC,user.userBlock:ASC,user.userName:ASC`
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

export const getModalUserList = createAsyncThunk<any, RequestData | undefined>(
  "user/modalList",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${requestData?.url}?searchBy=${
          requestData?.searchBy ? requestData?.searchBy : ""
        }&userId=${requestData?.userId}&domain=${
          requestData?.domain
        }&roleName=${requestData?.roleName}&keyword=${
          requestData?.userName ? requestData?.userName : ""
        }&page=${requestData?.currentPage}&limit=${Constants.pageLimit}`
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

export const getTotalBalance = createAsyncThunk<any, RequestData | undefined>(
  "user/balance",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.TOTAL_BALANCE}?userId=${
          requestData?.userId ? requestData?.userId : ""
        }&roleName=${
          requestData?.roleName ? requestData?.roleName : ""
        }&domain=${requestData?.domain ? requestData?.domain : ""}`
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

export const addUser = createAsyncThunk<any, any>(
  "user/add",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.ADDFGADMIN}`,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const addExpert = createAsyncThunk<any, any>(
  "user/addExpert",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.ADDEXPERT}`,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const addUrlAdmin = createAsyncThunk<any, any>(
  "user/addUrlAdmin",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.ADDURLADMIN}`,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateUrlAdmin = createAsyncThunk<any, any>(
  "user/updateUrlAdmin",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.UPDATEURLADMIN}`,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateUser = createAsyncThunk<any, any>(
  "user/updateUser",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.UPDATE}`,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const updateExpert = createAsyncThunk<any, any>(
  "user/updateExpert",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.UPDATEEXPERT}`,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getUsersProfile = createAsyncThunk(
  "user/profile",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(`${ApiConstants.USER.PROFILE}`);
      if (resp) {
        if (resp?.data[0][0].loginAt === null) {
          window.location.replace("/wallet/login");
          sessionStorage.clear();
        } else {
          return resp?.data[0][0];
        }
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getUsersDetail = createAsyncThunk<any, string>(
  "user/detail",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.PROFILE}?userId=${requestData}`
      );
      if (resp) {
        return resp?.data[0][0];
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const changeAmmountUser = createAsyncThunk<any, any>(
  "balance/update",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${requestData.url}`,
        requestData.payload
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const handleSettleCommission = createAsyncThunk<any, any>(
  "settleCommission/update",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.COMMISSION_SETTLEMENT}`,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const handleDeleteUser = createAsyncThunk<any, any>(
  "deleteUser/userList",
  async (id, thunkApi) => {
    try {
      const resp = await service.delete(`${ApiConstants.USER.DELETE}/${id}`);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const marqueeNotification = createAsyncThunk<any>(
  "expert/notification",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(`${ApiConstants.USER.MARQUEE}`);
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const setCreditRefference = createAsyncThunk<any, any>(
  "user/update/creditreferrence",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${requestData.url}`,
        requestData.payload
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const setExposureLimit = createAsyncThunk<any, any>(
  "user/update/exposurelimit",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${requestData.url}`,
        requestData.payload
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const setLockUnlockUser = createAsyncThunk<any, any>(
  "/user/lockUnlockUser",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${requestData.url}`,
        requestData.payload
      );
      if (resp) {
        return { ...resp?.data, requestData };
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const setLockUnlockUserExpert = createAsyncThunk<any, any>(
  "/user/lockUnlockUserExpert",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${requestData.url}`,
        requestData.payload
      );
      if (resp) {
        return { ...resp?.data, requestData };
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getAlreadyUserExist = createAsyncThunk<
  any,
  SearchUsers | undefined
>("user/clientName", async (requestData, thunkApi) => {
  try {
    const resp = await service.get(
      `${ApiConstants.USER.ALREADY_EXIST}?userName=${requestData}`
    );
    if (resp) {
      return resp?.data?.isUserExist;
    }
  } catch (error: any) {
    const err = error as AxiosError;
    throw thunkApi.rejectWithValue(err.response?.status);
  }
});

export const getSearchClientList = createAsyncThunk<
  any,
  SearchUsers | undefined
>("user/clientList", async (requestData, thunkApi) => {
  try {
    const resp = await service.get(
      `${ApiConstants.USER.ALREADY_SEARCHLIST}?userName=${
        requestData?.userName
      }${requestData?.isUser ? "&isUser=true" : ""}`
    );
    if (resp) {
      return resp?.data;
    }
  } catch (error: any) {
    const err = error as AxiosError;
    throw thunkApi.rejectWithValue(err.response?.status);
  }
});

export const getChildUserProfitLoss = createAsyncThunk<any, string>(
  "user/childProfitLoss",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.CHILD_PROFIT_LOSS}/${requestData}`
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const handleExport = createAsyncThunk<any, any>(
  "user/export",
  async (requestData, thunkApi) => {
    try {
      const response = await service.get(
        `${requestData.endPoint}?type=${requestData.type}&userId=${
          requestData.userId ? requestData.userId : ""
        }&domain=${requestData.domain ? requestData.domain : ""}&roleName=${
          requestData.roleName ? requestData.roleName : ""
        }`
      );

      const fileData = response?.data?.file;

      let blob = new Blob();
      if (requestData.type == "pdf") {
        // window.open(`data:application/pdf;base64,${fileData}`, '_blank');
        const binaryData = new Uint8Array(
          atob(fileData)
            .split("")
            .map((char) => char.charCodeAt(0))
        );
        blob = new Blob([binaryData], { type: "application/pdf" });
      } else if (requestData.type == "excel") {
        const binaryData = new Uint8Array(
          atob(fileData)
            .split("")
            .map((char) => char.charCodeAt(0))
        );
        // Create a Blob from the Uint8Array
        blob = new Blob([binaryData], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
      }
      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(blob);
      // Create an <a> element and trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = requestData?.name
        ? `${requestData?.name}`.replace(/[^\w\s]/g, "_")
        : "client_list";
      link.click();
      // Clean up by revoking the URL
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getUserWiseExposure = createAsyncThunk<any, any>(
  "userwiseExposure/clientList",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.USER_WISE_EVENTWISE_EXPOSURE}/${requestData}`
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const changeDeletePassword = createAsyncThunk<any, any>(
  "user/changeDeletePasswordRow",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.CHANGE_DELETE_PASSWORD}`,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateBalanceOfLoggedUser = createAsyncThunk<any, any>(
  "/loggedUserBalance/update",
  async (data) => {
    return data;
  }
);
export const handleModelActions = createAsyncThunk<any, any>(
  "/user/handleModelActions",
  async (data) => {
    return data;
  }
);
export const resetDeleteChangePassword = createAction(
  "delete/changePassword/reset"
);
export const changePasswordReset = createAction("changePassword/reset");
export const profileReset = createAction("profile/reset");
export const updateReset = createAction("update/reset");
export const updateUserReset = createAction("updateUser/reset");
export const addReset = createAction("add/reset");
export const userListSuccessReset = createAction("userList/reset");
export const resetSearchUserList = createAction("searchUserList/reset");
export const resetUserWiseExposureList = createAction(
  "userWiseExposureList/reset"
);
