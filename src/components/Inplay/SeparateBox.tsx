import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { Lock } from "../../assets";

const SeparateBox = (props: any) => {
  const { color, empty, value, value2, lock } = props;

  const classes = {
    container: {
      background: color,
      border: color !== "white" ? "1px solid #2626264D" : "0px solid white",
      width: { xs: "24.5%", lg: "20%" },
      height: "94%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    emptylockWrapper: { alignItems: "center", justifyContent: "space-around" },
    value1: {
      fontSize: "13px",
      color: color === "white" ? "white" : "black",
      fontWeight: "700",
      textAlign: "center",
    },
    value2: {
      fontSize: "12px",
      marginTop: -0.4,
      color: color === "white" ? "white" : "black",
      textAlign: "center",
    },
    lockImage: { width: "10px", height: "15px" },
  };

  return (
    <Box sx={classes.container}>
      {!empty && !lock && (
        <Box sx={classes.emptylockWrapper}>
          <Typography sx={classes.value1}>{value}</Typography>
          <Typography sx={classes.value2}>{value2}</Typography>
        </Box>
      )}
      {lock && <img src={Lock} style={classes.lockImage} alt="Lock" />}
    </Box>
  );
};

export default memo(SeparateBox);
