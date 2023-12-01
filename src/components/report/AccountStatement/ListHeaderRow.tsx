import { Box, Typography } from "@mui/material";
import SmallDropDown from "./SmallDropDown";
import SearchInput from "../../Common/SearchInput";

const ListHeaderRow = (props: any) => {
  const { getLimitEntries, getAccountStatement } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "row",
          lg: "row",
          md: "row",
        },
        justifyContent: "space-between",
        px: "10px",
        gap: 1,
        py: "6px",
      }}
    >
      <Box display={"flex"} alignItems="center" sx={{ width: "100%" }}>
        <Typography sx={{ fontSize: "10px", color: "#000", fontWeight: "500" }}>
          Show
        </Typography>
        <SmallDropDown getLimitEntries={getLimitEntries} />
        <Typography sx={{ fontSize: "10px", color: "#000", fontWeight: "500" }}>
          Entries
        </Typography>
      </Box>
      <SearchInput
        show={true}
        getListOfUser={getAccountStatement}
        width={"100%"}
        placeholder={"Search..."}
        inputContainerStyle={{
          width: { xs: "50vw", lg: "17vw" },
          marginLeft: "auto",
        }}
      />
    </Box>
  );
};

export default ListHeaderRow;
