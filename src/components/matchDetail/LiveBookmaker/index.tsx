import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { ARROWUP, LOCKED, LOCKOPEN } from "../../../assets";
import { formatToINR } from "../../../helper";
import { profitLossDataForMatchConstants } from "../../../utils/Constants";
import CommissionDot from "../../Common/CommissionDot";
import Divider from "../../Inplay/Divider";
import UnlockComponent from "../../lockMatchDetailComponents/UnlockComponent";
import SmallBox from "../MatchOdds/SmallBox";
import BoxComponent from "./BoxComponent";

const LiveBookmaker = (props: any) => {
  const {
    currentMatch,
    data,
    blockMatch,
    showUnlock,
    locked,
    handleShowLock,
    selft,
    minBet,
    maxBet,
    upcoming,
    showBox,
    handleBlock,
    handleHide,
    title,
    liveData,
    profitLossFromAnalysis,
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
    return data?.ex?.availableToLay?.length > 0 ? false : true;
  };

  const onSubmit = (value: any) => {
    handleBlock(value, !locked, "BOOKMAKER");
  };
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        backgroundColor: "white",
        padding: 0.2,
        flexDirection: "column",
        marginY: "3px",
        width: "100%",
        alignSelf: { xs: "center", md: "center", lg: "flex-start" },
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
          {liveData?.isCommissionActive && <CommissionDot />}
          {blockMatch && (
            <img
              onClick={() =>
                selft || selft == undefined
                  ? handleShowLock(true, "BOOKMAKER")
                  : ""
              }
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
            padding: { lg: "0", xs: "0" },
          }}
        >
          <SmallBox
            // color={"#FF4D4D"}
            valueA={bookRatioA(
              profitLossFromAnalysis
                ? profitLossFromAnalysis?.profitLoss?.a
                : currentMatch?.profitLossDataMatch
                ? liveData?.type === "other"
                  ? currentMatch?.profitLossDataMatch[
                      profitLossDataForMatchConstants[liveData?.type]?.A +
                        "_" +
                        liveData?.id +
                        "_" +
                        currentMatch?.id
                    ]
                    ? currentMatch?.profitLossDataMatch[
                        profitLossDataForMatchConstants[liveData?.type]?.A +
                          "_" +
                          liveData?.id +
                          "_" +
                          currentMatch?.id
                      ]
                    : 0
                  : currentMatch?.profitLossDataMatch[
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
              profitLossFromAnalysis
                ? profitLossFromAnalysis?.profitLoss?.b
                : currentMatch?.profitLossDataMatch
                ? liveData?.type === "other"
                  ? currentMatch?.profitLossDataMatch[
                      profitLossDataForMatchConstants[liveData?.type]?.B +
                        "_" +
                        liveData?.id +
                        "_" +
                        currentMatch?.id
                    ]
                    ? currentMatch?.profitLossDataMatch[
                        profitLossDataForMatchConstants[liveData?.type]?.B +
                          "_" +
                          liveData?.id +
                          "_" +
                          currentMatch?.id
                      ]
                    : 0
                  : currentMatch?.profitLossDataMatch[
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
              profitLossFromAnalysis
                ? profitLossFromAnalysis?.profitLoss?.a
                : currentMatch?.profitLossDataMatch
                ? liveData?.type === "other"
                  ? currentMatch?.profitLossDataMatch[
                      profitLossDataForMatchConstants[liveData?.type]?.A +
                        "_" +
                        liveData?.id +
                        "_" +
                        currentMatch?.id
                    ]
                    ? currentMatch?.profitLossDataMatch[
                        profitLossDataForMatchConstants[liveData?.type]?.A +
                          "_" +
                          liveData?.id +
                          "_" +
                          currentMatch?.id
                      ]
                    : 0
                  : currentMatch?.profitLossDataMatch[
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
              profitLossFromAnalysis
                ? profitLossFromAnalysis?.profitLoss?.b
                : currentMatch?.profitLossDataMatch
                ? liveData?.type === "other"
                  ? currentMatch?.profitLossDataMatch[
                      profitLossDataForMatchConstants[liveData?.type]?.B +
                        "_" +
                        liveData?.id +
                        "_" +
                        currentMatch?.id
                    ]
                    ? currentMatch?.profitLossDataMatch[
                        profitLossDataForMatchConstants[liveData?.type]?.B +
                          "_" +
                          liveData?.id +
                          "_" +
                          currentMatch?.id
                      ]
                    : 0
                  : currentMatch?.profitLossDataMatch[
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
      <Divider />
      {visible && (
        <>
          <>
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "25px",
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
                  MIN: {formatToINR(minBet)} MAX:
                  {formatToINR(maxBet)}
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
              </Box>
            </Box>
          </>

          <Box sx={{ position: "relative", width: "99.8%" }}>
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
            <BoxComponent
              // color={"#46e080"}
              teamImage={currentMatch?.teamA_Image}
              name={currentMatch?.teamA}
              rates={
                profitLossFromAnalysis
                  ? profitLossFromAnalysis?.profitLoss?.a
                  : currentMatch?.profitLossDataMatch
                  ? liveData?.type === "other"
                    ? currentMatch?.profitLossDataMatch[
                        profitLossDataForMatchConstants[liveData?.type]?.A +
                          "_" +
                          liveData?.id +
                          "_" +
                          currentMatch?.id
                      ]
                      ? currentMatch?.profitLossDataMatch[
                          profitLossDataForMatchConstants[liveData?.type]?.A +
                            "_" +
                            liveData?.id +
                            "_" +
                            currentMatch?.id
                        ]
                      : 0
                    : currentMatch?.profitLossDataMatch[
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
                  : 0
              }
              color={
                profitLossFromAnalysis
                  ? profitLossFromAnalysis?.profitLoss?.a < 0
                    ? "#FF4D4D"
                    : "#319E5B"
                  : currentMatch?.profitLossDataMatch
                  ? liveData?.type === "other"
                    ? currentMatch?.profitLossDataMatch[
                        profitLossDataForMatchConstants[liveData?.type]?.A +
                          "_" +
                          liveData?.id +
                          "_" +
                          currentMatch?.id
                      ]
                      ? currentMatch?.profitLossDataMatch[
                          profitLossDataForMatchConstants[liveData?.type]?.A +
                            "_" +
                            liveData?.id +
                            "_" +
                            currentMatch?.id
                        ] < 0
                        ? "#FF4D4D"
                        : "#319E5B"
                      : "#319E5B"
                    : currentMatch?.profitLossDataMatch[
                        profitLossDataForMatchConstants[liveData?.type]?.A +
                          "_" +
                          currentMatch?.id
                      ]
                    ? currentMatch?.profitLossDataMatch[
                        profitLossDataForMatchConstants[liveData?.type]?.A +
                          "_" +
                          currentMatch?.id
                      ] < 0
                      ? "#FF4D4D"
                      : "#319E5B"
                    : "#319E5B"
                  : "#319E5B"
              }
              data={data?.length > 0 ? data[0] : []}
              lock={handleLock(data?.length > 0 ? data[0] : [])}
            />
            <Divider />
            <BoxComponent
              // color={"#FF4D4D"}
              // lock={true}
              teamImage={currentMatch?.teamB_Image}
              name={currentMatch?.teamB}
              rates={
                profitLossFromAnalysis
                  ? profitLossFromAnalysis?.profitLoss?.b
                  : currentMatch?.profitLossDataMatch
                  ? liveData?.type === "other"
                    ? currentMatch?.profitLossDataMatch[
                        profitLossDataForMatchConstants[liveData?.type]?.B +
                          "_" +
                          liveData?.id +
                          "_" +
                          currentMatch?.id
                      ]
                      ? currentMatch?.profitLossDataMatch[
                          profitLossDataForMatchConstants[liveData?.type]?.B +
                            "_" +
                            liveData?.id +
                            "_" +
                            currentMatch?.id
                        ]
                      : 0
                    : currentMatch?.profitLossDataMatch[
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
              }
              color={
                profitLossFromAnalysis
                  ? profitLossFromAnalysis?.profitLoss?.b < 0
                    ? "#FF4D4D"
                    : "#319E5B"
                  : currentMatch?.profitLossDataMatch
                  ? liveData?.type === "other"
                    ? currentMatch?.profitLossDataMatch[
                        profitLossDataForMatchConstants[liveData?.type]?.B +
                          "_" +
                          liveData?.id +
                          "_" +
                          currentMatch?.id
                      ]
                      ? currentMatch?.profitLossDataMatch[
                          profitLossDataForMatchConstants[liveData?.type]?.B +
                            "_" +
                            liveData?.id +
                            "_" +
                            currentMatch?.id
                        ] < 0
                        ? "#FF4D4D"
                        : "#319E5B"
                      : "#319E5B"
                    : currentMatch?.profitLossDataMatch[
                        profitLossDataForMatchConstants[liveData?.type]?.B +
                          "_" +
                          currentMatch?.id
                      ]
                    ? currentMatch?.profitLossDataMatch[
                        profitLossDataForMatchConstants[liveData?.type]?.B +
                          "_" +
                          currentMatch?.id
                      ] < 0
                      ? "#FF4D4D"
                      : "#319E5B"
                    : "#319E5B"
                  : "#319E5B"
              }
              data={data?.length > 0 ? data[1] : []}
              lock={handleLock(data?.length > 0 ? data[1] : [])}
              align="end"
            />
            {currentMatch?.teamC ? (
              <>
                <Divider />
                <BoxComponent
                  teamImage={
                    currentMatch?.teamC_Image ? currentMatch?.teamC_Image : null
                  }
                  // color={"#FF4D4D"}
                  color={
                    profitLossFromAnalysis
                      ? profitLossFromAnalysis?.profitLoss?.c < 0
                        ? "#FF4D4D"
                        : "#319E5B"
                      : currentMatch?.profitLossDataMatch
                      ? liveData?.type === "other"
                        ? currentMatch?.profitLossDataMatch[
                            profitLossDataForMatchConstants[liveData?.type]?.C +
                              "_" +
                              liveData?.id +
                              "_" +
                              currentMatch?.id
                          ]
                          ? currentMatch?.profitLossDataMatch[
                              profitLossDataForMatchConstants[liveData?.type]
                                ?.C +
                                "_" +
                                liveData?.id +
                                "_" +
                                currentMatch?.id
                            ] < 0
                            ? "#FF4D4D"
                            : "#319E5B"
                          : "#319E5B"
                        : currentMatch?.profitLossDataMatch[
                            profitLossDataForMatchConstants[liveData?.type]?.C +
                              "_" +
                              currentMatch?.id
                          ]
                        ? currentMatch?.profitLossDataMatch[
                            profitLossDataForMatchConstants[liveData?.type]?.C +
                              "_" +
                              currentMatch?.id
                          ] < 0
                          ? "#FF4D4D"
                          : "#319E5B"
                        : "#319E5B"
                      : "#319E5B"
                  }
                  name={currentMatch?.teamC}
                  rates={
                    profitLossFromAnalysis
                      ? profitLossFromAnalysis?.profitLoss?.c
                      : currentMatch?.profitLossDataMatch
                      ? liveData?.type === "other"
                        ? currentMatch?.profitLossDataMatch[
                            profitLossDataForMatchConstants[liveData?.type]?.C +
                              "_" +
                              liveData?.id +
                              "_" +
                              currentMatch?.id
                          ]
                          ? currentMatch?.profitLossDataMatch[
                              profitLossDataForMatchConstants[liveData?.type]
                                ?.C +
                                "_" +
                                liveData?.id +
                                "_" +
                                currentMatch?.id
                            ]
                          : 0
                        : currentMatch?.profitLossDataMatch[
                            profitLossDataForMatchConstants[liveData?.type]?.C +
                              "_" +
                              currentMatch?.id
                          ]
                        ? currentMatch?.profitLossDataMatch[
                            profitLossDataForMatchConstants[liveData?.type]?.C +
                              "_" +
                              currentMatch?.id
                          ]
                        : 0
                      : 0
                  }
                  data={data?.length > 0 ? data[2] : []}
                  lock={handleLock(data?.length > 0 ? data[2] : [])}
                  align="end"
                />
              </>
            ) : null}
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
                    zIndex: "999",
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
      {showUnlock && (
        <Box
          sx={{
            position: "absolute",
            width: { xs: "90%", lg: "100%" },
            background: "transparent",
            alignSelf: "center",
            marginTop: "38px",
            left: { xs: "10%", lg: "20%" },
            zIndex: 999,
          }}
        >
          <UnlockComponent
            unlock={locked}
            title={(locked ? "Unlock " : "Lock ") + "Bookmaker Market"}
            handleHide={handleHide}
            onSubmit={onSubmit}
          />
        </Box>
      )}
    </Box>
  );
};

export default LiveBookmaker;
