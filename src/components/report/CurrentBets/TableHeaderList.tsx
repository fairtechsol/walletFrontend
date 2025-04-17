import { Box, Typography } from "@mui/material";
import { memo } from "react";

const columns = [
  { label: "No", width: "5%", minWidth: "70px" },
  { label: "Event Type", width: "10%", minWidth: "100px" },
  { label: "Event Name", width: "10%", minWidth: "100px" },
  { label: "User name", width: "10%", minWidth: "100px", fontSize: "11px" },
  { label: "Team", width: "10%", minWidth: "100px" },
  { label: "Bet Type", width: "10%", minWidth: "100px" },
  { label: "User Rate", width: "7%", minWidth: "100px" },
  {
    label: ["Back/Lay", "Yes/No"],
    width: "8%",
    minWidth: "100px",
    multiline: true,
  },
  { label: "Amount", width: "8%", minWidth: "100px" },
  { label: "Place Date", width: "11%", minWidth: "100px" },
  { label: "Match Date", width: "11%", minWidth: "100px" },
];

const TableHeaderList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "35px",
        width: { xs: "1065px", lg: "100%" },
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
            width: col.width,
            minWidth: col.minWidth,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: col.multiline ? "column" : "row",
            paddingLeft: "10px",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          {Array.isArray(col.label) ? (
            col.label.map((line, i) => (
              <Typography
                key={i}
                sx={{
                  color: "white",
                  fontSize: { xs: "7px", md: "9px", lg: "12px" },
                  lineHeight: "0.9",
                }}
              >
                {line}
              </Typography>
            ))
          ) : (
            <Typography
              sx={{
                color: "white",
                fontSize: col.fontSize || "12px",
                lineHeight: "0.9",
              }}
            >
              {col.label}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default memo(TableHeaderList);
