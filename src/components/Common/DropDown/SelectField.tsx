import { Box, Typography } from "@mui/material";
import Select from "react-select";

const SelectField = ({
  label,
  containerStyle,
  titleStyle,
  touched,
  error,
  styles,
  ...props
}: any) => {
  const mergedStyles = {
    container: (provided: any) => ({
      ...provided,

      ...styles?.container, 
    }),
    control: (provided: any) => ({
      ...provided,
      ...styles?.control, 
    }),
    menu: (provided: any) => ({
      ...provided,
      ...styles?.menu,
    }),
    input: (provided: any) => ({
      ...provided,
      ...styles?.input,
    }),
  };

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
      <Select styles={mergedStyles}  {...props} />
      {touched && error ? <div style={{ color: "red" }}>{error}</div> : null}
    </Box>
  );
};

export default SelectField;
