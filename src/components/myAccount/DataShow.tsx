import { Box, Typography } from "@mui/material";
import { DataShowInterface } from "../../interface/myAccount";
import { handleNumber } from "../../helper";

const DataShow = (props: DataShowInterface) => {
  const { title, value, value2, value3, containerStyle, valueContainerStyle } =
    props;
  return (
    <Box
      sx={[
        {
          display: "flex",
          height: "38px",
          backgroundColor: "white",
          alignItems: "center",
          border: "2px solid white",
        },
        containerStyle,
      ]}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          paddingLeft: "10px",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {title}
        </Typography>
      </Box>
      <Box
        sx={[
          {
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "35px",
            background: "#0B4F26",
          },
          valueContainerStyle,
        ]}
      >
        <Typography
          sx={{ color: "white", fontSize: "12px", fontWeight: "600" }}
        >
          {handleNumber(parseFloat(value), 'white')}
        </Typography>
      </Box>
    </Box>
  );
};

export default DataShow;
