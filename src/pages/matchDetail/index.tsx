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
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlash } from "../../assets";
import Input from "../../components/login/Input";
import AddNotificationModal from "../../components/matchDetail/Common/AddNotificationModal";
import FullAllBets from "../../components/matchDetail/Common/FullAllBets";
import UserProfitLoss from "../../components/matchDetail/Common/UserProfitLoss";
import CricketCasinoMarket from "../../components/matchDetail/CricketCasinoMarket";
import DeleteEditComp from "../../components/matchDetail/DeleteEditComp";
import SessionMarket from "../../components/matchDetail/SessionMarket";
import RunsBox from "../../components/matchDetail/SessionMarket/RunsBox";
import TournamentOdds from "../../components/matchDetail/TournamentOdds";
import { customSortBySessionMarketName, formatToINR } from "../../helper";
import { matchService, socket, socketService } from "../../socketManager";
import {
  AllBetDelete,
  AllBetDeletePermanent,
  editBetDeleteReason,
  getMatchDetail,
  getMatchDetailMarketAnalysis,
  getPlacedBets,
  getUserProfitLoss,
  removeRunAmount,
  resetMarketAnalysys,
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
import { ApiConstants, sessionBettingType } from "../../utils/Constants";

const containerStyles = {
  marginTop: { xs: "2px", lg: "10px" },
};
const titleStyles = {
  color: "#202020",
  fontSize: { xs: "10px", lg: "12px" },
  fontWeight: "600",
  marginLeft: "0px",
};
const inputStyle = {
  fontSize: { xs: "10px", lg: "14px", fontWeight: "600" },
};
const inputContainerStyle = {
  borderRadius: "5px",
  border: "1px solid #DEDEDE",
};

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
  const [deleteCode, setDeleteCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
  useEffect(() => {
    if (state) {
      matchService.connect([state?.matchId], profileDetail?.roleName);
    }
    return () => {
      matchService.disconnect();
    };
  }, [state]);

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
          url: ApiConstants.MATCH.BETDELETE,
          data: payload,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteBetPermanent = () => {
    try {
      setSubmitting(true);
      if (!deleteCode) {
        setSubmitting(false);
        toast.error("Please enter permanent delete password");
        return;
      }
      let payload: any = {
        matchId: state?.matchId,
        urlData: {},
        password: deleteCode,
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
          url: ApiConstants.MATCH.BET_DELETE_PERMANENT,
          data: payload,
        })
      );
    } catch (e) {
      console.log(e);
    }
    setSubmitting(false);
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
      if (event?.matchId !== state?.matchId) return;
      if (event?.isMatchDeclare) {
        navigate(
          location.pathname.split("/")[2] === "live_market" ||
            location.pathname.split("/")[2] === "market_analysis"
            ? `/wallet/${location.pathname.split("/")[2]}`
            : `/wallet/${location.pathname.split("/")[2]}/${state.matchType || event?.gameType
            }`
        );
      } else {
        dispatch(
          getPlacedBets(
            `eq${state?.matchId}${state.userId
              ? `&userId=${state.userId}&roleName=${state?.roleName}`
              : ""
            }${state.domain ? `&domain=${state.domain}` : ""}`
          )
        );
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSessionResultUnDeclare = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        dispatch(updateMaxLossForBetOnUndeclare(event));
        dispatch(
          getPlacedBets(
            `eq${state?.matchId}${state.userId
              ? `&userId=${state.userId}&roleName=${state?.roleName}`
              : ""
            }${state.domain ? `&domain=${state.domain}` : ""}`
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMatchResultUndeclared = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        if (event?.betType) {
          dispatch(updateMatchRatesOnMarketUndeclare(event));
        } else {
          dispatch(getMatchDetail(state?.matchId));
          dispatch(getUserProfitLoss(state?.matchId));
        }
        dispatch(
          getPlacedBets(
            `eq${state?.matchId}${state.userId
              ? `&userId=${state.userId}&roleName=${state?.roleName}`
              : ""
            }${state.domain ? `&domain=${state.domain}` : ""}`
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePermanent = () => {
    if (profileDetail?.roleName == "fairGameWallet") {
      if (mode.value) {
        setMode((prev: any) => {
          return {
            ...prev,
            type: "deletePermanent",
            value: mode.value,
          };
        });
      } else {
        setMode((prev: any) => {
          return {
            ...prev,
            type: "deletePermanent",
            value: !mode.value,
          };
        });
      }
    }
  }

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
          })
        );
        if (state?.userId) {
          dispatch(
            getMatchDetailMarketAnalysis({
              matchId: state?.matchId,
              userId: state?.userId,
              domain: state?.domain,
            })
          );
        }
        dispatch(getUserProfitLoss(state?.matchId));
        dispatch(resetSessionProLoss());
        dispatch(
          getPlacedBets(
            `eq${state?.matchId}${state.userId
              ? `&userId=${state.userId}&roleName=${state?.roleName}`
              : ""
            }${state.domain ? `&domain=${state.domain}` : ""}`
          )
        );
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
        socketService.match.joinMatchRoom(state?.matchId);
        socketService.match.getMatchRates(
          state?.matchId,
          updateMatchDetailToRedux
        );
        if (!state?.userId) {
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
          socketService.match.matchResultUnDeclared(
            handleMatchResultUndeclared
          );
          socketService.match.updateDeleteReason(handleDeleteReasonUpdate);
        }
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
    if (state?.matchId) {
      const intervalId = setInterval(() => {
        dispatch(
          getMatchDetail({
            matchId: state?.matchId,
          })
        );
        dispatch(getUserProfitLoss(state?.matchId));
        dispatch(
          getPlacedBets(
            `eq${state?.matchId}${state.userId
              ? `&userId=${state.userId}&roleName=${state?.roleName}`
              : ""
            }${state.domain ? `&domain=${state.domain}` : ""}`
          )
        );
      }, 14100 * 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);
  useEffect(() => {
    if (permanentDeleteSuccess) {
      setPermanentDeletePopShow(false);
      setMode({ type: "", value: false });
      dispatch(resetPermanentDeleteSuccess());
    }
  }, [permanentDeleteSuccess]);

  useEffect(() => {
    return () => {
      dispatch(resetMarketAnalysys());
    };
  }, []);

  return (
    <>
      {visible && selectedBetData.length > 0 && (
        <AddNotificationModal
          title="Add Remark"
          visible={visible}
          loadingDeleteBet={loading}
          setVisible={setVisible}
          onDone={handleDeleteBet}
          buttonText="Delete"
        />
      )}
      {visibleEdit && selectedBetData.length > 0 && (
        <AddNotificationModal
          title="Edit Remark"
          visible={visibleEdit}
          loadingDeleteBet={loading}
          setVisible={setVisibleEdit}
          onDone={handleEditDeleteBetReason}
          buttonText="Edit"
        />
      )}
      <Dialog
        open={selectedBetData.length > 0 && permanentDeletePopShow}
        onClose={() => setPermanentDeletePopShow((prev) => !prev)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Input
            containerStyle={containerStyles}
            img={EyeIcon}
            img1={EyeSlash}
            titleStyle={titleStyles}
            inputStyle={inputStyle}
            inputContainerStyle={{
              ...inputContainerStyle,
              height: { lg: "45px", xs: "36px" },
            }}
            title="Password*"
            fullWidth={true}
            name="password"
            id="password"
            type="password"
            placeholder="Ex : Abc@12"
            required={true}
            value={deleteCode}
            onChange={(e: any) => setDeleteCode(e.target.value)}
          />
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setPermanentDeletePopShow(false)}>
            Cancel
          </Button>
          <Button
            sx={{ color: "#E32A2A" }}
            disabled={submitting}
            onClick={() => {
              handleDeleteBetPermanent();
            }}
          >
            Submit
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
            {matchDetail?.title}
          </Typography>
          {matchDetail?.tournament &&
            matchDetail?.tournament
              ?.filter(
                (items: any) =>
                  items.activeStatus === "live" &&
                  !["completed_match", "tied_match"].includes(
                    items?.name?.toLowerCase()
                  )
              )
              ?.sort((a: any, b: any) => a.sNo - b.sNo)
              ?.map((market: any, index: any) => {
                return (
                  <TournamentOdds
                    key={index}
                    currentMatch={matchDetail}
                    minBet={Math.floor(market?.minBet) || 0}
                    maxBet={Math.floor(market?.maxBet) || 0}
                    title={market?.name}
                    liveData={market}
                    profitLossFromAnalysis={marketAnalysis?.betType?.match?.find(
                      (item: any) =>
                        item?.betId === (market?.parentBetId || market?.id)
                    )}
                  />
                );
              })}
          {matchDetail?.manualSessionActive &&
            matchDetail?.sessionBettings?.filter(
              (item: any) =>
                !JSON.parse(item).selectionId &&
                JSON.parse(item)?.activeStatus === "live"
            )?.length > 0 &&
            matchesMobile && (
              <SessionMarket
                title="Quick Session Market"
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
              ?.map(([key, value]: any, index: number) => {
                return (
                  <SessionMarket
                    key={index}
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
              ?.map((item: any, index: number) => {
                return (
                  <CricketCasinoMarket
                    key={index}
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
          {matchDetail?.tournament &&
            matchDetail?.tournament
              ?.filter(
                (items: any) =>
                  items.activeStatus === "live" &&
                  ["completed_match", "tied_match"].includes(
                    items?.name?.toLowerCase()
                  )
              )
              ?.sort((a: any, b: any) => a.sNo - b.sNo)
              ?.map((market: any, index: any) => {
                return (
                  <TournamentOdds
                    key={index}
                    currentMatch={matchDetail}
                    minBet={Math.floor(market?.minBet) || 0}
                    maxBet={Math.floor(market?.maxBet) || 0}
                    title={market?.name}
                    liveData={market}
                    profitLossFromAnalysis={marketAnalysis?.betType?.match?.find(
                      (item: any) =>
                        item?.betId === (market?.parentBetId || market?.id)
                    )}
                  />
                );
              })}
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
              single="single"
              title="User Profit Loss"
              matchDetail={matchDetail}
            />
          )}
          {matchDetail?.manualSessionActive &&
            <>
              {!state?.userId && (
                <DeleteEditComp
                  mode={mode}
                  setMode={setMode}
                  setPermanentDeletePopShow={setPermanentDeletePopShow}
                  setVisible={setVisible}
                  setVisibleEdit={setVisibleEdit}
                />
              )}
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
                    role={state.roleName}
                    deletePermanent={handleDeletePermanent}
                  />
                </Box>
              )}
            </>
          }
        </Box>
        {!matchesMobile && <Box sx={{ width: "20px" }} />}
        {!matchesMobile && (
          <Box
            sx={{
              flex: 1,
              flexDirection: "column",
              display: "flex",
              minHeight: "100px",
              maxWidth: "50%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Box sx={{ width: "2%" }} />
              <Box sx={{ width: "150px", marginY: ".75%", height: "15px" }} />
            </Box>
            <Box sx={{ width: "150px", height: "3px" }} />
            {matchDetail?.manualSessionActive &&
              matchDetail?.sessionBettings?.filter(
                (item: any) =>
                  !JSON.parse(item).selectionId &&
                  JSON.parse(item)?.activeStatus === "live"
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
                  type="session"
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
              single="single"
              title="User Profit Loss"
              matchDetail={matchDetail}
            />
            {!matchDetail?.manualSessionActive &&
              <>
                {!state?.userId && (
                  <DeleteEditComp
                    mode={mode}
                    setMode={setMode}
                    setPermanentDeletePopShow={setPermanentDeletePopShow}
                    setVisible={setVisible}
                    setVisibleEdit={setVisibleEdit}
                  />
                )}
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
                      role={state.roleName}
                      deletePermanent={handleDeletePermanent}
                    />
                  </Box>
                )}
              </>
            }
          </Box>
        )}
      </Box>
    </>
  );
};

export default memo(MatchDetail);
