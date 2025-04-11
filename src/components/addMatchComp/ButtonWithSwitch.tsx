import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MaterialUISwitch from "../Common/MaterialUISwitch";

interface ButtonWithSwitchProps {
  title: string;
  val: boolean;
  name: string;
  setLockUnlockObj: (val: any) => void;
  lockUnlockObj: any;
  showLockUnlock?: boolean;
}

const ButtonWithSwitch = ({
  title,
  val,
  name,
  setLockUnlockObj,
  lockUnlockObj,
  showLockUnlock,
}: ButtonWithSwitchProps) => {
  const [checked, setChecked] = useState(val);
  const classes = {
    mainBox: [
      {
        background: checked ? "#0B4F26" : "#E32A2A",
        display: "flex",
        flex: 1,
        justifyContent: "start",
        height: "45px",
        alignItems: "center",
        borderRadius: "5px",
      },
    ],
    mainBoxTypography: [
      {
        fontSize: { xs: "2vw", lg: "0.9vw", md: "0.7vw" },
        fontWeight: "600",
        textAlign: "start",
        color: "white",
        marginRight: "10px",
        minWidth: { lg: "80px", xs: "0px", md: "0px" },
        lineHeight: "1",
      },
    ],
  };

  useEffect(() => {
    setChecked(val);
  }, [val]);
  return (
    <Box sx={classes.mainBox}>
      <MaterialUISwitch
        checked={checked}
        onChange={() => {
          setLockUnlockObj({
            ...lockUnlockObj,
            [name]: !val,
          });
          setChecked(!checked);
        }}
      />
      <Typography sx={classes.mainBoxTypography}>
        {title} {showLockUnlock && (val ? "Unlocked" : "Locked")}
      </Typography>
    </Box>
  );
};

export default ButtonWithSwitch;
