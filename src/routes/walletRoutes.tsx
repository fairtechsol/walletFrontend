import { lazy } from "react";
import Loadable from "../utils/loadable";
import { Navigate } from "react-router-dom";

const MainLayout = Loadable(lazy(() => import("../layout/main")));
const DepositAndWithdrawBox = Loadable(
  lazy(() => import("../components/walletSettings/DepositAndWithdrawBox"))
);

const WalletRoutes = {
  path: "/wallet/walletSettings",
  element: <MainLayout />,
  children: [
    {
      path: "deposit",
      element: <DepositAndWithdrawBox />,
    },
    {
      path: "withdraw",
      element: <DepositAndWithdrawBox />,
    },
    {
      path: "credit_reference",
      element: <DepositAndWithdrawBox />,
    },
    {
      path: "*",
      element: <Navigate to={"/expert/match"} replace />,
    },
  ],
};
export default WalletRoutes;
