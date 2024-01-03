import { Box } from "@mui/material";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Common/Pagination";
import YellowHeader from "../../../components/report/AccountStatement/YellowHeader";
import ListHeaderRow from "../../../components/report/AccountStatement/ListHeaderRow";
import TableHeaderList from "../../../components/report/AccountStatement/TableHeaderList";
import TableDataRow from "../../../components/report/AccountStatement/TableDataRow";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getAccountStatement } from "../../../store/actions/reports";
import { useSelector } from "react-redux";
import moment from "moment";
import { Constants } from "../../../utils/Constants";

const AccountStatement = () => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  const { accountStatement, loading } = useSelector(
    (state: RootState) => state.user.reportList
  );

  useEffect(() => {
    if (profileDetail) {
      dispatch(
        getAccountStatement({ id: profileDetail?.id, page: currentPage })
      );
    }
  }, [profileDetail, currentPage]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ marginX: { xs: "2vw", lg: "1vw" } }}>
          <YellowHeader
            fromDate={fromDate}
            toDate={toDate}
            getAccountStatement={() => {
              let filter = "";
              if (fromDate && toDate) {
                filter += `&createdAt=between${moment(
                  new Date(fromDate)
                )?.format("DD/MM/YYYY")}|${moment(
                  new Date(toDate).setDate(toDate.getDate() + 1)
                )?.format("DD/MM/YYYY")}`;
              }
              dispatch(
                getAccountStatement({
                  id: profileDetail?.id,
                  page: currentPage,
                  filter: filter,
                })
              );
            }}
            setToDate={setToDate}
            setFromDate={setFromDate}
          />
        </Box>

        <Box
          sx={[
            {
              marginX: { xs: "2vw", lg: "1vw" },
              minHeight: "100px",
              borderRadius: "2px",
              border: "2px solid white",
              width: "97.5%",
              borderTopRightRadius: {
                xs: "10px",
                lg: "0px",
                md: "10px",
              },
              borderTopLeftRadius: {
                xs: "10px",
                lg: "0px",
                md: "10px",
              },
              background: "#F8C851",
            },
          ]}
        >
          <ListHeaderRow searchFor={"accountStatement"} />

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
              <Box sx={{ overflowX: "scroll", width: "100%" }}>
                <TableHeaderList />
                {accountStatement?.transactions?.map((item: any) => (
                  <TableDataRow
                    key={item?.id}
                    index={item?.id}
                    containerStyle={{ background: "#FFE094" }}
                    profit={true}
                    fContainerStyle={{ background: "#0B4F26" }}
                    fTextStyle={{ color: "white" }}
                    date={moment(item?.createAt)}
                    description={item?.description}
                    closing={item?.closingBalance}
                    trans_type={item?.transType}
                    amount={item?.amount}
                    fromuserName={item?.actionByUser?.userName}
                    touserName={item?.user?.userName}
                  />
                ))}
              </Box>
              <Pagination
                currentPage={currentPage}
                pages={Math.ceil(
                  parseInt(
                    accountStatement?.count ? accountStatement?.count : 1
                  ) / Constants.pageLimit
                )}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AccountStatement;
