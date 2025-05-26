import { Box } from "@mui/material";
import BackLayBox from "./BackLayBox";

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
        <BackLayBox color="#00C0F9" type="Back" />
        <Box sx={{ width: ".35%", display: "flex" }} />
        <BackLayBox color="#FF9292" type="Lay" />
      </Box>
    </Box>
  );
};

export default BackLayRow;
