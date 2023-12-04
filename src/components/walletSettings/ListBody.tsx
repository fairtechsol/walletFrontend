import { Box, Typography } from "@mui/material";
import StyledImage from "../Common/StyledImages";
import { LockIcon, UnLockIcon } from "../../assets";

const ListBody = (props: any) => {
  const { walletAccountDetail, fContainerStyle, fTextStyle } = props;
  return (
    <Box
      sx={[
        {
          width: "100%",
          display: "flex",
          height: "45px",
          background: "#0B4F26",
          alignItems: "center",
          overflow: "hidden",
          borderBottom: "2px solid white",
        },
      ]}
    >
      <Box
        sx={[
          {
            width: {
              lg: "11.5vw",
              md: "20.5vw",
              xs: "26.5vw",
            },
            display: "flex",
            paddingX: "10px",
            justifyContent: "space-between",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          },
          fContainerStyle,
        ]}
      >
        <Typography
          sx={[
            {
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              textTransform: "capitalize",
              wordBreak: "break-all",
              color: "white",
            },
            fTextStyle,
          ]}
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
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {walletAccountDetail?.credit_refer}
        </Typography>
      </Box>
      <Box
        sx={{
          width: {
            lg: "9.5vw",
            md: "9.5vw",
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
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {Number(walletAccountDetail?.balance) >= 0 ? (
            <>
              <span style={{ visibility: "hidden" }}>-</span>
              {Number(walletAccountDetail?.balance)}
            </>
          ) : (
            Number(walletAccountDetail?.balance)
          )}
        </Typography>
      </Box>
      <Box
        sx={{
          width: {
            lg: "11.5vw",
            md: "11.5vw",
            xs: "26.5vw",
          },
          display: "flex",
          paddingX: "10px",
          justifyContent: "space-between",
          background:
            Number(walletAccountDetail?.profit_loss) >= 0
              ? "#27AC1E"
              : "#E32A2A",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
        >
          {Number(walletAccountDetail?.profit_loss) >= 0 ? (
            <>
              <span style={{ visibility: "hidden" }}>-</span>
              {walletAccountDetail?.profit_loss}
            </>
          ) : (
            walletAccountDetail?.profit_loss
          )}
        </Typography>
        <StyledImage
          src={
            Number(walletAccountDetail?.profit_loss) >= 0
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
            lg: "11.5vw",
            md: "11.5vw",
            xs: "26.5vw",
          },
          display: "flex",
          paddingX: "10px",
          justifyContent: "space-between",
          background:
            Number(walletAccountDetail?.profit_loss) >= 0
              ? "#27AC1E"
              : "#E32A2A",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
        >
          {Number(walletAccountDetail?.percent_profit_loss) >= 0 ? (
            <>
              <span style={{ visibility: "hidden" }}>-</span>
              {walletAccountDetail?.percent_profit_loss}
            </>
          ) : (
            walletAccountDetail?.percent_profit_loss
          )}
        </Typography>
        <StyledImage
          src={
            Number(walletAccountDetail?.profit_loss) >= 0
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
            lg: "9.5vw",
            md: "9.5vw",
            xs: "26.5vw",
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
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {walletAccountDetail?.TotalComission}
        </Typography>
      </Box>
      <Box
        sx={{
          width: {
            lg: "9.5vw",
            md: "9.5vw",
            xs: "26.5vw",
          },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          color: "white",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {walletAccountDetail?.exposure}
        </Typography>
      </Box>
      <Box
        sx={{
          width: {
            lg: "9.5vw",
            md: "9.5vw",
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
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {Number(walletAccountDetail?.available_balance) >= 0 ? (
            <>
              <span style={{ visibility: "hidden" }}>-</span>
              {Number(walletAccountDetail?.available_balance)}
            </>
          ) : (
            Number(walletAccountDetail?.available_balance)
          )}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "5vw", md: "5vw", xs: "14vw" },
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
          src={walletAccountDetail?.bet_blocked == 0 ? UnLockIcon : LockIcon}
          sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
        />
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
      >
        <StyledImage
          src={walletAccountDetail?.all_blocked == 0 ? UnLockIcon : LockIcon}
          sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
        />
      </Box>
      <Box
        sx={{
          width: { lg: "8vw", md: "8vw", xs: "26.5vw" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          paddingX: "10px",
          color: "white",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {walletAccountDetail?.exposure_limit}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "10vw", md: "10vw", xs: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          color: "white",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {walletAccountDetail?.fullName}
        </Typography>{" "}
      </Box>
    </Box>
  );
};

export default ListBody;
