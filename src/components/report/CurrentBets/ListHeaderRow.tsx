import { Box } from "@mui/material";
import { memo } from "react";
import NumberDropDown from "../../Common/DropDown/ReportDropdown/NumberDropDown";
import SearchInput from "../../Common/SearchInput";

interface ListHeaderRowProps {
  setPageLimit: (value: number) => void;
  pageLimit: number;
  setCurrentPage: (value: number) => void;
}

const ListHeaderRow = ({
  setPageLimit,
  pageLimit,
  setCurrentPage,
}: ListHeaderRowProps) => {
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
        textColor="#000"
        setPageLimit={setPageLimit}
        pageLimit={pageLimit}
        setCurrentPage={setCurrentPage}
      />
      <SearchInput
        show={true}
        width="100%"
        searchFor="currentBets"
        placeholder="Search..."
        pageLimit={pageLimit}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};

export default memo(ListHeaderRow);
