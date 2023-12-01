import { Box, Typography } from "@mui/material";

const TableHeaderList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "35px",
        background: "#262626",
        alignItems: "center",
        borderTop: "2px solid white",
        borderBottom: "2px solid white",
      }}
    >
      <Box
        sx={{
          width: "3%",
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
          width: "12%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Event Type
        </Typography>
      </Box>
      <Box
        sx={{
          width: "15%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Event Name
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Username
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>Team</Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Bet Type
        </Typography>
      </Box>
      <Box
        sx={{
          width: "7%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          User Rate
        </Typography>
      </Box>
      <Box
        sx={{
          width: "8%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "10px" }}>
          Back/Lay
        </Typography>
        <Typography sx={{ color: "white", fontSize: "10px" }}>
          Yes/No
        </Typography>
      </Box>
      <Box
        sx={{
          width: "8%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Amount
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Place Date
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Match Date
        </Typography>
      </Box>
    </Box>
  );
};

export default TableHeaderList;
