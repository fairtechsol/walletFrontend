import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { Excel, Pdf } from "../../assets";
import { handleExport } from "../../store/actions/user/userAction";
import { AppDispatch } from "../../store/store";
import SearchInput from "../Common/SearchInput";
import StyledImage from "../Common/StyledImages";

const HeaderExpertRow = ({ endpoint }: any) => {
  const dispatch: AppDispatch = useDispatch();
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
            onClick={() => dispatch(handleExport("excel"))}
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
            onClick={() => dispatch(handleExport("pdf"))}
          />
        </Box>
      </Box>
      <SearchInput
        placeholder={"Search User..."}
        show={true}
        endpoint={endpoint}
      />
    </Box>
  );
};

export default HeaderExpertRow;
