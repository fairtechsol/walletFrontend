import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store/store";
import {
  AllBetDelete,
  getPlacedBets,
  getUserProfitLoss,
  resetSessionProLoss,
  updateBetsPlaced,
  updatePlacedbets,
} from "../../../store/actions/match/matchAction";
import { ApiConstants } from "../../../utils/Constants";
import { socket, socketService } from "../../../socketManager";
import AddNotificationModal from "../../../components/matchDetail/Common/AddNotificationModal";
import UserProfitLoss from "../../../components/matchDetail/Common/UserProfitLoss";
import FullAllBets from "../../../components/matchDetail/Common/FullAllBets";
import { DeleteIcon } from "../../../assets";
import {
  getMatchDetailHorseRacing,
  updateMatchRatesForHorseRacing,
  updateTeamRatesForHorseRacing,
  updateTeamRatesForHorseRacingOnDelete,
} from "../../../store/actions/horseRacing/horseMatchDetailActions";
import MatchOddsHorseRacing from "../../../components/horseRacingComp/MatchOddsHorseRacing";
import moment from "moment";

const RacingDetails = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { id } = useParams();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const [mode, setMode] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedBetData, setSelectedBetData] = useState([]);
  // const { state } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { success, matchDetail } = useSelector(
    (state: RootState) => state.horseRacing.matchDetail
  );
  const { placedBets, loading } = useSelector(
    (state: RootState) => state.match.bets
  );
  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());

  function calculateTimeLeft() {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const targetDate = moment(matchDetail?.startAt).tz(timezone);
      const difference = targetDate.diff(moment().tz(timezone), "milliseconds");
      let timeLeft = {};
      if (difference > 0) {
        timeLeft = {
          days:
            ("0" + Math.floor(difference / (1000 * 60 * 60 * 24))).slice(-2) ||
            0,
          hours:
            ("0" + Math.floor((difference / (1000 * 60 * 60)) % 24)).slice(
              -2
            ) || 0,
          minutes:
            ("0" + Math.floor((difference / 1000 / 60) % 60)).slice(-2) || 0,
          seconds: ("0" + Math.floor((difference / 1000) % 60)).slice(-2) || 0,
        };
      } else {
        timeLeft = {
          days: "00",
          hours: "00",
          minutes: "00",
        };
      }

      return timeLeft;
    } catch (e) {
      console.log(e);
    }
  }

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
      setMode(false);
      if (event?.matchId === id) {
        setSelectedBetData([]);
        dispatch(updatePlacedbets(event));
        dispatch(updateTeamRatesForHorseRacingOnDelete(event));
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
      navigate(`/wallet/horse_racing`);
    }
  }, [matchDetail]);

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
      if (id && profileDetail?.roleName) {
        dispatch(getMatchDetailHorseRacing(id));
        dispatch(getUserProfitLoss(id));
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
        socketService.match.joinMatchRoom(id, profileDetail?.roleName);
        socketService.match.getMatchRates(id, updateMatchDetailToRedux);
        socketService.match.userMatchBetPlaced(setMatchBetsPlaced);
        socketService.match.matchResultDeclared(matchResultDeclared);
        socketService.match.declaredMatchResultAllUser(matchResultDeclared);
        socketService.match.matchDeleteBet(matchDeleteBet);
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
    };
  }, [id]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (id) {
          dispatch(getMatchDetailHorseRacing(id));
          dispatch(getUserProfitLoss(id));
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
        dispatch(getUserProfitLoss(id));
        dispatch(getPlacedBets(`eq${id}`));
      }, 14100 * 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
            {`${matchDetail?.countryCode} > ${matchDetail?.venue}`}
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
              matchDetail?.title
            }`}
            {+timeLeft.hours !== 0 || +timeLeft.minutes !== 0
              ? `| ${timeLeft?.hours} hours ${timeLeft?.minutes} Minutes Remaining`
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
              <Box sx={{ width: "2%" }}></Box>
              <Box
                sx={{ width: "150px", marginY: ".75%", height: "15px" }}
              ></Box>
            </Box>

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

export default RacingDetails;
