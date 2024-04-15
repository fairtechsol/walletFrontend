// import Loadable from "../utils/loadable";
import { Navigate } from "react-router-dom";
import { Constants } from "../utils/Constants";

import MainLayout from "../layout/main";
import DepositAndWithdrawBox from "../components/walletSettings/DepositAndWithdrawBox";

// const DepositAndWithdrawBox = Loadable(
//   () => import("../components/walletSettings/DepositAndWithdrawBox")
// );

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
