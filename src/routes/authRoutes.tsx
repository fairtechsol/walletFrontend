import { lazy } from "react";
import AuthLayout from "../layout/auth";
import Loadable from "../utils/loadable";
import { Navigate } from "react-router-dom";

const Login = Loadable(lazy(() => import("../pages/auth/login")));

const AuthRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    { index: true, element: <Navigate to="/login" replace /> },
    {
      path: "login",
      element: <Login />,
    },
  ],
};
export default AuthRoutes;
