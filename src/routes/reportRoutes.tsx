import { lazy } from "react";
import Loadable from "../utils/loadable";
import { Navigate } from "react-router-dom";

const MainLayout = Loadable(lazy(() => import("../layout/main")));
const ProfitLossReport = Loadable(
  lazy(() => import("../pages/reports/ProfitLoss"))
);
const AccountStatement = Loadable(
  lazy(() => import("../pages/reports/AccountStatement"))
);
const CurrentBets = Loadable(
  lazy(() => import("../pages/reports/CurrentBets"))
);
const GeneralReport = Loadable(
  lazy(() => import("../pages/reports/GeneralReport"))
);

const ReportRoutes = {
  path: "/wallet/reports",
  element: <MainLayout />,
  children: [
    {
      path: "profit_loss",
      element: <ProfitLossReport />,
    },
    {
      path: "account_statement",
      element: <AccountStatement />,
    },
    {
      path: "current_bet",
      element: <CurrentBets />,
    },
    {
      path: "general_report",
      element: <GeneralReport />,
    },
    {
      path: "*",
      element: <Navigate to={"/expert/match"} replace />,
    },
  ],
};

export default ReportRoutes;
