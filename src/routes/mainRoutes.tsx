import Loadable from "../utils/loadable";
import MultipleMatch from "../pages/analysis/multipleMatch";
import { Navigate } from "react-router-dom";
import { Constants } from "../utils/Constants";

import MainLayout from "../layout/main";
// import ListOfClients from "../pages/listOfClients";
// import LockMatchScreen from "../pages/lockMatchDetail";
// import Inplay from "../pages/inplay";
// import MatchDetail from "../pages/matchDetail";
// import AddAccount from "../pages/addAccount";
// import EditAccount from "../pages/editAccount";
// import Analysis from "../pages/analysis";
// import Reports from "../pages/reports";
// import WalletSettings from "../pages/walletSettings";
// import MyAccount from "../pages/myAccount";
// import ChangePassword from "../pages/changePassword";
// import ProfitLossReport from "../pages/reports/ProfitLoss";
// import CurrentBets from "../pages/reports/CurrentBets";
// import AccountStatement from "../pages/reports/AccountStatement";
// import GeneralReport from "../pages/reports/GeneralReport";

// const ListOfClients = Loadable(() => import("../pages/listOfClients"));
// const ChangePassword = Loadable(() => import("../pages/changePassword"));
// const MyAccount = Loadable(() => import("../pages/myAccount"));
// const Inplay = Loadable(() => import("../pages/inplay"));
// const AddAccount = Loadable(() => import("../pages/addAccount"));
// const EditAccount = Loadable(() => import("../pages/editAccount"));
// const Analysis = Loadable(() => import("../pages/analysis"));
// const Reports = Loadable(() => import("../pages/reports"));
// const MatchDetail = Loadable(() => import("../pages/matchDetail"));
// const LockMatchScreen = Loadable(() => import("../pages/lockMatchDetail"));
// const WalletSettings = Loadable(() => import("../pages/walletSettings"));
// const ProfitLossReport = Loadable(() => import("../pages/reports/ProfitLoss"));
// const AccountStatement = Loadable(
//   () => import("../pages/reports/AccountStatement")
// );
// const CurrentBets = Loadable(() => import("../pages/reports/CurrentBets"));
// const GeneralReport = Loadable(() => import("../pages/reports/GeneralReport"));

const ListOfClients = Loadable(() => import("../pages/listOfClients"));
const ChangePassword = Loadable(() => import("../pages/changePassword"));
const MyAccount = Loadable(() => import("../pages/myAccount"));
const Inplay = Loadable(() => import("../pages/inplay"));
const AddAccount = Loadable(() => import("../pages/addAccount"));
const EditAccount = Loadable(() => import("../pages/editAccount"));
const Analysis = Loadable(() => import("../pages/analysis"));
const Reports = Loadable(() => import("../pages/reports"));
const MatchDetail = Loadable(() => import("../pages/matchDetail"));
const LockMatchScreen = Loadable(() => import("../pages/lockMatchDetail"));
const WalletSettings = Loadable(() => import("../pages/walletSettings"));
const ProfitLossReport = Loadable(() => import("../pages/reports/ProfitLoss"));
const AccountStatement = Loadable(
  () => import("../pages/reports/AccountStatement")
);
const CurrentBets = Loadable(() => import("../pages/reports/CurrentBets"));
const GeneralReport = Loadable(() => import("../pages/reports/GeneralReport"));
const MatchList = Loadable(() => import("../pages/matchList"));
const OtherMatchDetail = Loadable(() => import("../pages/otherMatchDetail"));

const MainRoutes = {
  path: Constants.MainPaths.root,
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={Constants.MainPaths.listOfClients} replace />,
    },
    {
      path: Constants.MainPaths.listOfClients,
      element: <ListOfClients />,
    },
    {
      path: Constants.MainPaths.match,
      element: <LockMatchScreen />,
    },
    {
      path: Constants.MainPaths.matchList,
      element: <MatchList />,
    },
    {
      path: Constants.MainPaths.liveMarket,
      element: <Inplay />,
    },
    {
      path: Constants.MainPaths.liveMarketMatches,
      element: <MatchDetail />,
    },
    {
      path: Constants.MainPaths.matchListMatches,
      element: <OtherMatchDetail />,
    },
    {
      path: Constants.MainPaths.addAccount,
      element: <AddAccount />,
    },
    {
      path: Constants.MainPaths.editAccount,
      element: <EditAccount />,
    },
    {
      path: Constants.MainPaths.marketAnalysis,
      element: <Analysis />,
    },
    {
      path: Constants.MainPaths.marketAnalysisMatches,
      element: <MatchDetail />,
    },
    {
      path: Constants.MainPaths.multipleMatch,
      element: <MultipleMatch />,
    },
    {
      path: Constants.MainPaths.reports,
      element: <Reports />,
    },
    {
      path: Constants.MainPaths.walletSettings,
      element: <WalletSettings />,
    },
    {
      path: Constants.MainPaths.myAccount,
      element: <MyAccount />,
    },
    {
      path: Constants.MainPaths.changePassword,
      element: <ChangePassword />,
    },
    {
      path: Constants.ReportsPaths.profitLoss,
      element: <ProfitLossReport />,
    },
    {
      path: Constants.ReportsPaths.accountStatement,
      element: <AccountStatement />,
    },
    {
      path: Constants.ReportsPaths.currentBet,
      element: <CurrentBets />,
    },
    {
      path: Constants.ReportsPaths.generalReport,
      element: <GeneralReport />,
    },
    {
      path: "*",
      element: <Navigate to={"/wallet/list_of_clients"} replace />,
    },
  ],
};
export default MainRoutes;
