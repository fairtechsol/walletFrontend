import { Box, Typography,useMediaQuery, useTheme } from "@mui/material";
import StyledImage from "../../Common/StyledImages";
import {
  ARROWDOWN,
  ARROW_UP,
  ArrowDown,
  Cricket,
  Football,
  Tennis,
} from "../../../assets";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { formatToINR } from "../../../helper";
import moment from "moment";
import {
  getDomainProfitLoss,
  resetBetProfitLoss,
  resetDomainProfitLoss,
  resetSessionProfitLoss,
} from "../../../store/actions/reports";
import { useDispatch } from "react-redux";

const RowHeaderMatches = ({
  item,
  startDate,
  endDate,
  getHandleReport,
  show,
}: any) => {
  const { user } = useSelector((state: RootState) => state.report.reportList);
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <Box
        onClick={() => {
          if (!show) {
            let filter = "";
            if (user?.id) {
              filter += `&id=${user?.id}`;
            }
            if (startDate && endDate) {
              filter += `&startDate=${moment(startDate)?.format("YYYY-MM-DD")}`;
              filter += `&endDate=${moment(endDate)?.format("YYYY-MM-DD")}`;
            } else if (startDate) {
              filter += `&startDate=${moment(startDate)?.format("YYYY-MM-DD")}`;
            } else if (endDate) {
              filter += `&endDate=${moment(endDate)?.format("YYYY-MM-DD")}`;
            }
            dispatch(
              getDomainProfitLoss({
                url: item?.domainUrl,
                type: item?.eventType,
                filter: filter,
              })
            );
          }
          dispatch(resetDomainProfitLoss());
          dispatch(resetBetProfitLoss());
          dispatch(resetSessionProfitLoss());
          getHandleReport(item?.eventType);
        }}
        sx={{
          width: "100%",
          height: { lg: "60px", xs: "50px" },
          background: "white",
          display: "flex",
          padding: 0.1,
        }}
      >
        <Box
          sx={{
            width: { xs: "5%", sm: "5%", lg: "5%" },
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            background: "#F8C851",
          }}
        >
          <StyledImage
            src={
              item?.eventType === "cricket"
                ? Cricket
                : item?.eventType === "soccer"
                ? Football
                : item?.eventType === "tennis"
                ? Tennis
                : Cricket
            }
            sx={{ width: { lg: "35px", sm: "35px", xs: "22px" } }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "55%", sm: "55%", lg: "55%" },
            height: "100%",
            alignItems: "center",
            display: "flex",
            paddingX: "10px",
            background: "#F8C851",
            marginLeft: 0.1,
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "15px", sm: "15px", xs: "12px" },
              color: "black",
              fontWeight: "600",
            }}
          >
            {item?.eventType}
          </Typography>
          <StyledImage
            src={ArrowDown}
            sx={{
              width: { lg: "20px", xs: "10px" },
              transform: show ? "rotate(180deg)" : "rotate(0deg)",
              height: { lg: "10px", xs: "6px" },
            }}
          />
        </Box>
        <Box
          sx={{
            background: item?.totalLoss > 0 ? "#27AC1E" : "#E32A2A",
            paddingX: "2px",
            width: { xs: "25%", sm: "25%", lg: "25%" },
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
                fontSize: { lg: "14px", sm: "14px", xs: "11px" },
                fontWeight: "700",
                color: "white",
              }}
            >
              {item?.totalLoss > 0 ? "Profit" : "Loss"}
            </Typography>
            <StyledImage
              src={item?.totalLoss > 0 ? ARROW_UP : ARROWDOWN}
              sx={{
                width: { lg: "25px", xs: "15px" },
                height: { lg: "12px", xs: "8px" },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                fontSize: { lg: "14px", xs: "10px" },
                fontWeight: "700",
                color: "white",
                lineHeight: "0.9"
              }}
            >
              {Number(item?.totalLoss) >= 0 ? (
                <>
                  <span style={{ visibility: "hidden" }}>-</span>
                  {formatToINR(
                    parseFloat(item?.totalLoss || 0).toFixed(2)
                  )}{" "}
                  {`(${matchesMobile ? "TD(1%)" : "Total Deduction"}: 
                  ${formatToINR(
                    parseFloat(item?.totalDeduction || 0).toFixed(2)
                  )})`}
                </>
              ) : (
                <>
                  {formatToINR(parseFloat(item?.totalLoss || 0).toFixed(2))}{" "}
                  {`(${matchesMobile ? "TD(1%)" : "Total Deduction"}: 
                  ${formatToINR(
                    parseFloat(item?.totalDeduction || 0).toFixed(2)
                  )})`}
                </>
              )}{" "}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            background: "#0B4F26",
            paddingX: "2px",
            width: { xs: "15%", sm: "15%", lg: "15%" },
            height: "100%",
            marginLeft: 0.1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            paddingLeft: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "14px", sm: "14px", xs: "11px" },
              fontWeight: "700",
              color: "white",
            }}
          >
            Total Bet
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                fontSize: { lg: "14px", xs: "10px" },
                fontWeight: "700",
                color: "white",
                textAlign: "center",
              }}
            >
              {item?.totalBet}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RowHeaderMatches;
