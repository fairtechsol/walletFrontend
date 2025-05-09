import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import moment from "moment";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ARROWDOWN, ARROW_UP, ArrowDown } from "../../../assets";
import { formatToINR, handleNumber } from "../../../helper";
import {
  getBetProfitLoss,
  getSessionProfitLoss,
} from "../../../store/actions/reports";
import { AppDispatch, RootState } from "../../../store/store";
import StyledImage from "../../Common/StyledImages";
import AllRateSeperate from "./AllRateSeperate";
import AllUserListSeparate from "./AllUserListSeparate";
import SessionBetSeperate from "./SessionBetSeperate";
import SessionComponentMatches from "./SessionComponentMatches";
import { Constants } from "../../../utils/Constants";

interface RowComponentMatchesProps {
  index: number;
  item: any;
  selectedId: any;
  getBetReport: (val: any) => void;
  userProfitLoss: any;
  getUserProfitLoss: (val: string) => void;
  currentPage: number;
}

const RowComponentMatches = ({
  index,
  item,
  selectedId,
  getBetReport,
  userProfitLoss,
  getUserProfitLoss,
  currentPage,
}: RowComponentMatchesProps) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();
  const { sessionProfitLossList, betProfitLossList, user } = useSelector(
    (state: RootState) => state.report.reportList
  );
  const [showBets, setShowBets] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [showSessionBets, setShowSessionBets] = useState(false);
  const [showListOfUsers, setShowListOfUsers] = useState(false);

  const isCricketOrPolitics = ["cricket", "politics"].includes(item?.eventType);

  const handleMatchClick = (e: any) => {
    e.stopPropagation();
    if (selectedId?.id === item?.matchId) {
      if (showListOfUsers) {
        setShowListOfUsers((prev) => !prev);
        getBetReport({
          eventType: "",
          matchId: "",
          type: "users_list",
          betId: "",
          sessionBet: false,
        });
      } else {
        getUserProfitLoss(item?.matchId);
        getBetReport({
          eventType: item?.eventType,
          matchId: item?.matchId,
          type: "users_list",
          betId: "",
          sessionBet: false,
        });
        setShowListOfUsers((prev) => !prev);
      }
    } else {
      setShowListOfUsers(true);
      setShowBets(false);
      setShowSessions(false);
      setShowSessionBets(false);
      getUserProfitLoss(item?.matchId);
      getBetReport({
        eventType: item?.eventType,
        matchId: item?.matchId,
        type: "users_list",
        betId: "",
        sessionBet: false,
      });
    }
  };

  const handleBetClick = (e: any) => {
    e.stopPropagation();
    if (selectedId?.id === item?.matchId && selectedId?.type === "all_bet") {
      setShowBets((prev) => !prev);
    } else {
      setShowListOfUsers(false);
      setShowBets(true);
      getBetReport({
        eventType: item?.eventType,
        matchId: item?.matchId,
        type: "all_bet",
        betId: "",
        sessionBet: false,
      });
      dispatch(
        getBetProfitLoss({
          matchId: item?.matchId,
          isSession: false,
          id: user?.id,
        })
      );
    }
  };

  const handleSessionClick = (e: any) => {
    e.stopPropagation();
    if (
      selectedId?.id === item?.matchId &&
      selectedId?.type === "session_bet"
    ) {
      setShowSessions((prev) => !prev);
      setShowListOfUsers(false);
    } else {
      setShowListOfUsers(false);
      setShowSessions(true);
      getBetReport({
        eventType: item?.eventType,
        matchId: item?.matchId,
        type: "session_bet",
        betId: "",
        sessionBet: false,
      });
      dispatch(
        getSessionProfitLoss({
          matchId: item?.matchId,
          id: user?.id,
        })
      );
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        onClick={handleMatchClick}
        sx={{
          width: "100%",
          height: "50px",
          background: "white",
          display: "flex",
          padding: 0.1,
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            width: { xs: "10%", sm: "5%", lg: "4%" },
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            background: "black",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", color: "white", fontWeight: "600" }}
          >
            {0 + index + Constants.pageLimit * (currentPage - 1)}
          </Typography>
        </Box>
        <Box
          sx={{
            width: {
              xs: isCricketOrPolitics ? "40%" : "65%",
              sm: isCricketOrPolitics ? "55%" : "80%",
              lg: isCricketOrPolitics ? "56%" : "80%",
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
          <Typography
            sx={{
              fontSize: { lg: "0px", xs: "10px" },
              color: "white",
              marginLeft: "5px",
              fontWeight: "500",
              position: "absolute",
              top: 0,
              right: 5,
            }}
          >
            {moment(item?.startAt).format("DD-MM-YYYY HH:mm:ss")}
          </Typography>

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
              {item?.title}
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: "10px", xs: "0" },
                color: "white",
                marginLeft: "5px",
                fontWeight: "500",
              }}
            >
              ({moment(item?.startAt).format("DD-MM-YYYY HH:mm:ss")})
            </Typography>
          </Box>
          <StyledImage
            src={ArrowDown}
            alt="arrowDown"
            sx={{
              width: { lg: "20px", xs: "10px" },
              height: { lg: "10px", xs: "6px" },
              transform:
                selectedId?.id === item?.matchId && showListOfUsers
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
            }}
          />
        </Box>
        <Box
          onClick={handleBetClick}
          sx={{
            background: item?.rateProfitLoss > 0 ? "#27AC1E" : "#E32A2A",
            paddingX: "2px",
            width: "25%",
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
              alt="arrowup/down"
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
                lineHeight: "0.9",
              }}
            >
              {handleNumber(parseFloat(item?.rateProfitLoss || 0), "")}
              {`(${matchesMobile ? "TD(1%)" : "Total Deduction"}: 
                  ${formatToINR(Number(item?.totalDeduction || 0))})`}
            </Typography>
            <StyledImage
              src={ArrowDown}
              alt="arrowDown"
              sx={{
                width: { lg: "20px", xs: "10px" },
                height: { lg: "10px", xs: "6px" },
                transform:
                  selectedId?.id === item?.matchId &&
                  selectedId?.type === "all_bet" &&
                  showBets
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
            />
          </Box>
        </Box>
        {isCricketOrPolitics && (
          <Box
            onClick={handleSessionClick}
            sx={{
              background: item?.sessionProfitLoss > 0 ? "#27AC1E" : "#E32A2A",
              paddingX: "2px",
              width: { xs: "25%", sm: "15%", lg: "15%" },
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
                alt="arrowup/dowm"
                sx={{
                  width: { lg: "25px", xs: "15px" },
                  height: { lg: "12px", xs: "8px" },
                  marginRight: { xs: "3px" },
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
                {Number(item?.sessionProfitLoss) >= 0 ? (
                  <>
                    <span style={{ visibility: "hidden" }}>-</span>
                    {handleNumber(parseFloat(item?.sessionProfitLoss || 0), "")}
                  </>
                ) : (
                  handleNumber(parseFloat(item?.sessionProfitLoss || 0), "")
                )}
              </Typography>
              <StyledImage
                src={ArrowDown}
                alt="arrowDown"
                sx={{
                  width: { lg: "20px", xs: "10px" },
                  height: { lg: "10px", xs: "6px" },
                  marginRight: { xs: "3px" },
                  transform:
                    selectedId?.id === item?.matchId &&
                    selectedId?.type === "session_bet" &&
                    showSessions
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
      {selectedId?.id === item?.matchId && (
        <>
          {showListOfUsers && (
            <Box
              sx={{
                width: { xs: "100%", lg: "99%" },
                marginTop: { xs: ".25vh" },
                marginLeft: { lg: "1%" },
                display: "flex",
                flexDirection: { lg: "row", xs: "column" },
              }}
            >
              <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    width: { xs: "100%", lg: "100%", md: "100%" },
                    overflow: "hidden",
                    marginY: { xs: ".2vh", lg: "1vh" },
                    padding: 0.2,
                  }}
                >
                  {userProfitLoss?.map((profitLoss: any, index: any) => {
                    return (
                      <AllUserListSeparate
                        key={index}
                        item={{ ...profitLoss, eventType: item?.eventType }}
                        index={index + 1}
                        matchId={item?.matchId}
                        getBetReport={getBetReport}
                      />
                    );
                  })}
                </Box>
              </Box>
            </Box>
          )}
          {selectedId?.type === "all_bet" && showBets && (
            <>
              <Box
                sx={{
                  width: { xs: "100%", lg: "96%" },
                  marginTop: { xs: ".25vh" },
                  marginLeft: { lg: "4%" },
                  display: "flex",
                  flexDirection: { lg: "row", xs: "column" },
                }}
              >
                <AllRateSeperate
                  count={betProfitLossList?.length}
                  allBetsData={betProfitLossList ? betProfitLossList : []}
                />
              </Box>
              <Box sx={{ width: { lg: "1vw", xs: 0 } }} />
            </>
          )}
          {selectedId?.type === "session_bet" && showSessions && (
            <Box
              sx={{
                width: { xs: "100%", lg: "96%" },
                marginTop: { xs: ".25vh" },
                marginLeft: { lg: "4%" },
                display: "flex",
                flexDirection: { lg: "row", xs: "column" },
              }}
            >
              <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    width: { xs: "100%", lg: "50%", md: "100%" },
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
                  {sessionProfitLossList &&
                    sessionProfitLossList?.map((list: any, index: number) => {
                      return (
                        <SessionComponentMatches
                          key={index}
                          item={list}
                          index={index + 1}
                          matchId={item?.matchId}
                          showSessionBets={showSessionBets}
                          setShowSessionBets={setShowSessionBets}
                          getBetReport={getBetReport}
                          selectedId={selectedId}
                        />
                      );
                    })}
                </Box>
                {selectedId?.betId !== "" &&
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
                      <SessionBetSeperate allBetsData={betProfitLossList} />
                    </Box>
                  )}
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default memo(RowComponentMatches);
