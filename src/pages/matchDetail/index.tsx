import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  AllBetDelete,
  AllBetDeletePermanent,
  editBetDeleteReason,
  getMatchDetail,
  getMatchDetailMarketAnalysis,
  getPlacedBets,
  getUserProfitLoss,
  removeRunAmount,
  resetPermanentDeleteSuccess,
  resetSessionProLoss,
  resetUserProfitLoss,
  setCurrentOdd,
  updateBetDataOnDeclare,
  updateBetsPlaced,
  updateMatchRates,
  updateMatchRatesOnMarketUndeclare,
  updateMaxLossForBet,
  updateMaxLossForBetOnUndeclare,
  updateMaxLossForDeleteBet,
  updatePlacedbets,
  updatePlacedbetsDeleteReason,
  updateProfitLoss,
  updateTeamRates,
  updateTeamRatesOnDelete,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import {
  customSortBySessionMarketName,
  customSortOnName,
  formatToINR,
} from "../../helper";
import { ApiConstants, sessionBettingType } from "../../utils/Constants";
import CricketCasinoMarket from "../../components/matchDetail/CricketCasinoMarket";
import TournamentOdds from "../../components/matchDetail/TournamentOdds";

const MatchDetail = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const { marketAnalysis } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const [mode, setMode] = useState({ type: "", value: false });
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selectedBetData, setSelectedBetData] = useState([]);
  const [permanentDeletePopShow, setPermanentDeletePopShow] = useState(false);
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
  const { permanentDeleteSuccess } = useSelector(
    (state: RootState) => state.match.sideBarList
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
      dispatch(
        AllBetDelete({
          url: ["cricket", "politics"].includes(matchDetail?.matchType)
            ? ApiConstants.MATCH.BETDELETE
            : ApiConstants.MATCH.BETDELETEOTHER,
          data: payload,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteBetPermanent = () => {
    try {
      let payload: any = {
        matchId: state?.matchId,
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
      dispatch(
        AllBetDeletePermanent({
          url: ["cricket", "politics"].includes(matchDetail?.matchType)
            ? ApiConstants.MATCH.BET_DELETE_PERMANENT
            : ApiConstants.MATCH.BET_DELETE_OTHER_PERMANENT,
          data: payload,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };
  const handleEditDeleteBetReason = (value: any) => {
    try {
      let payload: any = {
        matchId: state?.matchId,
        deleteReason: value,
        betData: {},
      };
      selectedBetData.forEach((item: any) => {
        const { domain } = item;

        if (!payload.betData[domain]) {
          payload.betData[domain] = [];
        }

        payload.betData[domain].push(item.id);
      });
      dispatch(editBetDeleteReason(payload));
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
        if (
          event?.gameType === "cricket" ||
          event?.betType === "quickbookmaker1"
        ) {
          navigate(
            `/wallet/${location.pathname.split("/")[2]}/${state.matchType}`
          );
        } else {
          dispatch(getPlacedBets(`eq${state?.matchId}`));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const matchDeleteBet = (event: any) => {
    try {
      setMode({ type: "", value: false });
      if (event?.matchId === state?.matchId) {
        setSelectedBetData([]);
        dispatch(updatePlacedbets(event));
        dispatch(updateTeamRatesOnDelete(event));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeleteReasonUpdate = (event: any) => {
    try {
      setMode({ type: "", value: false });
      if (event?.matchId === state?.matchId) {
        setSelectedBetData([]);
        dispatch(updatePlacedbetsDeleteReason(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSessionDeleteBet = (event: any) => {
    try {
      setMode({ type: "", value: false });
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

  const handleMatchResultUndeclared = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        if (event?.betType !== "quickbookmaker1") {
          dispatch(getPlacedBets(`eq${state?.matchId}`));
          dispatch(updateMatchRatesOnMarketUndeclare(event));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (matchDetail && matchDetail?.stopAt) {
      navigate(`/wallet/${location.pathname.split("/")[2]}/${state.matchType}`);
    }
  }, [matchDetail]);

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
      if (state?.matchId && profileDetail?.roleName) {
        dispatch(
          getMatchDetail({
            matchId: state?.matchId,
            matchType: state?.matchType,
          })
        );
        if (state?.userId) {
          dispatch(
            getMatchDetailMarketAnalysis({
              matchId: state?.matchId,
              userId: state?.userId,
            })
          );
        }
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
        socketService.match.matchResultUnDeclaredOff();
        socketService.match.updateDeleteReasonOff();
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
        socketService.match.matchResultUnDeclared(handleMatchResultUndeclared);
        socketService.match.updateDeleteReason(handleDeleteReasonUpdate);
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
      socketService.match.matchResultUnDeclaredOff();
      socketService.match.updateDeleteReasonOff();
      dispatch(resetUserProfitLoss());
    };
  }, [state?.matchId]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (state?.matchId) {
          dispatch(
            getMatchDetail({
              matchId: state?.matchId,
              matchType: state?.matchType,
            })
          );
          if (state?.userId) {
            dispatch(
              getMatchDetailMarketAnalysis({
                matchId: state?.matchId,
                userId: state?.userId,
              })
            );
          }
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
  }, [state]);

  useEffect(() => {
    if (state?.matchId) {
      const intervalId = setInterval(() => {
        dispatch(
          getMatchDetail({
            matchId: state?.matchId,
            matchType: state?.matchType,
          })
        );
        dispatch(getUserProfitLoss(state?.matchId));
        dispatch(getPlacedBets(`eq${state?.matchId}`));
      }, 14100 * 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);
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

  useEffect(() => {
    if (permanentDeleteSuccess) {
      setPermanentDeletePopShow(false);
      setMode({ type: "", value: false });
      dispatch(resetPermanentDeleteSuccess());
    }
  }, [permanentDeleteSuccess]);

  let profitLossFromAnalysisForMarket = marketAnalysis?.betType?.match?.filter(
    (item: any) =>
      [
        "matchOdd",
        "bookmaker",
        "bookmaker2",
        "quickbookmaker1",
        "quickbookmaker2",
        "quickbookmaker3",
      ].includes(item?.marketType)
  );
  let profitLossFromAnalysisForTiedMarket =
    marketAnalysis?.betType?.match?.filter((item: any) =>
      ["tiedMatch1", "tiedMatch2", "tiedMatch3"].includes(item?.marketType)
    );
  let profitLossFromAnalysisForCompleteMarket =
    marketAnalysis?.betType?.match?.filter((item: any) =>
      ["completeMatch", "completeMatch1", "completeManual"].includes(
        item?.marketType
      )
    );
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
              setMode({ type: "", value: false });
            }}
            buttonText="Delete"
          />
        </>
      )}
      {visibleEdit && selectedBetData.length > 0 && (
        <>
          <AddNotificationModal
            value={""}
            title={"Edit Remark"}
            visible={visibleEdit}
            loadingDeleteBet={loading}
            setVisible={setVisibleEdit}
            onDone={handleEditDeleteBetReason}
            onClick={(e: any) => {
              e.stopPropagation();
              setVisibleEdit(false);
              setMode({ type: "", value: false });
            }}
            buttonText="Edit"
          />
        </>
      )}
      <Dialog
        open={selectedBetData.length > 0 && permanentDeletePopShow}
        onClose={() => setPermanentDeletePopShow((prev) => !prev)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure want to delete these Bets?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setPermanentDeletePopShow((prev) => !prev)}>
            No
          </Button>
          <Button
            sx={{ color: "#E32A2A" }}
            onClick={() => {
              handleDeleteBetPermanent();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
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
              liveData={matchDetail?.matchOdd}
              data={
                matchDetail?.matchOdd?.runners?.length > 0
                  ? matchDetail?.matchOdd?.runners
                  : []
              }
              profitLossFromAnalysis={
                marketAnalysis?.betType?.match?.find(
                  (item: any) => item?.betId === matchDetail?.matchOdd?.id
                ) ?? profitLossFromAnalysisForMarket?.[0]
              }
            />
          )}
          {matchDetail?.bookmaker?.isActive && (
            <LiveBookmaker
              currentMatch={matchDetail}
              showBox={matchDetail?.bookmaker?.activeStatus === "save"}
              minBet={Math.floor(matchDetail?.bookmaker?.minBet)}
              maxBet={Math.floor(matchDetail?.bookmaker?.maxBet)}
              liveData={matchDetail?.bookmaker}
              data={
                matchDetail?.bookmaker?.runners?.length > 0
                  ? matchDetail?.bookmaker?.runners
                  : []
              }
              title={matchDetail?.bookmaker?.name}
              profitLossFromAnalysis={
                marketAnalysis?.betType?.match?.find(
                  (item: any) => item?.betId === matchDetail?.bookmaker?.id
                ) ?? profitLossFromAnalysisForMarket?.[0]
              }
            />
          )}
          {matchDetail?.other &&
            matchDetail?.other?.map((match: any) => (
              <LiveBookmaker
                currentMatch={matchDetail}
                showBox={match?.activeStatus === "save"}
                minBet={Math.floor(match?.minBet)}
                maxBet={Math.floor(match?.maxBet)}
                liveData={match}
                data={match?.runners?.length > 0 ? match?.runners : []}
                title={match?.name}
                profitLossFromAnalysis={marketAnalysis?.betType?.match?.find(
                  (item: any) => item?.betId === match?.id
                )}
              />
            ))}
          {matchDetail?.tournament &&
            matchDetail?.tournament?.map((market: any, index: any) => {
              return (
                <TournamentOdds
                  key={index}
                  currentMatch={matchDetail}
                  minBet={Math.floor(market?.minBet) || 0}
                  maxBet={Math.floor(market?.maxBet) || 0}
                  title={market?.name}
                  liveData={market}
                  profitLossFromAnalysis={marketAnalysis?.betType?.match?.find(
                    (item: any) => item?.betId === market?.id
                  )}
                />
              );
            })}
          {matchDetail?.marketBookmaker2?.isActive && (
            <LiveBookmaker
              currentMatch={matchDetail}
              showBox={matchDetail?.marketBookmaker2?.activeStatus === "save"}
              minBet={Math.floor(matchDetail?.marketBookmaker2?.minBet)}
              maxBet={Math.floor(matchDetail?.marketBookmaker2?.maxBet)}
              liveData={matchDetail?.marketBookmaker2}
              data={
                matchDetail?.marketBookmaker2?.runners?.length > 0
                  ? matchDetail?.marketBookmaker2?.runners
                  : []
              }
              title={matchDetail?.marketBookmaker2?.name}
              profitLossFromAnalysis={
                marketAnalysis?.betType?.match?.find(
                  (item: any) =>
                    item?.betId === matchDetail?.marketBookmaker2?.id
                ) ?? profitLossFromAnalysisForMarket?.[0]
              }
            />
          )}

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
                  liveData={bookmaker}
                  profitLossFromAnalysis={
                    marketAnalysis?.betType?.match?.find(
                      (item: any) => item?.betId === bookmaker?.id
                    ) ?? profitLossFromAnalysisForMarket?.[0]
                  }
                />
              );
            })}

          {matchDetail?.firstHalfGoal?.length > 0 &&
            matchDetail?.firstHalfGoal
              ?.filter((item: any) => item?.isActive)
              ?.slice()
              ?.sort(customSortOnName)
              ?.map((item: any, index: any) => {
                return (
                  <MatchOdds
                    key={index}
                    currentMatch={matchDetail}
                    session={"firstHalfGoal"}
                    data={item?.runners?.length > 0 ? item?.runners : []}
                    minBet={Math.floor(item?.minBet) || 0}
                    maxBet={Math.floor(item?.maxBet) || 0}
                    typeOfBet={convertString(item?.name)}
                    liveData={item}
                  />
                );
              })}
          {matchDetail?.halfTime?.isActive && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Half Time"}
              showBox={matchDetail?.halfTime?.activeStatus === "save"}
              minBet={Math.floor(matchDetail?.halfTime?.minBet)}
              maxBet={Math.floor(matchDetail?.halfTime?.maxBet)}
              liveData={matchDetail?.halfTime}
              data={
                matchDetail?.halfTime?.runners?.length > 0
                  ? matchDetail?.halfTime?.runners
                  : []
              }
            />
          )}
          {matchDetail?.overUnder?.length > 0 &&
            matchDetail?.overUnder
              ?.filter((item: any) => item?.isActive)
              ?.slice()
              ?.sort(customSortOnName)
              ?.map((item: any, index: any) => {
                return (
                  <MatchOdds
                    key={index}
                    currentMatch={matchDetail}
                    session={"overUnder"}
                    data={item?.runners?.length > 0 ? item?.runners : []}
                    minBet={Math.floor(item?.minBet) || 0}
                    maxBet={Math.floor(item?.maxBet) || 0}
                    typeOfBet={convertString(item?.name)}
                    liveData={item}
                  />
                );
              })}
          {matchDetail?.setWinner?.length > 0 &&
            matchDetail?.setWinner
              ?.filter((item: any) => item?.isActive)
              ?.slice()
              ?.sort(customSortOnName)
              ?.map((item: any, index: any) => {
                return (
                  <MatchOdds
                    key={index}
                    currentMatch={matchDetail}
                    session={"setWinner"}
                    minBet={Math.floor(item?.minBet) || 0}
                    maxBet={Math.floor(item?.maxBet) || 0}
                    typeOfBet={convertString(item?.name)}
                    liveData={item}
                    data={item?.runners?.length > 0 ? item?.runners : []}
                  />
                );
              })}

          {matchDetail?.apiTideMatch2?.isActive && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Tied Match"}
              title={matchDetail?.apiTideMatch2?.name}
              showBox={matchDetail?.apiTideMatch2?.activeStatus === "save"}
              minBet={Math.floor(matchDetail?.apiTideMatch2?.minBet)}
              maxBet={Math.floor(matchDetail?.apiTideMatch2?.maxBet)}
              liveData={matchDetail?.apiTideMatch2}
              data={
                matchDetail?.apiTideMatch2?.runners?.length > 0
                  ? matchDetail?.apiTideMatch2?.runners
                  : []
              }
              profitLossFromAnalysis={
                marketAnalysis?.betType?.match?.find(
                  (item: any) => item?.betId === matchDetail?.apiTideMatch2?.id
                ) ?? profitLossFromAnalysisForTiedMarket?.[0]
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
              liveData={matchDetail?.manualTiedMatch}
              title={matchDetail?.manualTiedMatch?.name}
              profitLossFromAnalysis={
                marketAnalysis?.betType?.match?.find(
                  (item: any) =>
                    item?.betId === matchDetail?.manualTiedMatch?.id
                ) ?? profitLossFromAnalysisForTiedMarket?.[0]
              }
            />
          )}
          {matchDetail?.marketCompleteMatch1?.isActive && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Market Complete Match"}
              showBox={
                matchDetail?.marketCompleteMatch1?.activeStatus === "save"
              }
              minBet={Math.floor(matchDetail?.marketCompleteMatch1?.minBet)}
              maxBet={Math.floor(matchDetail?.marketCompleteMatch1?.maxBet)}
              liveData={matchDetail?.marketCompleteMatch1}
              data={
                matchDetail?.marketCompleteMatch1?.runners?.length > 0
                  ? matchDetail?.marketCompleteMatch1?.runners
                  : []
              }
              title={matchDetail?.marketCompleteMatch1?.name}
              profitLossFromAnalysis={
                marketAnalysis?.betType?.match?.find(
                  (item: any) =>
                    item?.betId === matchDetail?.marketCompleteMatch1?.id
                ) ?? profitLossFromAnalysisForCompleteMarket?.[0]
              }
            />
          )}

          {matchDetail?.manualCompleteMatch?.isActive && matchesMobile && (
            <MatchOdds
              typeOfBet={"Manual Complete Match"}
              data={matchDetail?.manualCompleteMatch}
              currentMatch={matchDetail}
              session={"manualBookMaker"}
              minBet={Math.floor(matchDetail?.manualCompleteMatch?.minBet)}
              maxBet={Math.floor(matchDetail?.manualCompleteMatch?.maxBet)}
              liveData={matchDetail?.manualCompleteMatch}
              title={matchDetail?.manualCompleteMatch?.name}
              profitLossFromAnalysis={
                marketAnalysis?.betType?.match?.find(
                  (item: any) =>
                    item?.betId === matchDetail?.manualCompleteMatch?.id
                ) ?? profitLossFromAnalysisForCompleteMarket?.[0]
              }
            />
          )}

          {matchDetail?.manualSessionActive &&
            matchesMobile &&
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
                sessionData={matchDetail?.sessionBettings?.filter(
                  (item: any) => !JSON.parse(item).selectionId
                )}
                min={formatToINR(matchDetail?.betFairSessionMinBet) || 0}
                // max={formatToINR(matchDetail?.betFairSessionMaxBet) || 0}
                type="session"
              />
            )}
          {matchDetail?.apiSessionActive &&
            Object.entries(matchDetail?.apiSession || {})
              ?.filter(
                ([key, value]: any) =>
                  value?.section?.length > 0 &&
                  key != sessionBettingType.cricketCasino
              )
              ?.slice()
              ?.sort(customSortBySessionMarketName)
              ?.map(([key, value]: any) => {
                return (
                  <SessionMarket
                    key={key}
                    title={value?.mname || key}
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
                    sessionData={value?.section}
                    min={formatToINR(matchDetail?.betFairSessionMinBet) || 0}
                    max={formatToINR(matchDetail?.betFairSessionMaxBet) || 0}
                    type={key || value?.gtype}
                  />
                );
              })}
          {matchDetail?.apiSessionActive &&
            (matchDetail?.apiSession?.cricketCasino?.section || [])
              ?.filter(
                (item: any) =>
                  !(
                    item?.activeStatus === "unSave" ||
                    item?.activeStatus === "result"
                  )
              )
              ?.map((item: any) => {
                return (
                  <CricketCasinoMarket
                    key={item?.selectionId}
                    title={item?.RunnerName}
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
                    sessionData={item}
                    min={formatToINR(matchDetail?.betFairSessionMinBet) || 0}
                    max={formatToINR(matchDetail?.betFairSessionMaxBet) || 0}
                    type={sessionBettingType.cricketCasino}
                  />
                );
              })}
          {matchDetail?.apiTideMatch?.isActive && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Tied Match"}
              title={matchDetail?.apiTideMatch?.name}
              showBox={matchDetail?.apiTideMatch?.activeStatus === "save"}
              minBet={Math.floor(matchDetail?.apiTideMatch?.minBet)}
              maxBet={Math.floor(matchDetail?.apiTideMatch?.maxBet)}
              liveData={matchDetail?.apiTideMatch}
              data={
                matchDetail?.apiTideMatch?.runners?.length > 0
                  ? matchDetail?.apiTideMatch?.runners
                  : []
              }
              profitLossFromAnalysis={
                marketAnalysis?.betType?.match?.find(
                  (item: any) => item?.betId === matchDetail?.apiTideMatch?.id
                ) ?? profitLossFromAnalysisForTiedMarket?.[0]
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
              liveData={matchDetail?.marketCompleteMatch}
              data={
                matchDetail?.marketCompleteMatch?.runners?.length > 0
                  ? matchDetail?.marketCompleteMatch?.runners
                  : []
              }
              title={matchDetail?.marketCompleteMatch?.name}
              profitLossFromAnalysis={
                marketAnalysis?.betType?.match?.find(
                  (item: any) =>
                    item?.betId === matchDetail?.marketCompleteMatch?.id
                ) ?? profitLossFromAnalysisForCompleteMarket?.[0]
              }
            />
          )}
          {/* {matchDetail?.apiSessionActive &&
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
            )} */}
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
            {mode.value && (
              <Box
                onClick={() => {
                  setMode((prev: any) => {
                    return {
                      ...prev,
                      type: "",
                      value: !mode.value,
                    };
                  });
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
            {!["edit", "delete"].includes(mode?.type) && (
              <>
                <Box sx={{ width: "2%" }}></Box>
                <Box
                  onClick={() => {
                    if (mode.value && mode?.type === "deletePermanent") {
                      setPermanentDeletePopShow(true);
                    } else {
                      setMode((prev: any) => {
                        return {
                          ...prev,
                          type: "deletePermanent",
                          value: !mode.value,
                        };
                      });
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
                    {!mode.value ? "Delete Permanent" : "Delete"}
                  </Typography>
                  <img
                    src={DeleteIcon}
                    style={{ width: "17px", height: "20px" }}
                  />
                </Box>
              </>
            )}
            {!["edit", "deletePermanent"].includes(mode?.type) && (
              <>
                <Box sx={{ width: "2%" }}></Box>
                <Box
                  onClick={() => {
                    if (mode.value && mode?.type === "delete") {
                      setVisible(true);
                    } else {
                      setMode((prev: any) => {
                        return {
                          ...prev,
                          type: "delete",
                          value: !mode.value,
                        };
                      });
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
                    {!mode.value ? "Delete Bet" : "Delete"}
                  </Typography>
                  <img
                    src={DeleteIcon}
                    style={{ width: "17px", height: "20px" }}
                  />
                </Box>
              </>
            )}
            {!["delete", "deletePermanent"].includes(mode?.type) && (
              <>
                <Box sx={{ width: "2%" }}></Box>
                <Box
                  onClick={() => {
                    if (mode.value && mode?.type === "edit") {
                      setVisibleEdit(true);
                    } else {
                      setMode((prev: any) => {
                        return {
                          ...prev,
                          type: "edit",
                          value: !mode.value,
                        };
                      });
                    }
                  }}
                  sx={{
                    width: "150px",
                    marginY: ".75%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "5px",
                    background: "#004A25",
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
                    {!mode.value ? "Edit Reason" : "Edit"}
                  </Typography>
                  <EditOutlinedIcon
                    fontSize="small"
                    sx={{
                      color: "#FFFFFF",
                      cursor: "pointer",
                    }}
                  />
                </Box>
              </>
            )}
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
                liveData={matchDetail?.manualTiedMatch}
              />
            )}
            {matchDetail?.manualCompleteMatch?.isActive && (
              <MatchOdds
                typeOfBet={"Manual Complete Match"}
                currentMatch={matchDetail}
                session={"manualBookMaker"}
                data={matchDetail?.manualCompleteMatch}
                minBet={Math.floor(matchDetail?.manualCompleteMatch?.minBet)}
                maxBet={Math.floor(matchDetail?.manualCompleteMatch?.maxBet)}
                liveData={matchDetail?.manualCompleteMatch}
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
                  sessionData={matchDetail?.sessionBettings?.filter(
                    (item: any) => !JSON.parse(item).selectionId
                  )}
                  min={matchDetail?.betFairSessionMinBet || 0}
                  max={matchDetail?.betFairSessionMaxBet || 0}
                />
              )}
            {/* {matchDetail?.apiSessionActive &&
              Object.entries(matchDetail?.apiSession || {})
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
                      sessionData={value?.section}
                      min={formatToINR(matchDetail?.betFairSessionMinBet) || 0}
                      max={formatToINR(matchDetail?.betFairSessionMaxBet) || 0}
                      type={key || value?.gtype}
                    />
                  );
                })} */}

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
