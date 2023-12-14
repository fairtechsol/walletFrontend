import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AccountListDataInterface } from "../../interface/listOfClients";
import { RootState } from "../../store/store";
import Pagination from "../Common/Pagination";
import Loader from "../Loader";
import AccountListRow from "./AccountListRow";
import HeaderRow from "./HeaderRow";
import ListHeaderRow from "./ListHeaderRow";
import SubHeaderListRow from "./SubHeaderListRow";
import service from "../../service";
import { saveAs } from "file-saver";
import { Constants } from "../../utils/Constants";

const AccountList = () => {
  const matchesBreakPoint = useMediaQuery("(max-width:1137px)");
  const [userList, setUserList] = useState<any>([]);
  const loading = false;
  const [currentPage, setCurrentPage] = useState("1");
  const [pageCount, setPageCount] = useState(1);

  const { userDetail } = useSelector((state: RootState) => state.user.profile);

  const getUserList = async (username?: any) => {
    try {
      const resp = await service.get(
        `/user/list?${`userName=${
          username ? username : ""
        }`}&offset=${currentPage}&limit=${Constants.pageLimit}`
      );
      if (resp) {
        setUserList(resp?.data?.list);
        setPageCount(
          Math.ceil(
            parseInt(resp?.data?.count ? resp.data?.count : 1) /
              Constants.pageLimit
          )
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleExport = async (type: string) => {
    let url = `/user/list?type=${type}`;
    try {
      const response = await service.get(url, { responseType: "blob" });
      saveAs(
        response.data,
        userDetail?.userName ? userDetail?.userName : "file"
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserList();
  }, [currentPage]);

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
            <HeaderRow handleExport={handleExport} getUserList={getUserList} />
            <Box sx={{ overflowX: "auto" }}>
              <Box
                sx={{
                  display: matchesBreakPoint ? "inline-block" : "block",
                  position: { xs: "relative", lg: "static" },
                }}
              >
                <Box>
                  <ListHeaderRow />
                  <SubHeaderListRow data={userDetail} />
                  {userList?.length === 0 && (
                    <Box>
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
                    </Box>
                  )}
                  {userList?.length > 0 &&
                    userList?.map(
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
          <Pagination
            currentPage={currentPage}
            pages={pageCount}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
};

export default AccountList;
