import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Excel, Pdf } from "../../assets";
import { handleExport } from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import { ApiConstants } from "../../utils/Constants";
import SearchInput from "../Common/SearchInput";
import StyledImage from "../Common/StyledImages";

interface HeaderRowProps {
  endpoint: string;
  searchFor: string;
  downloadPdfExcel: boolean;
  setCurrentPage: (val: number) => void;
}

const HeaderRow = ({
  endpoint,
  searchFor,
  downloadPdfExcel,
  setCurrentPage,
}: HeaderRowProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  return (
    <Box
      display="flex"
      sx={{
        justifyContent: "space-between",
        px: "10px",
        py: "3px",
        gap: 2,
        background: "#F8C851",
      }}
    >
      <Box display={"flex"} alignItems="center">
        {downloadPdfExcel && (
          <>
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
                onClick={() =>
                  dispatch(
                    handleExport({
                      endPoint: endpoint,
                      type: "excel",
                      name: profileDetail?.userName,
                    })
                  )
                }
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
                onClick={() =>
                  dispatch(
                    handleExport({
                      endPoint: endpoint,
                      type: "pdf",
                      name: profileDetail?.userName,
                    })
                  )
                }
              />
            </Box>
          </>
        )}
      </Box>
      <SearchInput
        placeholder="Search User..."
        show={true}
        searchFor={searchFor}
        endpoint={ApiConstants.USER.LIST}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};

export default HeaderRow;
