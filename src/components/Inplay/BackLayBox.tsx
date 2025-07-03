import { Box, Typography } from "@mui/material";

interface BackLayBoxProps {
  color: string;
  type: string;
}

const BackLayBox = ({ color, type }: BackLayBoxProps) => {
  return (
    <Box
      sx={{
        background: color,
        width: { lg: "20%", xs: "25%" },
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: "12px", color: "#000", fontWeight: "600" }}>
        {type}
      </Typography>
    </Box>
  );
};

export default BackLayBox;
