import { Box, Typography, useMediaQuery } from "@mui/material";
import moment from "moment";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ARROWDOWN, ARROW_UP, ArrowDown } from "../../../assets";
import { formatToINR } from "../../../helper";
import {
  getDomainProfitLoss,
  resetBetProfitLoss,
  resetDomainProfitLoss,
  resetSessionProfitLoss,
} from "../../../store/actions/reports";
import { AppDispatch, RootState } from "../../../store/store";
import theme from "../../../theme";
import { gameConstants } from "../../../utils/Constants";
import StyledImage from "../../Common/StyledImages";

const RowHeaderDomain = ({
  item,
  index,
  showMatchList,
  setCurrentPage,
  setShowMatchList,
  startDate,
  endDate,
}: any) => {
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [visible, setVisible] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.report.reportList);
  return (
    <Box
      onClick={() => {
        if (!visible) {
          let filter = "";
          if (user?.id) {
            filter += `id=${user?.id}`;
          }
          if (startDate && endDate) {
            filter += `&startDate=${moment(startDate)?.format("YYYY-MM-DD")}`;
            filter += `&endDate=${moment(endDate)?.format("YYYY-MM-DD")}`;
          } else if (startDate) {
            filter += `&startDate=${moment(startDate)?.format("YYYY-MM-DD")}`;
          } else if (endDate) {
            filter += `&endDate=${moment(endDate)?.format("YYYY-MM-DD")}`;
          }
          if (
            item?.eventType === gameConstants.horseRacing ||
            item?.eventType === gameConstants.greyHound
          ) {
            filter += `&isRacing=true`;
          }
          setCurrentPage(1);
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
        setShowMatchList((prev: boolean) => !prev);
        setVisible((prev) => !prev);
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
          alignItems: "center",
          display: "flex",
          paddingX: "10px",
          background: "#F8C851",
          marginLeft: 0.1,
          justifyContent: "center",
          borderRight: "1px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "15px", color: "black", fontWeight: "600" }}
        >
          {index + 1}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "35%", sm: "30%", lg: "30%" },
          height: "100%",
          alignItems: "center",
          display: "flex",
          paddingX: "10px",
          background: "#F8C851",
          justifyContent: "space-between",
          borderRight: "1px solid white",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "12px", sm: "15px", lg: "15px" },
            color: "black",
            fontWeight: "600",
          }}
        >
          {item?.domainUrl}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "20%", sm: "25%", lg: "25%" },
          height: "100%",
          alignItems: "center",
          display: "flex",
          paddingX: "10px",
          background: "#F8C851",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "12px", sm: "15px", lg: "15px" },
            color: "black",
            fontWeight: "600",
          }}
        >
          {item?.eventType}
        </Typography>
        <StyledImage
          src={ArrowDown}
          alt="arrowDown"
          sx={{
            width: { lg: "20px", xs: "10px" },
            transform: showMatchList ? "rotate(180deg)" : "rotate(0deg)",
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
            alt="arrowup/dowm"
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
            }}
          >
            {Number(item?.totalLoss) >= 0 ? (
              <>
                <span style={{ visibility: "hidden" }}>-</span>
                {formatToINR(Number(item?.totalLoss).toFixed(2))}{" "}
                {`(${matchesMobile ? "TD(1%)" : "Total Deduction"}: 
                  ${formatToINR(
                    Number(item?.totalDeduction).toFixed(2) || 0
                  )})`}
              </>
            ) : (
              <>
                {formatToINR(Number(item?.totalLoss).toFixed(2))}{" "}
                {`(${matchesMobile ? "TD(1%)" : "Total Deduction"}: 
                  ${formatToINR(
                    Number(item?.totalDeduction).toFixed(2) || 0
                  )})`}
              </>
            )}
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
  );
};

export default memo(RowHeaderDomain);
