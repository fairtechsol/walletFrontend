import { Box, Typography } from "@mui/material";
import { Fragment, memo, useState } from "react";
import { ARROWUP, LOCKED, LOCKOPEN } from "../../assets";
import { formatToINR } from "../../helper";
import Divider from "../Inplay/Divider";
import UnlockComponent from "../lockMatchDetailComponents/UnlockComponent";
import BoxComponentHorseRacing from "./BoxComponentHorseRacing";

interface MatchOddsHorseRacingProps {
  currentMatch: any;
  data: any;
  minBet: number | string;
  maxBet: number | string;
  typeOfBet: any;
  locked?: boolean;
  blockMatch?: any;
  handleShowLock?: any;
  selft?: any;
  showBox: boolean;
  upcoming?: boolean;
  showUnlock?: any;
  handleBlock?: any;
  handleHide?: any;
}

const MatchOddsHorseRacing = ({
  currentMatch,
  data,
  minBet,
  maxBet,
  typeOfBet,
  locked,
  blockMatch,
  handleShowLock,
  selft,
  showBox,
  upcoming,
  showUnlock,
  handleBlock,
  handleHide,
}: MatchOddsHorseRacingProps) => {
  const [visible, setVisible] = useState(true);

  const onSubmit = (value: any) => {
    handleBlock(value, !locked, typeOfBet);
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
            {typeOfBet}
          </Typography>
          {blockMatch && (
            <img
              onClick={() =>
                selft || selft == undefined
                  ? handleShowLock(true, typeOfBet)
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
          <Box className="slanted" />
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
              />
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
              />
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
              />
            )}

            {data?.map((runner: any, index: number) => (
              <Fragment key={index}>
                <BoxComponentHorseRacing
                  color={
                    currentMatch?.profitLossDataMatch
                      ? currentMatch?.profitLossDataMatch[runner?.id]
                        ? currentMatch?.profitLossDataMatch[runner?.id] < 0
                          ? "#FF4D4D"
                          : "#319E5B"
                        : "#319E5B"
                      : "#319E5B"
                  }
                  name={runner.runnerName || runner.name}
                  rates={
                    currentMatch?.profitLossDataMatch
                      ? currentMatch?.profitLossDataMatch[runner?.id]
                        ? currentMatch?.profitLossDataMatch[runner?.id]
                        : 0
                      : 0
                  }
                  data={runner}
                />
                <Divider />
              </Fragment>
            ))}
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
            title={(locked ? "Unlock " : "Lock ") + typeOfBet + " Market"}
            handleHide={handleHide}
            onSubmit={onSubmit}
          />
        </Box>
      )}
    </Box>
  );
};

export default memo(MatchOddsHorseRacing);
