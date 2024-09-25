import {
  AmarAkbarAnthony,
  AndarBahar2,
  Baccarat,
  BallByBall,
  BollywoodCasino,
  CasinoMeter,
  CasinoQueen,
  CasinoWar,
  Cricket,
  CriketMatch2020,
  DragonTiger20,
  Five5,
  Football,
  GreyHound,
  HorseRacing,
  InstantWorli,
  Lucky7A,
  Poker,
  Race2020,
  SuperOver,
  TeenPatti1Day,
  Teenpatti20,
  Tennis,
  Thirty2CardsA,
  WorliMatka,
} from "../../assets";

export const ApiConstants = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    OLD_PASSWORD: "/user/check/oldPassword",
  },
  USER: {
    BALANCEUPDATE: "/balance/update",
    CHANGEPASSWORD: "/user/changePassword",
    LIST: "/user/list",
    BALANCE: "/user/balance",
    COMMISSION_SETTLEMENT: "/balance/settle/commission",
    EXPERTLIST: "/expert/list",
    ADDFGADMIN: "/user/add",
    ALREADY_EXIST: "/user/exist",
    ALREADY_SEARCHLIST: "/user/searchlist",
    ADDURLADMIN: "/superadmin/add",
    UPDATEURLADMIN: "/superadmin/updateUser",
    ADDEXPERT: "/expert/add",
    UPDATEEXPERT: "/expert/update",
    UPDATE: "/user/updateUser",
    PROFILE: "/user/profile",
    MARQUEE: "/expert/notification",
    LOCKUNLOCK: "/user/lockUnlockUser",
    CREDITREFERRENCE: "/user/update/creditreferrence",
    EXPOSURELIMIT: "/user/update/exposurelimit",
    CHILD_PROFIT_LOSS: "",
    COMMISSION_MATCH: "/user/commissionMatch",
    COMMISSION_BET_PLACED: "/user/commissionBetPlaced",
    RUN_AMOUNT: "bet/session/profitLoss",
    TOTAL_BALANCE: "user/child/totalBalance",
    DELETE: "user/delete",
    USER_MATCH_LOCK: "/match/lock",
    USER_MATCH_LOCK_ALL_CHILD: "/user/getMatchLockAllChild",
    USER_DETAIL_FOR_PARENT: "/user/getUserDetailsForParent",
    USER_CHECK_CHILD_DEACTIVATE: "/user/checkChildDeactivate",
    USER_CHECK_CHILD_ACTIVATE: "match/check/lock",
    CHANGE_DELETE_REASON: "/bet/change/deleteReason",
  },
  SUPERADMIN: {
    ADD: "/superadmin/add",
    UPDATE_USER: "/superadmin/updateUser",
    CHANGE_PASSWORD: "/superadmin/changePassword",
    LOCK_UNLOCK_USER: "/superadmin/lockUnlockUser",
    EXPOSURE_LIMIT: "/superadmin/update/exposurelimit",
    CREDIT_REFERRENCE: "/superadmin/update/creditreferrence",
    UPDATE_BALANCE: "/superadmin/update/balance",
    USER_PROFIT_LOSS: "/superadmin/user/profitLossData",
  },
  WALLET: {
    BALANCEUPDATE: "wallet/update/balance",
    CREDITREFERRENCE: "wallet/update/creditreference",
    EXPOSURELIMIT: "wallet/update/exposurelimit",
    LOCKUNLOCK: "/user/lockUnlockUser",
    CHANGEPASSWORD: "/user/changePassword",
    REPORTS: {
      GETACCOUNTSTATEMENT: "/transaction/get",
      CURRENT_BETS: "/superadmin/bets",
    },
  },
  EXPERT: {
    CHANGE_PASSWORD: "/expert/password",
    LOCK_UNLOCK: "/expert/lockUnlockExpert",
    COMPETITIONLIST: "/expert/match/competitionList/",
    COMPETITIONDATES: "/expert/match/competition/dates/",
    COMPETITIONMATCHES: "/expert/match/competition/getMatch/",
  },
  INPLAY: {
    MATCHLIST: "match/list",
  },
  MATCH: {
    GET: "match",
    GET_OTHER: "match/other",
    BETDELETE: "/bet/deleteMultipleBet",
    BETDELETEOTHER: "/bet/deleteMultipleBetForOther",
    BETDELETERACE: "/bet/deleteMultipleBetForRace",
    GET_BETS: "/superadmin/bets",
    TOTAL_PROFIT_LOSS: "/user/total/profitLoss",
    DOMAIN_PROFIT_LOSS: "/user/total/domain/profitLoss",
    BET_PROFIT_LOSS: "/user/total/bet/profitLoss",
    TOTAL_PROFIT_LOSS_CARD: "/user/card/total/profitLoss",
    DOMAIN_PROFIT_LOSS_CARD: "/user/card/total/domain/profitLoss",
    BET_PROFIT_LOSS_CARD: "/user/card/total/bet/profitLoss",
    SESSION_PROFIT_LOSS: "/user/total/session/profitLoss",
  },
  HORSERACING: {
    MATCH: {
      GET_COUNTRY_WISE_LIST: "/match/countryWiseList",
      GET_RACING_LIST: "/match/racing/list",
      DELETE_BET: "/bet/deleteMultipleBetForRace",
      GET_MATCH_DETAIL: "/match/racing",
      GET_USER_PROFIT_LOSS: "/superAdmin/user/profitLossData/race",
      GET_RATE_MARKETANALYSIS: "/match/race/marketAnalysis",
    },
  },
};

