import { Box, Typography } from "@mui/material";

const headerItems = [
  { label: "User Name", width: { xs: "12.5%", lg: "12.5%", md: "12.5%" } },
  {
    label: "Commission Type",
    width: { xs: "12.5%", lg: "12.5%", md: "12.5%" },
  },
  { label: "Date/Time", width: { xs: "12.5%", lg: "12.5%", md: "12.5%" } },
  { label: "Team", width: { xs: "12.5%", lg: "24.5%", md: "12.5%" } },
  { label: "Odds", width: { xs: "12.5%", lg: "12.5%", md: "12.5%" } },
  { label: "Bet Type", width: { xs: "15%", lg: "15%", md: "15%" } },
  { label: "Stake", width: { xs: "15%", lg: "15%", md: "15%" } },
  {
    label: "Commission Amount",
    width: { xs: "12.5%", lg: "12.5%", md: "12.5%" },
  },
  { label: "My Commission", width: { xs: "12.5%", lg: "12.5%", md: "12.5%" } },
];

const HeaderRowCommissionReport = () => {
  return (
    <Box
      sx={{
        width: { xs: "218%", lg: "100%", md: "100%" },
        display: "flex",
        height: "35px",
        background: "#262626",
        alignItems: "center",
        borderTop: "2px solid white",
        borderBottom: "2px solid white",
      }}
    >
      {headerItems.map((item) => (
        <Box
          key={item.label}
          sx={{
            width: item.width,
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "10px", lg: "12px", md: "12px" },
              lineHeight: 1,
            }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default HeaderRowCommissionReport;
