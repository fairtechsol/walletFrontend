import {
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import MatchOdds from "../../../components/matchDetail/MatchOdds";
import UserProfitLoss from "../../../components/matchDetail/Common/UserProfitLoss";
import FullAllBets from "../../../components/matchDetail/Common/FullAllBets";
import SessionMarket from "../../../components/matchDetail/SessionMarket";
import LiveBookmaker from "../../../components/matchDetail/LiveBookmaker";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getPlacedBets,
  removeRunAmount,
  resetSessionProLoss,
  updateBetsPlaced,
  updatePlacedbets,
  updateProfitLoss,
  setCurrentOdd,
  updatePlacedbetsDeleteReason,
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { socket, socketService } from "../../../socketManager";
import {
  getMultipleMatchDetail,
  updateBetDataOnDeclareOfMultipleMatch,
  updateMatchRatesOnMarketUndeclareForMulti,
  updateMaxLossForBetForMultipleMatch,
  updateMaxLossForBetOnUndeclareForMultipleMatch,
  updateMaxLossForDeleteBetForMultiMatch,
  updateMultipleMatchDetail,
  updateTeamRatesOfMultipleMatch,
  updateTeamRatesOnDeleteForMultiMatch,
} from "../../../store/actions/match/multipleMatchActions";
import RunsBox from "../../../components/matchDetail/SessionMarket/RunsBox";
import { ApiConstants, sessionBettingType } from "../../../utils/Constants";
import { formatToINR } from "../../../helper";
import CricketCasinoMarket from "../../../components/matchDetail/CricketCasinoMarket";

const MultipleMatch = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();
  const { currentOdd } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const [storedMatchData, setStoredMatchData] = useState({
    matchId: "",
    teamA: "",
    teamB: "",
    teamC: "",
  });
  const [showUserProfitLoss, setShowUserProfitLoss] = useState(false);
  const [selectedBetData, setSelectedBetData] = useState([]);
  const { multipleMatchDetail, success } = useSelector(
    (state: RootState) => state.match.analysisList
  );
  const { placedBets, sessionProLoss } = useSelector(
    (state: RootState) => state.match.bets
  );

  const updateMatchDetailToRedux = (event: any) => {
    dispatch(updateMultipleMatchDetail(event));
  };

  const setMultiSessionBetsPlaced = (event: any) => {
    try {
      if (state?.matchIds.includes(event?.jobData?.placedBet?.matchId)) {
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
        dispatch(updateMaxLossForBetForMultipleMatch(event));
        dispatch(
          setCurrentOdd({
            matchId: event?.jobData?.betPlaceObject?.betPlacedData?.matchId,
            betId: event?.jobData?.betPlaceObject?.betPlacedData?.betId,
            odds: event?.jobData?.betPlaceObject?.betPlacedData?.odds,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setMultiMatchBetsPlaced = (event: any) => {
    try {
      if (state?.matchIds.includes(event?.jobData?.newBet?.matchId)) {
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
        dispatch(updateTeamRatesOfMultipleMatch(event));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const matchMultiResultDeclared = (event: any) => {
    try {
      if (state?.matchIds.includes(event?.matchId)) {
        if (
          event?.gameType === "cricket" ||
          event?.betType === "quickbookmaker1"
        ) {
          navigate(`/wallet/market_analysis`);
        } else {
          dispatch(getPlacedBets(`eq${state?.matchId}`));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMultiMatchSessionResultDeclare = (event: any) => {
    try {
      if (state?.matchIds.includes(event?.matchId)) {
        dispatch(
          updateBetDataOnDeclareOfMultipleMatch({
            betId: event?.betId,
            matchId: event?.matchId,
          })
        );
        dispatch(removeRunAmount(event));
        dispatch(getPlacedBets(`inArr${JSON.stringify(state?.matchIds)}`));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMultiMatchSessionResultUnDeclare = (event: any) => {
    try {
      if (state?.matchIds.includes(event?.matchId)) {
        dispatch(updateMaxLossForBetOnUndeclareForMultipleMatch(event));
        dispatch(getPlacedBets(`inArr${JSON.stringify(state?.matchIds)}`));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMultiMatchDeleteBet = (event: any) => {
    if (state?.matchIds.includes(event?.matchId)) {
      dispatch(updatePlacedbets(event));
      dispatch(updateTeamRatesOnDeleteForMultiMatch(event));
    }
  };
  const handleMultiMatchSessionDeleteBet = (event: any) => {
    if (state?.matchIds.includes(event?.matchId)) {
      dispatch(updatePlacedbets(event));
      dispatch(updateMaxLossForDeleteBetForMultiMatch(event));
    }
  };

  const handleMatchResultUndeclared = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        if (event?.betType !== "quickbookmaker1") {
          dispatch(getPlacedBets(`eq${state?.matchId}`));
          dispatch(updateMatchRatesOnMarketUndeclareForMulti(event));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClicked = (item: any) => {
    try {
      setStoredMatchData(() => {
        return {
          matchId: item?.matchId,
          teamA: item?.teamA,
          teamB: item?.teamB,
          teamC: item?.teamC,
        };
      });
      setShowUserProfitLoss(true);
    } catch (e) {
      console.log(e);
    }
  };

  const convertString = (str: string) => {
    if (str?.includes("_")) {
      let words = str.split("_");
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      }
      return words.join(" ");
    } else {
      return str;
    }
  };

  const handleDeleteReasonUpdate = (event: any) => {
    try {
      if (state?.matchIds.includes(event?.matchId)) {
        dispatch(updatePlacedbetsDeleteReason(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (
      multipleMatchDetail &&
      multipleMatchDetail.some((item: any) => item?.stopAt)
    ) {
      navigate(`/wallet/market_analysis`);
    }
  }, [multipleMatchDetail]);

  useEffect(() => {
    try {
      if (state?.matchIds) {
        dispatch(
          getMultipleMatchDetail({
            url:
              state.matchType === "cricket"
                ? ApiConstants.MATCH.GET
                : ApiConstants.MATCH.GET_OTHER,
            ids: state?.matchIds,
            matchType: state.matchType,
          })
        );
        dispatch(resetSessionProLoss());
        dispatch(getPlacedBets(`inArr${JSON.stringify(state?.matchIds)}`));
      }
    } catch (e) {
      console.log(e);
    }
  }, [state?.matchIds]);

  useEffect(() => {
    try {
      if (success && profileDetail?.roleName && socket) {
        state?.matchIds?.map((item: any) => {
          socketService.match.getMatchRatesOff(item);
        });
        socketService.match.userSessionBetPlacedOff();
        socketService.match.userMatchBetPlacedOff();
        socketService.match.matchResultDeclaredOff();
        socketService.match.declaredMatchResultAllUserOff();
        socketService.match.matchDeleteBetOff();
        socketService.match.sessionDeleteBetOff();
        socketService.match.sessionResultOff();
        socketService.match.sessionResultUnDeclareOff();
        socketService.match.updateDeleteReasonOff();
        state?.matchIds?.map((item: any) => {
          socketService.match.joinMatchRoom(item, profileDetail?.roleName);
        });
        state?.matchIds?.map((item: any) => {
          socketService.match.getMatchRates(item, updateMatchDetailToRedux);
        });
        socketService.match.userSessionBetPlaced(setMultiSessionBetsPlaced);
        socketService.match.userMatchBetPlaced(setMultiMatchBetsPlaced);
        socketService.match.matchResultDeclared(matchMultiResultDeclared);
        socketService.match.declaredMatchResultAllUser(
          matchMultiResultDeclared
        );
        socketService.match.sessionResult(handleMultiMatchSessionResultDeclare);
        socketService.match.matchDeleteBet(handleMultiMatchDeleteBet);
        socketService.match.sessionDeleteBet(handleMultiMatchSessionDeleteBet);
        socketService.match.sessionResultUnDeclare(
          handleMultiMatchSessionResultUnDeclare
        );
        socketService.match.matchResultUnDeclared(handleMatchResultUndeclared);
        socketService.match.updateDeleteReason(handleDeleteReasonUpdate);
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, profileDetail, socket]);

  useEffect(() => {
    return () => {
      state?.matchIds?.map((item: any) => {
        socketService.match.leaveMatchRoom(item);
        socketService.match.getMatchRatesOff(item);
      });
      socketService.match.userSessionBetPlacedOff();
      socketService.match.userMatchBetPlacedOff();
      socketService.match.matchResultDeclaredOff();
      socketService.match.declaredMatchResultAllUserOff();
      socketService.match.matchDeleteBetOff();
      socketService.match.sessionDeleteBetOff();
      socketService.match.sessionResultOff();
      socketService.match.sessionResultUnDeclareOff();
      socketService.match.updateDeleteReasonOff();
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (state?.matchIds) {
          dispatch(
            getMultipleMatchDetail({
              url:
                state.matchType === "cricket"
                  ? ApiConstants.MATCH.GET
                  : ApiConstants.MATCH.GET_OTHER,
              ids: state?.matchIds,
              matchType: state.matchType,
            })
          );
          dispatch(resetSessionProLoss());
          dispatch(getPlacedBets(`inArr${JSON.stringify(state?.matchIds)}`));
        }
      } else if (document.visibilityState === "hidden") {
        state?.matchIds?.map((item: any) => {
          socketService.match.getMatchRatesOff(item);
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {state?.match == 3 && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: { matchesMobile: "column", lg: "row" },
              flex: 1,
              height: "100%",
              marginLeft: "0.5%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {multipleMatchDetail?.length > 0 &&
                multipleMatchDetail?.map((item: any, index: any) => {
                  const QuicksessionData = item?.sessionBettings?.filter(
                    (item: any) => !JSON.parse(item).selectionId
                  );
                  return (
                    <>
                      {index === 0 ? (
                        <>
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              width: "100%",
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
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  width: "100%",
                                  color: "white",
                                  fontWeight: "700",
                                  paddingTop: "2%",
                                  alignSelf: "start",
                                }}
                              >
                                {item?.teamA} V/S {item?.teamB}
                                <Button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleClicked({
                                      matchId: item?.id,
                                      teamA: item?.teamA,
                                      teamB: item?.teamB,
                                      teamC: item?.teamC,
                                    });
                                  }}
                                  sx={{
                                    backgroundColor: "#F8C851",
                                    fontSize: "10px",
                                    color: "black",
                                    fontWeight: "700",
                                    float: "right",
                                    border: " 1px solid white",
                                    marginBottom: "2px",
                                    alignSelf: "start",
                                    "&:hover": {
                                      backgroundColor: "#F8C851",
                                    },
                                  }}
                                >
                                  User Profit Loss
                                </Button>
                              </Typography>
                              {item?.matchOdd?.isActive && (
                                <MatchOdds
                                  currentMatch={item}
                                  matchOddsLive={item?.matchOdd}
                                  minBet={Math.floor(item?.matchOdd?.minBet)}
                                  maxBet={Math.floor(item?.matchOdd?.maxBet)}
                                  data={
                                    item?.matchOdd?.runners?.length > 0
                                      ? item?.matchOdd?.runners
                                      : []
                                  }
                                  typeOfBet={"Match Odds"}
                                  liveData={item?.matchOdd}
                                />
                              )}
                              {item?.bookmaker?.isActive && (
                                <LiveBookmaker
                                  currentMatch={item}
                                  minBet={Math.floor(item?.bookmaker?.minBet)}
                                  maxBet={Math.floor(item?.bookmaker?.maxBet)}
                                  bookmakerLive={item?.bookmaker}
                                  data={
                                    item?.bookmaker?.runners?.length > 0
                                      ? item?.bookmaker?.runners
                                      : []
                                  }
                                  liveData={item?.bookmaker}
                                />
                              )}
                              {item?.quickBookmaker
                                ?.filter((match: any) => match?.isActive)
                                ?.map((bookmaker: any) => {
                                  return (
                                    <MatchOdds
                                      currentMatch={item}
                                      session={"manualBookMaker"}
                                      data={bookmaker}
                                      minBet={bookmaker?.minBet || 0}
                                      maxBet={bookmaker?.maxBet || 0}
                                      typeOfBet={bookmaker?.name}
                                      matchOddsData={bookmaker}
                                      liveData={bookmaker}
                                    />
                                  );
                                })}{" "}
                              {item?.firstHalfGoal?.length > 0 &&
                                item?.firstHalfGoal
                                  ?.filter((match: any) => match?.isActive)
                                  ?.map((match: any, index: any) => {
                                    return (
                                      <MatchOdds
                                        key={index}
                                        currentMatch={item}
                                        session={"firstHalfGoal"}
                                        data={
                                          match?.runners?.length > 0
                                            ? match?.runners
                                            : []
                                        }
                                        minBet={Math.floor(match?.minBet) || 0}
                                        maxBet={Math.floor(match?.maxBet) || 0}
                                        typeOfBet={convertString(match?.name)}
                                        liveData={match}
                                      />
                                    );
                                  })}
                              {item?.halfTime?.isActive && (
                                <MatchOdds
                                  currentMatch={item}
                                  typeOfBet={"Half Time"}
                                  showBox={
                                    item?.halfTime?.activeStatus === "save"
                                  }
                                  minBet={Math.floor(item?.halfTime?.minBet)}
                                  maxBet={Math.floor(item?.halfTime?.maxBet)}
                                  liveData={item?.halfTime}
                                  data={
                                    item?.halfTime?.runners?.length > 0
                                      ? item?.halfTime?.runners
                                      : []
                                  }
                                />
                              )}
                              {item?.overUnder?.length > 0 &&
                                item?.overUnder
                                  ?.filter((match: any) => match?.isActive)
                                  ?.map((match: any, index: any) => {
                                    return (
                                      <MatchOdds
                                        key={index}
                                        currentMatch={item}
                                        session={"overUnder"}
                                        data={
                                          match?.runners?.length > 0
                                            ? match?.runners
                                            : []
                                        }
                                        minBet={Math.floor(match?.minBet) || 0}
                                        maxBet={Math.floor(match?.maxBet) || 0}
                                        typeOfBet={convertString(match?.name)}
                                        liveData={match}
                                      />
                                    );
                                  })}{" "}
                              {item?.setWinner?.length > 0 &&
                                item?.setWinner
                                  ?.filter((match: any) => match?.isActive)
                                  ?.map((match: any, index: any) => {
                                    return (
                                      <MatchOdds
                                        key={index}
                                        currentMatch={item}
                                        session={"setWinner"}
                                        minBet={Math.floor(match?.minBet) || 0}
                                        maxBet={Math.floor(match?.maxBet) || 0}
                                        typeOfBet={convertString(match?.name)}
                                        liveData={match}
                                        data={
                                          match?.runners?.length > 0
                                            ? match?.runners
                                            : []
                                        }
                                      />
                                    );
                                  })}
                              {item?.apiTideMatch?.isActive && (
                                <MatchOdds
                                  currentMatch={item}
                                  typeOfBet={"Tied Match"}
                                  minBet={Math.floor(
                                    item?.apiTideMatch?.minBet
                                  )}
                                  maxBet={Math.floor(
                                    item?.apiTideMatch?.maxBet
                                  )}
                                  data={
                                    item?.apiTideMatch?.runners?.length > 0
                                      ? item?.apiTideMatch?.runners
                                      : []
                                  }
                                  liveData={item?.apiTideMatch}
                                />
                              )}
                              {item?.manualTiedMatch?.isActive && (
                                <MatchOdds
                                  typeOfBet={"Manual Tied Match"}
                                  currentMatch={item}
                                  session={"manualBookMaker"}
                                  minBet={Math.floor(
                                    item?.manualTiedMatch?.minBet
                                  )}
                                  maxBet={Math.floor(
                                    item?.manualTiedMatch?.maxBet
                                  )}
                                  data={item?.manualTiedMatch}
                                  liveData={item?.manualTiedMatch}
                                />
                              )}
                              {item?.marketCompleteMatch?.isActive && (
                                <MatchOdds
                                  currentMatch={item}
                                  typeOfBet={"Market Complete Match"}
                                  minBet={Math.floor(
                                    item?.marketCompleteMatch?.minBet
                                  )}
                                  maxBet={Math.floor(
                                    item?.marketCompleteMatch?.maxBet
                                  )}
                                  data={
                                    item?.marketCompleteMatch?.runners?.length >
                                    0
                                      ? item?.marketCompleteMatch?.runners
                                      : []
                                  }
                                  liveData={item?.marketCompleteMatch}
                                />
                              )}
                              {item?.manualCompleteMatch?.isActive && (
                                <MatchOdds
                                  typeOfBet={"Manual Complete Match"}
                                  currentMatch={item}
                                  session={"manualBookMaker"}
                                  minBet={Math.floor(
                                    item?.manualCompleteMatch?.minBet
                                  )}
                                  maxBet={Math.floor(
                                    item?.manualCompleteMatch?.maxBet
                                  )}
                                  data={item?.manualCompleteMatch}
                                  liveData={item?.manualCompleteMatch}
                                />
                              )}
                              {item?.manualSessionActive && (
                                <SessionMarket
                                  title={"Quick Session Market"}
                                  allBetsData={
                                    item?.profitLossDataSession
                                      ? Array.from(
                                          item?.profitLossDataSession?.reduce(
                                            (acc: any, obj: any) =>
                                              acc.has(obj.betId)
                                                ? acc
                                                : acc.add(obj.betId) && acc,
                                            new Set()
                                          ),
                                          (id) =>
                                            item?.profitLossDataSession?.find(
                                              (obj: any) => obj.betId === id
                                            )
                                        )
                                      : []
                                  }
                                  sessionData={QuicksessionData}
                                  currentMatch={item}
                                  sessionOffline={item?.sessionOffline}
                                  max={item?.betFairSessionMaxBet}
                                  min={item?.betFairSessionMinBet}
                                  type="session"
                                />
                              )}
                              {item?.apiSessionActive &&
                                Object.entries(item?.apiSession || {})
                                  ?.filter(
                                    ([key, value]: any) =>
                                      value?.section?.length > 0 &&
                                      key != sessionBettingType.cricketCasino
                                  )
                                  ?.map(([key, value]: any) => {
                                    return (
                                      <SessionMarket
                                        key={key}
                                        title={value?.mname || key}
                                        allBetsData={
                                          item?.profitLossDataSession
                                            ? Array.from(
                                                item?.profitLossDataSession?.reduce(
                                                  (acc: any, obj: any) =>
                                                    acc.has(obj.betId)
                                                      ? acc
                                                      : acc.add(obj.betId) &&
                                                        acc,
                                                  new Set()
                                                ),
                                                (id) =>
                                                  item?.profitLossDataSession?.find(
                                                    (obj: any) =>
                                                      obj.betId === id
                                                  )
                                              )
                                            : []
                                        }
                                        currentMatch={item}
                                        sessionData={value?.section}
                                        min={
                                          formatToINR(
                                            item?.betFairSessionMinBet
                                          ) || 0
                                        }
                                        max={
                                          formatToINR(
                                            item?.betFairSessionMaxBet
                                          ) || 0
                                        }
                                        type={key || value?.gtype}
                                      />
                                    );
                                  })}
                              {item?.apiSessionActive &&
                                (
                                  item?.apiSession?.cricketCasino?.section || []
                                )?.map((item: any) => {
                                  return (
                                    <CricketCasinoMarket
                                      key={item?.selectionId}
                                      title={item?.RunnerName}
                                      allBetsData={
                                        item?.profitLossDataSession
                                          ? Array.from(
                                              item?.profitLossDataSession?.reduce(
                                                (acc: any, obj: any) =>
                                                  acc.has(obj.betId)
                                                    ? acc
                                                    : acc.add(obj.betId) && acc,
                                                new Set()
                                              ),
                                              (id) =>
                                                item?.profitLossDataSession?.find(
                                                  (obj: any) => obj.betId === id
                                                )
                                            )
                                          : []
                                      }
                                      currentMatch={item}
                                      sessionData={item}
                                      min={
                                        formatToINR(
                                          item?.betFairSessionMinBet
                                        ) || 0
                                      }
                                      max={
                                        formatToINR(
                                          item?.betFairSessionMaxBet
                                        ) || 0
                                      }
                                      type={sessionBettingType.cricketCasino}
                                    />
                                  );
                                })}
                              {sessionProLoss?.length > 0 &&
                                sessionProLoss.filter(
                                  (runAmount: any) =>
                                    runAmount?.matchId === item?.id
                                ).length > 0 && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      flexWrap: "wrap",
                                      gap: "1px",
                                      rowGap: "5px",
                                      height: "440px",
                                      overflow: "scroll",
                                      marginTop: "1.25vw",
                                    }}
                                  >
                                    {sessionProLoss
                                      .filter(
                                        (runAmount: any) =>
                                          runAmount?.matchId === item?.id
                                      )
                                      .map((v: any) => {
                                        return (
                                          <RunsBox
                                            key={v?.id}
                                            item={v}
                                            currentOdd={
                                              currentOdd?.betId === v?.id
                                                ? currentOdd
                                                : null
                                            }
                                          />
                                        );
                                      })}
                                  </Box>
                                )}
                            </Box>

                            <Box
                              sx={{
                                flex: 1,
                                flexDirection: "column",
                                display: "flex",
                                minHeight: "100px",
                                marginX: "0.5%",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  width: "100%",
                                }}
                              >
                                <Box
                                  sx={{
                                    width: "150px",
                                    marginY: ".75%",
                                    height: "35px",
                                  }}
                                ></Box>
                              </Box>
                              <FullAllBets
                                tag={false}
                                IObets={Array.from(
                                  placedBets.reduce(
                                    (acc: any, obj: any) =>
                                      acc.has(obj.id)
                                        ? acc
                                        : acc.add(obj.id) && acc,
                                    new Set()
                                  ),
                                  (id) =>
                                    placedBets.find((obj: any) => obj.id === id)
                                ).filter(
                                  (bet: any) => bet?.matchId === item?.id
                                )}
                                setSelectedBetData={setSelectedBetData}
                                selectedBetData={selectedBetData}
                              />
                            </Box>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box
                            key={index}
                            sx={{
                              maxWidth: matchesMobile ? "99%" : "49.5%",
                              flex: matchesMobile ? "0 0 99%" : "0 0 49.5%",
                              marginRight: "0.5%",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "16px",
                                color: "white",
                                fontWeight: "700",
                                paddingTop: "0.7%",
                                alignSelf: "start",
                              }}
                            >
                              {item?.teamA} V/S {item?.teamB}
                              <Button
                                onClick={() =>
                                  handleClicked({
                                    matchId: item?.id,
                                    teamA: item?.teamA,
                                    teamB: item?.teamB,
                                    teamC: item?.teamC,
                                  })
                                }
                                sx={{
                                  backgroundColor: "#F8C851",
                                  fontSize: "10px",
                                  color: "black",
                                  fontWeight: "700",
                                  float: "right",
                                  border: " 1px solid white",
                                  marginBottom: "2px",
                                  alignSelf: "start",
                                  "&:hover": { backgroundColor: "#F8C851" },
                                }}
                              >
                                User Profit Loss
                              </Button>
                            </Typography>
                            {item?.matchOdd && (
                              <MatchOdds
                                currentMatch={item}
                                minBet={Math.floor(item?.matchOdd?.minBet)}
                                maxBet={Math.floor(item?.matchOdd?.maxBet)}
                                matchOddsLive={item?.matchOdd}
                                data={
                                  item?.matchOdd?.runners?.length > 0
                                    ? item?.matchOdd?.runners
                                    : []
                                }
                                typeOfBet={"Match Odds"}
                                liveData={item?.matchOdd}
                              />
                            )}
                            {item?.bookmaker && (
                              <LiveBookmaker
                                currentMatch={item}
                                minBet={Math.floor(item?.bookmaker?.minBet)}
                                maxBet={Math.floor(item?.bookmaker?.maxBet)}
                                bookmakerLive={item?.bookmaker}
                                data={
                                  item?.bookmaker?.runners?.length > 0
                                    ? item?.bookmaker?.runners
                                    : []
                                }
                                liveData={item?.bookmaker}
                              />
                            )}
                            {item?.quickBookmaker?.map((bookmaker: any) => {
                              return (
                                <MatchOdds
                                  currentMatch={item}
                                  session={"manualBookMaker"}
                                  data={bookmaker}
                                  minBet={bookmaker?.minBet || 0}
                                  maxBet={bookmaker?.maxBet || 0}
                                  typeOfBet={bookmaker?.name}
                                  matchOddsData={bookmaker}
                                  liveData={bookmaker}
                                />
                              );
                            })}
                            {item?.firstHalfGoal?.length > 0 &&
                              item?.firstHalfGoal
                                ?.filter((match: any) => match?.isActive)
                                ?.map((match: any, index: any) => {
                                  return (
                                    <MatchOdds
                                      key={index}
                                      currentMatch={item}
                                      session={"firstHalfGoal"}
                                      data={
                                        match?.runners?.length > 0
                                          ? match?.runners
                                          : []
                                      }
                                      minBet={Math.floor(match?.minBet) || 0}
                                      maxBet={Math.floor(match?.maxBet) || 0}
                                      typeOfBet={convertString(match?.name)}
                                      liveData={match}
                                    />
                                  );
                                })}
                            {item?.halfTime?.isActive && (
                              <MatchOdds
                                currentMatch={item}
                                typeOfBet={"Half Time"}
                                showBox={
                                  item?.halfTime?.activeStatus === "save"
                                }
                                minBet={Math.floor(item?.halfTime?.minBet)}
                                maxBet={Math.floor(item?.halfTime?.maxBet)}
                                liveData={item?.halfTime}
                                data={
                                  item?.halfTime?.runners?.length > 0
                                    ? item?.halfTime?.runners
                                    : []
                                }
                              />
                            )}{" "}
                            {item?.overUnder?.length > 0 &&
                              item?.overUnder
                                ?.filter((match: any) => match?.isActive)
                                ?.map((match: any, index: any) => {
                                  return (
                                    <MatchOdds
                                      key={index}
                                      currentMatch={item}
                                      session={"overUnder"}
                                      data={
                                        match?.runners?.length > 0
                                          ? match?.runners
                                          : []
                                      }
                                      minBet={Math.floor(match?.minBet) || 0}
                                      maxBet={Math.floor(match?.maxBet) || 0}
                                      typeOfBet={convertString(match?.name)}
                                      liveData={match}
                                    />
                                  );
                                })}
                            {item?.setWinner?.length > 0 &&
                              item?.setWinner
                                ?.filter((match: any) => match?.isActive)
                                ?.map((match: any, index: any) => {
                                  return (
                                    <MatchOdds
                                      key={index}
                                      currentMatch={item}
                                      session={"setWinner"}
                                      minBet={Math.floor(match?.minBet) || 0}
                                      maxBet={Math.floor(match?.maxBet) || 0}
                                      typeOfBet={convertString(match?.name)}
                                      liveData={match}
                                      data={
                                        match?.runners?.length > 0
                                          ? match?.runners
                                          : []
                                      }
                                    />
                                  );
                                })}
                            {item?.apiTideMatch && (
                              <MatchOdds
                                currentMatch={item}
                                typeOfBet={"Tied Match"}
                                minBet={Math.floor(item?.apiTideMatch?.minBet)}
                                maxBet={Math.floor(item?.apiTideMatch?.maxBet)}
                                liveData={item?.apiTideMatch}
                              />
                            )}
                            {item?.manualTiedMatch && (
                              <MatchOdds
                                typeOfBet={"Manual Tied Match"}
                                currentMatch={item}
                                session={"manualBookMaker"}
                                data={item?.manualTiedMatch}
                                minBet={Math.floor(
                                  item?.manualTiedMatch?.minBet
                                )}
                                maxBet={Math.floor(
                                  item?.manualTiedMatch?.maxBet
                                )}
                                matchOddsData={item?.manualTiedMatch}
                                liveData={item?.manualTiedMatch}
                              />
                            )}
                            {item?.marketCompleteMatch && (
                              <MatchOdds
                                currentMatch={item}
                                typeOfBet={"Market Complete Match"}
                                minBet={Math.floor(
                                  item?.marketCompleteMatch?.minBet
                                )}
                                maxBet={Math.floor(
                                  item?.marketCompleteMatch?.maxBet
                                )}
                                liveData={item?.marketCompleteMatch}
                              />
                            )}
                            {item?.manualCompleteMatch?.isActive && (
                              <MatchOdds
                                typeOfBet={"Manual Complete Match"}
                                currentMatch={item}
                                session={"manualBookMaker"}
                                minBet={Math.floor(
                                  item?.manualCompleteMatch?.minBet
                                )}
                                maxBet={Math.floor(
                                  item?.manualCompleteMatch?.maxBet
                                )}
                                data={item?.manualCompleteMatch}
                                matchOddsData={item?.manualTiedMatch}
                                liveData={item?.manualCompleteMatch}
                              />
                            )}
                            {item?.manualSessionActive && (
                              <SessionMarket
                                title={"Quick Session Market"}
                                allBetsData={
                                  item?.profitLossDataSession
                                    ? Array.from(
                                        item?.profitLossDataSession?.reduce(
                                          (acc: any, obj: any) =>
                                            acc.has(obj.betId)
                                              ? acc
                                              : acc.add(obj.betId) && acc,
                                          new Set()
                                        ),
                                        (id) =>
                                          item?.profitLossDataSession?.find(
                                            (obj: any) => obj.betId === id
                                          )
                                      )
                                    : []
                                }
                                sessionData={item?.sessionBettings}
                                currentMatch={item}
                                max={item?.betFairSessionMaxBet}
                                min={item?.betFairSessionMinBet}
                                type="session"
                              />
                            )}
                            {item?.apiSessionActive &&
                              Object.entries(item?.apiSession || {})
                                ?.filter(
                                  ([key, value]: any) =>
                                    value?.section?.length > 0 &&
                                    key != sessionBettingType.cricketCasino
                                )
                                ?.map(([key, value]: any) => {
                                  return (
                                    <SessionMarket
                                      key={key}
                                      title={value?.mname || key}
                                      allBetsData={
                                        item?.profitLossDataSession
                                          ? Array.from(
                                              item?.profitLossDataSession?.reduce(
                                                (acc: any, obj: any) =>
                                                  acc.has(obj.betId)
                                                    ? acc
                                                    : acc.add(obj.betId) && acc,
                                                new Set()
                                              ),
                                              (id) =>
                                                item?.profitLossDataSession?.find(
                                                  (obj: any) => obj.betId === id
                                                )
                                            )
                                          : []
                                      }
                                      currentMatch={item}
                                      sessionData={value?.section}
                                      min={
                                        formatToINR(
                                          item?.betFairSessionMinBet
                                        ) || 0
                                      }
                                      max={
                                        formatToINR(
                                          item?.betFairSessionMaxBet
                                        ) || 0
                                      }
                                      type={key || value?.gtype}
                                    />
                                  );
                                })}
                            {item?.apiSessionActive &&
                              (
                                item?.apiSession?.cricketCasino?.section || []
                              )?.map((item: any) => {
                                return (
                                  <CricketCasinoMarket
                                    key={item?.selectionId}
                                    title={item?.RunnerName}
                                    allBetsData={
                                      item?.profitLossDataSession
                                        ? Array.from(
                                            item?.profitLossDataSession?.reduce(
                                              (acc: any, obj: any) =>
                                                acc.has(obj.betId)
                                                  ? acc
                                                  : acc.add(obj.betId) && acc,
                                              new Set()
                                            ),
                                            (id) =>
                                              item?.profitLossDataSession?.find(
                                                (obj: any) => obj.betId === id
                                              )
                                          )
                                        : []
                                    }
                                    currentMatch={item}
                                    sessionData={item}
                                    min={
                                      formatToINR(item?.betFairSessionMinBet) ||
                                      0
                                    }
                                    max={
                                      formatToINR(item?.betFairSessionMaxBet) ||
                                      0
                                    }
                                    type={sessionBettingType.cricketCasino}
                                  />
                                );
                              })}
                            {sessionProLoss?.length > 0 &&
                              sessionProLoss.filter(
                                (runAmount: any) =>
                                  runAmount?.matchId === item?.id
                              ).length > 0 && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    gap: "1px",
                                    rowGap: "5px",
                                    height: "440px",
                                    overflow: "scroll",
                                    marginTop: "1.25vw",
                                  }}
                                >
                                  {sessionProLoss
                                    .filter(
                                      (run: any) => run?.matchId === item?.id
                                    )
                                    .map((v: any) => {
                                      return (
                                        <RunsBox
                                          key={v?.id}
                                          item={v}
                                          currentOdd={
                                            currentOdd?.betId === v?.id
                                              ? currentOdd
                                              : null
                                          }
                                        />
                                      );
                                    })}
                                </Box>
                              )}
                            <FullAllBets
                              tag={true}
                              IObets={Array.from(
                                placedBets.reduce(
                                  (acc: any, obj: any) =>
                                    acc.has(obj.id)
                                      ? acc
                                      : acc.add(obj.id) && acc,
                                  new Set()
                                ),
                                (id) =>
                                  placedBets.find((obj: any) => obj.id === id)
                              ).filter((bet: any) => bet?.matchId === item?.id)}
                              setSelectedBetData={setSelectedBetData}
                              selectedBetData={selectedBetData}
                            />
                          </Box>
                        </>
                      )}
                    </>
                  );
                })}
            </Box>
          </Box>
          <ModalMUI
            open={showUserProfitLoss}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignSelf: "center",
              }}
            >
              <Box
                sx={{
                  alignSelf: "center",
                  width: { xs: "90%", lg: "50%" },
                }}
              >
                <UserProfitLoss
                  title={"User Profit Loss"}
                  matchData={storedMatchData}
                  setShowUserProfitLoss={setShowUserProfitLoss}
                  single={"multiple"}
                />
              </Box>
            </Box>
          </ModalMUI>
        </>
      )}

      {(state?.match == 2 || state?.match == 4) && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: { matchesMobile: "column", lg: "row" },
              flex: 1,
              height: "100%",
              // marginX: "0.5%",
              marginLeft: "0.5%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {multipleMatchDetail?.length > 0 &&
                multipleMatchDetail?.map((item: any, index: number) => {
                  const QuicksessionData = item?.sessionBettings?.filter(
                    (item: any) => !JSON.parse(item).selectionId
                  );

                  return (
                    <>
                      <Box
                        key={index}
                        sx={{
                          maxWidth: matchesMobile ? "99%" : "49.5%",
                          flex: matchesMobile ? "0 0 99%" : "0 0 49.5%",
                          marginRight: matchesMobile ? "0%" : "0.5%",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "16px",
                            color: "white",
                            fontWeight: "700",
                            paddingTop: "0.7%",
                            alignSelf: "start",
                          }}
                        >
                          {item?.teamA} V/S {item?.teamB}
                          <Button
                            onClick={() =>
                              handleClicked({
                                matchId: item?.id,
                                teamA: item?.teamA,
                                teamB: item?.teamB,
                                teamC: item?.teamC,
                              })
                            }
                            sx={{
                              backgroundColor: "#F8C851",
                              fontSize: "10px",
                              color: "black",
                              fontWeight: "700",
                              float: "right",
                              border: " 1px solid white",
                              marginBottom: "2px",
                              alignSelf: "start",
                              "&:hover": { backgroundColor: "#F8C851" },
                            }}
                          >
                            User Profit Loss
                          </Button>
                        </Typography>
                        {item?.matchOdd?.isActive && (
                          <MatchOdds
                            currentMatch={item}
                            matchOddsLive={item?.matchOdd}
                            minBet={Math.floor(item?.matchOdd?.minBet)}
                            maxBet={Math.floor(item?.matchOdd?.maxBet)}
                            data={
                              item.matchOdd?.runners?.length > 0
                                ? item.matchOdd?.runners
                                : []
                            }
                            typeOfBet={"Match Odds"}
                            liveData={item?.matchOdd}
                          />
                        )}
                        {item?.bookmaker?.isActive && (
                          <LiveBookmaker
                            currentMatch={item}
                            minBet={Math.floor(item?.bookmaker?.minBet)}
                            maxBet={Math.floor(item?.bookmaker?.maxBet)}
                            bookmakerLive={item?.bookmakerLive}
                            data={
                              item?.bookmaker?.runners?.length > 0
                                ? item?.bookmaker?.runners
                                : []
                            }
                            liveData={item?.bookmaker}
                          />
                        )}
                        {item?.quickBookmaker
                          ?.filter((match: any) => match?.isActive)
                          ?.map((bookmaker: any) => {
                            return (
                              <MatchOdds
                                key={bookmaker?.id}
                                currentMatch={item}
                                session={"manualBookMaker"}
                                data={bookmaker}
                                minBet={bookmaker?.minBet || 0}
                                maxBet={bookmaker?.maxBet || 0}
                                typeOfBet={bookmaker?.name}
                                liveData={bookmaker}
                              />
                            );
                          })}
                        {item?.firstHalfGoal?.length > 0 &&
                          item?.firstHalfGoal
                            ?.filter((match: any) => match?.isActive)
                            ?.map((match: any, index: any) => {
                              return (
                                <MatchOdds
                                  key={index}
                                  currentMatch={item}
                                  session={"firstHalfGoal"}
                                  data={
                                    match?.runners?.length > 0
                                      ? match?.runners
                                      : []
                                  }
                                  minBet={Math.floor(match?.minBet) || 0}
                                  maxBet={Math.floor(match?.maxBet) || 0}
                                  typeOfBet={convertString(match?.name)}
                                  liveData={match}
                                />
                              );
                            })}
                        {item?.halfTime?.isActive && (
                          <MatchOdds
                            currentMatch={item}
                            typeOfBet={"Half Time"}
                            showBox={item?.halfTime?.activeStatus === "save"}
                            minBet={Math.floor(item?.halfTime?.minBet)}
                            maxBet={Math.floor(item?.halfTime?.maxBet)}
                            liveData={item?.halfTime}
                            data={
                              item?.halfTime?.runners?.length > 0
                                ? item?.halfTime?.runners
                                : []
                            }
                          />
                        )}{" "}
                        {item?.overUnder?.length > 0 &&
                          item?.overUnder
                            ?.filter((match: any) => match?.isActive)
                            ?.map((match: any, index: any) => {
                              return (
                                <MatchOdds
                                  key={index}
                                  currentMatch={item}
                                  session={"overUnder"}
                                  data={
                                    match?.runners?.length > 0
                                      ? match?.runners
                                      : []
                                  }
                                  minBet={Math.floor(match?.minBet) || 0}
                                  maxBet={Math.floor(match?.maxBet) || 0}
                                  typeOfBet={convertString(match?.name)}
                                  liveData={match}
                                />
                              );
                            })}
                        {item?.setWinner?.length > 0 &&
                          item?.setWinner
                            ?.filter((match: any) => match?.isActive)
                            ?.map((match: any, index: any) => {
                              return (
                                <MatchOdds
                                  key={index}
                                  currentMatch={item}
                                  session={"setWinner"}
                                  minBet={Math.floor(match?.minBet) || 0}
                                  maxBet={Math.floor(match?.maxBet) || 0}
                                  typeOfBet={convertString(match?.name)}
                                  liveData={match}
                                  data={
                                    match?.runners?.length > 0
                                      ? match?.runners
                                      : []
                                  }
                                />
                              );
                            })}
                        {item?.apiTideMatch?.isActive && (
                          <MatchOdds
                            currentMatch={item}
                            typeOfBet={"Tied Match"}
                            minBet={Math.floor(item?.apiTideMatch?.minBet)}
                            maxBet={Math.floor(item?.apiTideMatch?.maxBet)}
                            data={
                              item.apiTideMatch?.runners?.length > 0
                                ? item.apiTideMatch?.runners
                                : []
                            }
                            liveData={item?.apiTideMatch}
                          />
                        )}
                        {item?.manualTiedMatch?.isActive && (
                          <MatchOdds
                            typeOfBet={"Manual Tied Match"}
                            currentMatch={item}
                            session={"manualBookMaker"}
                            minBet={Math.floor(item?.manualTiedMatch?.minBet)}
                            maxBet={Math.floor(item?.manualTiedMatch?.maxBet)}
                            matchOddsData={item?.manualTiedMatch}
                            data={item?.manualTiedMatch}
                            liveData={item?.manualTiedMatch}
                          />
                        )}
                        {item?.marketCompleteMatch?.isActive && (
                          <MatchOdds
                            currentMatch={item}
                            typeOfBet={"Market Complete Match"}
                            minBet={Math.floor(
                              item?.marketCmpleteMatch?.minBet
                            )}
                            maxBet={Math.floor(
                              item?.marketCompleteMatch?.maxBet
                            )}
                            data={
                              item.marketCompleteMatch?.runners?.length > 0
                                ? item.marketCompleteMatch?.runners
                                : []
                            }
                            liveData={item?.marketCompleteMatch}
                          />
                        )}
                        {item?.manualCompleteMatch?.isActive && (
                          <MatchOdds
                            typeOfBet={"Manual Complete Match"}
                            currentMatch={item}
                            session={"manualBookMaker"}
                            minBet={Math.floor(
                              item?.manualCompleteMatch?.minBet
                            )}
                            maxBet={Math.floor(
                              item?.manualCompleteMatch?.maxBet
                            )}
                            data={item?.manualCompleteMatch}
                            matchOddsData={item?.manualTiedMatch}
                            liveData={item?.manualCompleteMatch}
                          />
                        )}
                        {item?.manualSessionActive && (
                          <SessionMarket
                            title={"Quick Session Market"}
                            allBetsData={
                              item?.profitLossDataSession
                                ? Array.from(
                                    item?.profitLossDataSession?.reduce(
                                      (acc: any, obj: any) =>
                                        acc.has(obj.betId)
                                          ? acc
                                          : acc.add(obj.betId) && acc,
                                      new Set()
                                    ),
                                    (id) =>
                                      item?.profitLossDataSession?.find(
                                        (obj: any) => obj.betId === id
                                      )
                                  )
                                : []
                            }
                            currentMatch={item}
                            sessionData={QuicksessionData}
                            max={item?.betFairSessionMaxBet}
                            min={item?.betFairSessionMinBet}
                            type="session"
                          />
                        )}
                        {item?.apiSessionActive &&
                          Object.entries(item?.apiSession || {})
                            ?.filter(
                              ([key, value]: any) =>
                                value?.section?.length > 0 &&
                                key != sessionBettingType.cricketCasino
                            )
                            ?.map(([key, value]: any) => {
                              return (
                                <SessionMarket
                                  key={key}
                                  title={value?.mname || key}
                                  allBetsData={
                                    item?.profitLossDataSession
                                      ? Array.from(
                                          item?.profitLossDataSession?.reduce(
                                            (acc: any, obj: any) =>
                                              acc.has(obj.betId)
                                                ? acc
                                                : acc.add(obj.betId) && acc,
                                            new Set()
                                          ),
                                          (id) =>
                                            item?.profitLossDataSession?.find(
                                              (obj: any) => obj.betId === id
                                            )
                                        )
                                      : []
                                  }
                                  currentMatch={item}
                                  sessionData={value?.section}
                                  min={
                                    formatToINR(item?.betFairSessionMinBet) || 0
                                  }
                                  max={
                                    formatToINR(item?.betFairSessionMaxBet) || 0
                                  }
                                  type={key || value?.gtype}
                                />
                              );
                            })}
                        {item?.apiSessionActive &&
                          (item?.apiSession?.cricketCasino?.section || [])?.map(
                            (item: any) => {
                              return (
                                <CricketCasinoMarket
                                  key={item?.selectionId}
                                  title={item?.RunnerName}
                                  allBetsData={
                                    item?.profitLossDataSession
                                      ? Array.from(
                                          item?.profitLossDataSession?.reduce(
                                            (acc: any, obj: any) =>
                                              acc.has(obj.betId)
                                                ? acc
                                                : acc.add(obj.betId) && acc,
                                            new Set()
                                          ),
                                          (id) =>
                                            item?.profitLossDataSession?.find(
                                              (obj: any) => obj.betId === id
                                            )
                                        )
                                      : []
                                  }
                                  currentMatch={item}
                                  sessionData={item}
                                  min={
                                    formatToINR(item?.betFairSessionMinBet) || 0
                                  }
                                  max={
                                    formatToINR(item?.betFairSessionMaxBet) || 0
                                  }
                                  type={sessionBettingType.cricketCasino}
                                />
                              );
                            }
                          )}
                        {sessionProLoss?.length > 0 &&
                          sessionProLoss.filter(
                            (runAmount: any) => runAmount?.matchId === item?.id
                          ).length > 0 && (
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                gap: "1px",
                                rowGap: "5px",
                                height: "440px",
                                overflow: "scroll",
                                marginTop: "1.25vw",
                              }}
                            >
                              {sessionProLoss
                                .filter((run: any) => run?.matchId === item?.id)
                                .map((v: any) => {
                                  return (
                                    <RunsBox
                                      key={v?.id}
                                      item={v}
                                      currentOdd={
                                        currentOdd?.betId === v?.id
                                          ? currentOdd
                                          : null
                                      }
                                    />
                                  );
                                })}
                            </Box>
                          )}
                        <FullAllBets
                          tag={true}
                          IObets={Array.from(
                            placedBets.reduce(
                              (acc: any, obj: any) =>
                                acc.has(obj.id) ? acc : acc.add(obj.id) && acc,
                              new Set()
                            ),
                            (id) => placedBets.find((obj: any) => obj.id === id)
                          ).filter((bet: any) => bet?.matchId === item?.id)}
                          setSelectedBetData={setSelectedBetData}
                          selectedBetData={selectedBetData}
                        />
                      </Box>
                    </>
                  );
                })}
            </Box>
          </Box>
          <ModalMUI
            open={showUserProfitLoss}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignSelf: "center",
              }}
            >
              <Box
                sx={{
                  alignSelf: "center",
                  width: { xs: "90%", lg: "50%" },
                }}
              >
                <UserProfitLoss
                  title={"User Profit Loss"}
                  matchData={storedMatchData}
                  setShowUserProfitLoss={setShowUserProfitLoss}
                  single={"multiple"}
                />
              </Box>
            </Box>
          </ModalMUI>
        </>
      )}
    </>
  );
};

export default MultipleMatch;
