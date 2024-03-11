import { Box, Typography } from "@mui/material";
import RowHeaderMatches from "./RowHeaderMatches";
import Pagination from "../../Common/Pagination";
import { useState } from "react";

const ProfitLossTableComponent = (props: any) => {
  const {
    eventData,
    currentPage,
    pageCount,
    setCurrentPage,
    visible,
    startDate,
    endDate,
  } = props;

  const [selectedId, setSelectedId] = useState({
    domainId: "",
    type: "",
    id: "",
    betId: "",
    sessionBet: false,
  });

  return (
    eventData?.length > 0 ?
      <Box>
        {eventData?.map((item: any, index: any) => {
          return (
            <>
              <RowHeaderMatches
                key={index}
                item={item}
                show={visible}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                setCurrentPage={setCurrentPage}
                startDate={startDate}
                endDate={endDate}
              />
            </>
          );
        })}
        {visible && (
          <Pagination
            getListOfUser={() => { }}
            currentPage={currentPage}
            pages={pageCount}
            setCurrentPage={setCurrentPage}
          />
        )}
      </Box> :
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
