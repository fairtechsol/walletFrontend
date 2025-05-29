import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ARROWDOWN, ARROW_UP, ArrowDown } from "../../../assets";
import { formatToINR, handleNumber } from "../../../helper";
import { getBetProfitLossCard } from "../../../store/actions/reports";
import { AppDispatch, RootState } from "../../../store/store";
import StyledImage from "../../Common/StyledImages";
import AllRateSeperate from "./AllRateSeperate";
import AllUserListSeparate from "./AllUserListSeparate";

interface RowComponentMatchesProps {
  index: number;
  item: any;
  selectedId: any;
  getBetReport: (val: any) => void;
  userProfitLoss: any;
  getUserProfitLoss: (val: string) => void;
}

const RowComponentMatches = ({
  index,
  item,
  selectedId,
  getBetReport,
  userProfitLoss,
  getUserProfitLoss,
}: RowComponentMatchesProps) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();
  const { betProfitLossListCard } = useSelector(
    (state: RootState) => state.report.cardReport
  );
  const { user } = useSelector((state: RootState) => state.report.reportList);
  const [showBets, setShowBets] = useState(false);
  const [showListOfUsers, setShowListOfUsers] = useState(false);

  const handleGameNameClick = (e: any) => {
    e.stopPropagation();
    if (selectedId?.id === item?.runnerId) {
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
        getUserProfitLoss(item?.runnerId);
        getBetReport({
          eventType: item?.eventType,
          matchId: item?.runnerId,
          type: "users_list",
          betId: "",
          sessionBet: false,
        });
        setShowListOfUsers((prev) => !prev);
      }
    } else {
      setShowListOfUsers(true);
      setShowBets(false);
      getUserProfitLoss(item?.runnerId);
      getBetReport({
        eventType: item?.eventType,
        matchId: item?.runnerId,
        type: "users_list",
        betId: "",
        sessionBet: false,
      });
    }
  };

  const handleBetClick = (e: any) => {
    e.stopPropagation();
    if (selectedId?.id === item?.runnerId && selectedId?.type === "all_bet") {
      setShowBets((prev) => !prev);
    } else {
      setShowListOfUsers(false);
      setShowBets(true);
      getBetReport({
        eventType: item?.eventType,
        matchId: item?.runnerId,
        type: "all_bet",
        betId: "",
        sessionBet: false,
      });
      dispatch(
        getBetProfitLossCard({
          runnerId: item?.runnerId,
          isSession: false,
          id: user?.id,
        })
      );
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        onClick={handleGameNameClick}
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
            width: { xs: "10%", sm: "5%", lg: "4.4%" },
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
            {0 + index}
          </Typography>
        </Box>
        <Box
          sx={{
            width: {
              xs: item?.eventType === "cricket" ? "40%" : "65%",
              sm: item?.eventType === "cricket" ? "55%" : "80%",
              lg: item?.eventType === "cricket" ? "56%" : "80%",
            },
            position: "relative",
            height: "100%",
            paddingY: "4px",
            alignItems: "center",
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
              {item?.runnerId}
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
              {`(${matchesMobile ? "TB" : "Total Bet"}: 
                  ${formatToINR(Number(item?.totalBet || 0))})`}
            </Typography>
            <StyledImage
              src={ArrowDown}
              alt="arrowDown"
              sx={{
                width: { lg: "20px", xs: "10px" },
                height: { lg: "10px", xs: "6px" },
                transform:
                  selectedId?.id === item?.runnerId &&
                  selectedId?.type === "all_bet" &&
                  showBets
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
            />
          </Box>
        </Box>
      </Box>
      {selectedId?.id === item?.runnerId && (
        <>
          {showListOfUsers && (
            <>
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
                      width: "100%",
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
                          matchId={item?.runnerId}
                          getBetReport={getBetReport}
                        />
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </>
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
                  count={betProfitLossListCard?.length}
                  allBetsData={
                    betProfitLossListCard ? betProfitLossListCard : []
                  }
                />
              </Box>
              <Box sx={{ width: { lg: "1vw", xs: 0 } }} />
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default memo(RowComponentMatches);
