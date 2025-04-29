import { Box, Typography } from "@mui/material";

interface HeaderItem {
  id: string;
  label: string;
  width: { lg: string; md: string; xs: string };
  fontSize?: { lg: string; xs: string };
  align?: "left" | "center";
}

const headerItems: HeaderItem[] = [
  {
    id: "user-details",
    label: "User Name",
    width: { lg: "12.1vw", md: "20.5vw", xs: "18.5vw" },
    fontSize: { lg: "12px", xs: "9px" },
  },
  {
    id: "credit-reference",
    label: "Credit Reference",
    width: { lg: "11.1vw", md: "10.5vw", xs: "24.5vw" },
    fontSize: { lg: "12px", xs: "11px" },
  },
  {
    id: "balance",
    label: "Balance",
    width: { lg: "11vw", md: "9.5vw", xs: "30vw" },
    fontSize: { lg: "12px", xs: "11px" },
  },
  {
    id: "profit-loss",
    label: "Client Profit/Loss",
    width: { lg: "12.8vw", md: "11.5vw", xs: "35.5vw" },
    fontSize: { lg: "12px", xs: "9px" },
  },
  {
    id: "percent-profit-loss",
    label: "% Profit/Loss",
    width: { lg: "11.5vw", md: "11.5vw", xs: "25vw" },
    fontSize: { lg: "12px", xs: "9px" },
  },
  {
    id: "commission",
    label: "Commission",
    width: { lg: "9vw", md: "9.5vw", xs: "18vw" },
    fontSize: { lg: "12px", xs: "9px" },
  },
  {
    id: "exposure",
    label: "Exposure",
    width: { lg: "9.5vw", md: "9.5vw", xs: "18vw" },
    fontSize: { lg: "12px", xs: "9px" },
  },
  {
    id: "available-balance",
    label: "Available Balance",
    width: { lg: "9.6vw", md: "9.5vw", xs: "30.5vw" },
    fontSize: { lg: "12px", xs: "9px" },
  },
  {
    id: "bet-lock",
    label: "Bet Lock",
    width: { lg: "5vw", md: "5vw", xs: "13vw" },
    fontSize: { lg: "12px", xs: "9px" },
    align: "center",
  },
  {
    id: "user-lock",
    label: "User Lock",
    width: { lg: "5vw", md: "5vw", xs: "14vw" },
    fontSize: { lg: "11.5px", xs: "9px" },
    align: "center",
  },
  {
    id: "exposure-limit",
    label: "Exposure Limit",
    width: { lg: "7.5vw", md: "8vw", xs: "24.5vw" },
    fontSize: { lg: "12px", xs: "11px" },
  },
  {
    id: "account-type",
    label: "Account Type",
    width: { lg: "8.5vw", md: "10vw", xs: "23.5vw" },
    fontSize: { lg: "12px", xs: "9px" },
  },
];

const ListHeader = () => {
  return (
    <Box
      sx={{
        width: { xs: "150%", lg: "100%", md: "100%" },
        display: "flex",
        height: "45px",
        background: "#262626",
        alignItems: "center",
        borderTop: "2px solid white",
        borderBottom: "2px solid white",
      }}
    >
      {headerItems.map((item) => (
        <Box
          key={item.id}
          sx={{
            width: item.width,
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
            lineHeight: "1.1",
            justifyContent: item.align === "center" ? "center" : "flex-start",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: item.fontSize,
              lineHeight: "1.1",
            }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ListHeader;
