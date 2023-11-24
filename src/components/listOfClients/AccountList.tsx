import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Loader from "../Loader";
import HeaderRow from "./HeaderRow";
import ListHeaderRow from "./ListHeaderRow";
import SubHeaderListRow from "./SubHeaderListRow";
import AccountListRow from "./AccountListRow";

const AccountList = () => {
  const [loading, setLoading] = useState(false);
  const matchesBreakPoint = useMediaQuery("(max-width:1137px)");

  const data = {
    creditsum: "1000000",
    balancesum: "1000000",
    profitsum: "1000000",
    percent_profit_loss: "1000000",
    totalcomission: "1000000",
    exposuresum: "1000000",
    availablebalancesum: "1000000",
    exposurelimit: "1000000",
  };

  const data1 = [
    {
      id: 1,
      userName: "",
      credit_refer: "",
      balance: "",
      profit_loss: "",
      percent_profit_loss: "",
      totalCommissions: "",
      exposure: "",
      available_balance: "",
      bet_blocked: "",
      all_blocked: "",
      exposure_limit: "",
      role: "",
    },
  ];

  return (
    <>
      {loading ? (
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader text="" />
        </Box>
      ) : (
        <>
          <Box
            sx={[
              {
                minHeight: "200px",
                borderRadius: "10px",
                borderBottomRightRadius: "0px",
                borderBottomLeftRadius: "0px",
                overflow: "hidden",
                border: "2px solid white",
              },
              (theme) => ({
                backgroundImage: `${theme.palette.secondary.light}`,
              }),
            ]}
          >
            <HeaderRow />
            <Box sx={{ overflowX: "auto" }}>
              <Box
                sx={{
                  display: matchesBreakPoint ? "inline-block" : "block",
                  position: { mobile: "relative", laptop: "static" },
                }}
              >
                <Box sx={{}}>
                  <ListHeaderRow />
                  <SubHeaderListRow data={data} />
                  {data1.map((element: any, i: any) => {
                    if (i % 2 === 0) {
                      return (
                        <AccountListRow
                          key={element?.id}
                          callProfile={true}
                          showOptions={true}
                          showUserDetails={true}
                          showCReport={true}
                          containerStyle={{ background: "#FFE094" }}
                          profit={element.profit_loss >= 0}
                          fContainerStyle={{ background: "#0B4F26" }}
                          fTextStyle={{ color: "white" }}
                          element={element}
                          // getListOfUser={getListOfUser}
                          // currentPage={currentPageNo}
                          // handleExport={handleExport}
                        />
                      );
                    } else {
                      return (
                        <AccountListRow
                          key={element?.id}
                          showCReport={true}
                          callProfile={true}
                          showUserDetails={true}
                          showOptions={true}
                          containerStyle={{ background: "#ECECEC" }}
                          profit={element.profit_loss >= 0}
                          fContainerStyle={{ background: "#F8C851" }}
                          fTextStyle={{ color: "#0B4F26" }}
                          element={element}
                          // getListOfUser={getListOfUser}
                          // currentPage={currentPageNo}
                          // handleExport={handleExport}
                        />
                      );
                    }
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default AccountList;
