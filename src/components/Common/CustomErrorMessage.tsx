import { Typography } from "@mui/material";
interface props {
  touched?: any;
  errors: any;
  style?: React.CSSProperties;
}

const CustomErrorMessage = ({ touched, errors, style }: props) => {
  const inlineStyle: React.CSSProperties = {
    ...style,
  };
  return (
    <>
      {touched && errors && (
        <Typography
          sx={{
            color: "#fa1e1e",
            position: "absolute",
            fontSize: "12px",
            wordBreak: "break-all",
          }}
          style={{ ...inlineStyle }}
        >
          {errors}
        </Typography>
      )}
    </>
  );
};

export default CustomErrorMessage;
