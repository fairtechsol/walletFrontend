import { Box, Typography } from "@mui/material";
import { Fragment, memo, useState } from "react";
import { useSelector } from "react-redux";
import { ARROWUP, LOCKED, LOCKOPEN } from "../../../assets";
import { formatToINR } from "../../../helper";
import { RootState } from "../../../store/store";
import CommissionDot from "../../Common/CommissionDot";
import Divider from "../../Inplay/Divider";
import SmallBox from "../MatchOdds/SmallBox";
import BackLayBox from "./BackLayBox";
import BoxComponent from "./BoxComponent";

interface TournamentOddsProps {
  currentMatch: any;
  minBet: number;
  maxBet: number;
  locked?: boolean;
  blockMatch?: boolean;
  selft?: boolean;
  showBox?: boolean;
  upcoming?: boolean;
  liveData: any;
  title: string;
  profitLossFromAnalysis?: any;
}

const TournamentOdds = ({
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
  profitLossFromAnalysis,
}: TournamentOddsProps) => {
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

  let key =
    (liveData?.parentBetId || liveData?.id) + "_profitLoss_" + currentMatch?.id;

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        backgroundColor: "white",
        padding: 0.2,
        flexDirection: "column",
        width: "100%",
        marginBottom: "3px",
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
          {liveData?.isCommissionActive && <CommissionDot />}
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
          <Box className="slanted" />
        </Box>
        <Box
          sx={{
            flex: 1,
            background: "#262626",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: "0",
          }}
        >
          <SmallBox
            valueA={bookRatioA(
              marketAnalysis?.betType
                ? profitLossFromAnalysis
                  ? profitLossFromAnalysis?.profitLoss?.a
                  : 0
                : currentMatch?.profitLossDataMatch
                ? currentMatch?.profitLossDataMatch[key]
                  ? (currentMatch?.profitLossDataMatch[key] || {})?.[
                      liveData?.runners?.[0]?.parentRunnerId ||
                        liveData?.runners?.[0]?.id
                    ]
                  : 0
                : 0,
              marketAnalysis?.betType
                ? profitLossFromAnalysis
                  ? profitLossFromAnalysis?.profitLoss?.b
                  : 0
                : currentMatch?.profitLossDataMatch
                ? currentMatch?.profitLossDataMatch[key]
                  ? (currentMatch?.profitLossDataMatch[key] || {})?.[
                      liveData?.runners?.[1]?.parentRunnerId ||
                        liveData?.runners?.[1]?.id
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
                ? currentMatch?.profitLossDataMatch[key]
                  ? (currentMatch?.profitLossDataMatch[key] || {})?.[
                      liveData?.runners?.[0]?.parentRunnerId ||
                        liveData?.runners?.[0]?.id
                    ]
                  : 0
                : 0,
              marketAnalysis?.betType
                ? profitLossFromAnalysis
                  ? profitLossFromAnalysis?.profitLoss?.b
                  : 0
                : currentMatch?.profitLossDataMatch
                ? currentMatch?.profitLossDataMatch[key]
                  ? (currentMatch?.profitLossDataMatch[key] || {})?.[
                      liveData?.runners?.[1]?.parentRunnerId ||
                        liveData?.runners?.[1]?.id
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
              width: "100%",
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
            <BackLayBox />
          </Box>

          <Box sx={{ position: "relative", width: "99.8%", background: "red" }}>
            {(upcoming ||
              showBox ||
              !liveData?.isActive ||
              (!["ACTIVE", "OPEN", ""].includes(liveData?.status) &&
                liveData?.gtype == "match")) && (
              <Box
                sx={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  zIndex: "999",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "rgba(0, 0, 0, .71)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "12px", lg: "22px" },
                    textTransform: "uppercase",
                    width: "100%",
                    textAlign: "center",
                    color: "white",
                    fontWeight: "400",
                  }}
                >
                  {!["ACTIVE", "OPEN", ""].includes(liveData?.status) &&
                  liveData?.gtype == "match"
                    ? liveData?.status
                    : ""}
                </Typography>
              </Box>
            )}
            {liveData?.runners?.map((runner: any, index: number) => (
              <Fragment key={index}>
                <BoxComponent
                  name={runner?.nat || runner?.runnerName}
                  rates={
                    marketAnalysis?.betType
                      ? profitLossFromAnalysis
                        ? profitLossFromAnalysis?.profitLoss?.[
                            String.fromCharCode(97 + index)
                          ]
                        : 0
                      : currentMatch?.profitLossDataMatch?.[key]
                      ? (currentMatch?.profitLossDataMatch?.[key] || {})?.[
                          runner?.parentRunnerId || runner?.id
                        ]
                      : 0
                  }
                  color={
                    marketAnalysis?.betType
                      ? profitLossFromAnalysis?.profitLoss?.[
                          String.fromCharCode(97 + index)
                        ] < 0
                        ? "#FF4D4D"
                        : "#319E5B"
                      : currentMatch?.profitLossDataMatch?.[key]
                      ? +parseFloat(
                          (currentMatch?.profitLossDataMatch?.[key] || {})?.[
                            runner?.parentRunnerId || runner?.id
                          ]
                        ).toFixed(2) < 0
                        ? "#FF4D4D"
                        : "#319E5B"
                      : "#319E5B"
                  }
                  data={runner}
                  marketDetails={liveData}
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

export default memo(TournamentOdds);
