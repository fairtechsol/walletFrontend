import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import { BallStart } from "../../../assets";
import { formatNumber, formatToINR } from "../../../helper";
import { sessionBettingType } from "../../../utils/Constants";
import CommissionDot from "../../Common/CommissionDot";
import SeperateBox from "../MatchOdds/SeperateBox";
import PlaceBetComponent from "./PlaceBetComponent";
import PlaceBetComponentWeb from "./PlaceBetComponentWeb";

interface SeasonMarketBoxProps {
  newData: any;
  profitLossData: any;
  index: number;
  type: any;
}

const SeasonMarketBox = ({
  newData,
  profitLossData,
  index,
  type,
}: SeasonMarketBoxProps) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <>
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: "38px",
          width: "100%",
          position: "relative",
        }}
      >
        {newData?.activeStatus === "save" && (
          <Box
            sx={{
              margin: "1px",
              width: "100%",
              height: "100%",
              position: "absolute",
              right: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 2,
            }}
          />
        )}
        <Box
          sx={{
            display: "flex",
            height: "38px",
            width: "45%",
            alignItems: "center",
            background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "black",
                fontSize: { lg: "12px", md: "11px", xs: "9px" },
                marginLeft: "7px",
                fontWeight: "600",
                lineHeight: "10px",
              }}
            >
              {newData?.name ?? newData?.RunnerName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "start",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  color: "black",
                  fontSize: { lg: "11px", md: "10px", xs: "8px" },
                  marginLeft: "7px",
                  fontWeight: "500",
                }}
              >
                max: {formatToINR(newData?.maxBet || newData?.max)}
              </Typography>
              {newData?.isCommissionActive && <CommissionDot />}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            position: "relative",
            height: "38px",
            width: { lg: "60%", xs: "89%" },
            justifyContent: "flex-end",
            alignItems: "center",
            background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
          }}
        >
          {/* {newData?.isCommissionActive && (
            <Box
              sx={{
                position: "absolute",
                right: { xs: "60vw", sm: "53vw", lg: "22vw", md: "50vw" },
              }}
            >
              <CommissionDot />
            </Box>
          )} */}
          {matchesMobile ? (
            <PlaceBetComponent
              type={type}
              newData={newData}
              profitLoss={profitLossData && profitLossData[0]}
            />
          ) : (
            <PlaceBetComponentWeb
              type={type}
              newData={newData}
              profitLoss={profitLossData && profitLossData[0]}
            />
          )}
          {(
            !newData?.isManual
              ? !["ACTIVE", "active", "", undefined, null].includes(
                  newData?.GameStatus
                ) ||
                (!newData.ex?.availableToBack?.length &&
                  !newData.ex?.availableToLay?.length)
              : newData?.status !== "active"
          ) ? (
            <Box
              sx={{
                background: "rgba(0,0,0,1)",
                height: "38px",
                marginLeft: { lg: "20%", md: "0%", xs: "0%" },
                width: { lg: "38%", md: "60.2%", xs: "60.9%" },
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                zIndex: 1,
              }}
            >
              {newData?.status == "Ball Running" ||
              newData?.status === "ball start" ? (
                Math.max(
                  newData?.ex?.availableToLay?.length ?? 0,
                  newData?.ex?.availableToBack?.length ?? 0
                ) <= 1 && (
                  <img
                    src={BallStart}
                    style={{ width: "113px", height: "32px" }}
                  />
                )
              ) : (
                <Typography
                  sx={{
                    fontSize: { xs: "12px", lg: "16px" },
                    textTransform: "uppercase",
                    textAlign: "center",
                    width: "100%",
                    color: "white",
                    fontWeight: "400",
                  }}
                >
                  {Math.max(
                    newData?.ex?.availableToLay?.length ?? 0,
                    newData?.ex?.availableToBack?.length ?? 0
                  ) <= 1 &&
                    (newData?.isManual
                      ? newData?.status
                      : !newData?.GameStatus
                      ? "SUSPENDED"
                      : newData?.GameStatus)}
                </Typography>
              )}
            </Box>
          ) : (
            <>
              {newData?.isManual ? (
                <>
                  <SeperateBox
                    value={Math.floor(newData?.noRate)}
                    value2={Math.floor(newData?.noPercent)}
                    lock={
                      newData?.status === "suspended" ||
                      [0, "0"].includes(Math.floor(newData?.noRate))
                    }
                    color="#F6D0CB"
                  />
                  <Box
                    sx={{ width: "3px", display: "flex", background: "pink" }}
                  />
                  <SeperateBox
                    value={Math.floor(newData?.yesRate)}
                    value2={formatNumber(Math.floor(newData?.yesPercent))}
                    lock={
                      newData?.status === "suspended" ||
                      [0, "0"].includes(Math.floor(newData?.yesRate))
                    }
                    color="#B3E0FF"
                  />
                </>
              ) : (
                <>
                  <SeperateBox
                    value={newData.ex?.availableToLay[0]?.price ?? 0}
                    value2={newData.ex?.availableToLay[0]?.size ?? 0}
                    lock={
                      [null, 0, "0"].includes(
                        Math.floor(newData.ex?.availableToLay[0]?.price ?? 0)
                      ) || type === "khado"
                        ? true
                        : false
                    }
                    color={
                      sessionBettingType.oddEven == type ? "#B3E0FF" : "#F6D0CB"
                    }
                  />
                  <Box
                    sx={{ width: "3px", display: "flex", background: "pink" }}
                  />
                  <SeperateBox
                    value={newData.ex?.availableToBack[0]?.price ?? 0}
                    value2={newData.ex?.availableToBack[0]?.size ?? 0}
                    lock={
                      [null, 0, "0"].includes(
                        Math.floor(newData.ex?.availableToBack[0]?.price ?? 0)
                      )
                        ? true
                        : false
                    }
                    color="#B3E0FF"
                  />
                </>
              )}
            </>
          )}
          <Box sx={{ width: ".45%", display: "flex", background: "pink" }} />
        </Box>
      </Box>
      {Array.from(
        {
          length:
            Math.max(
              newData?.ex?.availableToLay?.length ?? 0,
              newData?.ex?.availableToBack?.length ?? 0
            ) - 1,
        },
        (_, i) => i + 1
      )?.map((item: number) => (
        <Box
          key={item}
          sx={{
            display: "flex",
            background: "white",
            height: "38px",
            width: "100%",
            position: "relative",
          }}
        >
          {newData?.activeStatus === "save" && (
            <Box
              sx={{
                margin: "1px",
                width: "100%",
                height: "100%",
                position: "absolute",
                right: 0,
                background: "rgba(0,0,0,0.5)",
                zIndex: 2,
              }}
            />
          )}
          <Box
            sx={{
              display: "flex",
              height: "38px",
              width: "40%",
              alignItems: "center",
              background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
            }}
          />
          <Box
            sx={{
              display: "flex",
              position: "relative",
              background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
              height: "38px",
              width: { lg: "60%", xs: "79%" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {!["ACTIVE", "active", "", undefined, null].includes(
              newData?.GameStatus
            ) ||
            (!newData.ex?.availableToBack?.length &&
              !newData.ex?.availableToLay?.length) ? (
              <Box
                sx={{
                  background: "rgba(0,0,0,1)",
                  height: "38px",
                  marginLeft: { lg: "20%", md: "0%", xs: "0%" },
                  width: { lg: "36%", md: "60.2%", xs: "60.9%" },
                  justifyContent: { xs: "center", lg: "center" },
                  alignItems: "center",
                  display: "flex",
                  zIndex: 1,
                }}
              >
                {newData?.status == "Ball Running" ||
                newData?.status === "ball start" ? (
                  item === 1 && (
                    <img
                      src={BallStart}
                      style={{ width: "113px", height: "32px" }}
                    />
                  )
                ) : (
                  <Typography
                    sx={{
                      fontSize: { xs: "12px", lg: "16px" },
                      textTransform: "uppercase",
                      textAlign: "center",
                      width: "100%",
                      color: "white",
                      fontWeight: "400",
                    }}
                  >
                    {item === 1 &&
                      (newData?.isManual
                        ? newData?.status
                        : !newData?.GameStatus
                        ? "SUSPENDED"
                        : newData?.GameStatus)}
                  </Typography>
                )}
              </Box>
            ) : (
              <>
                <SeperateBox
                  value={
                    sessionBettingType.oddEven === type
                      ? newData.ex?.availableToBack[item]?.price ?? 0
                      : newData.ex?.availableToLay[item]?.price ?? 0
                  }
                  value2={
                    sessionBettingType.oddEven === type
                      ? newData.ex?.availableToBack[item]?.size ?? 0
                      : newData.ex?.availableToLay[item]?.size ?? 0
                  }
                  lock={
                    [null, 0, "0"].includes(
                      Math.floor(
                        sessionBettingType.oddEven === type
                          ? newData.ex?.availableToBack[item]?.price ?? 0
                          : newData.ex?.availableToLay[item]?.price ?? 0
                      )
                    ) || type === "khado"
                      ? true
                      : false
                  }
                  color={
                    sessionBettingType.oddEven == type ? "#B3E0FF" : "#F6D0CB"
                  }
                />
                <Box
                  sx={{
                    width: "3px",
                    display: "flex",
                    background: "pink",
                  }}
                />
                <SeperateBox
                  value={
                    sessionBettingType.oddEven === type
                      ? newData.ex?.availableToLay[item]?.price ?? 0
                      : newData.ex?.availableToBack[item]?.price ?? 0
                  }
                  value2={
                    sessionBettingType.oddEven === type
                      ? newData.ex?.availableToLay[item]?.size ?? 0
                      : newData.ex?.availableToBack[item]?.size ?? 0
                  }
                  lock={
                    [null, 0, "0"].includes(
                      Math.floor(
                        sessionBettingType.oddEven === type
                          ? newData.ex?.availableToLay[item]?.price ?? 0
                          : newData.ex?.availableToBack[item]?.price ?? 0
                      )
                    )
                      ? true
                      : false
                  }
                  color="#B3E0FF"
                />
              </>
            )}

            <Box sx={{ width: ".45%", display: "flex", background: "pink" }} />
          </Box>
        </Box>
      ))}
    </>
  );
};

export default memo(SeasonMarketBox);
