import { Box, Typography } from "@mui/material";
import { MatchComponentInterface } from "../../interface/inplay";
import HeaderRow from "./HeaderRow";
import TeamDetailRow from "./TeamDetailRow";
import Divider from "./Divider";

const MatchComponent = (props: MatchComponentInterface) => {
  const { onClick, top, blur, match } = props;

  const timeLeft = {
    days: "00",
    hours: "00",
    minutes: "10",
  };

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
          <HeaderRow match={match} timeLeft={timeLeft} />
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
                MIN: {match.betfair_match_min_bet} MAX:{" "}
                {match.betfair_match_max_bet}
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
            image={match?.teamA_Image}
            runnerNumber={0}
            apiBasePath={"abc"}
          />
          <Divider />
          <TeamDetailRow
            teamName={match.teamB}
            image={match?.teamB_Image}
            runnerNumber={1}
            apiBasePath={"abc"}
          />
          {match.teamC && (
            <>
              <Divider />
              <TeamDetailRow
                teamName={match.teamC}
                image={match?.teamC_Image}
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
