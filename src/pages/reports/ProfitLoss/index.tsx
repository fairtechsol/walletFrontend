import { Typography } from "@mui/material";
import { debounce } from "lodash";
import moment from "moment";
import { memo, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfitLossHeader from "../../../components/report/ProfitLossReport/ProfitLossHeader";
import ProfitLossTableComponent from "../../../components/report/ProfitLossReport/ProfitLossTableComponent";
import service from "../../../service";
import {
  getTotalProfitLoss,
  updateUserSearchId,
} from "../../../store/actions/reports";
import { getSearchClientList } from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";

const ProfitLossReport = () => {
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() - 10);
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [event, setEvent] = useState("");
  const [search, setSearch] = useState<any>("");
  const [startDate, setStartDate] = useState<any>(defaultDate);
  const [endDate, setEndDate] = useState<any>();
  const [userProfitLoss, setUserProfitLoss] = useState([]);

  const { totalProfitLossList, user } = useSelector(
    (state: RootState) => state.report.reportList
  );

  const { searchUserList } = useSelector(
    (state: RootState) => state.user.userList
  );

  const handleClick = () => {
    try {
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
        })
      );
    }, 500);
  }, []);

  const getUserProfitLoss = async (matchId: string) => {
    try {
      setUserProfitLoss([]);
      let params: any = {
        matchId,
      };
      if (user?.id) {
        params["id"] = user?.id;
      }
      if (user?.domain) {
        params["url"] = user?.domain;
      }
      const { data } = await service.get("/user/userwise/profitLoss", {
        params,
      });
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
    if (startDate && endDate) {
      filter += `&startDate=${moment(startDate)?.format("YYYY-MM-DD")}`;
      filter += `&endDate=${moment(endDate)?.format("YYYY-MM-DD")}`;
    } else if (startDate) {
      filter += `&startDate=${moment(startDate)?.format("YYYY-MM-DD")}`;
    } else if (endDate) {
      filter += `&endDate=${moment(endDate)?.format("YYYY-MM-DD")}`;
    }
    dispatch(getTotalProfitLoss({ filter: filter }));
  }, []);

  return (
    <>
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
      <ProfitLossTableComponent
        startDate={startDate}
        endDate={endDate}
        eventData={totalProfitLossList && totalProfitLossList}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        userProfitLoss={userProfitLoss}
        getUserProfitLoss={getUserProfitLoss}
        setEvent={setEvent}
        event={event}
      />
    </>
  );
};

export default memo(ProfitLossReport);
