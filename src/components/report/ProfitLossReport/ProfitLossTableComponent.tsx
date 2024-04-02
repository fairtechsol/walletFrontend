import { Box, Typography } from "@mui/material";
import RowHeaderMatches from "./RowHeaderMatches";
import Pagination from "../../Common/Pagination";
import { useState } from "react";
import RowComponentMatches from "./RowComponentMatches";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";

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
  const { domainProfitLossList } = useSelector(
    (state: RootState) => state.report.reportList
  );

  const [_, setEvent] = useState("");
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
    <Box>
      {eventData?.map((item: any, index: any) => {
        return (
          <>
            <RowHeaderMatches
              key={index}
              item={item}
              show={show}
              startDate={startDate}
              endDate={endDate}
              getHandleReport={getHandleReport}
            />
          </>
        );
      })}
      <Box>
        {show &&
          domainProfitLossList?.map((item: any, index: number) => {
            return (
              <RowComponentMatches
                key={index}
                item={item}
                index={index + 1}
                selectedId={selectedId}
                getBetReport={getBetReport}
                userProfitLoss={userProfitLoss}
                getUserProfitLoss={getUserProfitLoss}
              />
            );
          })}
      </Box>
      {show && (
        <Pagination
          getListOfUser={() => {}}
          currentPage={currentPage}
          pages={pageCount}
          setCurrentPage={setCurrentPage}
        />
      )}
    </Box>
  ) : (
    <Box>
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
    </Box>
  );
};

export default ProfitLossTableComponent;
