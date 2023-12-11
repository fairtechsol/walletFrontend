import { Box, useMediaQuery } from "@mui/material";
import Loader from "../Loader";
import HeaderRow from "./HeaderRow";
import ListHeaderRow from "./ListHeaderRow";
import SubHeaderListRow from "./SubHeaderListRow";
import AccountListRow from "./AccountListRow";
import {
  AccountListDataInterface,
  AccountListInterface,
} from "../../interface/listOfClients";
import Pagination from "../Common/Pagination";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";

const AccountList = () => {
  const matchesBreakPoint = useMediaQuery("(max-width:1137px)");
  const dispatch: AppDispatch = useDispatch();
  const loading = false;
  const pageCount = "10";

  const { userList } = useSelector((state: RootState) => state.user);

  const data: AccountListInterface = {
    creditsum: "1000000",
    balancesum: "1000000",
    profitsum: "1000000",
    percent_profit_loss: "1000000",
    totalcomission: "1000000",
    exposuresum: "1000000",
    availablebalancesum: "1000000",
    exposurelimit: "1000000",
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

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
              (theme: any) => ({
                backgroundImage: `${theme.palette.primary.headerGradient}`,
              }),
            ]}
          >
            <HeaderRow />
            <Box sx={{ overflowX: "auto" }}>
              <Box
                sx={{
                  display: matchesBreakPoint ? "inline-block" : "block",
                  position: { xs: "relative", lg: "static" },
                }}
              >
                <Box>
                  <ListHeaderRow />
                  <SubHeaderListRow data={data} />
                  {userList &&
                    userList?.list?.map(
                      (element: AccountListDataInterface, i: any) => {
                        if (i % 2 === 0) {
                          return (
                            <AccountListRow
                              key={element?.id}
                              callProfile={true}
                              showOptions={true}
                              showUserDetails={true}
                              showCReport={true}
                              containerStyle={{ background: "#FFE094" }}
                              profit={+element.profit_loss >= 0}
                              fContainerStyle={{ background: "#0B4F26" }}
                              fTextStyle={{ color: "white" }}
                              element={element}
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
                              profit={+element.profit_loss >= 0}
                              fContainerStyle={{ background: "#F8C851" }}
                              fTextStyle={{ color: "#0B4F26" }}
                              element={element}
                            />
                          );
                        }
                      }
                    )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Pagination currentPage={"1"} pages={pageCount} callPage={() => {}} />
        </>
      )}
    </>
  );
};

export default AccountList;
