import {
  Box,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import AccountListRow from "./AccountListRow";
import ListHeader from "./ListHeader";
import { useSelector } from "react-redux";
import Pagination from "../Common/Pagination";
import ListHeaderRow from "./ListHeaderRow";
import SubHeaderListRow from "./SubHeaderListRow";
import SearchInput from "../Common/SearchInput";
import { getModalUserList, getTotalBalance } from "../../store/actions/user/userAction";
import { Constants } from "../../utils/Constants";

const AccountListTable = ({ id, setShow, title,endpoint,roleName,domain }: any) => {
  const matchesBreakPoint = useMediaQuery("(max-width:1137px)");
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
//   const [currentPage] = useState(1);
//   const [selectedId, setSelectedId] = useState({
//     matchId: "",
//     userId: "",
//   });
console.log(domain,'title',title,id)
  const { userModalList } = useSelector((state: RootState) => state.user.userList);
  const { totalBalance } = useSelector(
    (state: RootState) => state.user.userList
  );
  useEffect(() => {
    if (id) {
      dispatch(getModalUserList({ currentPage: currentPage, url: endpoint,userId:id , roleName:roleName,domain:domain ? domain :'' }));
      dispatch(getTotalBalance({userId:id,roleName:roleName,domain:domain}));
    }
  }, [id]);
  return (
    <>
      <Box
        sx={[
          {
            marginX: "0.5%",
            width: { mobile: "96%", laptop: "90%", tablet: "96%" },
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
                searchFor={"userList"}
                downloadPdfExcel={true}
                // getListOfUser={getListOfUser}
                // setPageCount={setPageCount}
                // matchesMobile={matchesMobile}
                // handleExport={handleExport}
              />
              <Box sx={{
                display: "flex",
                flexDirection:'row',
                justifyContent: "center",
                alignItems:'center'
                // height: "50px",
              }}>
                <SearchInput
                  placeholder={"Search User..."}
                  show={true}
                  searchFor={'userModalList'}
                  endpoint={endpoint}
                  userId={id} 
                  roleName={roleName}
                  domain={domain ? domain :''}
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

            <Box sx={{ overflowX: "auto" }}>
              <Box
                sx={{ display: matchesBreakPoint ? "inline-block" : "block" }}
              >
                <ListHeaderRow />
                <SubHeaderListRow data={totalBalance} />
                {userModalList?.list?.map((element: any, i: any) => {
                  if (i % 2 === 0) {
                    return (
                      <AccountListRow
                        key={i}
                        callProfile={false}
                        showCReport={true}
                        showUserDetails={false}
                        showOptions={true}
                        containerStyle={{ background: "#FFE094" }}
                        profit={element.profit_loss >= 0}
                        fContainerStyle={{ background: "#0B4F26" }}
                        fTextStyle={{ color: "white" }}
                        element={element}
                        // currentPage={currentPage}
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
                        // showChildModal={true}
                        containerStyle={{ background: "#ECECEC" }}
                        profit={element.profit_loss >= 0}
                        fContainerStyle={{ background: "#F8C851" }}
                        fTextStyle={{ color: "#0B4F26" }}
                        element={element}
                        // getListOfUser={getListOfUser}
                        // currentPage={currentPage}
                      />
                    );
                  }
                })}
              </Box>
            </Box>
            <Pagination
              currentPage={currentPage}
              pages={Math.ceil(
                parseInt(userModalList?.count ? userModalList?.count : 1) /
                  Constants.pageLimit
              )}
            setCurrentPage={setCurrentPage}
            />
          
      </Box>
    </>
  );
};

export default AccountListTable;
