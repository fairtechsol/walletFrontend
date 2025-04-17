import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { handleNumber } from "../../../helper";
import Divider from "../../Inplay/Divider";
import SeperateBox from "../../matchDetail/MatchOdds/SeperateBox";

const UserProfitLossListCompRace = (props: any) => {
  const { element, color, matchDetail } = props;
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "12px", md: "10px", xs: "8px" },
              padding: "2px",
              margin: "8px",
              fontWeight: "600",
              textOverflow: "ellipsis",
              lineHeight: "0.9",
              width: "4rem",
            }}
          >
            {element?.userName}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", width: "100%" }}>
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
               />
            </>
          ))}
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default memo(UserProfitLossListCompRace);
