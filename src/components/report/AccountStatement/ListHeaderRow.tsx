import { Box } from "@mui/material";
import { memo } from "react";
import { ApiConstants } from "../../../utils/Constants";
import NumberDropDown from "../../Common/DropDown/ReportDropdown/NumberDropDown";
import SearchInput from "../../Common/SearchInput";

interface ListHeaderRowProps {
  searchFor: string;
  pageLimit: number;
  setPageLimit: (val: number) => void;
  setCurrentPage: (val: number) => void;
  fromDate: any;
  toDate: any;
  setSearchValue: (val: string) => void;
}

const ListHeaderRow = ({
  searchFor,
  pageLimit,
  setPageLimit,
  setCurrentPage,
  fromDate,
  toDate,
  setSearchValue,
}: ListHeaderRowProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        px: "10px",
        gap: 1,
        py: "6px",
      }}
    >
      <NumberDropDown
        setPageLimit={setPageLimit}
        pageLimit={pageLimit}
        textColor="#000"
        setCurrentPage={setCurrentPage}
      />
      <SearchInput
        show={true}
        fromDate={fromDate}
        toDate={toDate}
        searchFor={searchFor}
        endpoint={ApiConstants.USER.LIST}
        pageLimit={pageLimit}
        onChange={setSearchValue}
        setCurrentPage={setCurrentPage}
        width="100%"
        placeholder="Search..."
        inputContainerStyle={{
          width: { xs: "50vw", lg: "17vw" },
          marginLeft: "auto",
        }}
      />
    </Box>
  );
};

export default memo(ListHeaderRow);
