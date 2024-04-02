import { memo } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import moment from "moment";
import StyledImage from "../../Common/StyledImages";
import { ARROWDOWN, ARROW_UP, ArrowDown } from "../../../assets";
import SessionBetSeperate from "./SessionBetSeperate";
import {
  getBetProfitLoss,
  getTotalBetProfitLossForModal,
} from "../../../store/actions/reports";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { formatToINR } from "../../../helper";

const SessionComponentMatches = ({
  item,
  index,
  showSessionBets,
  setShowSessionBets,
  matchId,
  selectedId,
  getBetReport,
  userDetail,
}: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();
  const { betProfitLossList, user } = useSelector(
    (state: RootState) => state.report.reportList
  );

  return (
    <Box key={index} sx={{ width: "100%" }}>
      <Box
        onClick={() => {
          if (selectedId?.betId === item?.betId) {
            setShowSessionBets((prev: any) => !prev);
            if (!showSessionBets) {
              if (userDetail) {
                if (userDetail) {
                  dispatch(
                    getTotalBetProfitLossForModal({
                      matchId: matchId,
                      betId: item?.betId,
                      isSession: true,
                      url: item?.url || "",
                      id: user?.id,
                    })
                  );
                } else {
                  dispatch(
                    getBetProfitLoss({
                      matchId: matchId,
                      betId: item?.betId,
                      isSession: true,
                      url: item?.url || "",
                      id: user?.id,
                    })
                  );
                }
              }
            }
          } else {
            setShowSessionBets(true);
            if (userDetail) {
              dispatch(
                getTotalBetProfitLossForModal({
                  matchId: matchId,
                  betId: item?.betId,
                  isSession: true,
                  url: item?.url || "",
                  id: user?.id,
                  userId: item?.userId,
                  roleName: item?.roleName,
                })
              );
            } else {
              dispatch(
                getBetProfitLoss({
                  matchId: matchId,
                  betId: item?.betId,
                  isSession: true,
                  url: item?.url || "",
                  id: user?.id,
                })
              );
              getBetReport({
                eventType: item?.eventType,
                matchId: matchId,
                type: "session_bet",
                betId: item?.betId,
                sessionBet: true,
              });
            }
          }
        }}
        sx={{
          width: "100%",
          height: "45px",
          background: "white",
          display: "flex",
          padding: 0.1,
        }}
      >
        <Box
          sx={{
            width: { xs: "10%", lg: "5%" },
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
            {"0" + index}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: "65%", lg: "80%", md: "65%" },
            position: "relative",
            height: "100%",
            paddingY: "4px",
            alignItems: { lg: "center", xs: "flex-end" },
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
            ({moment(item?.betDate).format("DD-MM-YYYY")})
          </Typography>

          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "10px", lg: "15px" },
                color: "white",
                fontWeight: "700",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                lineClamp: 2,
              }}
            >
              {item?.eventName}
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: "10px", xs: "0" },
                color: "white",
                marginLeft: "5px",
                fontWeight: "600",
              }}
            >
              ({moment(item?.betDate).format("DD-MM-YYYY")})
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            background: item?.totalLoss > 0 ? "#27AC1E" : "#E32A2A",
            paddingX: "2px",
            width: { xs: "25%", lg: "20%" },
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "12px", xs: "8px" },
                fontWeight: "500",
                color: "white",
              }}
            >
              Profit/Loss
            </Typography>
            <StyledImage
              src={item?.totalLoss > 0 ? ARROW_UP : ARROWDOWN}
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
              sx={{ fontSize: "15px", fontWeight: "700", color: "white" }}
            >
              {formatToINR(Number(item?.totalLoss).toFixed(2))}
            </Typography>
            <StyledImage
              src={ArrowDown}
              sx={{
                width: { lg: "20px", xs: "10px" },
                height: { lg: "10px", xs: "6px" },
                transform:
                  selectedId?.betId === item?.betId && showSessionBets
                    ? "rotate(90deg)"
                    : "rotate(270deg)",
              }}
            />
          </Box>
        </Box>
      </Box>
      {selectedId?.betId === item?.betId &&
        matchesMobile &&
        showSessionBets && (
          <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
            <SessionBetSeperate
              betHistory={false}
              allBetsData={betProfitLossList ? betProfitLossList : []}
              profit
              isArrow={true}
            />
          </Box>
        )}
    </Box>
  );
};

export default memo(SessionComponentMatches);
