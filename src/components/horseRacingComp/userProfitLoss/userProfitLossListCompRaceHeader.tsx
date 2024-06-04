import { Box, Typography } from "@mui/material";
import Divider from "../../Inplay/Divider";
import { handleNumber } from "../../../helper";
import SeperateBox from "../../matchDetail/MatchOdds/SeperateBox";

const UserProfitLossListCompRaceHeader = (props: any) => {
  const { element, color, matchDetail } = props;
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            // height: "38px",
            alignItems: "center",
            backgroundColor: "#319E5B"
            // width:"100%"
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "12px", md: "10px", xs: "8px" },
            //   padding: "2px",
              margin: "8px",
              fontWeight: "600",
              textOverflow: "ellipsis",
              lineHeight: "0.9",
              width: "4rem",
            }}
          >
            Username
          </Typography>
        </Box>
        <Box sx={{ display: "flex"}}>
          {matchDetail?.matchOdd?.runners?.map((runner: any) => (
            <>
              <SeperateBox
                value={
                  runner.runnerName
                }
                color={"#f1c550"}
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
    </>
  );
};

export default UserProfitLossListCompRaceHeader;
