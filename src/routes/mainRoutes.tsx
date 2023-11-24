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
      path: "list_of_clients",
      element: <ListOfClients />,
    },
    {
      path: "list_of_clients",
      element: <ListOfClients />,
    },
    {
      path: "list_of_clients",
      element: <ListOfClients />,
    },
    {
      path: "list_of_clients",
      element: <ListOfClients />,
    },
  ],
};
export default MainRoutes;
