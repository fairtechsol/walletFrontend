import { Box, Typography } from "@mui/material";
import { MatchComponentInterface } from "../../interface/inplay";
import HeaderRow from "./HeaderRow";
import TeamDetailRow from "./TeamDetailRow";
import Divider from "./Divider";
import { useEffect, useState } from "react";
import moment from "moment-timezone";

const MatchComponent = (props: MatchComponentInterface) => {
  const { onClick, top, blur, match } = props;
  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());

  function calculateTimeLeft() {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const targetDate = moment(match?.startAt).tz(timezone);
      const difference = targetDate.diff(moment().tz(timezone), "milliseconds");
      let timeLeft = {};
      if (difference > 0) {
        timeLeft = {
          days:
            ("0" + Math.floor(difference / (1000 * 60 * 60 * 24))).slice(-2) ||
            0,
          hours:
            ("0" + Math.floor((difference / (1000 * 60 * 60)) % 24)).slice(
              -2
            ) || 0,
          minutes:
            ("0" + Math.floor((difference / 1000 / 60) % 60)).slice(-2) || 0,
          seconds: ("0" + Math.floor((difference / 1000) % 60)).slice(-2) || 0,
        };
      } else {
        timeLeft = {
          days: "00",
          hours: "00",
          minutes: "00",
        };
      }

      return timeLeft;
    } catch (e) {
      console.log(e);
    }
  }

  const upcoming: any =
    Number(timeLeft?.days) === 0 &&
    Number(timeLeft?.hours) === 0 &&
    Number(timeLeft?.minutes) <= 30;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          marginY: { xs: "13px", lg: "3px" },
          marginTop: {
            xs: top ? "13px" : "1.2vh",
            lg: top ? "10px" : "1vh",
          },
          width: { xs: "98%", lg: "97.8%" },
          marginX: "1vw",
          padding: 0.1,
          background: "white",
        }}
      >
        <Box
          onClick={onClick}
          sx={{
            zIndex: 0,
            filter: blur ? "blur(0px)" : null,
            display: "flex",
            position: "relative",
            flexDirection: "column",
            alignSelf: {
              xs: "center",
              mg: "center",
              lg: "flex-start",
            },
            background: "white",
            cursor: "pointer",
          }}
        >
          <HeaderRow match={match} timeLeft={upcoming} />
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
                MIN: {Math.floor(match?.matchOdds[0]?.minBet)} MAX:{" "}
                {Math.floor(match?.matchOdds[0]?.maxBet)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "25px",
                width: { lg: "60%", xs: "80%" },
                justifyContent: { lg: "center", xs: "flex-end" },
              }}
            >
              <Box
                sx={{
                  background: "#00C0F9",
                  width: { lg: "16.5%", xs: "25%" },
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
              <Box sx={{ width: ".35%", display: "flex" }}></Box>

              <Box
                sx={{
                  background: "#FF9292",
                  width: { lg: "16.5%", xs: "25%" },
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
          <TeamDetailRow
            teamName={match.teamA}
            runnerNumber={0}
            apiBasePath={"abc"}
          />
          <Divider />
          <TeamDetailRow
            teamName={match.teamB}
            runnerNumber={1}
            apiBasePath={"abc"}
          />
          {match.teamC && (
            <>
              <Divider />
              <TeamDetailRow
                teamName={match.teamC}
                runnerNumber={2}
                apiBasePath={"abc"}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default MatchComponent;
