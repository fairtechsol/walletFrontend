import { Box } from "@mui/material";
import { memo } from "react";
import { Background } from "../../assets";
const BackgroundLayout = ({ children }: any) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: "0.2% 1% 1% 1%",
        width: "100%",
        backgroundImage: `url(${Background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      {children}
    </Box>
  );
};

export default memo(BackgroundLayout);
