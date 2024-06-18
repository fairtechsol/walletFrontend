import { memo } from "react";
import { useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import moment from "moment";
import StyledImage from "../../Common/StyledImages";
import { ARROWDOWN, ARROW_UP, ArrowDown } from "../../../assets";
import AllRateSeperate from "./AllRateSeperate";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { getBetProfitLossCard } from "../../../store/actions/reports";
import { useSelector } from "react-redux";
import { formatToINR, handleNumber } from "../../../helper";
import AllUserListSeparate from "./AllUserListSeparate";

const RowComponentMatches = ({
  index,
  item,
  selectedId,
  getBetReport,
  userProfitLoss,
  getUserProfitLoss,
  color,
}: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();
  const { betProfitLossListCard } = useSelector(
    (state: RootState) => state.report.cardReport
  );
  const { user } = useSelector((state: RootState) => state.report.reportList);
  const [showBets, setShowBets] = useState(false);
  const [showListOfUsers, setShowListOfUsers] = useState(false);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        onClick={(e) => {
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
        }}
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
            width: { xs: "10%", sm: "5%", lg: "5%" },
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
              lg: item?.eventType === "cricket" ? "55%" : "80%",
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
          {/* <Typography
            sx={{
              fontSize: { lg: "0px", xs: "10px" },
              color: "white",
              marginLeft: "5px",
              fontWeight: "500",
              position: "absolute",
              top: 0,
              right: 5,
            }}
          > */}
          {/* ({moment(item?.startAt || new Date()).format("DD-MM-YYYY")}) */}
          {/* {moment(item?.startAt).format("DD-MM-YYYY HH:mm:ss")} */}
          {/* </Typography> */}

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
            {/* <Typography
              sx={{
                fontSize: { lg: "10px", xs: "0" },
                color: "white",
                marginLeft: "5px",
                fontWeight: "500",
              }}
            >
              ({moment(item?.startAt).format("DD-MM-YYYY")})
            </Typography> */}
          </Box>
          {true && (
            <StyledImage
              src={ArrowDown}
              sx={{
                width: { lg: "20px", xs: "10px" },
                height: { lg: "10px", xs: "6px" },
                transform:
                  selectedId?.id === item?.matchId && showListOfUsers
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
            />
          )}
          {/* <StyledImage
              src={ArrowDown}
              sx={{
                marginTop: { xs: "5px", lg: "0" },
                width: { lg: "20px", xs: "10px" },
                height: { lg: "10px", xs: "6px" },
                transform:
                  selectedId === item?.matchId
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
            /> */}
        </Box>
        <Box
          onClick={(e) => {
            e.stopPropagation();
            if (
              selectedId?.id === item?.runnerId &&
              selectedId?.type === "all_bet"
            ) {
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
          }}
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
              {handleNumber(parseFloat(item?.rateProfitLoss || 0), color)}{" "}
              {`(${matchesMobile ? "TB" : "Total Bet"}: 
                  ${formatToINR(Number(item?.totalBet || 0))})`}
            </Typography>
            <StyledImage
              src={ArrowDown}
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
                      width: { xs: "100%", lg: "100%", md: "100%" },
                      // maxHeight: "51vh",
                      overflow: "hidden",
                      // overflowY: "auto",
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
                          userId={item?.userId}
                          showListOfUsers={showListOfUsers}
                          getBetReport={getBetReport}
                          // sessionBetData={sessionBetData}
                          // bet1Data={betData}
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
                  betHistory={false}
                  count={betProfitLossListCard?.length}
                  allBetsData={
                    betProfitLossListCard ? betProfitLossListCard : []
                  }
                  profit
                />
              </Box>
              <Box sx={{ width: { lg: "1vw", xs: 0 } }}></Box>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default memo(RowComponentMatches);
