import { Box, Typography } from "@mui/material";

const headers = [
  { label: "Date", width: { xs: "14%", md: "11%", lg: "11%" } },
  { label: "Credit", width: { xs: "16%", md: "14%", lg: "14%" } },
  { label: "Debit", width: { xs: "16%", md: "14%", lg: "14%" } },
  { label: "Closing", width: { xs: "14%", md: "11%", lg: "11%" } },
  { label: "Description", width: { xs: "36%", md: "36%", lg: "36%" } },
  { label: "From", width: { xs: "18%", md: "18%", lg: "11%" } },
  { label: "To", width: { xs: "18%", md: "18%", lg: "11%" } },
];

const commonBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "35px",
  borderRight: "2px solid white",
};

const TableHeaderList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "35px",
        background: "#262626",
        alignItems: "center",
        justifyContent: "center",
        width: { xs: "222vw", md: "100%" },
        borderTop: "2px solid white",
        borderBottom: "2px solid white",
      }}
    >
      {headers.map((header, index) => (
        <Box
          key={index}
          sx={{
            ...commonBoxStyle,
            width: header.width,
            paddingLeft: "10px",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
            {header.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TableHeaderList;
