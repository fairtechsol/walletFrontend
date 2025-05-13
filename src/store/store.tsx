import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth/authReducer";
import { horseRacingReducer } from "./reducers/horseRacing";
import { matchReducer } from "./reducers/match";
import { reportReducer } from "./reducers/reports";
import { userReducer } from "./reducers/user";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    match: matchReducer,
    report: reportReducer,
    horseRacing: horseRacingReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