export const Constants = {
  wallet: "wallet",
  oldAdmin: "old/admin",
  pageLimit: 15,
  AuthPaths: {
    root: "/",
    login: "/wallet/login",
    changePassword: "/wallet/change_password",
  },
  MainPaths: {
    root: "/wallet",
    listOfClients: "list_of_clients",
    match: "match",
    liveMarket: "live_market",
    liveMarketMatches: "live_market/matches",
    addAccount: "add_account",
    editAccount: "edit_account",
    marketAnalysis: "market_analysis",
    marketAnalysis2: "market_analysis2/:raceType",
    marketAnalysisMatches: "market_analysis/matches",
    multipleMatch: "market_analysis/multiple_Match",
    multipleMatch2: "market_analysis2/multiple_Match",
    reports: "reports",
    walletSettings: "walletSettings",
    myAccount: "my-account",
    changePassword: "change-password",
    matchList: "matchList/:type",
    matchListMatches: "matchList/:type/:id",
    horseRacing: "race_list/:matchType",
    horseRacingDetail: "race_list/:matchType/:id",
  },
  WalletSettingsPaths: {
    root: "/wallet/walletSettings",
    deposit: "deposit",
    withdraw: "withdraw",
    creditReference: "credit_reference",
  },
  ReportsPaths: {
    root: "/wallet/reports",
    profitLoss: "/wallet/reports/profit_loss",
    profitLossCards: "/wallet/reports/profit_loss_cards",
    accountStatement: "/wallet/reports/account_statement",
    currentBet: "/wallet/reports/current_bet",
    generalReport: "/wallet/reports/general_report",
  },
  pageCount: 10,
  listOfClientCountLimit: 15,

  // customPageLimit: 10,
  // customTimeOut: 300000,// 5 mint in mili seconds user ideal 5 mint after that logout
  // customTimer: 30000,// 30 sec in mili seconds remainint timer start and show message  Your session will expire in 30 second
  // sessionExpireTime: 30 // 30 sec,

  customPageLimit: 15,
  customTimeOut: 1000 * 60 * 60, // 5 mint in mili seconds user ideal 5 mint after that logout
  customTimer: 1000 * 60 * 5, // 30 sec in mili seconds remainint timer start and show message  Your session will expire in 30 second
  sessionExpireTime: 60 * 5, // 30 sec
  apiBasePath: "https://devwalletapi.fairgame.club",
  thirdParty: "https://devserviceapi.fairgame.club",
  expertPath: "https://devexpertapi.fairgame.club",
  apiBasePathLive: "https://walletapi.fairgame7.com",
  thirdPartyLive: "https://serviceapi.fairgame7.com",
  expertPathLive: "https://expertapi.fairgame7.com",
  localPath: "http://localhost:5050",
  localPathThird: "http://localhost:3200",
  localPathExpert: "http://localhost:6060",
  WEBSOCKET: "websocket",
  POLLING: "polling",
  PRODUCTION: "production",
};

