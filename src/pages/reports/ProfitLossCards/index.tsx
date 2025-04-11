import { Typography } from "@mui/material";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfitLossHeader from "../../../components/report/ProfitLossReportCard/ProfitLossHeader";
import ProfitLossTableComponent from "../../../components/report/ProfitLossReportCard/ProfitLossTableComponent";
import service from "../../../service";
import {
  getTotalProfitLossCard,
  updateUserSearchId,
} from "../../../store/actions/reports";
import { getSearchClientList } from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";

const ProfitLossReportCards = () => {
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() - 10);
  const dispatch: AppDispatch = useDispatch();
  const [pageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<any>("");
  const [startDate, setStartDate] = useState<any>(defaultDate);
  const [endDate, setEndDate] = useState<any>();
  const [show, setShow] = useState(false);
  const [userProfitLoss, setUserProfitLoss] = useState([]);

  const { user } = useSelector((state: RootState) => state.report.reportList);
  const { totalProfitLossListCard } = useSelector(
    (state: RootState) => state.report.cardReport
  );

  const { searchUserList } = useSelector(
    (state: RootState) => state.user.userList
  );

  const handleClick = () => {
    try {
      setShow(false);
      let filter = "";
      dispatch(updateUserSearchId({ search }));
      if (search?.id) {
        filter += `id=${search?.id}`;
      }
      if (startDate && endDate) {
        filter += `&startDate=${moment(startDate)?.format("YYYY-MM-DD")}`;
        filter += `&endDate=${moment(endDate)?.format("YYYY-MM-DD")}`;
      } else if (startDate) {
        filter += `&startDate=${moment(startDate)?.format("YYYY-MM-DD")}`;
      } else if (endDate) {
        filter += `&endDate=${moment(endDate)?.format("YYYY-MM-DD")}`;
      }
      dispatch(getTotalProfitLossCard({ filter: filter }));
    } catch (error) {
      console.error("Error:", (error as Error)?.message);
    }
  };

  const debouncedInputValue = useMemo(() => {
    return debounce((value) => {
      dispatch(
        getSearchClientList({
          userName: value,
        })
      );
    }, 500);
  }, []);

  const getUserProfitLoss = async (matchId: string) => {
    try {
      const { data } = await service.get(
        `/user/userwise/profitLoss?runnerId=${matchId}${
          user?.id ? "&id=" + user?.id : ""
        }${user?.domain ? "&url=" + user?.domain : ""}`
      );
      if (data) {
        setUserProfitLoss(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

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
    let filter = "";
    dispatch(updateUserSearchId({ search }));
    if (search?.id) {
      filter += `&id=${search?.id}`;
    }
    if (startDate && endDate) {
      filter += `&startDate=${moment(startDate)?.format("YYYY-MM-DD")}`;
      filter += `&endDate=${moment(endDate)?.format("YYYY-MM-DD")}`;
    } else if (startDate) {
      filter += `&startDate=${moment(startDate)?.format("YYYY-MM-DD")}`;
    } else if (endDate) {
      filter += `&endDate=${moment(endDate)?.format("YYYY-MM-DD")}`;
    }
    dispatch(getTotalProfitLossCard({ filter: filter }));
  }, []);

  return (
    <>
      <ProfitLossHeader
        title="Profit/Loss Cards"
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
      <ProfitLossTableComponent
        show={show}
        setShow={setShow}
        startDate={startDate}
        endDate={endDate}
        eventData={totalProfitLossListCard && totalProfitLossListCard}
        currentPage={currentPage}
        pageCount={pageCount}
        setCurrentPage={setCurrentPage}
        userProfitLoss={userProfitLoss}
        getUserProfitLoss={getUserProfitLoss}
      />
    </>
  );
};

export default ProfitLossReportCards;
