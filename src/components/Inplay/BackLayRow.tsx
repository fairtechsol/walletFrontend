import { Box, Typography } from "@mui/material";

const BackLayRow = () => {
  return (
    <Box
      sx={{
        display: "flex",
        background: "#319E5B",
        height: "25px",
        width: "99.7%",
        alignSelf: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          background: "'#319E5B'",
          height: "25px",
          width: { xs: "42%", lg: "40%" },
          alignItems: "center",
        }}
      />
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
            width: { lg: "20%", xs: "25%" },
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
        <Box sx={{ width: ".35%", display: "flex" }} />
        <Box
          sx={{
            background: "#FF9292",
            width: { lg: "20%", xs: "25%" },
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
      </Box>
    </Box>
  );
};

export default BackLayRow;
