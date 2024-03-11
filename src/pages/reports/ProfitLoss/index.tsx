import { Box, Typography } from "@mui/material";
import ProfitLossHeader from "../../../components/report/ProfitLossReport/ProfitLossHeader";
import ProfitLossTableComponent from "../../../components/report/ProfitLossReport/ProfitLossTableComponent";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getTotalProfitLoss, updateUserSearchId } from "../../../store/actions/reports";
import moment from "moment";
import { getSearchClientList } from "../../../store/actions/user/userAction";
import { debounce } from "lodash";

const ProfitLossReport = () => {
  const dispatch: AppDispatch = useDispatch();
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  const { searchUserList } = useSelector(
    (state: RootState) => state.user.userList
  );
  // const [pageLimit] = useState(10);
  const [pageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<any>("");
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();

  const { totalProfitLossList } = useSelector(
    (state: RootState) => state.report.reportList
  );

  const handleClick = () => {
    try {
      let filter = "";
      dispatch(updateUserSearchId({search}))
      if (search?.id) {
        filter += `id=${search?.id}`;
      }
      if (startDate && endDate) {
        filter += `startDate=${moment(startDate)?.format("YYYY-MM-DD")}`;
        filter += `&endDate=${moment(endDate)?.format("YYYY-MM-DD")}`;
      } else if (startDate) {
        filter += `startDate=${moment(startDate)?.format("YYYY-MM-DD")}`;
      } else if (endDate) {
        filter += `endDate=${moment(endDate)?.format("YYYY-MM-DD")}`;
      }
      dispatch(getTotalProfitLoss({ filter: filter }));
      
    } catch (error) {
      console.error("Error:", (error as Error)?.message);
    }
  };

  const debouncedInputValue = useMemo(() => {
    return debounce((value) => {
      dispatch(
        getSearchClientList({
          userName: value,
          createdBy: profileDetail && profileDetail?.id,
        })
      );
    }, 500);
  }, []);

  useEffect(() => {
    try {
      if (!search?.id) {
        debouncedInputValue(search);
      }
    } catch (e) {
      console.log(e);
    }
  }, [search]);

  useEffect(() => {
    dispatch(getTotalProfitLoss({ filter: "" }));
  }, []);

  return (
    <div>
      <ProfitLossHeader
        title="Profit/Loss"
        onClick={handleClick}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        clientData={searchUserList && searchUserList?.users}
        setEndDate={setEndDate}
        setSearch={setSearch}
        search={search}
      />
      <Typography
        sx={{
          fontSize: "16px",
          color: "white",
          marginLeft: "1%",
          fontWeight: "600",
          marginY: "0.5%",
          alignSelf: "start",
        }}
      >
        Profit/Loss for Event Type
      </Typography>

      <Box>
        <ProfitLossTableComponent
          visible={true}
          startDate={startDate}
          endDate={endDate}
          eventData={totalProfitLossList && totalProfitLossList}
          currentPage={currentPage}
          pageCount={pageCount}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </div>
  );
};

export default ProfitLossReport;
