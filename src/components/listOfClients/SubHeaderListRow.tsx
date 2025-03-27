import { Box, Typography } from "@mui/material";
import { handleNumber } from "../../helper";
import StyledImage from "../Common/StyledImages";

const SubHeaderListRow = ({ data, color }: any) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        height: "45px",
        background: "#0B4F26",
        alignItems: "center",
        overflow: "hidden",
        borderBottom: "2px solid white",
      }}
    >
      <Box
        sx={{
          width: { lg: "11.5vw", md: "20.2vw", xs: "26.5vw" },
          display: "flex",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          paddingX: "10px",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "10px" }}></Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "10.5vw", md: "9.8vw", xs: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "10px", fontWeight: "600" }}
        >
          {handleNumber(
            parseFloat(data?.totalCreditReference || "0.00"),
            color
          )}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "11.5vw", md: "9.4vw", xs: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "10px", fontWeight: "600" }}
        >
          {handleNumber(parseFloat(data?.currBalance || 0), color)}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "11.5vw", md: "11.5vw", xs: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          background: `${
            Number(+data?.profitsum || 0) >= 0 ? "#27AC1E" : "#E32A2A"
          }`,
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "10px", fontWeight: "600" }}
        >
          {handleNumber(parseFloat(data?.profitsum || 0), color)}
        </Typography>
        <StyledImage
          src={
            +data?.profitsum >= 0
              ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
              : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
          }
          sx={{
            height: "15px",
            marginLeft: "5px",
            filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
            width: "15px",
          }}
        />
      </Box>
      <Box
        sx={{
          width: { lg: "11.5vw", md: "11.5vw", xs: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          background: `${
            Number(+data?.percentprofitloss || 0) >= 0 ? "#27AC1E" : "#E32A2A"
          }`,
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "10px", fontWeight: "600" }}
        >
          {handleNumber(parseFloat(data?.percentprofitloss || 0), color)}
        </Typography>
        <StyledImage
          src={
            +data?.percentprofitloss >= 0
              ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
              : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
          }
          sx={{
            height: "15px",
            marginLeft: "5px",
            filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
            width: "15px",
          }}
        />
      </Box>
      <Box
        sx={{
          width: { lg: "9.5vw", md: "9.5vw", xs: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "10px", fontWeight: "600" }}
        >
          {handleNumber(parseFloat(data?.totalcommission || 0), color)}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "9.5vw", md: "9.5vw", xs: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "10px", fontWeight: "600" }}
        >
          {handleNumber(parseFloat(data?.totalExposure || 0), color)}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "9.5vw", md: "9.5vw", xs: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "10px", fontWeight: "600" }}
        >
          {handleNumber(parseFloat(data?.availableBalance || 0), color)}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "5vw", md: "5vw", xs: "14vw" },
          display: "flex",
          paddingX: "10px",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      />
      <Box
        sx={{
          width: { lg: "5vw", md: "5vw", xs: "14vw" },
          display: "flex",
          paddingX: "10px",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      />
      <Box
        sx={{
          width: { lg: "8vw", md: "8vw", xs: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      />
      <Box
        sx={{
          width: { lg: "10vw", md: "10vw", xs: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      />
    </Box>
  );
};

export default SubHeaderListRow;
