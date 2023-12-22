import { TextField, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import StyledImage from "./StyledImages";
import { SEARCH, Search } from "../../assets";
import { debounce } from "lodash";
import { getUserList } from "../../store/actions/user/userAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { ApiConstants } from "../../utils/Constants";

const SearchInput = (props: any) => {
  const {
    placeholder,
    inputContainerStyle,
    showTextInput,
    header,
    setShowSearch,
    show,
    width,
    searchContainerStyle,
    onChange,
  } = props;

  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();

  const handleInputChange = debounce(async (event: any) => {
    const value = event.target.value;
    if (onChange && typeof onChange === "function") {
      onChange(value);
    }
    try {
      dispatch(
        getUserList({
          userName: value,
          currentPage: 1,
          url: { endpoint: ApiConstants.USER.LIST },
        })
      );
    } catch (e) {
      console.log(e);
    }
  }, 500);

  return (
    <>
      <Box
        onClick={setShowSearch}
        sx={[
          {
            backgroundColor: {
              xs: showTextInput || show ? "white" : "transparent",
              lg: "white",
            },
            minWidth: {
              lg: header ? "10vw" : "17vw",
              xs: "10vw",
            },
            width: {
              xs: width ? width : "36%",
              lg: "17vw",
              md: "17vw",
            },
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            boxShadow: "0px 3px 10px #B7B7B726",
            height: { lg: "35px", xs: "35px" },
            overflow: "hidden",
            paddingX: "5px",
            borderRadius: "35px",
          },
          inputContainerStyle,
        ]}
      >
        {(!matchesMobile || show) && (
          <TextField
            variant="standard"
            placeholder={placeholder}
            onChange={handleInputChange}
            InputProps={{
              disableUnderline: true,
              autoComplete: "new-password",
              style: {
                fontSize: "12px",
                fontWeight: "600",
                fontStyle: "italic",
                color: "black",
              },
            }}
            sx={{
              borderColor: "white",
              display: "flex",
              flex: 1,
              marginLeft: "5px",
              fontSize: { lg: "10px", xs: "8px" },
            }}
          />
        )}
        {showTextInput && (
          <TextField
            variant="standard"
            placeholder={placeholder}
            onChange={handleInputChange}
            InputProps={{
              disableUnderline: true,
              autoComplete: "new-password",

              style: {
                fontSize: "12px",
                fontWeight: "600",
                fontStyle: "italic",
              },
            }}
            sx={{
              borderColor: "white",
              display: "flex",
              flex: 1,
              marginLeft: "5px",
              fontSize: { lg: "10px", xs: "8px" },
            }}
          />
        )}
        <Box
          sx={[
            {
              height: "30px",
              width: "30px",
              borderRadius: "20px",
              border: "1px solid white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "primary.main",
              marginRight: -0.3,
              cursor: "pointer",
            },
            searchContainerStyle,
          ]}
        >
          <StyledImage
            src={header ? SEARCH : Search}
            sx={{ height: "40%", width: "auto" }}
          />
        </Box>
      </Box>
    </>
  );
};

export default SearchInput;
