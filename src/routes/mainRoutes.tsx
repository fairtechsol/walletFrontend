import { lazy } from "react";
import Loadable from "../utils/loadable";
import { Navigate } from "react-router-dom";

const MainLayout = Loadable(lazy(() => import("../layout/main")));
const ListOfClients = Loadable(lazy(() => import("../pages/listOfClients")));
const ChangePassword = Loadable(lazy(() => import("../pages/changePassword")));
const MyAccount = Loadable(lazy(() => import("../pages/myAccount")));
const Inplay = Loadable(lazy(() => import("../pages/inplay")));
const AddAccount = Loadable(lazy(() => import("../pages/addAccount")));
const Analysis = Loadable(lazy(() => import("../pages/analysis")));
const Reports = Loadable(lazy(() => import("../pages/reports")));
const MatchDetail = Loadable(lazy(() => import("../pages/matchDetail")));
const WalletSettings = Loadable(lazy(() => import("../pages/walletSettings")));

const MainRoutes = {
  path: "/wallet",
  element: <MainLayout />,
  children: [
    {
      path: "list_of_clients",
      element: <ListOfClients />,
    },
    {
      path: "live_market",
      element: <Inplay />,
    },
    {
      path: "live_market/matches",
      element: <MatchDetail />,
    },
    {
      path: "add_account",
      element: <AddAccount />,
    },
    {
      path: "edit_account",
      element: <AddAccount />,
    },
    {
      path: "market_analysis",
      element: <Analysis />,
    },
    {
      path: "reports",
      element: <Reports />,
    },
    {
      path: "walletSettings",
      element: <WalletSettings />,
    },
    {
      path: "my-account",
      element: <MyAccount />,
    },
    {
      path: "change_password",
      element: <ChangePassword />,
    },
    {
      path: "*",
      element: <Navigate to={"/wallet/list_of_clients"} replace />,
    },
  ],
};
export default MainRoutes;
