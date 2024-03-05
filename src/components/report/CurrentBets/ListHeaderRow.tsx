import { Box } from "@mui/material";
import SearchInput from "../../Common/SearchInput";
import NumberDropDown from "../../Common/DropDown/ReportDropdown/NumberDropDown";
// import { ApiConstants } from "../../../utils/Constants";

const ListHeaderRow = ({ getLimitEntries, setPageLimit, pageLimit, setCurrentPage, searchFor, fromDate, toDate, setSearchValue }: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "row",
          lg: "row",
          md: "row",
          background: "#F8C851",
          borderRadius: "10px 10px 0 0",
        },
        justifyContent: "space-between",
        px: "10px",
        gap: 1,
        py: "6px",
      }}
    >
      <NumberDropDown
        getLimitEntries={getLimitEntries}
        textColor={"000"}
        setPageLimit={setPageLimit}
        pageLimit={pageLimit}
        setCurrentPage={setCurrentPage}
      />
      <SearchInput
        show={true}
        width={"100%"}
        searchFor={"currentBets"}
        placeholder={"Search..."}
        fromDate={fromDate}
        toDate={toDate}
        pageLimit={pageLimit}
        onChange={setSearchValue}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};

export default ListHeaderRow;
