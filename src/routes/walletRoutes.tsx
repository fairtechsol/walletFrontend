import { lazy } from "react";
import Loadable from "../utils/loadable";

const MainLayout = Loadable(lazy(() => import("../layout/main")));
const ListOfClients = Loadable(lazy(() => import("../pages/listOfClients")));
const Inplay = Loadable(lazy(() => import("../pages/inplay")));
const MatchDetail = Loadable(lazy(() => import("../pages/matchDetail")));

const WalletRoutes = {
  path: "/wallet/walletSettings",
  element: <MainLayout />,
  children: [
    {
      path: "deposit",
      element: <ListOfClients />,
    },
    {
      path: "withdraw",
      element: <Inplay />,
    },
    {
      path: "credit_reference",
      element: <MatchDetail />,
    },
  ],
};
export default WalletRoutes;
