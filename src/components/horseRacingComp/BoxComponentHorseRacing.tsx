import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import moment from "moment";
import { memo } from "react";
import { LockSolid } from "../../assets";
import { formatNumber } from "../../helper";
import StyledImage from "../Common/StyledImages";
import MoneyBox from "../matchDetail/MatchOdds/MoneyBox";
import SeperateBox from "../matchDetail/MatchOdds/SeperateBox";

const BoxComponentHorseRacing = ({ name, color, rates, data }: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { ex, status, adjustmentFactor, removalDate } = data ?? {};
  return (
    <Box
      sx={{
        display: "flex",
        background: "white",
        height: "40px",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: "40px",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "14px", xs: "13px" },
              fontWeight: "600",
              marginLeft: "10px",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              maxWidth: "88px",
            }}
          >
            {name}
          </Typography>
        </Box>
      </Box>

      {!["ACTIVE", undefined, null].includes(status) ? (
        <Box
          sx={{
            height: "40px",
            display: "flex",
            width: { lg: "60%", xs: "80%" },
            justifyContent: { xs: "flex-end", lg: "flex-end" },
            alignItems: "center",
          }}
        >
          <MoneyBox color={color} rates={rates} />
          <Box
            sx={{
              height: "40px",
              display: "flex",
              width: {
                xs: "39vw",
                lg: "10.17vw",
                desktop: "10.17vw",
                desktop2XL: "10.12vw",
              },
              justifyContent: { xs: "flex-end", lg: "flex-end" },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                background: "rgba(0,0,0,1)",
                height: "40px",
                display: "flex",
                width: {
                  xs: "39vw",
                  lg: "10.17vw",
                  desktop: "10.17vw",
                  desktop2XL: "10.12vw",
                },
                justifyContent: { xs: "flex-end", lg: "flex-end" },
                alignItems: "center",
              }}
            >
              <Typography
                style={{
                  fontSize: matchesMobile
                    ? status === "REMOVED"
                      ? "10px"
                      : "12px"
                    : status === "REMOVED"
                    ? "10px"
                    : "18px",
                  textTransform: "uppercase",
                  width: "100%",
                  textAlign: "center",
                  color: "white",
                  fontWeight: "400",
                }}
              >
                {status
                  ? status === "REMOVED"
                    ? `${status} - ${adjustmentFactor}%, ${moment(
                        removalDate
                      ).format("MM/DD/YYYY HH:mm:ss A ([IST])")}`
                    : status
                  : "suspended"}
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "40px",
            width: { lg: "60%", xs: "80%" },
            justifyContent: { xs: "flex-end", lg: "flex-end" },
            alignItems: "center",
          }}
        >
          <MoneyBox color={color} rates={rates} />

          {ex?.availableToBack?.length > 0 &&
          ![0, "0"].includes(ex?.availableToBack[0]?.price) ? (
            <SeperateBox
              value={
                ex?.availableToBack?.length > 0
                  ? ex?.availableToBack[0]?.price
                  : 0
              }
              value2={formatNumber(
                ex?.availableToBack?.length > 0
                  ? ex?.availableToBack[0]?.size
                  : 0,
                false
              )}
              color={matchesMobile ? "#A7DCFF" : "#A7DCFF"}
            />
          ) : (
            <Box
              sx={{
                height: "94%",
                background: "#FDF21A",
                border: "1px solid #2626264D",
                width: { xs: "30%", lg: "5vw" },
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <StyledImage
                src={LockSolid}
                sx={{ height: "20px", width: "20px" }}
              />
            </Box>
          )}

          <Box sx={{ width: "3px", display: "flex", background: "pink" }} />
          {ex?.availableToLay?.length > 0 &&
          ![0, "0"].includes(ex?.availableToLay[0]?.price) ? (
            <SeperateBox
              value={
                ex?.availableToLay?.length > 0
                  ? ex?.availableToLay[0]?.price
                  : 0
              }
              value2={formatNumber(
                ex?.availableToLay?.length > 0
                  ? ex?.availableToLay[0]?.size
                  : 0,
                false
              )}
              color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
            />
          ) : (
            <Box
              sx={{
                height: "94%",
                background: "#FDF21A",
                border: "1px solid #2626264D",
                width: { xs: "30%", lg: "5vw" },
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <StyledImage
                src={LockSolid}
                sx={{ height: "20px", width: "20px" }}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default memo(BoxComponentHorseRacing);
