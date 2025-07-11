import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoxButton from "../../components/listOfClients/RowModalComponents/BoxButton";
import ChangeDeleteCode from "../../components/myAccount/ChangeDeleteCode";
import DataShow from "../../components/myAccount/DataShow";
import { getMyAccountDetails } from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";

const MyAccount = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const { myAccountDetails } = useSelector(
    (state: RootState) => state.user.profile
  );
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const classes = {
    mainBoxSX: { position: "relative", margin: "1%" },
  };

  useEffect(() => {
    dispatch(getMyAccountDetails());
  }, []);

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
              title="Upper Level Credit Reference"
              value={myAccountDetails?.userCreditReference ?? 0}
              containerStyle={{ flex: 1 }}
              valueContainerStyle={{
                background:
                  parseInt(myAccountDetails?.userCreditReference ?? 0) >= 0
                    ? "#0B4F26"
                    : "#FF4848",
              }}
            />
            <DataShow
              title="Down level Occupy Balance"
              value={myAccountDetails?.downLevelOccupyBalance ?? 0}
              containerStyle={{
                flex: 1,
                marginTop: matchesMobile ? "10px" : "0px",
                marginX: matchesMobile ? "0px" : "20px",
              }}
              valueContainerStyle={{
                background:
                  parseInt(myAccountDetails?.downLevelOccupyBalance ?? 0) >= 0
                    ? "#0B4F26"
                    : "#FF4848",
              }}
            />
            <DataShow
              title="Down Level Credit Reference"
              value={myAccountDetails?.downLevelCreditReference ?? 0}
              containerStyle={{
                flex: 1,
                marginTop: matchesMobile ? "10px" : "0px",
              }}
              valueContainerStyle={{
                background:
                  parseInt(myAccountDetails?.downLevelCreditReference ?? 0) >= 0
                    ? "#0B4F26"
                    : "#FF4848",
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
              title="Total Master Balance"
              value={myAccountDetails?.totalMasterBalance ?? 0}
              containerStyle={{ flex: 1 }}
              valueContainerStyle={{
                background:
                  parseInt(myAccountDetails?.totalMasterBalance ?? 0) >= 0
                    ? "#0B4F26"
                    : "#FF4848",
              }}
            />
            <DataShow
              title="Upper Level"
              value={myAccountDetails?.upperLevelBalance ?? 0}
              valueProfitLoss={myAccountDetails?.totalProfitLossUpperlevel ?? 0}
              valuePercentage={
                myAccountDetails?.upperLevelProfitLossPercent ?? 0
              }
              containerStyle={{
                flex: 1,
                marginTop: matchesMobile ? "10px" : "0px",
                marginX: matchesMobile ? "0px" : "20px",
              }}
              valueContainerStyle={{
                background:
                  parseInt(myAccountDetails?.upperLevelBalance ?? 0) >= 0
                    ? "#0B4F26"
                    : "#FF4848",
              }}
            />
            <DataShow
              title="Down Level Profit/Loss"
              value={myAccountDetails?.downLevelProfitLoss ?? 0}
              valueProfitLoss={myAccountDetails?.totalProfitLossDownlevel ?? 0}
              containerStyle={{
                flex: 1,
                marginTop: matchesMobile ? "10px" : "0px",
              }}
              valueContainerStyle={{
                background:
                  parseInt(myAccountDetails?.downLevelProfitLoss ?? 0) >= 0
                    ? "#0B4F26"
                    : "#FF4848",
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
              title="Available Balance"
              value={myAccountDetails?.availableBalance ?? 0}
              containerStyle={{ flex: 1 }}
              valueContainerStyle={{
                background:
                  parseInt(myAccountDetails?.availableBalance ?? 0) >= 0
                    ? "#0B4F26"
                    : "#FF4848",
              }}
            />
            <DataShow
              title="Available Balance With Profit/Loss"
              value={myAccountDetails?.availableBalanceWithProfitLoss ?? 0}
              containerStyle={{
                flex: 1,
                marginTop: matchesMobile ? "10px" : "0px",
                marginX: matchesMobile ? "0px" : "20px",
              }}
              valueContainerStyle={{
                background:
                  parseInt(
                    myAccountDetails?.availableBalanceWithProfitLoss ?? 0
                  ) >= 0
                    ? "#0B4F26"
                    : "#FF4848",
              }}
            />
            <DataShow
              title="My Profit/Loss"
              value={myAccountDetails?.profitLoss ?? 0}
              containerStyle={{
                flex: 1,
                marginTop: matchesMobile ? "10px" : "0px",
              }}
              valueContainerStyle={{
                background:
                  parseInt(myAccountDetails?.profitLoss ?? 0) >= 0
                    ? "#0B4F26"
                    : "#FF4848",
              }}
            />
          </Box>
        </Box>
        {profileDetail?.roleName == "fairGameWallet" && (
          <BoxButton
            color="#0B4F26"
            onClick={() => {
              setOpenChangePassword(!openChangePassword);
            }}
            title="Change permanent delete password"
            isSelected={openChangePassword}
            containerStyle={{
              flex: 1,
              borderColor: "white",
            }}
            titleStyle={{
              fontSize: { xs: "12px" },
            }}
          />
        )}
        {openChangePassword && (
          <ChangeDeleteCode
            open={openChangePassword}
            setOpen={setOpenChangePassword}
          />
        )}
      </Box>
    </>
  );
};

export default memo(MyAccount);
