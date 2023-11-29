import { useState } from "react";
import { Box, Typography } from "@mui/material";
import MaterialUISwitch from "./MaterialUISwitch";

const BoxButtonWithSwitch = (props: any) => {
  const { title, val, setLockUnlockObj, lockUnlockObj } = props;
  const [checked, setChecked] = useState(false);
  const classes = {
    mainBox: [
      {
        background: !val ? "#0B4F26" : "#E32A2A",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        height: "45px",
        alignItems: "center",
        borderRadius: "5px",
      },
    ],
    mainBoxTypography: [
      {
        fontSize: { xs: "3vw", lg: "0.7vw", md: "0.7vw" },
        fontWeight: "600",
        textAlign: "right",
        color: "white",
        marginRight: "10px",
        minWidth: "80px",
      },
    ],
  };
  return (
    <Box sx={classes.mainBox}>
      <MaterialUISwitch
        checked={!val}
        onChange={() => {
          if (title === "User") {
            setLockUnlockObj({
              ...lockUnlockObj,
              all_blocked: !val === true ? 1 : 0,
            });
          } else {
            setLockUnlockObj({
              ...lockUnlockObj,
              bet_blocked: !val === true ? 1 : 0,
            });
          }
          setChecked(!checked);
        }}
      />
      <Typography sx={classes.mainBoxTypography}>
        {title} {!val ? "Unlocked" : "Locked"}
      </Typography>
    </Box>
  );
};

export default BoxButtonWithSwitch;
