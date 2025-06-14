import { Box, useMediaQuery, Button } from "@mui/material";
import { useEffect, useState } from "react";
import AccountListRow from "./AccountListRow";
import ListHeader from "./ListHeader";
import Pagination from "../Common/Pagination";
import ListHeaderRow from "./ListHeaderRow";
import SubHeaderListRow from "./SubHeaderListRow";
import SearchInput from "../Common/SearchInput";
import { ApiConstants, Constants } from "../../utils/Constants";
import service from "../../service";

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
  }: any) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.LIST}?userId=${userId}&searchBy=${searchBy}&keyword=${userName}&domain=${domain}&roleName=${roleName}&page=${currentPage}&limit=${Constants.pageLimit}&sort=user.betBlock:ASC,user.userBlock:ASC,user.userName:ASC`
      );
      if (resp) {
        setNewData(resp?.data?.list);
        setDataCount(resp?.data?.count);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const getTotalBalance = async ({ userId, roleName, domain }: any) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.TOTAL_BALANCE}?userId=${userId}&roleName=${roleName}&domain=${domain}`
      );
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
      searchBy: "",
      domain: domain ? domain : element?.domain ? element?.domain : "",
      roleName: element?.roleName,
      userName: "",
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
              // height: "50px",
            }}
          >
            <SearchInput
              placeholder={"Search User..."}
              show={true}
              searchFor={"userModalList"}
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
            {newData?.map((newElement: any, i: any) => {
              if (i % 2 === 0) {
                return (
                  <AccountListRow
                    key={i}
                    callProfile={false}
                    showCReport={true}
                    showUserDetails={false}
                    showOptions={true}
                    show={true}
                    containerStyle={{ background: "#FFE094" }}
                    profit={(+newElement?.userBal?.profitLoss || 0) >= 0}
                    fContainerStyle={{ background: "#0B4F26" }}
                    fTextStyle={{ color: "white" }}
                    element={
                      element?.isUrl
                        ? { ...newElement, isUrl: element?.isUrl }
                        : newElement
                    }
                    domain={
                      domain
                        ? domain
                        : newElement?.domain
                        ? newElement?.domain
                        : ""
                    }
                    currentPage={currentPage}
                    showDownIcon={element?.isUrl || newElement?.isUrl}
                  />
                );
              } else {
                return (
                  <AccountListRow
                    key={i}
                    callProfile={false}
                    showUserDetails={false}
                    showOptions={true}
                    showCReport={true}
                    show={true}
                    // showChildModal={true}
                    containerStyle={{ background: "#ECECEC" }}
                    profit={(+newElement?.userBal?.profitLoss || 0) >= 0}
                    fContainerStyle={{ background: "#F8C851" }}
                    fTextStyle={{ color: "#0B4F26" }}
                    element={
                      element?.isUrl
                        ? { ...newElement, isUrl: element?.isUrl }
                        : newElement
                    }
                    domain={
                      domain
                        ? domain
                        : newElement?.domain
                        ? newElement?.domain
                        : ""
                    }
                    // getListOfUser={getListOfUser}
                    currentPage={currentPage}
                    showDownIcon={element?.isUrl || newElement?.isUrl}
                  />
                );
              }
            })}
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

export default AccountListTable;
