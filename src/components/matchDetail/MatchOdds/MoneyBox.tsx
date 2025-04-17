import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import { handleNumber } from "../../../helper";

const MoneyBox = ({ color, rates }: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  let val: any = parseFloat(rates || 0);

  return (
    <Box
      sx={{
        width: "85px",
        marginRight: { xs: "5px", lg: "15px" },
        border: "1px solid #2626264D",
        borderRadius: "5px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "25px",
        background: "#F6F6F6",
      }}
    >
      <Typography
        sx={{
          fontSize: matchesMobile ? "11px" : "13px",
          fontWeight: "bold",
          color: color,
        }}
      >
        {handleNumber(parseFloat(val), color)}
      </Typography>
    </Box>
  );
};

export default memo(MoneyBox);