export const matchBettingType = {
  matchOdd: "matchOdd",
  bookmaker: "bookmaker",
  bookmaker2: "bookmaker2",
  quickbookmaker1: "quickbookmaker1",
  quickbookmaker2: "quickbookmaker2",
  quickbookmaker3: "quickbookmaker3",
  tiedMatch1: "tiedMatch1",
  tiedMatch2: "tiedMatch2",
  tiedMatch3: "tiedMatch3",
  completeMatch: "completeMatch",
  completeMatch1: "completeMatch1",
  completeManual: "completeManual",
  setWinner1: "setWinner1",
  setWinner2: "setWinner2",
  other: "other",
  ...Array.from({ length: 20 }, (_, index: any) => index).reduce(
    (prev, curr) => {
      prev[`overUnder${curr}.5`] = `overUnder${curr}.5`;
      return prev;
    },
    {}
  ),
  ...Array.from({ length: 20 }, (_, index: any) => index).reduce(
    (prev, curr) => {
      prev[`firstHalfGoal${curr}.5`] = `firstHalfGoal${curr}.5`;
      return prev;
    },
    {}
  ),
  halfTime: "halfTime",
};

export const gameConstants = {
  cricket: "cricket",
  football: "football",
  tennis: "tennis",
  horseRacing: "horseRacing",
  greyHound: "greyHound",
};

export const cardGamesTypeConstants: any = {
  dragonTiger20: "dt20",
  andarBahar2: "abj",
  teen20: "teen20",
  card32: "card32",
  lucky7: "lucky7",
  dt202: "dt202",
  dtl20: "dtl20",
  dt6: "dt6",
  lucky7eu: "lucky7eu",
  teen: "teen",
  teen9: "teen9",
  teen8: "teen8",
  poker: "poker",
  poker20: "poker20",
  poker6: "poker6",
  baccarat: "baccarat",
  baccarat2: "baccarat2",
  card32B: "card32eu",
  ab20: "ab20",
  "3cardj": "3cardj",
  war: "war",
  worli2: "worli2",
  superover: "superover",
  cmatch20: "cmatch20",
  aaa: "aaa",
  btable: "btable",
  race20: "race20",
  cricketv3: "cricketv3",
  ballbyball: "ballbyball",
  cmeter: "cmeter",
  queen: "queen",
  worli: "worli",
};

export const gameIconConstants = {
  [gameConstants.cricket]: Cricket,
  [gameConstants.football]: Football,
  [gameConstants.tennis]: Tennis,
  [gameConstants.horseRacing]: HorseRacing,
  [gameConstants.greyHound]: GreyHound,
  [cardGamesTypeConstants.dragonTiger20]: DragonTiger20,
  [cardGamesTypeConstants.dt202]: DragonTiger20,
  [cardGamesTypeConstants.dtl20]: DragonTiger20,
  [cardGamesTypeConstants.dt6]: DragonTiger20,
  [cardGamesTypeConstants.andarBahar2]: AndarBahar2,
  [cardGamesTypeConstants.teen20]: Teenpatti20,
  [cardGamesTypeConstants.card32]: Thirty2CardsA,
  [cardGamesTypeConstants.lucky7]: Lucky7A,
  [cardGamesTypeConstants.lucky7eu]: Lucky7A,
  [cardGamesTypeConstants.teen]: TeenPatti1Day,
  [cardGamesTypeConstants.ab20]: AndarBahar2,
  [cardGamesTypeConstants.teen8]: Teenpatti20,
  [cardGamesTypeConstants.superover]: SuperOver,
  [cardGamesTypeConstants.race20]: Race2020,
  [cardGamesTypeConstants.cricketv3]: Five5,
  [cardGamesTypeConstants.card32B]: Thirty2CardsA,
  [cardGamesTypeConstants.war]: CasinoWar,
  [cardGamesTypeConstants.poker]: Poker,
  [cardGamesTypeConstants.poker6]: Poker,
  [cardGamesTypeConstants.poker20]: Poker,
  [cardGamesTypeConstants.teen9]: Teenpatti20,
  [cardGamesTypeConstants.cmatch20]: CriketMatch2020,
  [cardGamesTypeConstants.aaa]: AmarAkbarAnthony,
  [cardGamesTypeConstants.btable]: BollywoodCasino,
  [cardGamesTypeConstants.worli2]: InstantWorli,
  [cardGamesTypeConstants["3cardj"]]: Race2020,
  [cardGamesTypeConstants.baccarat]: Baccarat,
  [cardGamesTypeConstants.baccarat2]: Baccarat,
  [cardGamesTypeConstants.ballbyball]: BallByBall,
  [cardGamesTypeConstants.cmeter]: CasinoMeter,
  [cardGamesTypeConstants.queen]: CasinoQueen,
  [cardGamesTypeConstants.worli]: WorliMatka,
};

