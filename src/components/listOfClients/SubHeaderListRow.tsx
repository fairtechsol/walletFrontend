import { Box, Typography } from "@mui/material";
import StyledImage from "../Common/StyledImages";

const SubHeaderListRow = (props: any) => {
  const { data } = props;
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
          width: { lg: "11.5vw", md: "20.5vw", xs: "26.5vw" },
          display: "flex",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          paddingX: "10px",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}></Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "10.5vw", md: "10.5vw", xs: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {data?.creditRefrence}
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
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {Number(data?.userBal.currentBalance) >= 0 ? (
            <>
              <span style={{ visibility: "hidden" }}>-</span>
              {Number(data?.userBal.currentBalance)}
            </>
          ) : (
            Number(data?.userBal.currentBalance)
          )}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "11.5vw", md: "11.5vw", xs: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          background: `${
            Number(data?.userBal?.profitLoss) >= 0 ? "#27AC1E" : "#E32A2A"
          }`,
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          justifyContent: "space-between",
        }}
      >
        {" "}
        {/* element.profit_loss >= 0 ? '#27AC1E' : '#E32A2A'*/}
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {/* {data?userBal?.profitLoss} */}
          {Number(data?.userBal?.profitLoss) >= 0 ? (
            <>
              <span style={{ visibility: "hidden" }}>-</span>
              {data?.userBal?.profitLoss}
            </>
          ) : (
            data?.userBal?.profitLoss
          )}
        </Typography>
        <StyledImage
          src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
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
            Number(data?.userBal?.myProfitLoss) >= 0 ? "#27AC1E" : "#E32A2A"
          }`,
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          justifyContent: "space-between",
        }}
      >
        {" "}
        {/* element.profit_loss >= 0 ? '#27AC1E' : '#E32A2A'*/}
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {/* {data?.percent_profit_loss} */}
          {Number(data?.userBal?.myProfitLoss) >= 0 ? (
            <>
              <span style={{ visibility: "hidden" }}>-</span>
              {data?.userBal?.myProfitLoss}
            </>
          ) : (
            data?.userBal?.myProfitLoss
          )}
        </Typography>
        <StyledImage
          src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
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
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {data?.totalcomission}
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
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {data?.exposureLimit}
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
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {/* {data?.availablebalancesum} */}
          {Number(data?.userBal.currentBalance) >= 0 ? (
            <>
              <span style={{ visibility: "hidden" }}>-</span>
              {Number(data?.userBal.currentBalance)}
            </>
          ) : (
            Number(data?.userBal.currentBalance)
          )}
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
      ></Box>
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
      ></Box>
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
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {data?.exposurelimit}
        </Typography>
      </Box>
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
      ></Box>
    </Box>
  );
};

export default SubHeaderListRow;
