import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { handleNumber, roundToTwoDecimals } from "../../../helper";

interface PlaceBetComponentProps {
  profitLoss: any;
  index: number;
}

const PlaceBetComponent = ({ profitLoss, index }: PlaceBetComponentProps) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          background: "#0B4F26",
          position: "absolute",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          right: { xs: "43vw", lg: "41vw", md: "41vw" },
          justifyContent: "center",
          width: { lg: "90px", xs: "60px", md: "90px" },
          borderRadius: "5px",
          height: "35px",
          zIndex: 100,
        }}
      >
        <Box sx={{ zIndex: 100, display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              marginTop: "2px",
              fontSize: "8px",
              fontWeight: "500",
              color: "white",
            }}
          >
            {!profitLoss?.profitLoss && !profitLoss?.betPlaced
              ? "Profit/Loss"
              : handleNumber(
                  roundToTwoDecimals(
                    (isNaN(profitLoss?.betPlaced?.[index])
                      ? profitLoss?.betPlaced?.[index]?.profitLoss
                      : profitLoss?.betPlaced?.[index]) ||
                      profitLoss?.profitLoss?.[index]
                  ),
                  ""
                )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(PlaceBetComponent);
