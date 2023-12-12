import { Box, Typography } from "@mui/material";
import Select from "react-select";

const SelectField = ({
  label,
  containerStyle,
  titleStyle,
  touched,
  error,
  ...props
}: any) => {
  return (
    <Box sx={[{}, containerStyle]}>
      <Typography
        sx={[
          {
            marginLeft: "10px",
            fontSize: { lg: "10px", xs: "12px" },
            fontWeight: "500",
          },
          titleStyle,
        ]}
      >
        {label}
      </Typography>

      {/* <InputLabel sx={[{}, titleStyle]} htmlFor={props.name}>
        {label}
      </Label> */}
      <Select {...props} />
      {touched && error ? <div style={{ color: "red" }}>{error}</div> : null}
    </Box>
  );
};

export default SelectField;
