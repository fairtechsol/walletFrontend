import {
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import FullAllBets from "../../../components/matchDetail/Common/FullAllBets";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getPlacedBets,
  updateBetsPlaced,
  updatePlacedbets,
  updatePlacedbetsDeleteReason,
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { socket, socketService, matchService } from "../../../socketManager";
import {
  getMultipleMatchDetailHorseRacing,
  updateMultiMatchRatesForHorseRacing,
  updateTeamRatesOfMultipleMatchForHorseRacing,
  updateTeamRatesOnDeleteForMultiMatchRace,
} from "../../../store/actions/horseRacing/multiplematchDetailAction";
import MatchOddsHorseRacing from "../../../components/horseRacingComp/MatchOddsHorseRacing";
import UserProfitLossRace from "../../../components/horseRacingComp/userProfitLoss/userProfitLossRace";
import moment from "moment";
import { getTimeLeft } from "../../../helper";

const MultipleMatchHorseRacing = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();
  const [storedMatchData, setStoredMatchData] = useState({
    matchId: "",
    match: null,
  });
  const [showUserProfitLoss, setShowUserProfitLoss] = useState(false);
  const [selectedBetData, setSelectedBetData] = useState([]);
  const { multipleMatchDetail, success } = useSelector(
    (state: RootState) => state.horseRacing.multipleMatch
  );
  const { placedBets } = useSelector((state: RootState) => state.match.bets);

  const updateMatchDetailToRedux = (event: any) => {
    dispatch(updateMultiMatchRatesForHorseRacing(event));
  };

  useEffect(() => {
    if(state){
      matchService.connect(state?.matchIds, profileDetail?.roleName);
    }
    return () => {
      matchService.disconnect(); 
    };
  }, [state]);

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
        dispatch(updateTeamRatesOfMultipleMatchForHorseRacing(event));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const matchMultiResultDeclared = (event: any) => {
    try {
      if (state?.matchIds.includes(event?.matchId)) {
        navigate(`/wallet/market_analysis2/${event?.gameType}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMultiMatchDeleteBet = (event: any) => {
    if (state?.matchIds.includes(event?.matchId)) {
      dispatch(updatePlacedbets(event));
      dispatch(updateTeamRatesOnDeleteForMultiMatchRace(event));
    }
  };

  const handleClicked = (item: any) => {
    try {
      setStoredMatchData(() => {
        return {
          matchId: item?.matchId,
          match: item?.match,
        };
      });
      setShowUserProfitLoss(true);
    } catch (e) {
      console.log(e);
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
      multipleMatchDetail.some((item: any) => item?.matchOdd?.stopAt)
    ) {
      navigate(`/wallet/market_analysis2/${state?.matchType}`);
    }
  }, [multipleMatchDetail]);

  useEffect(() => {
    try {
      if (state?.matchIds) {
        dispatch(
          getMultipleMatchDetailHorseRacing({
            ids: state?.matchIds,
            matchType: state.matchType,
          })
        );
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
        socketService.match.userMatchBetPlacedOff();
        socketService.match.matchResultDeclaredOff();
        socketService.match.declaredMatchResultAllUserOff();
        socketService.match.matchDeleteBetOff();
        socketService.match.updateDeleteReasonOff();
        state?.matchIds?.map((item: any) => {
          socketService.match.joinMatchRoom(item);
        });
        state?.matchIds?.map((item: any) => {
          socketService.match.getMatchRates(item, updateMatchDetailToRedux);
        });
        socketService.match.userMatchBetPlaced(setMultiMatchBetsPlaced);
        socketService.match.matchResultDeclared(matchMultiResultDeclared);
        socketService.match.declaredMatchResultAllUser(
          matchMultiResultDeclared
        );
        socketService.match.matchDeleteBet(handleMultiMatchDeleteBet);
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
      socketService.match.userMatchBetPlacedOff();
      socketService.match.matchResultDeclaredOff();
      socketService.match.declaredMatchResultAllUserOff();
      socketService.match.matchDeleteBetOff();
      socketService.match.updateDeleteReasonOff();
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (state?.matchIds) {
          dispatch(
            getMultipleMatchDetailHorseRacing({
              ids: state?.matchIds,
              matchType: state.matchType,
            })
          );
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
                  let timeLeft = getTimeLeft(item?.startAt);
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
                                {`${
                                  item?.countryCode ? item?.countryCode : ""
                                } > ${item?.venue ? item?.venue : ""}`}
                                <Button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleClicked({
                                      matchId: item?.id,
                                      match: item,
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
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: "white",
                                  fontWeight: "700",
                                  alignSelf: "start",
                                }}
                              >
                                {`${moment(item?.startAt).format(
                                  "YYYY-MM-DD HH:mm"
                                )} | ${item?.title ? item?.title : ""}`}
                                {+timeLeft.hours !== 0 ||
                                +timeLeft.minutes !== 0
                                  ? ` | ${timeLeft?.hours} hours ${timeLeft?.minutes} Minutes Remaining`
                                  : ""}
                              </Typography>
                              <MatchOddsHorseRacing
                                currentMatch={item}
                                typeOfBet={"Match Odds"}
                                showBox={
                                  item?.matchOdd?.activeStatus === "save"
                                }
                                minBet={Math.floor(item?.matchOdd?.minBet)}
                                maxBet={Math.floor(item?.matchOdd?.maxBet)}
                                liveData={item?.matchOdd}
                                data={
                                  item?.matchOdd?.runners?.length > 0
                                    ? item?.matchOdd?.runners
                                    : []
                                }
                              />
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
                              {`${
                                item?.countryCode ? item?.countryCode : ""
                              } > ${item?.venue ? item?.venue : ""}`}
                              <Button
                                onClick={() =>
                                  handleClicked({
                                    matchId: item?.id,
                                    match: item,
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
                            <Typography
                              sx={{
                                fontSize: "12px",
                                color: "white",
                                fontWeight: "700",
                                alignSelf: "start",
                              }}
                            >
                              {`${moment(item?.startAt).format(
                                "YYYY-MM-DD HH:mm"
                              )} | ${item?.title ? item?.title : ""}`}
                              {+timeLeft.hours !== 0 || +timeLeft.minutes !== 0
                                ? ` | ${timeLeft?.hours} hours ${timeLeft?.minutes} Minutes Remaining`
                                : ""}
                            </Typography>
                            <MatchOddsHorseRacing
                              currentMatch={item}
                              typeOfBet={"Match Odds"}
                              showBox={item?.matchOdd?.activeStatus === "save"}
                              minBet={Math.floor(item?.matchOdd?.minBet)}
                              maxBet={Math.floor(item?.matchOdd?.maxBet)}
                              liveData={item?.matchOdd}
                              data={
                                item?.matchOdd?.runners?.length > 0
                                  ? item?.matchOdd?.runners
                                  : []
                              }
                            />
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
                <UserProfitLossRace
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
                  let timeLeft = getTimeLeft(item?.startAt);
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
                          {`${item?.countryCode ? item?.countryCode : ""} > ${
                            item?.venue ? item?.venue : ""
                          }`}
                          <Button
                            onClick={() =>
                              handleClicked({
                                matchId: item?.id,
                                match: item,
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
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "white",
                            fontWeight: "700",
                            alignSelf: "start",
                          }}
                        >
                          {`${moment(item?.startAt).format(
                            "YYYY-MM-DD HH:mm"
                          )} | ${item?.title ? item?.title : ""}`}
                          {+timeLeft.hours !== 0 || +timeLeft.minutes !== 0
                            ? ` | ${timeLeft?.hours} hours ${timeLeft?.minutes} Minutes Remaining`
                            : ""}
                        </Typography>
                        <MatchOddsHorseRacing
                          currentMatch={item}
                          typeOfBet={"Match Odds"}
                          showBox={item?.matchOdd?.activeStatus === "save"}
                          minBet={Math.floor(item?.matchOdd?.minBet)}
                          maxBet={Math.floor(item?.matchOdd?.maxBet)}
                          liveData={item?.matchOdd}
                          data={
                            item?.matchOdd?.runners?.length > 0
                              ? item?.matchOdd?.runners
                              : []
                          }
                        />
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
                <UserProfitLossRace
                  title={"User Profit Loss"}
                  matchData={storedMatchData}
                  setShowUserProfitLoss={setShowUserProfitLoss}
                  single={"multiple"}
                  matchDetail={storedMatchData?.match}
                />
              </Box>
            </Box>
          </ModalMUI>
        </>
      )}
    </>
  );
};

export default MultipleMatchHorseRacing;
