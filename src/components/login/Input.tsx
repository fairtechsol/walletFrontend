import {
  Box,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { numberInputOnWheelPreventChange } from "../../helper";
import { InputInterface } from "../../interface/common";

const Input: React.FC<InputInterface> = ({
  id,
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
  disabled,
  autoFocus,
  img,
  img1,
  imgstyle,
  onBlur,
  error,
  onChange,
  name,
  max,
  min,
  fullWidth,
}: any) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [showPass, setShowPass] = useState(false);

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
        <TextField
          id={id}
          autoFocus={autoFocus}
          variant="standard"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={type === "password" && showPass === true ? "text" : type}
          required={required}
          name={name}
          onBlur={onBlur}
          onWheel={numberInputOnWheelPreventChange}
          error={error}
          fullWidth={fullWidth}
          InputProps={{
            autoComplete: "new-password",
            inputProps: {
              min: min ? min : type === "number" ? 0 : undefined,
              max: max ?? undefined,
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
        {img && (
          <img
            src={showPass ? img : img1}
            onClick={() => setShowPass(!showPass)}
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
