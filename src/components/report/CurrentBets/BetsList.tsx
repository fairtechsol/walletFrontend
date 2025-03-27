import { Box } from "@mui/material";
import { useState } from "react";
import Pagination from "../../Common/Pagination";
import EmptyRow from "./EmptyRow";
import ListHeaderRow from "./ListHeaderRow";
import TableDataRow from "./TableDataRow";
import TableHeaderList from "./TableHeaderList";

const BetsList = ({ getLimitEntries, betHistory }: any) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(15);

  function paginate(array: any, pageNumber: number, pageSize: number) {
    --pageNumber;
    const startIndex = pageNumber * pageSize;
    const endIndex = startIndex + pageSize;
    return array?.slice(startIndex, endIndex);
  }

  const sortedBetHistory = betHistory
    ?.slice()
    ?.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const currentPageData = paginate(sortedBetHistory, currentPage, pageLimit);

  return (
    <Box
      sx={[
        {
          marginX: "0.5%",
          minHeight: "200px",
          borderTopRightRadius: {
            xs: "10px",
            lg: "0px",
            md: "10px",
          },
          position: "relative",
          borderRadius: {
            xs: "10px 10px 0 0",
            lg: "10px 10px 0 0",
            md: "10px 10px 0 0",
          },
          backgroundColor: "white",
          border: "2px solid white",
        },
      ]}
    >
      <ListHeaderRow
        getLimitEntries={getLimitEntries}
        setPageLimit={setPageLimit}
        pageLimit={pageLimit}
        setCurrentPage={setCurrentPage}
      />

      <Box sx={{ overflowX: "scroll", width: "auto" }}>
        <TableHeaderList />

        {currentPageData &&
          currentPageData?.map((item: any, index: any) => {
            return (
              <TableDataRow
                key={item?.id}
                data={item}
                index={index}
                containerStyle={{ background: "#FFE094" }}
                profit={true}
                fContainerStyle={{ background: "#0B4F26" }}
                fTextStyle={{ color: "white" }}
                currentPage={currentPage}
                pageLimit={pageLimit}
              />
            );
          })}
        {(!betHistory || betHistory.length === 0) && (
          <EmptyRow containerStyle={{ background: "#FFE094" }} />
        )}
      </Box>

      <Box
        sx={{
          width: "100%",
          position: "absolute",
        }}
      >
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={Math.ceil(
            parseInt(
              betHistory && betHistory?.length ? betHistory?.length : 1
            ) / pageLimit
          )}
        />
      </Box>
    </Box>
  );
};

export default BetsList;
