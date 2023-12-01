import { Box, Typography } from "@mui/material";
import SmallDropDown from "../AccountStatement/SmallDropDown";
import SearchInput from "../../Common/SearchInput";
import NumberDropDown from "../../Common/DropDown/ReportDropdown/NumberDropDown";

const ListHeaderRow = ({ getLimitEntries }: any) => {
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
      <NumberDropDown getLimitEntries={getLimitEntries} textColor={"000"}/>
      <SearchInput show={true} width={"100%"} placeholder={"Search..."} />
    </Box>
  );
};

export default ListHeaderRow;
