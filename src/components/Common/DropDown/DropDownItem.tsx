import React from "react";
import { Box, Typography } from "@mui/material";

const DropDownItem = (props: any) => {
  const {
    i,
    CompetitionName,
    disable,
    setValue,
    setOpen,
    dropDownTextStyle,
    setSelected,
  } = props;
  return (
    <Box
      onClick={() => {
        if (!disable) {
          setValue(i);
          setSelected(i);
          setOpen(false);
        }
      }}
      sx={[
        {
          paddingY: "4px",
          paddingLeft: "7px",
          fontSize: "10px",
          fontWeight: "500",
          color: "black",
          "&:hover": {
            cursor: "pointer",
            background: "#3498ff33",
          },
          // background: "#DEDEDE",
        },
        dropDownTextStyle,
      ]}
    >
      <Typography>{i === "0" ? "0.00" : i}</Typography>
      <Typography sx={{ fontSize: "12px" }}>{CompetitionName}</Typography>
    </Box>
  );
};

export default DropDownItem;
