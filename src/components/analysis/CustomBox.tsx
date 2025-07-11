import { Box, Typography } from "@mui/material";
import { memo } from "react";

interface CustomBoxProps {
  onClick: () => void;
  title: string;
  bg?: string;
}

const CustomBox = ({ onClick, title, bg }: CustomBoxProps) => {
  return (
    <Box onClick={onClick} sx={{ position: "relative" }}>
      <Box
        sx={{
          width: { xs: "100px", lg: "140px", md: "140px" },
          height: "35px",
          justifyContent: "center",
          border: "2px solid white",
          alignItems: "center",
          background: bg ? bg : "#F8C851",
          borderRadius: "5px",
          display: "flex",
          cursor: "pointer",
          color: bg && "white",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "10px", lg: "14px", md: "14px" },
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(CustomBox);
