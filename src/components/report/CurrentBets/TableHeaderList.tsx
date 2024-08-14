import { Box, Typography } from "@mui/material";

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
      <Box
        sx={{
          width: "5%",
          minWidth: "70px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>No</Typography>
      </Box>
      <Box
        sx={{
          width: "10%",
          minWidth: "100px",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          justifyContent: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", lineHeight: "0.9" }}
        >
          Event Type
        </Typography>
      </Box>
      <Box
        sx={{
          width: "10%",
          minWidth: "100px",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          justifyContent: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", lineHeight: "0.9" }}
        >
          Event Name
        </Typography>
      </Box>
      <Box
        sx={{
          width: "10%",
          minWidth: "100px",
          display: "flex",
          // paddingLeft: "10px",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "11px", lineHeight: "0.9" }}
        >
          User name
        </Typography>
      </Box>
      <Box
        sx={{
          width: "10%",
          minWidth: "100px",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          justifyContent: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>Team</Typography>
      </Box>
      <Box
        sx={{
          width: "10%",
          minWidth: "100px",
          display: "flex",
          // paddingLeft: "10px",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", lineHeight: "0.9" }}
        >
          Bet Type
        </Typography>
      </Box>
      <Box
        sx={{
          width: "7%",
          minWidth: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", lineHeight: "0.9" }}
        >
          User Rate
        </Typography>
      </Box>
      <Box
        sx={{
          width: "8%",
          minWidth: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
          // overflow: "hidden"
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "7px", md: "9px", lg: "12px" },
            lineHeight: "0.9",
          }}
        >
          Back/Lay
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "7px", md: "9px", lg: "12px" },
            lineHeight: "0.9",
          }}
        >
          Yes/No
        </Typography>
      </Box>
      <Box
        sx={{
          width: "8%",
          minWidth: "100px",
          display: "flex",
          justifyContent: "center",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "8px", md: "9px", lg: "12px" },
          }}
        >
          Amount
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          minWidth: "100px",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          justifyContent: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", lineHeight: "0.9" }}
        >
          Place Date
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          minWidth: "100px",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          justifyContent: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", lineHeight: "0.9" }}
        >
          Match Date
        </Typography>
      </Box>
    </Box>
  );
};

export default TableHeaderList;
