import { lazy } from "react";
import AuthLayout from "../layout/auth";
import Loadable from "../utils/loadable";
import { Navigate } from "react-router-dom";

const Login = Loadable(lazy(() => import("../pages/auth/login")));
const ChangePassword = Loadable(lazy(() => import("../pages/changePassword")));

const AuthRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    { index: true, element: <Navigate to="/wallet/login" replace /> },
    {
      path: "wallet/login",
      element: <Login />,
    },
    {
      path: "wallet/change_password",
      element: <ChangePassword />,
    },
    {
      path: "*",
      element: <Navigate to={"/wallet/login"} replace />,
    },
  ],
};
export default AuthRoutes;
