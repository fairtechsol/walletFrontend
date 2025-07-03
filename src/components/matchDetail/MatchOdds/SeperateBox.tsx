import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { Lock } from "../../../assets";

interface SeperateBoxProps {
  color: string;
  value: string | number | any;
  value2?: string | number | any;
  lock?: boolean;
  width?: number;
}

const SeperateBox = ({
  color,
  value,
  value2,
  lock,
  width,
}: SeperateBoxProps) => {
  return (
    <Box
      onClick={() => {
        if (lock || color == "white") {
          return null;
        }
      }}
      sx={{
        background: lock ? "#FDF21A" : color,
        border: color != "white" ? "1px solid #2626264D" : "0px solid white",
        width: { xs: "30%", lg: width ? `${width}vw` : "5vw" },
        height: "94%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {!lock && (
        <Box sx={{ alignItems: "center", justifyContent: "space-around" }}>
          <Typography
            sx={{
              fontSize: { lg: "13px", xs: "10px" },
              color: color == "white" ? "white" : "black",
              fontWeight: "700",
              textAlign: "center",
              lineHeight: "0.9",
            }}
          >
            {value}
          </Typography>
          <Typography
            sx={{
              fontSize: { lg: "10px", xs: "9px" },
              color: color == "white" ? "white" : "black",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {value2}
          </Typography>
        </Box>
      )}
      {lock && <img src={Lock} style={{ width: "10px", height: "15px" }} />}
    </Box>
  );
};

export default memo(SeperateBox);
