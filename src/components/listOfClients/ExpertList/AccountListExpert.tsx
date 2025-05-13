import { Box, Typography, useMediaQuery } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountListDataInterface } from "../../../interface/listOfClients";
import { getUserList } from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";
import { ApiConstants, Constants } from "../../../utils/Constants";
import Pagination from "../../Common/Pagination";
import HeaderRow from "../HeaderRow";
import AccountListExpertRow from "./AccountListExpertRow";
import ListHeaderExpertRow from "./ListHeaderExpertRow";

const AccountListExpert = (endpoint: { endpoint: string }) => {
  const matchesBreakPoint = useMediaQuery("(max-width:1137px)");
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { userList } = useSelector((state: RootState) => state.user.userList);

  useEffect(() => {
    dispatch(getUserList({ currentPage: currentPage, url: endpoint }));
  }, [currentPage]);

  return (
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
        <HeaderRow
          endpoint={ApiConstants.USER.EXPERTLIST}
          searchFor="userList"
          downloadPdfExcel={false}
          setCurrentPage={setCurrentPage}
        />
        <Box sx={{ overflowX: "auto" }}>
          <Box
            sx={{
              display: matchesBreakPoint ? "inline-block" : "block",
              position: { xs: "relative", lg: "static" },
            }}
          >
            <ListHeaderExpertRow />
            {userList?.count === 0 ? (
              <Typography
                sx={{
                  color: "#000",
                  textAlign: "center",
                  fontSize: { lg: "16px", xs: "10px" },
                  fontWeight: "600",
                  margin: "1rem",
                }}
              >
                No Matching Records Found
              </Typography>
            ) : (
              userList?.list?.map(
                (element: AccountListDataInterface, i: number) => (
                  <AccountListExpertRow
                    key={element?.id}
                    showOptions={true}
                    showUserDetails={true}
                    showCReport={true}
                    containerStyle={{
                      background: i % 2 === 0 ? "#FFE094" : "#ECECEC",
                    }}
                    profit={+element.profit_loss >= 0}
                    fContainerStyle={{
                      background: i % 2 === 0 ? "#0B4F26" : "#F8C851",
                    }}
                    fTextStyle={{ color: i % 2 === 0 ? "#fff" : "#0B4F26" }}
                    element={element}
                    currentPage={currentPage}
                  />
                )
              )
            )}
          </Box>
        </Box>
      </Box>
      <Pagination
        currentPage={currentPage}
        pages={Math.ceil(
          parseInt(userList?.count ? userList?.count : 1) / Constants.pageLimit
        )}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default memo(AccountListExpert);
