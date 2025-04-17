import { Typography } from "@mui/material";
import { memo, useState } from "react";
import Pagination from "../../Common/Pagination";
import RowHeaderMatches from "./RowHeaderMatches";

const ProfitLossTableComponent = (props: any) => {
  const {
    eventData,
    currentPage,
    pageCount,
    setCurrentPage,
    startDate,
    endDate,
    setShow,
    show,
    userProfitLoss,
    getUserProfitLoss,
  } = props;

  const [eventType, setEvent] = useState("");
  const [selectedId, setSelectedId] = useState({
    type: "",
    id: "",
    betId: "",
    sessionBet: false,
  });

  const getHandleReport = (eventType: any) => {
    setEvent(eventType);
    if (show) {
      setSelectedId((prev) => ({
        ...prev,
        type: "",
        id: "",
        betId: "",
        sessionBet: false,
      }));
    }
    if (!show) {
      setSelectedId((prev) => ({
        ...prev,
        type: "",
        id: "",
        betId: "",
        sessionBet: false,
      }));
    }
    setShow(!show);
  };

  const getBetReport = (value: any) => {
    setSelectedId({
      type: value?.type,
      id: value?.matchId,
      betId: value?.betId,
      sessionBet: value?.sessionBet,
    });
  };

  return eventData?.length > 0 ? (
    <>
      {eventData?.map((item: any, index: any) => {
        return (
          <RowHeaderMatches
            key={index}
            item={item}
            show={show}
            startDate={startDate}
            endDate={endDate}
            getHandleReport={getHandleReport}
            selectedId={selectedId}
            getBetReport={getBetReport}
            userProfitLoss={userProfitLoss}
            getUserProfitLoss={getUserProfitLoss}
            eventType={eventType}
          />
        );
      })}

      {eventType && (
        <Pagination
          getListOfUser={() => {}}
          currentPage={currentPage}
          pages={pageCount}
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
