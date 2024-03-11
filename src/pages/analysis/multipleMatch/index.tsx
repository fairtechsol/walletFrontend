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
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { socketService } from "../../../socketManager";
import {
  analysisListReset,
  getMultipleMatchDetail,
  updateBetDataOnDeclareOfMultipleMatch,
  updateMaxLossForBetForMultipleMatch,
  updateMaxLossForBetOnUndeclareForMultipleMatch,
  updateMaxLossForDeleteBetForMultiMatch,
  updateMultipleMatchDetail,
  updateTeamRatesOfMultipleMatch,
  updateTeamRatesOnDeleteForMultiMatch,
} from "../../../store/actions/match/multipleMatchActions";
import RunsBox from "../../../components/matchDetail/SessionMarket/RunsBox";

const MultipleMatch = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();
  const [currentOdds] = useState<any>(null);
  const [selectedBetData, setSelectedBetData] = useState([]);
  const { multipleMatchDetail, success } = useSelector(
    (state: RootState) => state.match.analysisList
  );
  const { placedBets, sessionProLoss } = useSelector(
    (state: RootState) => state.match.bets
  );
  const sessionBets: any = [];

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
        navigate(`/wallet/market_analysis`);
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

  useEffect(() => {
    try {
      if (state?.matchIds) {
        dispatch(getMultipleMatchDetail(state?.matchIds));
        dispatch(resetSessionProLoss());
        dispatch(getPlacedBets(`inArr${JSON.stringify(state?.matchIds)}`));
      }
    } catch (e) {
      console.log(e);
    }
  }, [state?.matchIds]);

  useEffect(() => {
    try {
      if (success && profileDetail?.roleName) {
        state?.matchIds?.map((item: any) => {
          socketService.match.joinMatchRoom(item, profileDetail?.roleName);
        });
        state?.matchIds?.map((item: any) => {
          socketService.match.getMatchRates(item, updateMatchDetailToRedux);
        });
        socketService.match.userSessionBetPlaced(setMultiSessionBetsPlaced);
        socketService.match.userMatchBetPlaced(setMultiMatchBetsPlaced);
        socketService.match.matchResultDeclared(matchMultiResultDeclared);
        socketService.match.sessionResult(handleMultiMatchSessionResultDeclare);
        socketService.match.matchDeleteBet(handleMultiMatchDeleteBet);
        socketService.match.sessionDeleteBet(handleMultiMatchSessionDeleteBet);
        socketService.match.sessionResultUnDeclare(
          handleMultiMatchSessionResultUnDeclare
        );
        dispatch(analysisListReset());
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, profileDetail]);

  useEffect(() => {
    return () => {
      state?.matchIds?.map((item: any) => {
        socketService.match.leaveMatchRoom(item);
      });
      state?.matchIds?.map((item: any) => {
        socketService.match.getMatchRatesOff(item, updateMatchDetailToRedux);
      });
      socketService.match.userSessionBetPlaced(setMultiSessionBetsPlaced);
      socketService.match.userMatchBetPlaced(setMultiMatchBetsPlaced);
      socketService.match.matchResultDeclared(matchMultiResultDeclared);
      socketService.match.matchDeleteBetOff(handleMultiMatchDeleteBet);
      socketService.match.sessionDeleteBetOff(handleMultiMatchSessionDeleteBet);
      socketService.match.sessionResultOff(
        handleMultiMatchSessionResultDeclare
      );
      socketService.match.sessionResultUnDeclareOff(
        handleMultiMatchSessionResultUnDeclare
      );
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (state?.matchId) {
          dispatch(getMultipleMatchDetail(state?.matchIds));
          dispatch(resetSessionProLoss());
          dispatch(getPlacedBets(`inArr${JSON.stringify(state?.matchIds)}`));
        }
      } else if (document.visibilityState === "hidden") {
        state?.matchIds?.map((item: any) => {
          socketService.match.leaveMatchRoom(item);
        });
        state?.matchIds?.map((item: any) => {
          socketService.match.getMatchRatesOff(item, updateMatchDetailToRedux);
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
                  let sessionBetsData = sessionBets?.filter(
                    (element: any) => element?.match_id === item?.id
                  );

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
                                    // handleClicked(item?.id);
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
                                />
                              )}
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
                                  />
                                );
                              })}
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
                                />
                              )}

                              {item?.manualSessionActive && (
                                <SessionMarket
                                  title={"Quick Session Market"}
                                  allBetsData={Array.from(
                                    new Set(item?.profitLossDataSession)
                                  )}
                                  // match={"multiple"}
                                  //   currentOdds={currentOdds}
                                  sessionData={QuicksessionData}
                                  currentMatch={item}
                                  data={[]}
                                  sessionOffline={item?.sessionOffline}
                                  //   sessionExposer={
                                  //     manualSessionHttp?.sessionExposure
                                  //   }
                                  sessionBets={sessionBetsData?.length}
                                  //   setPopData={setPopData}
                                  //   popData={popData}
                                  //   sessionData={
                                  //     manualSessionHttp?.manualSessionRate
                                  //   }
                                  max={item?.betFairSessionMaxBet}
                                  min={item?.betFairSessionMinBet}
                                />
                              )}
                              {item?.apiSessionActive && (
                                <SessionMarket
                                  title={"Session Market"}
                                  allBetsData={Array.from(
                                    new Set(item?.profitLossDataSession)
                                  )}
                                  match={"multiple"}
                                  //   currentOdds={currentOdds}
                                  sessionData={item?.apiSession}
                                  currentMatch={item}
                                  data={[]}
                                  sessionOffline={item?.sessionOffline}
                                  //   sessionExposer={
                                  //     manualSessionHttp?.sessionExposure
                                  //   }
                                  sessionBets={sessionBetsData?.length}
                                  //   setPopData={setPopData}
                                  //   popData={popData}
                                  max={item?.betFairSessionMaxBet}
                                  min={item?.betFairSessionMinBet}
                                />
                              )}
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
                                              currentOdds?.betId === v?.id
                                                ? currentOdds
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
                                IObets={placedBets.filter(
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
                                // onClick={() => handleClicked(item?.id)}
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
                                // matchOddsLive={matchOddsLive}
                                minBet={Math.floor(item?.matchOdd?.minBet)}
                                maxBet={Math.floor(item?.matchOdd?.maxBet)}
                                matchOddsLive={item?.matchOdd}
                                // data={[]}
                                data={
                                  item?.matchOdd?.runners?.length > 0
                                    ? item?.matchOdd?.runners
                                    : []
                                }
                                typeOfBet={"Match Odds"}
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
                              />
                            )}
                            {item?.apiTideMatch && (
                              <MatchOdds
                                currentMatch={item}
                                typeOfBet={"Tied Match"}
                                minBet={Math.floor(item?.apiTideMatch?.minBet)}
                                maxBet={Math.floor(item?.apiTideMatch?.maxBet)}
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
                                />
                              );
                            })}
                            {/* {item?.manualBookMakerActive && (
                              <Odds
                                currentMatch={item}
                                data={item}
                                manualBookmakerData={matchOddsDataTemp}
                                typeOfBet={"Quick Bookmaker"}
                                // data={matchOddsLive?.length > 0 ? matchOddsLive[0] : []}
                              />
                            )} */}
                            {/* {manualSessionHttp?.manualBookRate?.map(
                              (bookmaker: any) => {
                                if (bookmaker.betStatus === 1) {
                                  return (
                                    <MatchOdds
                                      currentMatch={item}
                                      session={"manualBookMaker"}
                                      data={bookmaker}
                                      minBet={bookmaker?.min_bet || 0}
                                      maxBet={bookmaker?.max_bet || 0}
                                      typeOfBet={bookmaker?.marketName}
                                      matchOddsData={bookmaker}
                                    />
                                  );
                                }
                              }
                            )} */}
                            {/* {item?.apiBookMakerActive && (
                              <LiveBookmaker
                                currentMatch={item}
                                minBet={Math.floor(item?.bookmaker?.minBet)}
                                maxBet={Math.floor(item?.bookmaker?.maxBet)}
                                bookmakerLive={item?.bookmakerLive}
                                data={
                                  item?.bookmakerLive?.runners?.length > 0
                                    ? item?.bookmakerLive?.runners
                                    : []
                                }
                              />
                            )} */}
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
                              />
                            )}

                            {item?.apiSessionActive && (
                              <SessionMarket
                                title={"Quick Session Market"}
                                allBetsData={Array.from(
                                  new Set(item?.profitLossDataSession)
                                )}
                                sessionData={item?.sessionBettings}
                                currentMatch={item}
                                sessionOffline={item?.sessionOffline}
                                sessionBets={sessionBetsData?.length}
                                max={item?.betFairSessionMaxBet}
                                min={item?.betFairSessionMinBet}
                              />
                            )}
                            {item?.manualSessionActive && (
                              <SessionMarket
                                title={"Session Market"}
                                allBetsData={Array.from(
                                  new Set(item?.profitLossDataSession)
                                )}
                                match={"multiple"}
                                currentMatch={item}
                                sessionData={item?.apiSession}
                                sessionOffline={item?.sessionOffline}
                                sessionBets={sessionBetsData?.length}
                                max={item?.betFairSessionMaxBet}
                                min={item?.betFairSessionMaxBet}
                              />
                            )}
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
                                            currentOdds?.betId === v?.id
                                              ? currentOdds
                                              : null
                                          }
                                        />
                                      );
                                    })}
                                </Box>
                              )}
                            <FullAllBets
                              tag={true}
                              IObets={placedBets.filter(
                                (bet: any) => bet?.matchId === item?.id
                              )}
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
            open={false}
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
                  //   matchId={storedMatchid}
                  //   setShowUserProfitLoss={setShowUserProfitLoss}
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
                  let sessionBetsData = sessionBets?.filter(
                    (element: any) => element?.match_id === item?.id
                  );

                  const QuicksessionData = item?.sessionBettings?.filter(
                    (item: any) => !JSON.parse(item).selectionId
                  );

                  // const sessionData = item?.sessionBettings?.filter(
                  //   (item: any) => JSON.parse(item).selectionId
                  // );

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
                            // onClick={() => handleClicked(item?.id)}
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
                              item.marketCompleteMatch?.runners?.length > 0
                                ? item.marketCompleteMatch?.runners
                                : []
                            }
                          />
                        )}
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
                          />
                        )}
                        {/* {item?.manualBookMakerActive && (
                          <Odds
                            currentMatch={item}
                            data={item}
                            manualBookmakerData={matchOddsDataTemp}
                            typeOfBet={"Quick Bookmaker"}
                          />
                        )} */}
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
                          />
                        )}
                        {item?.quickBookmaker?.map((bookmaker: any) => {
                          return (
                            <MatchOdds
                              key={bookmaker?.id}
                              currentMatch={item}
                              session={"manualBookMaker"}
                              data={bookmaker}
                              minBet={bookmaker?.minBet || 0}
                              maxBet={bookmaker?.maxBet || 0}
                              typeOfBet={bookmaker?.name}
                              matchOddsData={bookmaker}
                            />
                          );
                        })}

                        {/* {item?.apiBookMakerActive && (
                          <LiveBookmaker
                            currentMatch={item}
                            minBet={Math.floor(item?.bookmaker?.minBet)}
                            maxBet={Math.floor(item?.bookmaker?.maxBet)}
                            bookmakerLive={item?.bookmakerLive}
                            data={
                              item?.bookmakerLive?.runners?.length > 0
                                ? item?.bookmakerLive?.runners
                                : []
                            }
                          />
                        )} */}

                        {item?.manualTiedMatch?.isActive && (
                          <MatchOdds
                            typeOfBet={"Manual Tied Match"}
                            currentMatch={item}
                            session={"manualBookMaker"}
                            minBet={Math.floor(item?.manualTiedMatch?.minBet)}
                            maxBet={Math.floor(item?.manualTiedMatch?.maxBet)}
                            matchOddsData={item?.manualTiedMatch}
                            data={item?.manualTiedMatch}
                          />
                        )}

                        {item?.apiSessionActive && (
                          <SessionMarket
                            title={"Quick Session Market"}
                            allBetsData={Array.from(
                              new Set(item?.profitLossDataSession)
                            )}
                            // match={"multiple"}
                            currentMatch={item}
                            sessionData={QuicksessionData}
                            // currentOdds={currentOdds}
                            sessionOffline={item?.sessionOffline}
                            // sessionExposer={manualSessionHttp?.sessionExposure}
                            sessionBets={sessionBetsData?.length}
                            // sessionData={manualSessionHttp?.manualSessionRate}
                            // setPopData={setPopData}
                            // popData={popData}
                            max={item?.betFairSessionMaxBet}
                            min={item?.betFairSessionMinBet}
                          />
                        )}
                        {item?.apiSessionActive && (
                          <SessionMarket
                            title={"Session Market"}
                            allBetsData={Array.from(
                              new Set(item?.profitLossDataSession)
                            )}
                            match={"multiple"}
                            currentMatch={item}
                            sessionData={item?.apiSession}
                            sessionOffline={item?.sessionOffline}
                            sessionBets={sessionBetsData?.length}
                            max={item?.betFairSessionMaxBet}
                            min={item?.betFairSessionMinBet}
                          />
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
                                        currentOdds?.betId === v?.id
                                          ? currentOdds
                                          : null
                                      }
                                    />
                                  );
                                })}
                            </Box>
                          )}
                        <FullAllBets
                          tag={true}
                          IObets={placedBets.filter(
                            (bet: any) => bet?.matchId === item?.id
                          )}
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
            open={false}
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
                  //   matchId={storedMatchid}
                  //   setShowUserProfitLoss={setShowUserProfitLoss}
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
