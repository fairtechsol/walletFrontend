import { Box, Typography } from "@mui/material";
import Divider from "../../Inplay/Divider";
import { handleNumber } from "../../../helper";
import SeperateBox from "../../matchDetail/MatchOdds/SeperateBox";

const UserProfitLossListCompRace = (props: any) => {
  const { element, color, matchDetail } = props;
  return (
    <>
      <Box sx={{ display: "flex", overflowX: "auto" }}>
        <Box
          sx={{
            display: "flex",
            height: "38px",
            alignItems: "center",
            width: "10rem",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "11px", md: "10px", xs: "8px" },
              margin: "7px",
              fontWeight: "600",
            }}
          >
            {element?.userName}
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          {matchDetail?.matchOdd?.runners?.map((runner: any) => (
            <>
              <SeperateBox
                value2={
                  handleNumber(parseFloat(element[runner?.id] || 0), color) ??
                  "N/A"
                }
                value={
                  handleNumber(
                    parseFloat(element[runner?.id + "_percent"] || 0),
                    color
                  ) ?? "N/A"
                }
                color={"#ffffff"}
                width={10}
              />
              <Box
                sx={{
                  width: "3px",
                  display: "flex",
                  background: "#ffffff",
                }}
              ></Box>
            </>
          ))}
        </Box>
      </Box>
      <Divider />
      {/* <Box
        sx={{
          display: "flex",
          background: "white",
          height: "38px",
          width: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "38px",
            width: "30%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "11px", md: "10px", xs: "8px" },
              marginLeft: "7px",
              fontWeight: "600",
            }}
          >
            {element?.userName}
          </Typography>
        </Box>
          {matchDetail?.matchOdd?.runners?.map((runner: any) => {
            return (
              <>
                <Box
                  sx={{
                    display: "flex",
                    position: "relative",
                    background: "white",
                    height: "38px",
                    width: { lg: "32%", xs: "80%" },
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <>
                    <SeperateBox
                      value2={
                        handleNumber(
                          parseFloat(element[runner?.id] || 0),
                          color
                        ) ?? "N/A"
                      }
                      value={
                        handleNumber(
                          parseFloat(element[runner?.id + "_percent"] || 0),
                          color
                        ) ?? "N/A"
                      }
                      color={"#ffffff"}
                      width={10}
                    />
                    <Box
                      sx={{
                        width: "3px",
                        display: "flex",
                        background: "#ffffff",
                      }}
                    ></Box>
                  </>
                  <Box
                    sx={{ width: ".45%", display: "flex", background: "pink" }}
                  ></Box>
                </Box>
              </>
            );
          })}
      </Box>
      <Divider /> */}
    </>
  );
};

export default UserProfitLossListCompRace;
