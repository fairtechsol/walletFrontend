import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { ARROW_UP, ARROWDOWN, ArrowDown } from "../../../assets";
import { formatToINR } from "../../../helper";
import service from "../../../service";
import { RootState } from "../../../store/store";
import { ApiConstants } from "../../../utils/Constants";
import StyledImage from "../../Common/StyledImages";
import AllRateSeperate from "./AllRateSeperate";
import SessionBetSeperate from "./SessionBetSeperate";
import SessionComponentMatches from "./SessionComponentMatches";

interface UserListModalComponentProps {
  setShowModal: (val: any) => void;
  setShowBets: (val: any) => void;
  setShowSessionBets: (val: any) => void;
  setShowSessions: (val: any) => void;
  item: any;
  showBets: boolean;
  showSessions: boolean;
  showSessionBets: boolean;
  getBetReport: (val: any) => void;
  matchId: string; 
}

const UserListModalComponent = ({
  setShowModal,
  setShowBets,
  setShowSessionBets,
  setShowSessions,
  item,
  showBets,
  showSessions,
  showSessionBets,
  getBetReport,
  matchId,
}: UserListModalComponentProps) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [betData, setBetData] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const [selectedChildBetId, setSelectedChildBetId] = useState("");
  const { totalBetProfitLossModal, user } = useSelector(
    (state: RootState) => state.report.reportList
  );

  const handleClose = (e: any) => {
    e.stopPropagation();
    setShowModal((prev: boolean) => !prev);
    setShowBets(false);
    setShowSessionBets(false);
    setShowSessions(false);
  };

  const handleRateBets = (e: any) => {
    e.stopPropagation();
    if (showBets) {
      setShowBets((prev: boolean) => !prev);
    } else {
      if (showSessions) {
        setShowSessions(false);
      }
      setShowBets((prev: boolean) => !prev);
      getBetDataForChildUser({
        matchId,
        userId: item?.userId,
        url: item?.url,
        roleName: item?.roleName,
      });
    }
  };
  const handleSessionBets = (e: any) => {
    e.stopPropagation();
    if (showSessions) {
      setShowSessions((prev: boolean) => !prev);
    } else {
      if (showBets) {
        setShowBets(false);
      }
      if (showSessionBets) {
        setShowSessionBets(false);
      }
      setShowSessions((prev: boolean) => !prev);
      getSessionDataForChildUser({
        matchId,
        userId: item?.userId,
        roleName: item?.roleName,
        searchId: "",
        url: item?.url,
      });
    }
  };

  const getBetDataForChildUser = async (props: any) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.BET_PROFIT_LOSS}?matchId=${props?.matchId}${
          props.betId ? `&betId=${props.betId}` : ""
        }&isSession=${false}${user.id ? `&id=${user.id}` : ""}${
          props.url ? `&url=${props.url}` : ""
        }${
          props.userId
            ? `&userId=${props.userId}&roleName=${props.roleName}`
            : ""
        }`
      );
      if (resp) {
        setBetData(resp?.data);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const getSessionDataForChildUser = async (props: any) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.SESSION_PROFIT_LOSS}?matchId=${props.matchId}${
          user.id ? `&id=${user.id}` : ""
        }${
          props.userId
            ? `&userId=${props.userId}&roleName=${props.roleName}`
            : ""
        }${props.url ? `&url=${props.url}` : ""}`
      );
      if (resp) {
        setSessionData(resp?.data);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
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
          width: { xs: "90%", lg: "90%" },
        }}
      >
        <Box
          sx={[
            {
              width: { xs: "96%", lg: "100%", md: "100%" },
              minHeight: "200px",
              display: "flex",
              flexDirection: "column",
              borderRadius: "10px",
              borderBottomRightRadius: "0px",
              borderBottomLeftRadius: "0px",
              overflow: "hidden",
              border: "2px solid white",
            },
            (theme: any) => ({
              backgroundImage: `${theme.palette.primary.headerGradient}`,
            }),
          ]}
        >
          <Box sx={{ width: "100%" }}>
            <Box
              display={"flex"}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                px: "10px",
                py: "6px",
                backgroundColor: "#F8C851",
              }}
            >
              <Box
                display={"flex"}
                alignItems="center"
                sx={{ alignItems: "center" }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "14px",
                      lg: "18px",
                      md: "18px",
                    },
                    color: "#000",
                    marginRight: {
                      xs: "10px",
                      lg: "20px",
                      md: "20px",
                    },
                  }}
                >
                  Profit/Loss Per User
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: "#000",
                  fontSize: "30px",
                  cursor: "pointer",
                }}
                onClick={handleClose}
              >
                &times;
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "50px",
                background: "white",
                display: "flex",
                padding: 0.1,
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: item?.eventType === "cricket" ? "50%" : "75%",
                    lg: item?.eventType === "cricket" ? "60%" : "90%",
                  },
                  position: "relative",
                  height: "100%",
                  paddingY: "4px",
                  alignItems: { lg: "center", xs: "center" },
                  display: "flex",
                  paddingX: "10px",
                  background: "#0B4F26",
                  marginLeft: 0.1,
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "center",
                    marginTop: { xs: "5px", lg: "0" },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "10px", lg: "15px" },
                      color: "white",
                      fontWeight: "600",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      lineClamp: 2,
                    }}
                  >
                    {item?.userName}
                  </Typography>
                </Box>
              </Box>
              <Box
                onClick={handleRateBets}
                sx={{
                  background: item?.rateProfitLoss > 0 ? "#27AC1E" : "#E32A2A",
                  paddingX: "2px",
                  width: { xs: "25%", lg: "30%" },
                  height: "100%",
                  marginLeft: 0.1,
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "10px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { lg: "12px", xs: "8px" },
                      fontWeight: "500",
                      color: "white",
                    }}
                  >
                    Rate {matchesMobile ? "P/L" : "Profit/Loss"}
                  </Typography>
                  <StyledImage
                    src={item?.rateProfitLoss > 0 ? ARROW_UP : ARROWDOWN}
                    sx={{
                      width: { lg: "25px", xs: "15px" },
                      height: { lg: "12px", xs: "8px" },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "10px", lg: "14px" },
                      fontWeight: "700",
                      color: "white",
                    }}
                  >
                    {item?.rateProfitLoss ? (
                      Number(item?.rateProfitLoss) >= 0 ? (
                        <>
                          <span style={{ visibility: "hidden" }}>-</span>
                          {Number(item?.rateProfitLoss).toFixed(2)}
                        </>
                      ) : (
                        formatToINR(Number(item?.rateProfitLoss).toFixed(2))
                      )
                    ) : (
                      0.0
                    )}
                  </Typography>
                  <StyledImage
                    src={ArrowDown}
                    alt="arrowDown"
                    sx={{
                      width: { lg: "20px", xs: "10px" },
                      height: { lg: "10px", xs: "6px" },
                      transform: showBets ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </Box>
              </Box>
              {item?.eventType === "cricket" && (
                <Box
                  onClick={handleSessionBets}
                  sx={{
                    background:
                      item?.sessionProfitLoss > 0 ? "#27AC1E" : "#E32A2A",
                    paddingX: "2px",
                    width: { xs: "25%", lg: "30%" },
                    height: "100%",
                    marginLeft: 0.1,
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "10px",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { lg: "12px", xs: "8px" },
                        fontWeight: "500",
                        color: "white",
                      }}
                    >
                      Session {matchesMobile ? "P/L" : "Profit/Loss"}
                    </Typography>
                    <StyledImage
                      src={item?.sessionProfitLoss > 0 ? ARROW_UP : ARROWDOWN}
                      sx={{
                        width: { lg: "25px", xs: "15px" },
                        height: { lg: "12px", xs: "8px" },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "10px", lg: "14px" },
                        fontWeight: "700",
                        color: "white",
                      }}
                    >
                      {item?.sessionProfitLoss ? (
                        Number(item?.sessionProfitLoss) >= 0 ? (
                          <>
                            <span style={{ visibility: "hidden" }}>-</span>
                            {Number(item?.sessionProfitLoss).toFixed(2)}
                          </>
                        ) : (
                          formatToINR(
                            Number(item?.sessionProfitLoss).toFixed(2)
                          )
                        )
                      ) : (
                        0.0
                      )}
                    </Typography>
                    <StyledImage
                      src={ArrowDown}
                      alt="arrowDown"
                      sx={{
                        width: { lg: "20px", xs: "10px" },
                        height: { lg: "10px", xs: "6px" },
                        transform: showSessions
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Box>
            <>
              {showBets && (
                <>
                  <Box
                    sx={{
                      width: { xs: "100%", lg: "100%" },
                      marginTop: { xs: ".25vh" },
                      display: "flex",
                      flexDirection: { lg: "row", xs: "column" },
                    }}
                  >
                    <AllRateSeperate
                      count={betData?.length}
                      allBetsData={betData}
                    />
                  </Box>
                  <Box sx={{ width: { lg: "1vw", xs: 0 } }} />
                </>
              )}
              {showSessions && (
                <Box
                  sx={{
                    width: { xs: "100%", lg: "100%" },
                    marginTop: { xs: ".25vh" },
                    display: "flex",
                    flexDirection: { lg: "row", xs: "column" },
                  }}
                >
                  <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
                    <Box
                      sx={{
                        width: {
                          xs: "100%",
                          lg: "50%",
                          md: "100%",
                        },
                        maxHeight: "51vh",
                        overflow: "hidden",
                        overflowY: "auto",
                        "::-webkit-scrollbar": {
                          display: "none",
                        },
                        marginY: { xs: ".2vh", lg: "1vh" },
                        padding: 0.2,
                      }}
                    >
                      {sessionData?.length > 0 &&
                        sessionData?.map((item1: any, index: any) => {
                          return (
                            <SessionComponentMatches
                              key={index}
                              item={{
                                ...item1,
                                matchId: item?.matchId,
                                url: item?.url,
                                userId: item?.userId,
                                roleName: item?.roleName,
                              }}
                              index={index + 1}
                              matchId={item?.matchId}
                              showSessionBets={showSessionBets}
                              setShowSessionBets={setShowSessionBets}
                              getBetReport={getBetReport}
                              userDetail={{
                                id: item?.userId,
                                roleName: item?.roleName,
                              }}
                              selectedChildBetId={selectedChildBetId}
                              setSelectedChildBetId={setSelectedChildBetId}
                            />
                          );
                        })}
                    </Box>
                    {(selectedChildBetId !== "") &&
                      !matchesMobile &&
                      showSessionBets && (
                        <Box
                          sx={{
                            width: {
                              xs: "100%",
                              lg: "49%",
                              md: "100%",
                            },
                          }}
                        >
                          <SessionBetSeperate
                            allBetsData={
                              totalBetProfitLossModal
                                ? totalBetProfitLossModal
                                : []
                            }
                          />
                        </Box>
                      )}
                  </Box>
                </Box>
              )}
            </>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(UserListModalComponent);
