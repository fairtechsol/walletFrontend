import { Box, Typography } from "@mui/material";
import { memo } from "react";

const columns = [
  { label: "User Details" },
  { label: "All Privilege" },
  { label: "Add Match Privilege" },
  { label: "BetFair Match Privilege" },
  { label: "Bookmaker Match Privilege" },
  { label: "Session Match Privilege" },
  {
    label: "User Lock",
    width: { lg: "15vw", md: "20.5vw", xs: "26.5vw" },
    fontSize: { lg: "11.5px", xs: "9px" },
  },
  { label: "City", width: { lg: "15vw", md: "20.5vw", xs: "26.5vw" } },
  { label: "Phone Number", width: { lg: "15vw", md: "20.5vw", xs: "26.5vw" } },
];

const defaultBoxWidth = { lg: "11.5vw", md: "20.5vw", xs: "26.5vw" };
const defaultFontSize = { lg: "12px", xs: "9px" };

const ListHeaderExpertRow = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        height: "30px",
        background: "#262626",
        alignItems: "center",
        borderTop: "2px solid white",
        borderBottom: "2px solid white",
      }}
    >
      {columns.map((col, idx) => (
        <Box
          key={idx}
          sx={{
            width: col.width || defaultBoxWidth,
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            justifyContent: col.label === "User Lock" ? "center" : "flex-start",
            height: "35px",
            borderRight: "2px solid white",
            lineHeight: "1.1",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: col.fontSize || defaultFontSize,
              lineHeight: "1.1",
            }}
          >
            {col.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default memo(ListHeaderExpertRow);
