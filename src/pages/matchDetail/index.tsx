import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { DeleteIcon } from "../../assets";
import AddNotificationModal from "../../components/matchDetail/Common/AddNotificationModal";
import FullAllBets from "../../components/matchDetail/Common/FullAllBets";
import UserProfitLoss from "../../components/matchDetail/Common/UserProfitLoss";
import LiveBookmaker from "../../components/matchDetail/LiveBookmaker";
import MatchOdds from "../../components/matchDetail/MatchOdds";
import SessionMarket from "../../components/matchDetail/SessionMarket";
import RunsBox from "../../components/matchDetail/SessionMarket/RunsBox";
import { socket, socketService } from "../../socketManager";
import {
  AllBetDelete,
  getMatchDetail,
  getPlacedBets,
  getUserProfitLoss,
  removeRunAmount,
  resetSessionProLoss,
  resetUserProfitLoss,
  setCurrentOdd,
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
import { formatToINR } from "../../helper";

const MatchDetail = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const [mode, setMode] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedBetData, setSelectedBetData] = useState([]);
  const { state } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { success, matchDetail } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { placedBets, loading, sessionProLoss } = useSelector(
    (state: RootState) => state.match.bets
  );

  const { currentOdd } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const handleDeleteBet = (value: any) => {
    try {
      let payload: any = {
        matchId: state?.matchId,
        deleteReason: value,
        urlData: {},
      };
      selectedBetData.forEach((item: any) => {
        const { userId, betId, domain } = item;

        if (!payload.urlData[domain]) {
          payload.urlData[domain] = [];
        }

        payload.urlData[domain].push({
          userId,
          betId,
          placeBetId: item.id,
        });
      });
      dispatch(AllBetDelete(payload));
    } catch (e) {
      console.log(e);
    }
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
        setSelectedBetData([]);
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
        setSelectedBetData([]);
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
        dispatch(
          setCurrentOdd({
            matchId: event?.jobData?.placedBet?.matchId,
            betId: event?.jobData?.placedBet?.betId,
            odds: event?.jobData?.placedBet?.odds,
          })
        );
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
        dispatch(getPlacedBets(`eq${state?.matchId}`));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSessionResultUnDeclare = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        dispatch(updateMaxLossForBetOnUndeclare(event));
        dispatch(getPlacedBets(`eq${state?.matchId}`));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
      if (state?.matchId && profileDetail?.roleName) {
        dispatch(getMatchDetail({matchId : state?.matchId , matchType : state?.matchType}));
        dispatch(getUserProfitLoss(state?.matchId));
        dispatch(resetSessionProLoss());
        dispatch(getPlacedBets(`eq${state?.matchId}`));
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
        socketService.match.joinMatchRoom(
          state?.matchId,
          profileDetail?.roleName
        );
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
      dispatch(resetUserProfitLoss());
    };
  }, [state?.matchId]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (state?.matchId) {
          dispatch(getMatchDetail({matchId : state?.matchId , matchType : state?.matchType}));
          dispatch(getUserProfitLoss(state?.matchId));
          dispatch(getPlacedBets(`eq${state?.matchId}`));
        }
      } else if (document.visibilityState === "hidden") {
        socketService.match.leaveMatchRoom(state?.matchId);
        socketService.match.getMatchRatesOff(state?.matchId);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (state?.matchId) {
      const intervalId = setInterval(() => {
        dispatch(getMatchDetail({matchId : state?.matchId , matchType : state?.matchType}));
        dispatch(getUserProfitLoss(state?.matchId));
        dispatch(getPlacedBets(`eq${state?.matchId}`));
      }, 14100 * 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);
  const convertString =(str:string)=> {
    if(str?.includes('_')){
      let words = str.split('_');
      for (let i = 0; i < words.length; i++) {
          words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      }
      return words.join(' ');
    }else{
      return str;
    }
   
}
  return (
    <>
      {visible && selectedBetData.length > 0 && (
        <>
          <AddNotificationModal
            value={""}
            title={"Add Remark"}
            visible={visible}
            loadingDeleteBet={loading}
            setVisible={setVisible}
            onDone={handleDeleteBet}
            onClick={(e: any) => {
              e.stopPropagation();
              setVisible(false);
              setMode(false);
            }}
          />
        </>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
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
          <Typography
            sx={{
              fontSize: "16px",
              color: "white",
              fontWeight: "700",
              alignSelf: "start",
            }}
          >
            {matchDetail?.teamA} V/S {matchDetail?.teamB}
          </Typography>
          {matchDetail?.matchOdd?.isActive && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Match Odds"}
              showBox={matchDetail?.matchOdd?.activeStatus === "save"}
              minBet={Math.floor(matchDetail?.matchOdd?.minBet)}
              maxBet={Math.floor(matchDetail?.matchOdd?.maxBet)}
              data={
                matchDetail?.matchOdd?.runners?.length > 0
                  ? matchDetail?.matchOdd?.runners
                  : []
              }
            />
          )}
           {matchDetail?.halfTime?.isActive && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Half Time"}
              showBox={matchDetail?.matchOdd?.activeStatus === "save"}
              minBet={Math.floor(matchDetail?.matchOdd?.minBet)}
              maxBet={Math.floor(matchDetail?.matchOdd?.maxBet)}
              data={
                matchDetail?.matchOdd?.runners?.length > 0
                  ? matchDetail?.matchOdd?.runners
                  : []
              }
            />
          )}
          {matchDetail?.marketCompleteMatch?.isActive && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Market Complete Match"}
              showBox={
                matchDetail?.marketCompleteMatch?.activeStatus === "save"
              }
              minBet={Math.floor(matchDetail?.marketCompleteMatch?.minBet)}
              maxBet={Math.floor(matchDetail?.marketCompleteMatch?.maxBet)}
              data={
                matchDetail?.marketCompleteMatch?.runners?.length > 0
                  ? matchDetail?.marketCompleteMatch?.runners
                  : []
              }
            />
          )}
          {matchDetail?.apiTideMatch?.isActive && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Tied Match"}
              showBox={matchDetail?.apiTideMatch?.activeStatus === "save"}
              minBet={Math.floor(matchDetail?.apiTideMatch?.minBet)}
              maxBet={Math.floor(matchDetail?.apiTideMatch?.maxBet)}
              data={
                matchDetail?.apiTideMatch?.runners?.length > 0
                  ? matchDetail?.apiTideMatch?.runners
                  : []
              }
            />
          )}
          {matchDetail?.bookmaker?.isActive && (
            <LiveBookmaker
              currentMatch={matchDetail}
              showBox={matchDetail?.bookmaker?.activeStatus === "save"}
              minBet={Math.floor(matchDetail?.bookmaker?.minBet)}
              maxBet={Math.floor(matchDetail?.bookmaker?.maxBet)}
              data={
                matchDetail?.bookmaker?.runners?.length > 0
                  ? matchDetail?.bookmaker?.runners
                  : []
              }
            />
          )}
          {matchDetail?.firstHalfGoal?.length >0 && matchDetail?.firstHalfGoal
            ?.filter((item: any) => item?.isActive)
            ?.map((bookmaker: any, index: any) => {
              return (
                <MatchOdds
                  key={index}
                  currentMatch={matchDetail}
                  session={"firstHalfGoal"}
                  data={bookmaker}
                  minBet={Math.floor(bookmaker?.minBet) || 0}
                  maxBet={Math.floor(bookmaker?.maxBet) || 0}
                  typeOfBet={convertString(bookmaker?.name)}
                  matchOddsData={bookmaker}
                />
              );
            })}
            {matchDetail?.overUnder?.length >0 && matchDetail?.overUnder
            ?.filter((item: any) => item?.isActive)
            ?.map((bookmaker: any, index: any) => {
              return (
                <MatchOdds
                  key={index}
                  currentMatch={matchDetail}
                  session={"overUnder"}
                  data={bookmaker}
                  minBet={Math.floor(bookmaker?.minBet) || 0}
                  maxBet={Math.floor(bookmaker?.maxBet) || 0}
                  typeOfBet={convertString(bookmaker?.name)}
                  matchOddsData={bookmaker}
                />
              );
            })}
          {matchDetail?.quickBookmaker
            ?.filter((item: any) => item?.isActive)
            ?.map((bookmaker: any, index: any) => {
              return (
                <MatchOdds
                  key={index}
                  currentMatch={matchDetail}
                  session={"manualBookMaker"}
                  data={bookmaker}
                  minBet={Math.floor(bookmaker?.minBet) || 0}
                  maxBet={Math.floor(bookmaker?.maxBet) || 0}
                  typeOfBet={bookmaker?.name}
                  matchOddsData={bookmaker}
                />
              );
            })}

          {matchDetail?.apiTideMatch?.isActive && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Tied Match"}
              showBox={matchDetail?.apiTideMatch?.activeStatus === "save"}
              minBet={Math.floor(matchDetail?.apiTideMatch?.minBet)}
              maxBet={Math.floor(matchDetail?.apiTideMatch?.maxBet)}
              data={
                matchDetail?.apiTideMatch?.runners?.length > 0
                  ? matchDetail?.apiTideMatch?.runners
                  : []
              }
            />
          )}
          {matchDetail?.manualTiedMatch && matchesMobile && (
            <MatchOdds
              typeOfBet={"Manual Tied Match"}
              data={matchDetail?.manualTiedMatch}
              currentMatch={matchDetail}
              session={"manualBookMaker"}
              minBet={Math.floor(matchDetail?.manualTiedMatch?.minBet)}
              maxBet={Math.floor(matchDetail?.manualTiedMatch?.maxBet)}
            />
          )}
          {matchDetail?.marketCompleteMatch?.isActive && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Market Complete Match"}
              showBox={
                matchDetail?.marketCompleteMatch?.activeStatus === "save"
              }
              minBet={Math.floor(matchDetail?.marketCompleteMatch?.minBet)}
              maxBet={Math.floor(matchDetail?.marketCompleteMatch?.maxBet)}
              data={
                matchDetail?.marketCompleteMatch?.runners?.length > 0
                  ? matchDetail?.marketCompleteMatch?.runners
                  : []
              }
            />
          )}

          {matchDetail?.manualSessionActive &&
            matchesMobile &&
            matchDetail?.sessionBettings?.filter(
              (item: any) => !JSON.parse(item).selectionId
            )?.length > 0 && (
              <SessionMarket
                allBetsData={
                  matchDetail?.profitLossDataSession
                    ? Array.from(
                        matchDetail?.profitLossDataSession?.reduce(
                          (acc: any, obj: any) =>
                            acc.has(obj.betId)
                              ? acc
                              : acc.add(obj.betId) && acc,
                          new Set()
                        ),
                        (id) =>
                          matchDetail?.profitLossDataSession?.find(
                            (obj: any) => obj.betId === id
                          )
                      )
                    : []
                }
                title={"Quick Session Market"}
                currentMatch={matchDetail}
                sessionData={matchDetail?.sessionBettings?.filter(
                  (item: any) => !JSON.parse(item).selectionId
                )}
                min={formatToINR(matchDetail?.betFairSessionMinBet) || 0}
                // max={formatToINR(matchDetail?.betFairSessionMaxBet) || 0}
              />
            )}
          {matchDetail?.apiSessionActive &&
            matchesMobile &&
            matchDetail?.apiSession?.length > 0 && (
              <SessionMarket
                allBetsData={
                  matchDetail?.profitLossDataSession
                    ? Array.from(
                        matchDetail?.profitLossDataSession?.reduce(
                          (acc: any, obj: any) =>
                            acc.has(obj.betId)
                              ? acc
                              : acc.add(obj.betId) && acc,
                          new Set()
                        ),
                        (id) =>
                          matchDetail?.profitLossDataSession?.find(
                            (obj: any) => obj.betId === id
                          )
                      )
                    : []
                }
                title={"Session Market"}
                currentMatch={matchDetail}
                sessionData={matchDetail?.apiSession}
                min={formatToINR(Math.floor(matchDetail?.betFairSessionMinBet))}
                // max={formatToINR(Math.floor(matchDetail?.betFairSessionMaxBet))}
              />
            )}
          {sessionProLoss?.length > 0 && matchesMobile && (
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
              {sessionProLoss.map((v: any) => {
                return (
                  <RunsBox
                    key={v?.id}
                    item={v}
                    currentOdd={currentOdd?.betId === v?.id ? currentOdd : null}
                  />
                );
              })}
            </Box>
          )}
          {matchesMobile && (
            <UserProfitLoss
              single={"single"}
              title={"User Profit Loss"}
              // matchId={matchId}
              matchDetail={matchDetail}
            />
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            {mode && (
              <Box
                onClick={() => {
                  setMode(!mode);
                }}
                sx={{
                  width: "150px",
                  marginY: ".75%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "5px",
                  background: "#f1c550",
                  height: "35px",
                  border: "1.5px solid white",
                  display: "flex",
                  alignSelf: "flex-end",
                  cursor: "pointer",
                }}
              >
                <Typography
                  style={{
                    fontWeight: "600",
                    fontSize: "13px",
                    color: "black",
                    marginRight: "10px",
                  }}
                >
                  {"Cancel"}
                </Typography>
              </Box>
            )}
            <Box sx={{ width: "2%" }}></Box>
            <Box
              onClick={() => {
                if (mode) {
                  setVisible(true);
                } else {
                  setMode(!mode);
                }
              }}
              sx={{
                width: "150px",
                marginY: ".75%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                background: "#E32A2A",
                height: "35px",
                border: "1.5px solid white",
                display: "flex",
                alignSelf: "flex-end",
                cursor: "pointer",
              }}
            >
              <Typography
                style={{
                  fontWeight: "600",
                  fontSize: "13px",
                  color: "white",
                  marginRight: "10px",
                }}
              >
                {!mode ? "Delete Bet" : "Delete"}
              </Typography>
              <img src={DeleteIcon} style={{ width: "17px", height: "20px" }} />
            </Box>
          </Box>
          {placedBets?.length > 0 && (
            <Box sx={{ mt: 0 }}>
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
                setSelectedBetData={setSelectedBetData}
                selectedBetData={selectedBetData}
              />
            </Box>
          )}
        </Box>
        {!matchesMobile && <Box sx={{ width: "20px" }} />}
        {!matchesMobile && (
          <Box
            sx={{
              flex: 1,
              flexDirection: "column",
              display: "flex",
              minHeight: "100px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              {/* {mode && <CancelButton />} */}
              <Box sx={{ width: "2%" }}></Box>
              <Box
                sx={{ width: "150px", marginY: ".75%", height: "15px" }}
              ></Box>
            </Box>
            {matchDetail?.manualTiedMatch?.isActive && (
              <MatchOdds
                typeOfBet={"Manual Tied Match"}
                currentMatch={matchDetail}
                session={"manualBookMaker"}
                data={matchDetail?.manualTiedMatch}
                minBet={Math.floor(matchDetail?.manualTiedMatch?.minBet)}
                maxBet={Math.floor(matchDetail?.manualTiedMatch?.maxBet)}
              />
            )}
            <Box sx={{ width: "150px", height: "3px" }}></Box>
            {matchDetail?.manualSessionActive &&
              matchDetail?.sessionBettings?.filter(
                (item: any) => !JSON.parse(item).selectionId
              )?.length > 0 && (
                <SessionMarket
                  title={"Quick Session Market"}
                  allBetsData={
                    matchDetail?.profitLossDataSession
                      ? Array.from(
                          matchDetail?.profitLossDataSession?.reduce(
                            (acc: any, obj: any) =>
                              acc.has(obj.betId)
                                ? acc
                                : acc.add(obj.betId) && acc,
                            new Set()
                          ),
                          (id) =>
                            matchDetail?.profitLossDataSession?.find(
                              (obj: any) => obj.betId === id
                            )
                        )
                      : []
                  }
                  currentMatch={matchDetail}
                  sessionExposer={"0.00"}
                  sessionData={matchDetail?.sessionBettings?.filter(
                    (item: any) => !JSON.parse(item).selectionId
                  )}
                  min={matchDetail?.betFairSessionMinBet || 0}
                  max={matchDetail?.betFairSessionMaxBet || 0}
                />
              )}
            {matchDetail?.apiSessionActive &&
              matchDetail?.apiSession?.length > 0 && (
                <SessionMarket
                  title={"Session Market"}
                  allBetsData={
                    matchDetail?.profitLossDataSession
                      ? Array.from(
                          matchDetail?.profitLossDataSession?.reduce(
                            (acc: any, obj: any) =>
                              acc.has(obj.betId)
                                ? acc
                                : acc.add(obj.betId) && acc,
                            new Set()
                          ),
                          (id) =>
                            matchDetail?.profitLossDataSession?.find(
                              (obj: any) => obj.betId === id
                            )
                        )
                      : []
                  }
                  currentMatch={matchDetail}
                  sessionExposer={"0.00"}
                  sessionData={matchDetail?.apiSession}
                  max={Math.floor(matchDetail?.betFairSessionMaxBet)}
                  min={Math.floor(matchDetail?.betFairSessionMinBet)}
                />
              )}

            {sessionProLoss?.length > 0 && (
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
                {sessionProLoss.map((v: any) => {
                  return (
                    <RunsBox
                      key={v?.id}
                      item={v}
                      currentOdd={
                        currentOdd?.betId === v?.id ? currentOdd : null
                      }
                    />
                  );
                })}
              </Box>
            )}

            <UserProfitLoss
              single={"single"}
              title={"User Profit Loss"}
              matchDetail={matchDetail}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default MatchDetail;
