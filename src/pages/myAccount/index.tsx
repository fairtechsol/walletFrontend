import { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import DataShow from "../../components/myAccount/DataShow";
import { BalanceDetails } from "../../interface/myAccount";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import service from "../../service";

const MyAccount = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const { userDetail } = useSelector((state: RootState) => state.user);

  const [userBalanceDetails, setUserBalanceDetails] = useState<BalanceDetails>({
    userCreditReference: "0",
    totalMasterBalance: "0",
    availableBalance: "0",
    downLevelOccupyBalance: "0",
    upperLevelBalance: "0",
    availableBalanceWithProfitLoss: "0",
    downLevelCreditReference: "0",
    downLevelProfitLoss: "0",
    profitLoss: "0",
  });

  const classes = {
    mainBoxSX: { position: "relative", margin: "1%" },
  };

  const getMyAccountDetails = async (id: string) => {
    try {
      const resp = await service.get(`/user/balance?id=${id}`);
      if (resp) {
        const data = resp?.data?.response;
        setUserBalanceDetails((prev: any) => {
          return {
            ...prev,
            userCreditReference: data?.userCreditReference,
            totalMasterBalance: data?.totalMasterBalance,
            availableBalance: data?.availableBalance,
            downLevelOccupyBalance: data?.downLevelOccupyBalance,
            upperLevelBalance: data?.upperLevelBalance,
            availableBalanceWithProfitLoss:
              data?.availableBalanceWithProfitLoss,
            downLevelCreditReference: data?.downLevelCreditReference,
            downLevelProfitLoss: data?.downLevelProfitLoss,
            profitLoss: data?.profitLoss,
          };
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (userDetail) {
      getMyAccountDetails(userDetail.id);
    }
  }, [userDetail]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "1%",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            marginLeft: { lg: "0.5%", xs: "0.5%" },
          }}
        >
          My Account
        </Typography>
      </Box>
      <Box sx={classes.mainBoxSX}>
        <Box
          sx={{
            background: "#FFE094",
            padding: matchesMobile ? "10px" : "20px",
            paddingBottom: "8px",
            borderRadius: "5px",
            width: "100%",
            margin: "10px 0px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { lg: "row", xs: "column" },
              justifyContent: "space-between",
            }}
          >
            <DataShow
              title={"Upper Level Credit Referance"}
              value={userBalanceDetails?.userCreditReference}
              containerStyle={{ flex: 1 }}
              valueContainerStyle={{
                background: `${
                  parseInt(userBalanceDetails?.userCreditReference) >= 0
                    ? "#0B4F26"
                    : "#FF4848"
                }`,
              }}
            />
            <DataShow
              title={"Down level Occupy Balance"}
              value={userBalanceDetails?.downLevelOccupyBalance}
              containerStyle={{
                flex: 1,
                marginTop: matchesMobile ? "10px" : "0px",
                marginX: matchesMobile ? "0px" : "20px",
              }}
              valueContainerStyle={{
                background: `${
                  parseInt(userBalanceDetails?.downLevelOccupyBalance) >= 0
                    ? "#0B4F26"
                    : "#FF4848"
                }`,
              }}
            />
            <DataShow
              title={"Down Level Credit Referance"}
              value={userBalanceDetails?.downLevelCreditReference}
              containerStyle={{
                flex: 1,
                marginTop: matchesMobile ? "10px" : "0px",
              }}
              valueContainerStyle={{
                background: `${
                  parseInt(userBalanceDetails?.downLevelCreditReference) >= 0
                    ? "#0B4F26"
                    : "#FF4848"
                }`,
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              marginTop: "10px",
              flexDirection: { lg: "row", xs: "column" },
              justifyContent: "space-between",
            }}
          >
            <DataShow
              title={"Total Master Balance"}
              value={userBalanceDetails?.totalMasterBalance}
              containerStyle={{ flex: 1 }}
              valueContainerStyle={{
                background: `${
                  parseInt(userBalanceDetails?.totalMasterBalance) >= 0
                    ? "#0B4F26"
                    : "#FF4848"
                }`,
              }}
            />
            <DataShow
              title={"Upper Level"}
              value={userBalanceDetails?.upperLevelBalance}
              containerStyle={{
                flex: 1,
                marginTop: matchesMobile ? "10px" : "0px",
                marginX: matchesMobile ? "0px" : "20px",
              }}
              valueContainerStyle={{
                background: `${
                  parseInt(userBalanceDetails?.upperLevelBalance) >= 0
                    ? "#0B4F26"
                    : "#FF4848"
                }`,
              }}
            />
            <DataShow
              title={"Down Level Profit/Loss"}
              value={userBalanceDetails?.downLevelProfitLoss}
              containerStyle={{
                flex: 1,
                marginTop: matchesMobile ? "10px" : "0px",
              }}
              valueContainerStyle={{
                background: `${
                  parseInt(userBalanceDetails?.downLevelProfitLoss) >= 0
                    ? "#0B4F26"
                    : "#FF4848"
                }`,
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              marginTop: "10px",
              flexDirection: { lg: "row", xs: "column" },
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            <DataShow
              title={"Available Balance"}
              value={userBalanceDetails?.availableBalance}
              containerStyle={{ flex: 1 }}
              valueContainerStyle={{
                background: `${
                  parseInt(userBalanceDetails?.availableBalance) >= 0
                    ? "#0B4F26"
                    : "#FF4848"
                }`,
              }}
            />
            <DataShow
              title={"Available Balance With Profit/Loss"}
              value={userBalanceDetails?.availableBalanceWithProfitLoss}
              containerStyle={{
                flex: 1,
                marginTop: matchesMobile ? "10px" : "0px",
                marginX: matchesMobile ? "0px" : "20px",
              }}
              valueContainerStyle={{
                background: `${
                  parseInt(
                    userBalanceDetails?.availableBalanceWithProfitLoss
                  ) >= 0
                    ? "#0B4F26"
                    : "#FF4848"
                }`,
              }}
            />
            <DataShow
              title={"My Profit/Loss"}
              value={userBalanceDetails?.profitLoss}
              containerStyle={{
                flex: 1,
                marginTop: matchesMobile ? "10px" : "0px",
              }}
              valueContainerStyle={{
                background: `${
                  parseInt(userBalanceDetails?.profitLoss) >= 0
                    ? "#0B4F26"
                    : "#FF4848"
                }`,
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MyAccount;
