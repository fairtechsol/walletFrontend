import { useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import DataShow from "../../components/myAccount/DataShow";

interface BalanceDetails {
  ul_credit_refer: string;
  master_balance: string;
  available_balance: string;
  dl_balance: string;
  upper_level: string;
  available_balance_pl: string;
  dl_credit_refer: string;
  dl_profit_loss: string;
  profit_loss: string;
}

const MyAccount = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const [userBalanceDetails] = useState<BalanceDetails>({
    ul_credit_refer: "0",
    master_balance: "0",
    available_balance: "0",
    dl_balance: "0",
    upper_level: "0",
    available_balance_pl: "0",
    dl_credit_refer: "0",
    dl_profit_loss: "0",
    profit_loss: "0",
  });

  const classes = {
    mainBoxSX: { position: "relative", margin: "1%" },
  };

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
            marginLeft: { laptop: "0.5%", mobile: "0.5%" },
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
              flexDirection: { laptop: "row", mobile: "column" },
              justifyContent: "space-between",
            }}
          >
            <DataShow
              title={"Upper Level Credit Referance"}
              value={userBalanceDetails?.ul_credit_refer}
              containerStyle={{ flex: 1 }}
              valueContainerStyle={{
                background: `${
                  parseInt(userBalanceDetails?.ul_credit_refer) >= 0
                    ? "#0B4F26"
                    : "#FF4848"
                }`,
              }}
            />
            <DataShow
              title={"Down level Occupy Balance"}
              value={userBalanceDetails?.dl_balance}
              containerStyle={{
                flex: 1,
                marginTop: matchesMobile ? "10px" : "0px",
                marginX: matchesMobile ? "0px" : "20px",
              }}
              valueContainerStyle={{
                background: `${
                  parseInt(userBalanceDetails?.dl_balance) >= 0
                    ? "#0B4F26"
                    : "#FF4848"
                }`,
              }}
            />
            <DataShow
              title={"Down Level Credit Referance"}
              value={userBalanceDetails?.dl_credit_refer}
              containerStyle={{
                flex: 1,
                marginTop: matchesMobile ? "10px" : "0px",
              }}
              valueContainerStyle={{
                background: `${
                  parseInt(userBalanceDetails?.dl_credit_refer) >= 0
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
              flexDirection: { laptop: "row", mobile: "column" },
              justifyContent: "space-between",
            }}
          >
            <DataShow
              title={"Total Master Balance"}
              value={userBalanceDetails?.master_balance}
              containerStyle={{ flex: 1 }}
              valueContainerStyle={{
                background: `${
                  parseInt(userBalanceDetails?.master_balance) >= 0
                    ? "#0B4F26"
                    : "#FF4848"
                }`,
              }}
            />
            <DataShow
              title={"Upper Level"}
              value={userBalanceDetails?.upper_level}
              containerStyle={{
                flex: 1,
                marginTop: matchesMobile ? "10px" : "0px",
                marginX: matchesMobile ? "0px" : "20px",
              }}
              valueContainerStyle={{
                background: `${
                  parseInt(userBalanceDetails?.upper_level) >= 0
                    ? "#0B4F26"
                    : "#FF4848"
                }`,
              }}
            />
            <DataShow
              title={"Down Level Profit/Loss"}
              value={userBalanceDetails?.dl_profit_loss}
              containerStyle={{
                flex: 1,
                marginTop: matchesMobile ? "10px" : "0px",
              }}
              valueContainerStyle={{
                background: `${
                  parseInt(userBalanceDetails?.dl_profit_loss) >= 0
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
              flexDirection: { laptop: "row", mobile: "column" },
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            <DataShow
              title={"Available Balance"}
              value={userBalanceDetails?.available_balance}
              containerStyle={{ flex: 1 }}
              valueContainerStyle={{
                background: `${
                  parseInt(userBalanceDetails?.available_balance) >= 0
                    ? "#0B4F26"
                    : "#FF4848"
                }`,
              }}
            />
            <DataShow
              title={"Available Balance With Profit/Loss"}
              value={userBalanceDetails?.available_balance_pl}
              containerStyle={{
                flex: 1,
                marginTop: matchesMobile ? "10px" : "0px",
                marginX: matchesMobile ? "0px" : "20px",
              }}
              valueContainerStyle={{
                background: `${
                  parseInt(userBalanceDetails?.available_balance_pl) >= 0
                    ? "#0B4F26"
                    : "#FF4848"
                }`,
              }}
            />
            <DataShow
              title={"My Profit/Loss"}
              value={userBalanceDetails?.profit_loss}
              containerStyle={{
                flex: 1,
                marginTop: matchesMobile ? "10px" : "0px",
              }}
              valueContainerStyle={{
                background: `${
                  parseInt(userBalanceDetails?.profit_loss) >= 0
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
