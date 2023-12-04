import { lazy } from "react";
import Loadable from "../utils/loadable";

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
  ],
};
export default WalletRoutes;
