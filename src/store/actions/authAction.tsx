import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../service";

interface LoginData {
    userName: string;
    password: string;
    loginType:string;
  }

export const login=createAsyncThunk<any, LoginData>("auth/login",async (requestData, thunkApi)=>{
    try{
        const {data}=await service.post("/auth/login",requestData);
        const {token}=data;
        localStorage.setItem("userToken",token);
        return data;
    }
    catch(error){
        const err=error as AxiosError;
        return thunkApi.rejectWithValue(err.response?.status);
    }
});

export const logout=createAsyncThunk<any,any>("auth/login",async (thunkApi)=>{
    try{
        const response=await service.post("/auth/logout");
        localStorage.clear();
        window.location.replace("/login");
       return response;
    }
    catch(error){
        const err=error as AxiosError;
        return thunkApi.rejectWithValue(err.response?.status);
    }
});

export const authReset = createAction('auth/reset');
