import { Box } from "@mui/material";
import RowHeaderMatches from "./RowHeaderMatches";
import Pagination from "../../Common/Pagination";

const ProfitLossTableComponent = (props: any) => {
  const {
    eventData,
    handleReport,
    currentPage,
    pageCount,
    setCurrentPage,
    visible,
    getUserProfitLoss
  } = props;
  return (
    <Box>
      {eventData.map((item: any, index: any) => {
        return (
          <>
            <RowHeaderMatches
              key={index}
              item={item}
              index={index}
              // getHandleReport={getHandleReport}
              show={visible}
              setCurrentPage={setCurrentPage}
              // setSelectedEventType={setSelectedEventType}
              getUserProfitLoss={getUserProfitLoss}
              // selectedEventType={selectedEventType}
            />
            <Box>
              {/* {visible &&
                selectedEventType === item?.eventType &&
                reportData.map((item: any, index: any) => {
                  return (
                    <RowComponentMatches
                      // key={index}
                      // item={item}
                      // index={index + 1}
                      // selectedId={selectedId}
                      // betData={betData}
                      // sessionBetData={sessionBetData}
                      // sessionBets={sessionBets}
                      // getBetReport={getBetReport}
                      getUserProfitLoss={getUserProfitLoss}
                      // user={user}
                      // userProfitLoss={userProfitLoss}
                    />
                  );
                })} */}
            </Box>
          </>
        );
      })}
      {visible && (
        <Pagination
          getListOfUser={(event: any) => handleReport(event)}
          currentPage={currentPage}
          pages={pageCount}
          setCurrentPage={() => {}}
        />
      )}
    </Box>
  );
};

export default ProfitLossTableComponent;
