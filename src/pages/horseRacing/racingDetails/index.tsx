import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
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
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteIcon } from "../../../assets";
import MatchOddsHorseRacing from "../../../components/horseRacingComp/MatchOddsHorseRacing";
import UserProfitLossRace from "../../../components/horseRacingComp/userProfitLoss/userProfitLossRace";
import AddNotificationModal from "../../../components/matchDetail/Common/AddNotificationModal";
import FullAllBets from "../../../components/matchDetail/Common/FullAllBets";
import { getTimeLeft } from "../../../helper";
import { matchService, socket, socketService } from "../../../socketManager";
import {
  getMatchDetailHorseRacing,
  getUserProfitLossForRace,
  updateMatchRatesForHorseRacing,
  updateTeamRatesForHorseRacing,
  updateTeamRatesForHorseRacingOnDelete,
} from "../../../store/actions/horseRacing/horseMatchDetailActions";
import {
  AllBetDelete,
  AllBetDeletePermanent,
  editBetDeleteReason,
  getPlacedBets,
  resetPermanentDeleteSuccess,
  resetSessionProLoss,
  updateBetsPlaced,
  updatePlacedbets,
  updatePlacedbetsDeleteReason,
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import { ApiConstants } from "../../../utils/Constants";

const RacingDetails = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { id, matchType } = useParams();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const [mode, setMode] = useState({ type: "", value: false });
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selectedBetData, setSelectedBetData] = useState([]);
  const [permanentDeletePopShow, setPermanentDeletePopShow] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { success, matchDetail } = useSelector(
    (state: RootState) => state.horseRacing.matchDetail
  );
  const { placedBets, loading } = useSelector(
    (state: RootState) => state.match.bets
  );
  const { permanentDeleteSuccess } = useSelector(
    (state: RootState) => state.match.sideBarList
  );
  const [timeLeft, setTimeLeft] = useState<any>({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    if (id) {
      matchService.connect([id], profileDetail?.roleName);
    }
    return () => {
      matchService.disconnect();
    };
  }, [id]);

  const handleDeleteBet = (value: any) => {
    try {
      let payload: any = {
        matchId: id,
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
          url: ApiConstants.MATCH.BETDELETERACE,
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
        matchId: id,
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
          url: ApiConstants.MATCH.BET_DELETE_RACE_PERMANENT,
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
        matchId: id,
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
      if (id === event?.id) {
        dispatch(updateMatchRatesForHorseRacing(event));
      } else return;
    } catch (e) {
      console.log(e);
    }
  };

  const matchResultDeclared = (event: any) => {
    try {
      if (event?.matchId === id) {
        navigate(`/wallet/horse_racing`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const matchDeleteBet = (event: any) => {
    try {
      setMode({ type: "", value: false });
      if (event?.matchId === id) {
        setSelectedBetData([]);
        dispatch(updatePlacedbets(event));
        dispatch(updateTeamRatesForHorseRacingOnDelete(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteReasonUpdate = (event: any) => {
    try {
      setMode({ type: "", value: false });
      if (event?.matchId === id) {
        setSelectedBetData([]);
        dispatch(updatePlacedbetsDeleteReason(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setMatchBetsPlaced = (event: any) => {
    try {
      if (event?.jobData?.newBet?.matchId === id) {
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
        dispatch(updateTeamRatesForHorseRacing(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (matchDetail && matchDetail?.stopAt) {
      navigate(`/wallet/race_list/${matchType}`);
    }
  }, [matchDetail]);

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
      if (id && profileDetail?.roleName) {
        dispatch(getMatchDetailHorseRacing(id));
        dispatch(getUserProfitLossForRace(id));
        dispatch(resetSessionProLoss());
        dispatch(getPlacedBets(`eq${id}`));
      }
    } catch (e) {
      console.log(e);
    }
  }, [id, profileDetail?.roleName]);

  useEffect(() => {
    try {
      if (success && profileDetail?.roleName && socket) {
        socketService.match.getMatchRatesOff(id);
        socketService.match.userMatchBetPlacedOff();
        socketService.match.matchResultDeclaredOff();
        socketService.match.declaredMatchResultAllUserOff();
        socketService.match.matchDeleteBetOff();
        socketService.match.updateDeleteReasonOff();
        socketService.match.joinMatchRoom(id);
        socketService.match.getMatchRates(id, updateMatchDetailToRedux);
        socketService.match.userMatchBetPlaced(setMatchBetsPlaced);
        socketService.match.matchResultDeclared(matchResultDeclared);
        socketService.match.declaredMatchResultAllUser(matchResultDeclared);
        socketService.match.matchDeleteBet(matchDeleteBet);
        socketService.match.updateDeleteReason(handleDeleteReasonUpdate);
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, profileDetail?.roleName, socket]);

  useEffect(() => {
    return () => {
      socketService.match.leaveMatchRoom(id);
      socketService.match.getMatchRatesOff(id);
      socketService.match.userMatchBetPlacedOff();
      socketService.match.matchResultDeclaredOff();
      socketService.match.declaredMatchResultAllUserOff();
      socketService.match.matchDeleteBetOff();
      socketService.match.updateDeleteReasonOff();
    };
  }, [id]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (id) {
          dispatch(getMatchDetailHorseRacing(id));
          dispatch(getUserProfitLossForRace(id));
          dispatch(getPlacedBets(`eq${id}`));
        }
      } else if (document.visibilityState === "hidden") {
        socketService.match.leaveMatchRoom(id);
        socketService.match.getMatchRatesOff(id);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (id) {
      const intervalId = setInterval(() => {
        dispatch(getMatchDetailHorseRacing(id));
        dispatch(getUserProfitLossForRace(id));
        dispatch(getPlacedBets(`eq${id}`));
      }, 14100 * 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      let timeLeft = getTimeLeft(matchDetail?.startAt);
      setTimeLeft(timeLeft);
    }, 1000);
    return () => clearInterval(timer);
  }, [id, matchDetail]);

  useEffect(() => {
    if (permanentDeleteSuccess) {
      setPermanentDeletePopShow(false);
      setMode({ type: "", value: false });
      dispatch(resetPermanentDeleteSuccess());
    }
  }, [permanentDeleteSuccess]);

  return (
    <>
      {visible && selectedBetData.length > 0 && (
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
      )}
      {visibleEdit && selectedBetData.length > 0 && (
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
            width: { lg: "50%" },
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
            {`${matchDetail?.countryCode ? matchDetail?.countryCode : ""} > ${
              matchDetail?.venue ? matchDetail?.venue : ""
            }`}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "white",
              fontWeight: "700",
              alignSelf: "start",
            }}
          >
            {`${moment(matchDetail?.startAt).format("YYYY-MM-DD HH:mm")} | ${
              matchDetail?.title ? matchDetail?.title : ""
            }`}
            {timeLeft.hours !== 0 || timeLeft.minutes !== 0
              ? timeLeft?.hours > 0
                ? `| ${timeLeft?.hours} hours ${timeLeft?.minutes} Minutes Remaining`
                : timeLeft?.minutes > 0
                ? `| ${timeLeft?.minutes} Minutes Remaining`
                : ""
              : ""}
          </Typography>
          <MatchOddsHorseRacing
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
          />
          {matchesMobile && (
            <UserProfitLossRace
              single={"single"}
              title={"User Profit Loss"}
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
            {!["edit", "delete"].includes(mode?.type) && mode.value && (
              <>
                <Box sx={{ width: "2%" }}></Box>
                <Box
                  onClick={() => {
                    setPermanentDeletePopShow(true);
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
                    {"Delete"}
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
                <Box sx={{ width: "2%" }} />
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
                <Box sx={{ width: "2%" }} />
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
                deletePermanent={() => {
                  setMode((prev: any) => {
                    return {
                      ...prev,
                      type: "deletePermanent",
                      value: !mode.value,
                    };
                  });
                }}
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
              width: "50%",
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

            <UserProfitLossRace
              single="single"
              title="User Profit Loss"
              matchDetail={matchDetail}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default RacingDetails;
