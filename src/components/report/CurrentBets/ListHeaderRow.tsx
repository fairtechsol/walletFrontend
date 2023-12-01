import { Box, Typography } from "@mui/material";
import SmallDropDown from "../AccountStatement/SmallDropDown";
import SearchInput from "../../Common/SearchInput";

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
      <Box display={"flex"} alignItems="center" sx={{ width: "100%" }}>
        <Typography
          sx={{ fontSize: "10px", color: "#000", fontWeight: "500" }}
        >
          Show
        </Typography>
        <SmallDropDown getLimitEntries={getLimitEntries} />
        <Typography
          sx={{ fontSize: "10px", color: "#000", fontWeight: "500" }}
        >
          Entries
        </Typography>
      </Box>
      <SearchInput show={true} width={"100%"} placeholder={"Search..."} />
    </Box>
  );
};

export default ListHeaderRow;