export const sessionBettingType = {
  session: "session",
  fancy1: "fancy1",
  overByOver: "overByover",
  ballByBall: "ballByBall",
  oddEven: "oddEven",
  cricketCasino: "cricketCasino",
};

export const profitLossDataForMatchConstants = {
  [matchBettingType.matchOdd]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.bookmaker]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.bookmaker2]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.quickbookmaker1]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.quickbookmaker2]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.quickbookmaker3]: {
    A: "teamARate",
    B: "teamBRate",
    C: "teamCRate",
  },
  [matchBettingType.tiedMatch1]: {
    A: "yesRateTie",
    B: "noRateTie",
  },
  [matchBettingType.tiedMatch2]: {
    A: "yesRateTie",
    B: "noRateTie",
  },
  [matchBettingType.tiedMatch3]: {
    A: "yesRateTie",
    B: "noRateTie",
  },
  [matchBettingType.completeMatch]: {
    A: "yesRateComplete",
    B: "noRateComplete",
  },
  [matchBettingType.completeMatch1]: {
    A: "yesRateComplete",
    B: "noRateComplete",
  },
  [matchBettingType.completeManual]: {
    A: "yesRateComplete",
    B: "noRateComplete",
  },
  [matchBettingType.other]: {
    A: "userTeamARateOther",
    B: "userTeamBRateOther",
    C: "userTeamCRateOther",
  },
  ...Array.from({ length: 20 }, (_, index) => index).reduce(
    (prev: any, curr) => {
      prev[`overUnder${curr}.5`] = {
        A: `yesRateUnderOver${curr}.5`,
        B: `noRateUnderOver${curr}.5`,
      };
      return prev;
    },
    {}
  ),
  ...Array.from({ length: 20 }, (_, index) => index).reduce(
    (prev: any, curr) => {
      prev[`firstHalfGoal${curr}.5`] = {
        A: `yesRateFirstHalfGoal${curr}.5`,
        B: `noRateFirstHalfGoal${curr}.5`,
      };
      return prev;
    },
    {}
  ),
  [matchBettingType.halfTime]: {
    A: "userTeamARateHalfTime",
    B: "userTeamBRateHalfTime",
    C: "userTeamCRateHalfTime",
  },

  ...Array.from({ length: 20 }, (_, index) => index).reduce(
    (prev: any, curr) => {
      prev[`setWinner${curr}`] = {
        A: `userTeamARateSetWinner${curr}`,
        B: `userTeamBRateSetWinner${curr}`,
        C: `userTeamCRateSetWinner${curr}`,
      };
      return prev;
    },
    {}
  ),
};

// use below baseUrl for testing build

// export const serviceUrl =
//   process.env.NODE_ENV === Constants.PRODUCTION
//     ? Constants.apiBasePath
//     : Constants.localPath;

// export const baseUrls = {
//   socket:
//     process.env.NODE_ENV === Constants.PRODUCTION
//       ? Constants.apiBasePath
//       : Constants.localPath,
//   thirdParty:
//     process.env.NODE_ENV === Constants.PRODUCTION
//       ? Constants.thirdParty
//       : Constants.localPathThird,
//   expertSocket:
//     process.env.NODE_ENV === Constants.PRODUCTION
//       ? Constants.expertPath
//       : Constants.localPathExpert,
// };

// use below baseUrl for live build

export const serviceUrl =
  process.env.NODE_ENV === Constants.PRODUCTION
    ? Constants.apiBasePathLive
    : Constants.localPath;

export const baseUrls = {
  socket:
    process.env.NODE_ENV === Constants.PRODUCTION
      ? Constants.apiBasePathLive
      : Constants.localPath,
  thirdParty:
    process.env.NODE_ENV === Constants.PRODUCTION
      ? Constants.thirdPartyLive
      : Constants.localPathThird,
  expertSocket:
    process.env.NODE_ENV === Constants.PRODUCTION
      ? Constants.expertPathLive
      : Constants.localPathExpert,
};
