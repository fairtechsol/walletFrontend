import { Box, Typography } from "@mui/material";
import { memo } from "react";
import Divider from "../../Inplay/Divider";
import SeperateBox from "../../matchDetail/MatchOdds/SeperateBox";

interface Props {
  matchDetail: any;
}

const UserProfitLossListCompRaceHeader = ({ matchDetail }: Props) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#319E5B",
            overflow: "hidden",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "12px", md: "10px", xs: "8px" },
              margin: "8px",
              fontWeight: "600",
              textOverflow: "ellipsis",
              lineHeight: "1",
              width: "4rem",
            }}
          >
            Username
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          {matchDetail?.matchOdd?.runners?.map((runner: any) => (
            <>
              <SeperateBox
                value={runner.runnerName}
                color={"#f1c550"}
                width={10}
              />
              <Box
                sx={{
                  width: "3px",
                  display: "flex",
                  background: "#ffffff",
                }}
              />
            </>
          ))}
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default memo(UserProfitLossListCompRaceHeader);
