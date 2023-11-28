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

const MainRoutes = {
  path: "/admin",
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
      path: "my-account",
      element: <MyAccount />,
    },
    {
      path: "change_password",
      element: <ChangePassword />,
    },
    {
      path: "*",
      element: <Navigate to={"/"} />,
    },
  ],
};
export default MainRoutes;
