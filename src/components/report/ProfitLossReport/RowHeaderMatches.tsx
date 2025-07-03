import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ARROWDOWN, ARROW_UP, ArrowDown } from "../../../assets";
import { handleNumber } from "../../../helper";
import {
  getDomainProfitLoss,
  resetBetProfitLoss,
  resetDomainProfitLoss,
  resetSessionProfitLoss,
} from "../../../store/actions/reports";
import { AppDispatch, RootState } from "../../../store/store";
import { gameConstants, gameIconConstants } from "../../../utils/Constants";
import StyledImage from "../../Common/StyledImages";
import RowComponentMatches from "./RowComponentMatches";

interface RowHeaderMatchesProps {
  item: any;
  startDate: any;
  endDate: any;
  getHandleReport: (val: string) => void;
  selectedId: any;
  getBetReport: (val: any) => void;
  userProfitLoss: any;
  getUserProfitLoss: (val: string) => void;
  eventType: string;
  paginatedData: any;
  currentPage: number;
}

const RowHeaderMatches = ({
  item,
  startDate,
  endDate,
  getHandleReport,
  selectedId,
  getBetReport,
  userProfitLoss,
  getUserProfitLoss,
  eventType,
  paginatedData,
  currentPage
}: RowHeaderMatchesProps) => {
  const { user } = useSelector((state: RootState) => state.report.reportList);
  const theme = useTheme();
  const [show, setShow] = useState(false);
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();

  const handleEventClick = () => {
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
      if (
        item?.eventType === gameConstants.horseRacing ||
        item?.eventType === gameConstants.greyHound
      ) {
        filter += `&isRacing=true`;
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
    setShow((prev: boolean) => !prev);
  };

  useEffect(() => {
    if (item?.eventType !== eventType) {
      setShow(false);
    }
  }, [item?.eventType, eventType]);

  return (
    <>
      <Box
        onClick={handleEventClick}
        sx={{
          width: "100%",
          height: { lg: "60px", xs: "50px" },
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
            background: "#F8C851",
          }}
        >
          <StyledImage
            src={gameIconConstants[item?.eventType]}
            alt="gameIcon"
            sx={{ width: { lg: "35px", sm: "35px", xs: "22px" } }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "40%", sm: "55%", lg: "56%" },
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
            alt="arrowDown"
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
                lineHeight: "0.9",
              }}
            >
              {handleNumber(parseFloat(item?.totalLoss || 0), "")}
              {`${matchesMobile ? "TD(1%)" : "Total Deduction"} : `}
              {handleNumber(parseFloat(item?.totalDeduction || 0), "")}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            background: "#0B4F26",
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
      {show &&
        eventType === item?.eventType &&
        paginatedData?.map((item: any, index: number) => {
          return (
            <RowComponentMatches
              key={index}
              item={item}
              index={index + 1}
              selectedId={selectedId}
              getBetReport={getBetReport}
              userProfitLoss={userProfitLoss}
              getUserProfitLoss={getUserProfitLoss}
              currentPage={currentPage}
            />
          );
        })}
    </>
  );
};

export default memo(RowHeaderMatches);
