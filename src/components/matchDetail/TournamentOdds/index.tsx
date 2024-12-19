import { Box, Typography } from "@mui/material";
import Divider from "../../Inplay/Divider";
import { ARROWUP, LOCKED, LOCKOPEN } from "../../../assets";
import { Fragment, useState } from "react";
import { formatToINR } from "../../../helper";
import { profitLossDataForMatchConstants } from "../../../utils/Constants";
import SmallBox from "../MatchOdds/SmallBox";
import BoxComponent from "./BoxComponent";

const TournamentOdds = (props: any) => {
  const {
    currentMatch,
    minBet,
    maxBet,
    locked,
    blockMatch,
    selft,
    showBox,
    upcoming,
    liveData,
    title,
  } = props;

  const [visible, setVisible] = useState(true);

  const bookRatioA = (teamARates: any, teamBRates: any) => {
    const bookRatio = teamARates != 0 ? teamBRates / teamARates || 0 : 0;
    const formattedRatio = Math.abs(bookRatio).toFixed(2);
    return teamARates < 0 ? `-${formattedRatio}` : formattedRatio;
  };

  const bookRatioB = (teamARates: any, teamBRates: any) => {
    const bookRatio = teamBRates != 0 ? teamARates / teamBRates || 0 : 0;
    const formattedRatio = Math.abs(bookRatio).toFixed(2);
    return teamBRates < 0 ? `-${formattedRatio}` : formattedRatio;
  };

  const handleLock = (data: any) => {
    return data?.ex?.availableToBack?.length > 0 ? false : true;
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        backgroundColor: "white",
        padding: 0.2,
        flexDirection: "column",
        width: "100%",
        marginTop: "3px",
        marginBottom: "0",
        alignSelf: {
          xs: "center",
          md: "center",
          lg: "flex-start",
          position: "relative",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: 38,
          flexDirection: "row",
          width: "99.7%",
          alignSelf: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            background: "#f1c550",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "13px", md: "12px", xs: "12px" },
              fontWeight: "bold",
              marginLeft: "7px",
            }}
          >
            {title}
          </Typography>
          {blockMatch && (
            <img
              onClick={() => (selft ? "" : "")}
              src={locked ? LOCKED : LOCKOPEN}
              style={{ width: "14px", height: "20px" }}
            />
          )}
        </Box>
        <Box
          sx={{
            flex: 0.1,
            background: "#262626",
          }}
        >
          <div className="slanted"></div>
        </Box>
        <Box
          sx={{
            flex: 1,
            background: "#262626",
            display: "flex",
            alignItems: "center",
            justifyContent: { lg: "flex-end", xs: "flex-end" },
            paddingRight: { lg: "0", xs: "0" },
          }}
        >
          <SmallBox
            valueA={bookRatioA(
              currentMatch?.profitLossDataMatch
                ? currentMatch?.profitLossDataMatch[
                    profitLossDataForMatchConstants[liveData?.type]?.A +
                      "_" +
                      currentMatch?.id
                  ]
                  ? currentMatch?.profitLossDataMatch[
                      profitLossDataForMatchConstants[liveData?.type]?.A +
                        "_" +
                        currentMatch?.id
                    ]
                  : 0
                : 0,
              currentMatch?.profitLossDataMatch
                ? currentMatch?.profitLossDataMatch[
                    profitLossDataForMatchConstants[liveData?.type]?.B +
                      "_" +
                      currentMatch?.id
                  ]
                  ? currentMatch?.profitLossDataMatch[
                      profitLossDataForMatchConstants[liveData?.type]?.B +
                        "_" +
                        currentMatch?.id
                    ]
                  : 0
                : 0
            )}
            valueB={bookRatioB(
              currentMatch?.profitLossDataMatch
                ? currentMatch?.profitLossDataMatch[
                    profitLossDataForMatchConstants[liveData?.type]?.A +
                      "_" +
                      currentMatch?.id
                  ]
                  ? currentMatch?.profitLossDataMatch[
                      profitLossDataForMatchConstants[liveData?.type]?.A +
                        "_" +
                        currentMatch?.id
                    ]
                  : 0
                : 0,
              currentMatch?.profitLossDataMatch
                ? currentMatch?.profitLossDataMatch[
                    profitLossDataForMatchConstants[liveData?.type]?.B +
                      "_" +
                      currentMatch?.id
                  ]
                  ? currentMatch?.profitLossDataMatch[
                      profitLossDataForMatchConstants[liveData?.type]?.B +
                        "_" +
                        currentMatch?.id
                    ]
                  : 0
                : 0
            )}
          />
          <img
            onClick={() => {
              setVisible(!visible);
            }}
            src={ARROWUP}
            style={{
              transform: visible ? "rotate(180deg)" : "rotate(0deg)",
              width: "15px",
              height: "15px",
              marginRight: "5px",
              marginLeft: "5px",
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>
      {visible && (
        <>
          <Box
            sx={{
              display: "flex",
              background: "#319E5B",
              height: "25px",
              borderTop: "2px solid white",
              width: "99.7%",
              alignSelf: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                background: "'#319E5B'",
                height: "25px",
                width: "40%",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: { lg: "11px", xs: "9px" },
                  marginLeft: "7px",
                }}
              >
                MIN:{formatToINR(minBet)} MAX: {formatToINR(maxBet)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "25px",
                width: { lg: "60%", xs: "80%" },
                justifyContent: { lg: "flex-end", xs: "flex-end" },
              }}
            >
              <Box
                sx={{
                  background: "#00C0F9",
                  border: "1px solid #2626264D",
                  width: { lg: "5vw", xs: "30%" },
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                >
                  Back
                </Typography>
              </Box>
              <Box
                sx={{ width: "3px", display: "flex", background: "white" }}
              ></Box>
              <Box
                sx={{
                  background: "#FF9292",
                  border: "1px solid #2626264D",
                  width: { lg: "5vw", xs: "30%" },
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                >
                  Lay
                </Typography>
              </Box>
              <Box
                sx={{ width: ".7px", display: "flex", background: "white" }}
              ></Box>
            </Box>
          </Box>

          <Box sx={{ position: "relative", width: "99.8%", background: "red" }}>
            {(upcoming || showBox) && (
              <Box
                sx={{
                  position: "absolute",
                  height: "100%",
                  // top: "18%",
                  width: "100%",
                  display: "flex",
                  zIndex: "999",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "rgba(0, 0, 0, .5)",
                }}
              ></Box>
            )}
            {liveData?.runners?.map((runner: any, index: number) => (
              <Fragment key={index}>
                <BoxComponent
                  name={runner?.nat || runner?.runnerName}
                  rates={
                    currentMatch?.profitLossDataMatch?.[
                      liveData?.id + "_" + "profitLoss" + "_" + currentMatch?.id
                    ]
                      ? JSON.parse(
                          currentMatch?.profitLossDataMatch?.[
                            liveData?.id +
                              "_" +
                              "profitLoss" +
                              "_" +
                              currentMatch?.id
                          ]
                        )?.[runner?.id]
                      : 0
                  }
                  color={
                    currentMatch?.profitLossDataMatch?.[
                      liveData?.id + "_" + "profitLoss" + "_" + currentMatch?.id
                    ]
                      ? JSON.parse(
                          currentMatch?.profitLossDataMatch?.[
                            liveData?.id +
                              "_" +
                              "profitLoss" +
                              "_" +
                              currentMatch?.id
                          ]
                        )?.[runner?.id] < 0
                        ? "#FF4D4D"
                        : "#319E5B"
                      : "#319E5B"
                  }
                  data={runner}
                  lock={handleLock(runner)}
                />
                <Divider />
              </Fragment>
            ))}
            {locked && (
              <Box
                sx={{
                  background: "rgba(0,0,0,.5)",
                  width: "100%",
                  height: currentMatch?.teamC ? "150px" : "105px",
                  position: "absolute",
                  top: "-24px",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  display: "flex",
                  zIndex: "999",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    alignSelf: "flex-end",
                    height: currentMatch?.teamC ? "150px" : "105px",
                    position: "absolute",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <img src={LOCKED} style={{ width: "35px", height: "40px" }} />

                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "600",
                      marginLeft: "15px",
                      fontSize: "20px",
                      marginTop: "12px",
                    }}
                  >
                    Locked
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default TournamentOdds;
