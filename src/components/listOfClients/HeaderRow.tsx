import { Excel, Pdf } from "../../assets";
import SearchInput from "../Common/SearchInput";
import StyledImage from "../Common/StyledImages";
import { Box } from "@mui/material";

const HeaderRow = (props: any) => {
  const { handleExport } = props;
  return (
    <Box
      display={"flex"}
      sx={{
        justifyContent: "space-between",
        px: "10px",
        py: "3px",
        gap: 2,
        background: "#F8C851",
      }}
    >
      <Box display={"flex"} alignItems="center">
        <Box
          sx={{
            background: "white",
            height: "32px",
            borderRadius: "5px",
            width: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledImage
            src={Excel}
            sx={{ height: "25px" }}
            onClick={() => handleExport("xlsx")}
          />
        </Box>
        <Box
          sx={{
            background: "white",
            marginLeft: "10px",
            height: "32px",
            borderRadius: "5px",
            width: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledImage
            src={Pdf}
            sx={{ height: "25px" }}
            onClick={() => handleExport("pdf")}
          />
        </Box>
      </Box>
      <SearchInput
        placeholder={"Search User..."}
        show={true}
        // setPageCount={setPageCount}
        // getListOfUser={getListOfUser}
      />
    </Box>
  );
};

export default HeaderRow;
