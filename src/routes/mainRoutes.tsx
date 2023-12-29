import { lazy } from "react";
import Loadable from "../utils/loadable";
import MultipleMatch from "../pages/analysis/multipleMatch";
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
      path: "match",
      element: <MatchDetail />,
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
      path: "market_analysis/matches",
      element: <MatchDetail />,
    },
    {
      path: "market_analysis/multiple_Match",
      element: <MultipleMatch />,
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
      path: "change-password",
      element: <ChangePassword />,
    },
    {
      path: "*",
      element: <Navigate to={"/expert/match"} replace />,
    },
  ],
};
export default MainRoutes;
