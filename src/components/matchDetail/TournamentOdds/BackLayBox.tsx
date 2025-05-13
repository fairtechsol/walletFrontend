import { Box, Typography } from "@mui/material";

const BackLayBox = () => {
  return (
    <Box
      sx={{
        display: "flex",
        background: "#319E5B",
        height: "25px",
        width: { lg: "60%", xs: "80%" },
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          background: "#00C0F9",
          border: "1px solid #2626264D",
          width: { lg: "5vw", xs: "30%" },
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
        >
          Back
        </Typography>
      </Box>
      <Box sx={{ width: "3px", display: "flex", background: "white" }} />
      <Box
        sx={{
          background: "#FF9292",
          border: "1px solid #2626264D",
          width: { lg: "5vw", xs: "30%" },
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
        >
          Lay
        </Typography>
      </Box>
      <Box sx={{ width: ".7px", display: "flex", background: "white" }} />
    </Box>
  );
};

export default BackLayBox;
