import { Navigate } from "react-router-dom";
import { Constants } from "../utils/Constants";

import DepositAndWithdrawBox from "../components/walletSettings/DepositAndWithdrawBox";
import MainLayout from "../layout/main";
const WalletRoutes = {
  path: Constants.WalletSettingsPaths.root,
  element: <MainLayout />,
  children: [
    {
      path: Constants.WalletSettingsPaths.deposit,
      element: <DepositAndWithdrawBox />,
    },
    {
      path: Constants.WalletSettingsPaths.withdraw,
      element: <DepositAndWithdrawBox />,
    },
    {
      path: Constants.WalletSettingsPaths.creditReference,
      element: <DepositAndWithdrawBox />,
    },
    {
      path: "*",
      element: <Navigate to={"/wallet/list_of_clients"} replace />,
    },
  ],
};
export default WalletRoutes;
