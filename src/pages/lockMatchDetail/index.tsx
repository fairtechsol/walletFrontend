import { Box, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FullAllBets from "../../components/matchDetail/Common/FullAllBets";
import SessionMarket from "../../components/matchDetail/SessionMarket";
import { matchService, socket, socketService } from "../../socketManager";
import {
  getUserOfLock,
  updateUserMatchLock,
} from "../../store/actions/match/marketLockUnlockAction";
import {
  getMatchDetail,
  getPlacedBets,
  getUserProfitLoss,
  removeRunAmount,
  resetSessionProLoss,
  updateBetDataOnDeclare,
  updateBetsPlaced,
  updateMatchRates,
  updateMaxLossForBet,
  updateMaxLossForBetOnUndeclare,
  updateMaxLossForDeleteBet,
  updatePlacedbets,
  updateProfitLoss,
  updateTeamRates,
  updateTeamRatesOnDelete,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
const LockMatchScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  const { userSessionLock, userMatchLock } = useSelector(
    (state: RootState) => state.match.lockUnlock
  );

  const { success, matchDetail } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { placedBets } = useSelector((state: RootState) => state.match.bets);
  const [mode, setMode] = useState<any>(false);
  const [_, setIsManualLock] = useState<any>(false);
  const [isQuickSessionLock, setIsQuickSessionLock] = useState<any>(false);
  const [isSessionLock, setIsSessionLock] = useState<any>(false);

  useEffect(() => {
    if (state) {
      matchService.connect([state?.matchId], profileDetail?.roleName);
    }
    return () => {
      matchService.disconnect();
    };
  }, [state]);

  const handleBlock = async (value: any, status: any, typeOfBet: any) => {
    try {
      let payload = {
        matchId: state?.matchId,
        transactionPassword: value,
        type: typeOfBet === "SESSION" ? "session" : "match",
        block: status,
      };
      let rolename = profileDetail?.roleName;
      dispatch(updateUserMatchLock({ payload: payload, role: rolename }));
      handleHide();
    } catch (e: any) {
      console.error(e);
    }
  };
  const handleShowLock = async (_: any, type: any) => {
    if (type === "Match Odds") {
    } else {
      setIsSessionLock(true);
    }
  };
  const handleHide = async () => {
    setIsManualLock(false);
    setIsSessionLock(false);
    setIsQuickSessionLock(false);
  };

  const updateMatchDetailToRedux = (event: any) => {
    try {
      if (state?.matchId === event?.id) {
        dispatch(updateMatchRates(event));
      } else return;
    } catch (e) {
      console.log(e);
    }
  };

  const matchResultDeclared = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        if (location.pathname.includes("market_analysis")) {
          navigate(`/wallet/market_analysis`);
        } else {
          navigate(`/wallet/live_market`);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const matchDeleteBet = (event: any) => {
    try {
      setMode(false);
      if (event?.matchId === state?.matchId) {
        dispatch(updatePlacedbets(event));
        dispatch(updateTeamRatesOnDelete(event));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleSessionDeleteBet = (event: any) => {
    try {
      setMode(false);
      if (event?.matchId === state?.matchId) {
        dispatch(updatePlacedbets(event));
        dispatch(updateMaxLossForDeleteBet(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setSessionBetsPlaced = (event: any) => {
    try {
      if (event?.jobData?.placedBet?.matchId === state?.matchId) {
        dispatch(
          updateBetsPlaced({
            newBet: {
              ...event?.jobData?.placedBet,
              domain: event?.jobData?.domainUrl,
            },
            userName: event?.jobData?.betPlaceObject?.betPlacedData?.userName,
            myStake: event?.jobData?.betPlaceObject?.myStack,
          })
        );
        dispatch(updateProfitLoss(event));
        dispatch(updateMaxLossForBet(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setMatchBetsPlaced = (event: any) => {
    try {
      if (event?.jobData?.newBet?.matchId === state?.matchId) {
        dispatch(
          updateBetsPlaced({
            newBet: {
              ...event?.jobData?.newBet,
              userId: event?.jobData?.userId,
              domain: event?.jobData?.domainUrl,
            },
            userName: event?.jobData?.userName,
            myStake: event?.jobData?.myStake,
          })
        );
        // dispatch(updateBalance(event?.jobData));
        dispatch(updateTeamRates(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSessionResultDeclare = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        dispatch(
          updateBetDataOnDeclare({
            betId: event?.betId,
            matchId: event?.matchId,
          })
        );
        dispatch(removeRunAmount(event));
        // dispatch(getPlacedBets(`eq${state?.matchId}`));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSessionResultUnDeclare = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        dispatch(updateMaxLossForBetOnUndeclare(event));
        dispatch(getPlacedBets(`matchId=eq${state?.matchId}`));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
      if (state?.matchId && profileDetail?.roleName) {
        dispatch(
          getMatchDetail({
            matchId: state?.matchId,
          })
        );
        dispatch(getUserProfitLoss(state?.matchId));
        dispatch(resetSessionProLoss());
        dispatch(getPlacedBets(`matchId=eq${state?.matchId}`));
      }
    } catch (e) {
      console.log(e);
    }
  }, [state?.matchId, profileDetail?.roleName]);

  useEffect(() => {
    try {
      if (success && profileDetail?.roleName && socket) {
        socketService.match.getMatchRatesOff(state?.matchId);
        socketService.match.userSessionBetPlacedOff();
        socketService.match.userMatchBetPlacedOff();
        socketService.match.matchResultDeclaredOff();
        socketService.match.declaredMatchResultAllUserOff();
        socketService.match.matchDeleteBetOff();
        socketService.match.sessionDeleteBetOff();
        socketService.match.sessionResultOff();
        socketService.match.sessionResultUnDeclareOff();
        socketService.match.joinMatchRoom(state?.matchId);
        socketService.match.getMatchRates(
          state?.matchId,
          updateMatchDetailToRedux
        );
        socketService.match.userSessionBetPlaced(setSessionBetsPlaced);
        socketService.match.userMatchBetPlaced(setMatchBetsPlaced);
        socketService.match.matchResultDeclared(matchResultDeclared);
        socketService.match.declaredMatchResultAllUser(matchResultDeclared);
        socketService.match.matchDeleteBet(matchDeleteBet);
        socketService.match.sessionDeleteBet(handleSessionDeleteBet);
        socketService.match.sessionResult(handleSessionResultDeclare);
        socketService.match.sessionResultUnDeclare(
          handleSessionResultUnDeclare
        );
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, profileDetail?.roleName, socket]);

  useEffect(() => {
    return () => {
      socketService.match.leaveMatchRoom(state?.matchId);
      socketService.match.getMatchRatesOff(state?.matchId);
      socketService.match.userSessionBetPlacedOff();
      socketService.match.userMatchBetPlacedOff();
      socketService.match.matchResultDeclaredOff();
      socketService.match.declaredMatchResultAllUserOff();
      socketService.match.matchDeleteBetOff();
      socketService.match.sessionDeleteBetOff();
      socketService.match.sessionResultOff();
      socketService.match.sessionResultUnDeclareOff();
    };
  }, [state?.matchId]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (state?.matchId) {
          dispatch(
            getMatchDetail({
              matchId: state?.matchId,
            })
          );
          dispatch(getUserProfitLoss(state?.matchId));
          dispatch(getPlacedBets(`matchId=eq${state?.matchId}`));
        }
      } else if (document.visibilityState === "hidden") {
        socketService.match.getMatchRatesOff(state?.matchId);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    dispatch(getUserOfLock(state?.matchId));
  }, []);

  useEffect(() => {}, [userMatchLock, userSessionLock]);

  return (
    <>
      <Box sx={{ paddingLeft: "0.7% " }}>
        <Typography
          sx={{
            fontSize: "16px",
            color: "white",
            fontWeight: "700",
            paddingTop: "2%",
            alignSelf: "start",
          }}
        >
          {matchDetail?.teamA} V/S {matchDetail?.teamB}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", lg: "row" },
          flex: 1,
          height: "100%",
          marginX: "0.5%",
        }}
      >
        <Box
          sx={{
            flex: 1,
            flexDirection: "column",
            minHeight: "100px",
            display: "flex",
          }}
        >
          {matchDetail?.manualSessionActive && (
            <SessionMarket
              allBetsData={
                matchDetail?.profitLossDataSession
                  ? Array.from(
                      matchDetail?.profitLossDataSession?.reduce(
                        (acc: any, obj: any) =>
                          acc.has(obj.betId) ? acc : acc.add(obj.betId) && acc,
                        new Set()
                      ),
                      (id) =>
                        matchDetail?.profitLossDataSession?.find(
                          (obj: any) => obj.betId === id
                        )
                    )
                  : []
              }
              title="Quick Session Market"
              currentMatch={matchDetail}
              sessionData={matchDetail?.sessionBettings?.filter(
                (item: any) => !JSON.parse(item).selectionId
              )}
              min={matchDetail?.betFairSessionMinBet || 0}
              blockMatch={false}
              locked={
                profileDetail?.roleName === "fairGameAdmin"
                  ? userSessionLock?.parentBlock
                    ? true
                    : false
                  : userSessionLock?.selfBlock
              }
              selft={true}
              handleBlock={handleBlock}
              handleHide={handleHide}
              handleShowLock={handleShowLock}
              showUnlock={isQuickSessionLock}
            />
          )}
          {matchDetail?.apiSessionActive && (
            <SessionMarket
              allBetsData={
                matchDetail?.profitLossDataSession
                  ? Array.from(
                      matchDetail?.profitLossDataSession?.reduce(
                        (acc: any, obj: any) =>
                          acc.has(obj.betId) ? acc : acc.add(obj.betId) && acc,
                        new Set()
                      ),
                      (id) =>
                        matchDetail?.profitLossDataSession?.find(
                          (obj: any) => obj.betId === id
                        )
                    )
                  : []
              }
              title="Session Market"
              currentMatch={matchDetail}
              sessionData={matchDetail?.apiSession}
              min={Math.floor(matchDetail?.betFairSessionMinBet)}
              blockMatch={true}
              locked={
                profileDetail?.roleName === "fairGameAdmin"
                  ? userSessionLock?.parentBlock
                    ? true
                    : false
                  : userSessionLock?.selfBlock
              }
              selft={
                profileDetail?.roleName === "fairGameAdmin"
                  ? userSessionLock?.parentBlock
                    ? false
                    : true
                  : true
              }
              handleBlock={handleBlock}
              handleHide={handleHide}
              handleShowLock={handleShowLock}
              showUnlock={isSessionLock}
            />
          )}
        </Box>
        <Box sx={{ width: "20px" }} />
        <Box
          sx={{
            flex: 1,
            flexDirection: "column",
            display: "flex",
            minHeight: "100px",
          }}
        >
          <FullAllBets
            IObets={
              placedBets.length > 0
                ? Array.from(
                    placedBets.reduce(
                      (acc: any, obj: any) =>
                        acc.has(obj.id) ? acc : acc.add(obj.id) && acc,
                      new Set()
                    ),
                    (id) => placedBets.find((obj: any) => obj.id === id)
                  )
                : []
            }
            mode={mode}
            tag={false}
          />
        </Box>
      </Box>
    </>
  );
};

export default memo(LockMatchScreen);
