import { lazy } from "react";
import Loadable from "../utils/loadable";

const MainLayout = Loadable(lazy(() => import("../layout/main")));
const ListOfClients = Loadable(lazy(() => import("../pages/listOfClients")));

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
      element: <ListOfClients />,
    },
    {
      path: "add_account",
      element: <ListOfClients />,
    },
    {
      path: "market_analysis",
      element: <ListOfClients />,
    },
    {
      path: "reports",
      element: <ListOfClients />,
    },
    {
      path: "my-account",
      element: <ListOfClients />,
    },
  ],
};
export default MainRoutes;
