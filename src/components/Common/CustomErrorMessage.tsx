import { Typography } from "@mui/material";

const CustomErrorMessage = (props: any) => {
    return (
      <>
      {props?.touched && props?.errors && (
          <Typography sx={{ 
            color: "#fa1e1e", 
            position: "absolute" ,
            fontSize: "12px"
          }}>
            {props?.errors as string}
          </Typography>
        )}
      </>
    );
  };
  
  export default CustomErrorMessage;
  