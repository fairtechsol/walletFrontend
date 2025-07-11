import { socket, thirdParty } from ".";
export const matchSocketService = {
  joinMatchRoom: (matchId: any) => {
    socket?.emit("matchRoom", {
      id: matchId,
    });
  },
  leaveAllRooms: () => {
    socket?.emit("leaveAll");
  },
  leaveMatchRoom: (matchId: any) => {
    thirdParty?.emit("disconnectCricketData", {
      matchId: matchId,
    });
  },
  getMatchRates: (matchId: any, callback: any) => {
    thirdParty?.on(`liveData${matchId}`, callback);
  },
  matchResultDeclared: (callback: any) => {
    socket?.on("matchResult", callback);
  },
  matchResultUnDeclared: (callback: any) => {
    socket?.on("matchResultUnDeclare", callback);
  },
  declaredMatchResultAllUser: (callback: any) => {
    socket?.on("matchResultDeclareAllUser", callback);
  },
  unDeclaredMatchResultAllUser: (callback: any) => {
    socket?.on("matchResultUnDeclareAllUser", callback);
  },
  matchDeleteBet: (callback: any) => {
    socket?.on("matchDeleteBet", callback);
  },
  sessionDeleteBet: (callback: any) => {
    socket?.on("sessionDeleteBet", callback);
  },
  matchAdded: (callback: any) => {
    socket?.on("addMatch", callback);
  },
  updateUserBalance: (callback: any) => {
    socket?.on("updateUserBalance", callback);
  },
  userBalanceUpdate: (callback: any) => {
    socket?.on("userBalanceUpdate", callback);
  },
  userSessionBetPlaced: (callback: any) => {
    socket?.on("userSessionBetPlaced", callback);
  },
  userMatchBetPlaced: (callback: any) => {
    socket?.on("userMatchBetPlaced", callback);
  },
  sessionResult: (callback: any) => {
    socket?.on("sessionResult", callback);
  },
  sessionResultUnDeclare: (callback: any) => {
    socket?.on("sessionResultUnDeclare", callback);
  },
  updateDeleteReason: (callback: any) => {
    socket?.on("updateDeleteReason", callback);
  },
  sessionResultUnDeclareOff: () => {
    socket?.off("sessionResultUnDeclare");
  },
  sessionResultOff: () => {
    socket?.off("sessionResult");
  },
  userSessionBetPlacedOff: () => {
    socket?.off("userSessionBetPlaced");
  },
  userMatchBetPlacedOff: () => {
    socket?.off("userMatchBetPlaced");
  },
  matchResultDeclaredOff: () => {
    socket?.off("matchResult");
  },
  matchResultUnDeclaredOff: () => {
    socket?.off("matchResultUnDeclare");
  },
  declaredMatchResultAllUserOff: () => {
    socket?.off("matchResultDeclareAllUser");
  },
  unDeclaredMatchResultAllUserOff: () => {
    socket?.off("matchResultUnDeclareAllUser");
  },
  matchDeleteBetOff: () => {
    socket?.off("matchDeleteBet");
  },
  sessionDeleteBetOff: () => {
    socket?.off("sessionDeleteBet");
  },
  updateUserBalanceOff: () => {
    socket?.off("updateUserBalance");
  },
  matchAddedOff: () => {
    socket?.off("addMatch");
  },
  getMatchRatesOff: (matchId: any) => {
    thirdParty?.off(`liveData${matchId}`);
  },
  updateDeleteReasonOff: () => {
    socket?.off("updateDeleteReason");
  },
};
