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
        <Box sx={{ alignItems: "center", justifyContent: "space-around" }}>
          <Typography
            sx={{
              fontSize: "12px",
              color: "white",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            {handleNumber(parseFloat(value), "white")}{" "}
            {value3 ? `(${value3}%)` : value3 === 0 ? "(0%)" : null}
          </Typography>

          {value2 ? (
            <Typography
              sx={{
                fontSize: { lg: "11px", xs: "10px" },
                marginTop: -0.4,
                color: "white",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {handleNumber(parseFloat(value2), "white")}
            </Typography>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default DataShow;
