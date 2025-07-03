import { Navigate } from "react-router-dom";
import MainLayout from "../layout/main";
import AddAccount from "../pages/addAccount";
import Analysis from "../pages/analysis";
import MultipleMatch from "../pages/analysis/multipleMatch";
import Analysis2 from "../pages/analysis2";
import MultipleMatchHorseRacing from "../pages/analysis2/multipleMatch";
import ChangePassword from "../pages/changePassword";
import EditAccount from "../pages/editAccount";
import RacingDetails from "../pages/horseRacing/racingDetails";
import RacingList from "../pages/horseRacing/racingList";
import Inplay from "../pages/inplay";
import ListOfClients from "../pages/listOfClients";
import LockMatchScreen from "../pages/lockMatchDetail";
import MatchDetail from "../pages/matchDetail";
import MatchList from "../pages/matchList";
import MyAccount from "../pages/myAccount";
import Reports from "../pages/reports";
import AccountStatement from "../pages/reports/AccountStatement";
import CurrentBets from "../pages/reports/CurrentBets";
import ProfitLossReport from "../pages/reports/ProfitLoss";
import ProfitLossReportCards from "../pages/reports/ProfitLossCards";
import WalletSettings from "../pages/walletSettings";
import { Constants } from "../utils/Constants";

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
      element: <MatchDetail />,
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
      path: Constants.MainPaths.marketAnalysis2,
      element: <Analysis2 />,
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
      path: Constants.MainPaths.multipleMatch2,
      element: <MultipleMatchHorseRacing />,
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
      path: Constants.ReportsPaths.profitLossCards,
      element: <ProfitLossReportCards />,
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
      path: Constants.MainPaths.horseRacing,
      element: <RacingList />,
    },
    {
      path: Constants.MainPaths.horseRacingDetail,
      element: <RacingDetails />,
    },
    {
      path: "*",
      element: <Navigate to={"/wallet/list_of_clients"} replace />,
    },
  ],
};
export default MainRoutes;
