import { Box, Typography } from "@mui/material";
import { LockIcon, UnLockIcon } from "../../assets";
import { formatToINR } from "../../helper";
import StyledImage from "../Common/StyledImages";

const ListBody = ({ walletAccountDetail }: any) => {
  return (
    <Box
      sx={[
        {
          width: { xs: "150%", lg: "100%", md: "100%" },
          display: "flex",
          height: "45px",
          background: "#0B4F26",
          alignItems: "center",
          borderBottom: "2px solid white",
        },
      ]}
    >
      <Box
        sx={{
          width: {
            lg: "11.5vw",
            md: "20.5vw",
            xs: "18.5vw",
          },
          display: "flex",
          paddingX: "10px",
          justifyContent: "space-between",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{
            fontSize: "10px",
            fontWeight: "600",
            cursor: "pointer",
            textTransform: "capitalize",
            wordBreak: "break-all",
            color: "white",
          }}
        >
          {walletAccountDetail?.userName}
        </Typography>
      </Box>
      <Box
        sx={{
          width: {
            lg: "10.5vw",
            md: "10.5vw",
            xs: "26.5vw",
          },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          color: "white",
        }}
      >
        <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>
          {formatToINR(walletAccountDetail?.creditRefrence || 0)}
        </Typography>
      </Box>
      <Box
        sx={{
          width: {
            lg: "10.5vw",
            md: "9.5vw",
            xs: "30.5vw",
          },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          color: "white",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {formatToINR(walletAccountDetail?.userBal?.currentBalance || 0)}
        </Typography>
      </Box>
      <Box
        sx={{
          width: {
            lg: "11.8vw",
            md: "11.5vw",
            xs: "35.5vw",
          },
          display: "flex",
          paddingX: "10px",
          justifyContent: "space-between",
          background:
            Number(+walletAccountDetail?.userBal?.profitLoss || 0) >= 0
              ? "#27AC1E"
              : "#E32A2A",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "10px", fontWeight: "600", color: "white" }}
        >
          {formatToINR(walletAccountDetail?.userBal?.profitLoss || 0)}
        </Typography>
        <StyledImage
          src={
            Number(+walletAccountDetail?.userBal?.profitLoss || 0) >= 0
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
          width: {
            lg: "10.9vw",
            md: "11.5vw",
            xs: "27vw",
          },
          display: "flex",
          paddingX: "10px",
          justifyContent: "space-between",
          background:
            Number(walletAccountDetail?.userBal?.myProfitLoss || 0) >= 0
              ? "#27AC1E"
              : "#E32A2A",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "10px", fontWeight: "600", color: "white" }}
        >
          {formatToINR(walletAccountDetail?.userBal?.myProfitLoss || 0)}
        </Typography>
        <StyledImage
          src={
            Number(walletAccountDetail?.userBal?.myProfitLoss || 0) >= 0
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
          width: {
            lg: "8.5vw",
            md: "9.5vw",
            xs: "18.5vw",
          },
          display: "flex",
          justifyContent: "space-between",
          paddingX: "10px",
          alignItems: "center",
          color: "white",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>
          {formatToINR(walletAccountDetail?.userBal?.totalCommission || 0)}
        </Typography>
      </Box>
      <Box
        sx={{
          width: {
            lg: "9.3vw",
            md: "9.5vw",
            xs: "18.5vw",
          },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          color: "white",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>
          {formatToINR(walletAccountDetail?.userBal?.exposure || 0)}
        </Typography>
      </Box>
      <Box
        sx={{
          width: {
            lg: "8.9vw",
            md: "9.5vw",
            xs: "30.5vw",
          },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          color: "white",
        }}
      >
        <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>
          {formatToINR(walletAccountDetail?.userBal?.currentBalance || 0)}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "4.8vw", md: "5vw", xs: "14vw" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          paddingX: "10px",
          color: "white",
        }}
      >
        <StyledImage
          src={walletAccountDetail?.betBlock === false ? UnLockIcon : LockIcon}
          sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
        />
      </Box>
      <Box
        sx={{
          width: { lg: "4.8vw", md: "5vw", xs: "14vw" },
          display: "flex",
          paddingX: "10px",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <StyledImage
          src={walletAccountDetail?.userBlock === false ? UnLockIcon : LockIcon}
          sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
        />
      </Box>
      <Box
        sx={{
          width: { lg: "7.3vw", md: "8vw", xs: "26.5vw" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          paddingX: "10px",
          color: "white",
        }}
      >
        <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>
          {formatToINR(walletAccountDetail?.exposureLimit || 0)}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "8vw", md: "10vw", xs: "24.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          color: "white",
        }}
      >
        <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>
          {walletAccountDetail?.fullName}
        </Typography>{" "}
      </Box>
    </Box>
  );
};

export default ListBody;
