import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const Input = (props: any) => {
  const {
    title,
    value,
    containerStyle,
    required,
    placeholder,
    titleStyle,
    inputStyle,
    inputContainerStyle,
    inputProps,
    type,
    autoMaticFillValue,
    disabled,
    autoFocus,
    img,
    img1,
    imgstyle,
  } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [showPass, setShowPass] = useState(true);

  return (
    <Box sx={[{}, containerStyle]}>
      <Typography
        sx={[
          {
            marginLeft: "10px",
            fontSize: { lg: "10px", xs: "12px" },
            fontWeight: "500",
            color: "white",
          },
          titleStyle,
        ]}
      >
        {title}
      </Typography>
      <Box
        sx={[
          {
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            height: { lg: "45px", xs: "45px", md: "45px" },
            overflow: "hidden",
            paddingX: "10px",
            marginTop: "1px",
            borderRadius: "10px",
          },
          inputContainerStyle,
        ]}
      >
        {autoMaticFillValue ? (
          <TextField
            variant="standard"
            placeholder={placeholder}
            value={autoMaticFillValue}
            required={required}
            InputProps={{
              disableUnderline: true,
              justifyContent: "center",
              ...inputProps,
              placeholder: placeholder,
              type: "text",
              sx: [{ fontSize: { lg: "12px", xs: "14px" } }, inputStyle],
            }}
            sx={{
              borderColor: "white",
              display: "flex",

              flex: 1,
              fontSize: { lg: "1px", xs: "5px" },
            }}
            disabled
          />
        ) : (
          <TextField
            autoFocus={autoFocus}
            variant="standard"
            placeholder={placeholder}
            value={value}
            type="text"
            // onKeyDown={onKeyDown}
            required={required}
            InputProps={{
              autoComplete: "new-password",
              inputProps: {
                type: !showPass ? "text" : "password",
                min: type === "Number" ? "0" : undefined,
              },
              disabled: disabled,
              placeholder: placeholder,
              disableUnderline: true,
              ...inputProps,

              sx: [{ fontSize: { lg: "12px", xs: "14px" } }, inputStyle],
            }}
            sx={{
              borderColor: "white",
              display: "flex",
              flex: 1,
              fontSize: { lg: "1px", xs: "5px" },
            }}
          />
        )}
        {img && (
          <img
            src={showPass ? img : img1}
            onClick={() => {
              setShowPass(!showPass);
            }}
            alt="side input"
            style={{
              height: matches ? "0.5em" : "0.6rem",
              width: "auto",
              marginRight: ".5em",
              ...imgstyle,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Input;
