import { Typography } from "@mui/material";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Constants } from "../../../utils/Constants";
import Pagination from "../../Common/Pagination";
import RowHeaderMatches from "./RowHeaderMatches";

interface ProfitLossTableComponentProps {
  eventData: any;
  currentPage: number;
  setCurrentPage: any;
  startDate: any;
  endDate: any;
  userProfitLoss: any;
  getUserProfitLoss: (val: string) => void;
  setEvent: (val: string) => void;
  event: string;
}

const ProfitLossTableComponent = ({
  eventData,
  currentPage,
  setCurrentPage,
  startDate,
  endDate,
  userProfitLoss,
  getUserProfitLoss,
  setEvent,
  event,
}: ProfitLossTableComponentProps) => {
  const { domainProfitLossList } = useSelector(
    (state: RootState) => state.report.reportList
  );

  const [selectedId, setSelectedId] = useState({
    type: "",
    id: "",
    betId: "",
    sessionBet: false,
  });

  const getHandleReport = (eventType: any) => {
    if (event === eventType) {
      setSelectedId((prev) => ({
        ...prev,
        type: "",
        id: "",
        betId: "",
        sessionBet: false,
      }));
    }
    if (event !== eventType) {
      setCurrentPage(1);
      setSelectedId((prev) => ({
        ...prev,
        type: "",
        id: "",
        betId: "",
        sessionBet: false,
      }));
      setEvent(eventType);
    }
  };

  const getBetReport = (value: any) => {
    setSelectedId({
      type: value?.type,
      id: value?.matchId,
      betId: value?.betId,
      sessionBet: value?.sessionBet,
    });
  };
  const totalPages = Math.ceil(
    domainProfitLossList?.length / Constants.pageLimit
  );

  const paginatedData = domainProfitLossList?.slice(
    (currentPage - 1) * Constants.pageLimit,
    currentPage * Constants.pageLimit
  );

  return eventData?.length > 0 ? (
    <>
      {eventData?.map((item: any, index: any) => {
        return (
          <RowHeaderMatches
            key={index}
            item={item}
            startDate={startDate}
            endDate={endDate}
            getHandleReport={getHandleReport}
            selectedId={selectedId}
            getBetReport={getBetReport}
            userProfitLoss={userProfitLoss}
            getUserProfitLoss={getUserProfitLoss}
            eventType={event}
            paginatedData={paginatedData}
            currentPage={currentPage}
          />
        );
      })}

      {event && (
        <Pagination
          currentPage={currentPage}
          pages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  ) : (
    <Typography
      sx={{
        color: "#fff",
        textAlign: "center",
        fontSize: { lg: "16px", xs: "10px" },
        fontWeight: "600",
        margin: "1rem",
      }}
    >
      No Matching Records Found
    </Typography>
  );
};

export default memo(ProfitLossTableComponent);
