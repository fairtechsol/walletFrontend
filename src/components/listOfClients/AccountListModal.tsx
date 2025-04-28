import { Box, Button, useMediaQuery } from "@mui/material";
import { memo, useEffect, useState } from "react";
import service from "../../service";
import { ApiConstants, Constants } from "../../utils/Constants";
import Pagination from "../Common/Pagination";
import SearchInput from "../Common/SearchInput";
import AccountListRow from "./AccountListRow";
import ListHeader from "./ListHeader";
import ListHeaderRow from "./ListHeaderRow";
import SubHeaderListRow from "./SubHeaderListRow";

const AccountListTable = ({
  endpoint,
  id,
  setShow,
  title,
  element,
  domain,
}: any) => {
  const matchesBreakPoint = useMediaQuery("(max-width:1137px)");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [newData, setNewData] = useState([]);
  const [dataCount, setDataCount] = useState<any>(0);
  const [newTotalBalance, setNewTotalBalance] = useState(null);

  const getUserList = async ({
    userName,
    currentPage,
    userId,
    roleName,
    domain,
    searchBy,
  }: {
    userName: string | null;
    currentPage: number;
    userId: string;
    roleName: string;
    domain: string;
    searchBy: string | null;
  }) => {
    try {
      const resp = await service.get(ApiConstants.USER.LIST, {
        params: {
          userId: userId || null,
          searchBy,
          keyword: userName,
          domain: domain || null,
          roleName: roleName || null,
          page: currentPage || null,
          limit: Constants.pageLimit || null,
          sort: "user.betBlock:ASC,user.userBlock:ASC,user.userName:ASC",
        },
      });
      if (resp) {
        setNewData(resp?.data?.list);
        setDataCount(resp?.data?.count);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const getTotalBalance = async ({
    userId,
    roleName,
    domain,
  }: {
    userId: string;
    roleName: string;
    domain: string;
  }) => {
    try {
      const resp = await service.get(ApiConstants.USER.TOTAL_BALANCE, {
        params: {
          userId,
          roleName,
          domain,
        },
      });
      if (resp) {
        setNewTotalBalance(resp?.data);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotalBalance({
      userId: id,
      roleName: element?.roleName,
      domain: domain ? domain : element?.domain ? element?.domain : "",
    });
    getUserList({
      userId: element?.id,
      searchBy: null,
      domain: domain ? domain : element?.domain ? element?.domain : null,
      roleName: element?.roleName,
      userName: null,
      currentPage: currentPage,
    });
  }, [id, currentPage]);

  return (
    <>
      <Box
        sx={[
          {
            marginX: "0.5%",
            width: { xs: "96%", lg: "90%", md: "96%" },
            minHeight: "200px",
            borderRadius: "10px",
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "0px",
            overflow: "hidden",
            overflowY: "auto",
            border: "2px solid white",
            background: "#F8C851",
          },
        ]}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "50px",
          }}
        >
          <ListHeader
            id={id}
            title={title}
            downloadPdfExcel={true}
            domain={domain ? domain : element?.domain ? element?.domain : ""}
            roleName={element?.roleName}
            endpoint={ApiConstants.USER.LIST}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SearchInput
              placeholder="Search User..."
              show={true}
              searchFor="userModalList"
              endpoint={endpoint}
              userId={id}
              roleName={element?.roleName}
              domain={domain ? domain : element?.domain ? element?.domain : ""}
              setCurrentPage={setCurrentPage}
              getUserListModal={getUserList}
            />
            <Button
              sx={{ color: "", fontSize: "30px" }}
              onClick={() => {
                setShow({ value: false, id: "", title: "" });
              }}
            >
              &times;
            </Button>
          </Box>
        </Box>

        <Box sx={{ overflowX: "auto", maxHeight: "60vh" }}>
          <Box sx={{ display: matchesBreakPoint ? "inline-block" : "block" }}>
            <ListHeaderRow />
            <SubHeaderListRow data={newTotalBalance} />
            {newData?.map((newElement: any, i: any) => (
              <AccountListRow
                key={i}
                showCReport={true}
                showUserDetails={false}
                showOptions={true}
                show={true}
                containerStyle={{
                  background: i % 2 === 0 ? "#FFE094" : "#ECECEC",
                }}
                profit={(+newElement?.userBal?.profitLoss || 0) >= 0}
                fContainerStyle={{
                  background: i % 2 === 0 ? "#0B4F26" : "#F8C851",
                }}
                fTextStyle={{ color: i % 2 === 0 ? "white" : "#0B4F26" }}
                element={
                  element?.isUrl
                    ? { ...newElement, isUrl: element?.isUrl }
                    : newElement
                }
                domain={
                  domain ? domain : newElement?.domain ? newElement?.domain : ""
                }
                currentPage={currentPage}
                showDownIcon={element?.isUrl || newElement?.isUrl}
              />
            ))}
          </Box>
        </Box>
        <Pagination
          currentPage={currentPage}
          pages={Math.ceil(parseInt(dataCount) / Constants.pageLimit)}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </>
  );
};

export default memo(AccountListTable);
