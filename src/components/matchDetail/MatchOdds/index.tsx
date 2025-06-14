import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ARROWUP, LOCKED, LOCKOPEN } from "../../../assets";
import { formatToINR } from "../../../helper";
import { RootState } from "../../../store/store";
import { profitLossDataForMatchConstants } from "../../../utils/Constants";
import CommissionDot from "../../Common/CommissionDot";
import Divider from "../../Inplay/Divider";
import UnlockComponent from "../../lockMatchDetailComponents/UnlockComponent";
import BoxComponent from "../LiveBookmaker/BoxComponent";
import SmallBox from "./SmallBox";
import TeamRowComponent from "./TeamRowComponent";

const MatchOdds = (props: any) => {
  const {
    currentMatch,
    data,
    minBet,
    maxBet,
    typeOfBet,
    locked,
    blockMatch,
    handleShowLock,
    selft,
    session,
    showBox,
    upcoming,
    showUnlock,
    handleBlock,
    handleHide,
    liveData,
    title,
    profitLossFromAnalysis,
  } = props;
  const { marketAnalysis } = useSelector(
    (state: RootState) => state.match.matchList
  );
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

  const onSubmit = (value: any) => {
    handleBlock(value, !locked, typeOfBet);
  };

  const handleRates = (betType: string, team: string) => {
    try {
      const number = betType.match(/\d+$/);

      const dynamicKey = `user${team}RateSetWinner${number}`;

      const rate = currentMatch?.profitLossDataMatch
        ? currentMatch?.profitLossDataMatch[dynamicKey]
        : 0;
      return parseFloat(rate);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };


  return (
    <Box
      key="odds"
      sx={{
        position: "relative",
        display: "flex",
        backgroundColor: "white",
        padding: 0.2,
        flexDirection: "column",
        width: "100%",
        marginTop: typeOfBet == "Quick Bookmaker" ? "0" : "3px",
        marginBottom: typeOfBet == "Quick Bookmaker" ? "3px" : "0",
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
            {typeOfBet === "MANUAL BOOKMAKER"
              ? "QUICK BOOKMAKER"
              : title
              ? title
              : typeOfBet}
          </Typography>{" "}
          {liveData?.isCommissionActive && <CommissionDot />}
          {blockMatch && (
            <img
              onClick={() => (selft ? handleShowLock(true, typeOfBet) : "")}
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
              marketAnalysis?.betType
                ? profitLossFromAnalysis
                  ? profitLossFromAnalysis?.profitLoss?.a
                  : 0
                : currentMatch?.profitLossDataMatch
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
              marketAnalysis?.betType
                ? profitLossFromAnalysis
                  ? profitLossFromAnalysis?.profitLoss?.b
                  : 0
                : currentMatch?.profitLossDataMatch
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
              marketAnalysis?.betType
                ? profitLossFromAnalysis
                  ? profitLossFromAnalysis?.profitLoss?.a
                  : 0
                : currentMatch?.profitLossDataMatch
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
              marketAnalysis?.betType
                ? profitLossFromAnalysis
                  ? profitLossFromAnalysis?.profitLoss?.b
                  : 0
                : currentMatch?.profitLossDataMatch
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
            {session === "manualBookMaker" ? (
              <>
                <TeamRowComponent
                  // teamImage={currentMatch?.teamA_Image}
                  name={
                    typeOfBet !== "Manual Tied Match" &&
                    typeOfBet !== "Manual Complete Match"
                      ? currentMatch?.teamA
                      : "Yes"
                  }
                  rates={
                    marketAnalysis?.betType
                      ? profitLossFromAnalysis
                        ? profitLossFromAnalysis?.profitLoss?.a
                        : 0
                      : currentMatch?.profitLossDataMatch
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
                      : 0
                  }
                  color={
                    marketAnalysis?.betType
                      ? profitLossFromAnalysis?.profitLoss?.a < 0
                        ? "#FF4D4D"
                        : "#319E5B"
                      : currentMatch?.profitLossDataMatch
                      ? currentMatch?.profitLossDataMatch[
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
                  lock={false}
                  matchOddsData={{
                    back: data?.backTeamA,
                    lay: data?.layTeamA,
                  }}
                  ballStatus={data?.statusTeamA === "ball start" ? true : false}
                  status={data?.statusTeamA !== "active" ? true : false}
                  isTeamC={currentMatch?.teamC}
                />
                <Divider />
                <TeamRowComponent
                  // teamImage={currentMatch?.teamA_Image}
                  name={
                    typeOfBet !== "Manual Tied Match" &&
                    typeOfBet !== "Manual Complete Match"
                      ? currentMatch?.teamB
                      : "No"
                  }
                  rates={
                    marketAnalysis?.betType
                      ? profitLossFromAnalysis
                        ? profitLossFromAnalysis?.profitLoss?.b
                        : 0
                      : currentMatch?.profitLossDataMatch
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
                  }
                  color={
                    marketAnalysis?.betType
                      ? profitLossFromAnalysis?.profitLoss?.b < 0
                        ? "#FF4D4D"
                        : "#319E5B"
                      : currentMatch?.profitLossDataMatch
                      ? currentMatch?.profitLossDataMatch[
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
                  lock={false}
                  matchOddsData={{
                    back: data?.backTeamB,
                    lay: data?.layTeamB,
                  }}
                  ballStatus={data?.statusTeamA === "ball start" ? true : false}
                  status={data?.statusTeamB !== "active" ? true : false}
                  isTeamC={currentMatch?.teamC}
                />
                {currentMatch?.teamC &&
                typeOfBet !== "Manual Tied Match" &&
                typeOfBet !== "Manual Complete Match" ? (
                  <>
                    <Divider />
                    <TeamRowComponent
                      // teamImage={
                      //   currentMatch?.teamC_Image
                      //     ? currentMatch?.teamC_Image
                      //     : null
                      // }
                      name={currentMatch?.teamC}
                      rates={
                        marketAnalysis?.betType
                          ? profitLossFromAnalysis
                            ? profitLossFromAnalysis?.profitLoss?.c
                            : 0
                          : currentMatch?.profitLossDataMatch
                          ? currentMatch?.profitLossDataMatch[
                              profitLossDataForMatchConstants[liveData?.type]
                                ?.C +
                                "_" +
                                currentMatch?.id
                            ]
                            ? currentMatch?.profitLossDataMatch[
                                profitLossDataForMatchConstants[liveData?.type]
                                  ?.C +
                                  "_" +
                                  currentMatch?.id
                              ]
                            : 0
                          : 0
                      }
                      color={
                        marketAnalysis?.betType
                          ? profitLossFromAnalysis?.profitLoss?.c < 0
                            ? "#FF4D4D"
                            : "#319E5B"
                          : currentMatch?.profitLossDataMatch
                          ? currentMatch?.profitLossDataMatch[
                              profitLossDataForMatchConstants[liveData?.type]
                                ?.C +
                                "_" +
                                currentMatch?.id
                            ]
                            ? currentMatch?.profitLossDataMatch[
                                profitLossDataForMatchConstants[liveData?.type]
                                  ?.C +
                                  "_" +
                                  currentMatch?.id
                              ] < 0
                              ? "#FF4D4D"
                              : "#319E5B"
                            : "#319E5B"
                          : "#319E5B"
                      }
                      data={data?.length > 0 ? data[2] : []}
                      lock={false}
                      matchOddsData={{
                        back: data?.backTeamC,
                        lay: data?.layTeamC,
                      }}
                      ballStatus={
                        data?.statusTeamA === "ball start" ? true : false
                      }
                      status={data?.statusTeamC !== "active" ? true : false}
                      isTeamC={currentMatch?.teamC}
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
                      }}
                    >
                      <img
                        src={LOCKED}
                        style={{ width: "35px", height: "40px" }}
                      />

                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "600",
                          marginLeft: "-25px",
                          fontSize: "20px",
                          marginTop: "20px",
                        }}
                      >
                        Locked
                      </Typography>
                    </Box>
                  </Box>
                )}
              </>
            ) : session === "overUnder" || session === "firstHalfGoal" ? (
              <>
                <BoxComponent
                  // teamImage={currentMatch?.teamA_Image}
                  name={liveData?.name}
                  rates={
                    marketAnalysis?.betType
                      ? profitLossFromAnalysis
                        ? profitLossFromAnalysis?.profitLoss?.a
                        : 0
                      : currentMatch?.profitLossDataMatch
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
                      : 0
                  }
                  color={
                    marketAnalysis?.betType
                      ? profitLossFromAnalysis?.profitLoss?.a < 0
                        ? "#FF4D4D"
                        : "#319E5B"
                      : currentMatch?.profitLossDataMatch
                      ? currentMatch?.profitLossDataMatch[
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
                  team={"teamA"}
                />
                <Divider />
                <BoxComponent
                  // teamImage={currentMatch?.teamB_Image}
                  team={"teamB"}
                  color={
                    marketAnalysis?.betType
                      ? profitLossFromAnalysis?.profitLoss?.b < 0
                        ? "#FF4D4D"
                        : "#319E5B"
                      : currentMatch?.profitLossDataMatch
                      ? currentMatch?.profitLossDataMatch[
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
                  name={liveData?.name}
                  rates={
                    marketAnalysis?.betType
                      ? profitLossFromAnalysis
                        ? profitLossFromAnalysis?.profitLoss?.b
                        : 0
                      : currentMatch?.profitLossDataMatch
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
                  }
                  data={data?.length > 0 ? data[1] : []}
                  lock={handleLock(data?.length > 0 ? data[1] : [])}
                  align="end"
                />
                {locked && (
                  <Box
                    sx={{
                      background: "rgba(0,0,0,.5)",
                      width: "100%",
                      height: currentMatch?.teamC ? "150px" : "105px",
                      position: "absolute",
                      top: "-65px",
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
                      <img
                        src={LOCKED}
                        style={{ width: "35px", height: "40px" }}
                      />

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
              </>
            ) : session === "setWinner" ? (
              <>
                <BoxComponent
                  // teamImage={currentMatch?.teamA_Image}
                  name={currentMatch?.teamA}
                  rates={handleRates(typeOfBet, "TeamA")}
                  color={
                    handleRates(typeOfBet, "TeamA") < 0 ? "#FF4D4D" : "#319E5B"
                  }
                  data={data?.length > 0 ? data[0] : []}
                  lock={handleLock(data?.length > 0 ? data[0] : [])}
                  team={"teamA"}
                />
                <Divider />
                <BoxComponent
                  // teamImage={currentMatch?.teamB_Image}
                  team={"teamB"}
                  color={
                    handleRates(typeOfBet, "TeamB") < 0 ? "#FF4D4D" : "#319E5B"
                  }
                  name={currentMatch?.teamB}
                  rates={handleRates(typeOfBet, "TeamB")}
                  data={data?.length > 0 ? data[1] : []}
                  lock={handleLock(data?.length > 0 ? data[1] : [])}
                  align="end"
                />
                {currentMatch?.teamC ? (
                  <>
                    <Divider />
                    <BoxComponent
                      team={"teamC"}
                      color={
                        handleRates(typeOfBet, "TeamC") < 0
                          ? "#FF4D4D"
                          : "#319E5B"
                      }
                      name={currentMatch?.teamC}
                      rates={handleRates(typeOfBet, "TeamC")}
                      data={data?.length > 0 ? data[1] : []}
                      lock={handleLock(data?.length > 0 ? data[1] : [])}
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
                      }}
                    >
                      <img
                        src={LOCKED}
                        style={{ width: "35px", height: "40px" }}
                      />

                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "600",
                          marginLeft: "-25px",
                          fontSize: "20px",
                          marginTop: "20px",
                        }}
                      >
                        Locked
                      </Typography>
                    </Box>
                  </Box>
                )}
              </>
            ) : (
              <>
                <BoxComponent
                  // teamImage={currentMatch?.teamA_Image}
                  name={
                    typeOfBet !== ("Match Odds" || "Half Time")
                      ? "Yes"
                      : currentMatch?.teamA
                  }
                  rates={
                    marketAnalysis?.betType
                      ? profitLossFromAnalysis
                        ? profitLossFromAnalysis?.profitLoss?.a
                        : 0
                      : currentMatch?.profitLossDataMatch
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
                      : 0
                  }
                  color={
                    marketAnalysis?.betType
                      ? profitLossFromAnalysis?.profitLoss?.a < 0
                        ? "#FF4D4D"
                        : "#319E5B"
                      : currentMatch?.profitLossDataMatch
                      ? currentMatch?.profitLossDataMatch[
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
                  // teamImage={currentMatch?.teamB_Image}
                  color={
                    marketAnalysis?.betType
                      ? profitLossFromAnalysis?.profitLoss?.b < 0
                        ? "#FF4D4D"
                        : "#319E5B"
                      : currentMatch?.profitLossDataMatch
                      ? currentMatch?.profitLossDataMatch[
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
                  name={
                    typeOfBet !== ("Match Odds" || "Half Time")
                      ? "No"
                      : currentMatch?.teamB
                  }
                  rates={
                    marketAnalysis?.betType
                      ? profitLossFromAnalysis
                        ? profitLossFromAnalysis?.profitLoss?.b
                        : 0
                      : currentMatch?.profitLossDataMatch
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
                  }
                  data={data?.length > 0 ? data[1] : []}
                  lock={handleLock(data?.length > 0 ? data[1] : [])}
                  align="end"
                />
                {currentMatch?.teamC &&
                typeOfBet !== "Tied Match" &&
                typeOfBet !== "Manual Tied Match" &&
                typeOfBet !== "Market Complete Match" &&
                typeOfBet !== "Manual Complete Match" ? (
                  <>
                    <Divider />
                    <BoxComponent
                      color={
                        marketAnalysis?.betType
                          ? profitLossFromAnalysis?.profitLoss?.c < 0
                            ? "#FF4D4D"
                            : "#319E5B"
                          : currentMatch?.profitLossDataMatch
                          ? currentMatch?.profitLossDataMatch[
                              profitLossDataForMatchConstants[liveData?.type]
                                ?.C +
                                "_" +
                                currentMatch?.id
                            ]
                            ? currentMatch?.profitLossDataMatch[
                                profitLossDataForMatchConstants[liveData?.type]
                                  ?.C +
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
                        marketAnalysis?.betType
                          ? profitLossFromAnalysis
                            ? profitLossFromAnalysis?.profitLoss?.c
                            : 0
                          : currentMatch?.profitLossDataMatch
                          ? currentMatch?.profitLossDataMatch[
                              profitLossDataForMatchConstants[liveData?.type]
                                ?.C +
                                "_" +
                                currentMatch?.id
                            ]
                            ? currentMatch?.profitLossDataMatch[
                                profitLossDataForMatchConstants[liveData?.type]
                                  ?.C +
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
                      <img
                        src={LOCKED}
                        style={{ width: "35px", height: "40px" }}
                      />

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
              </>
            )}
          </Box>
        </>
      )}
      {false && (
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
            title={(locked ? "Unlock " : "Lock ") + "Manual Bookmaker Market"}
            handleHide={handleHide}
            onSubmit={onSubmit}
          />
        </Box>
      )}

      {showUnlock && liveData?.type === "matchOdd" && (
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
            title={(locked ? "Unlock " : "Lock ") + typeOfBet + " Market"}
            handleHide={handleHide}
            onSubmit={onSubmit}
          />
        </Box>
      )}
    </Box>
  );
};

export default MatchOdds;
