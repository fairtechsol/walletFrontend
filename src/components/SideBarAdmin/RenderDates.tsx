import { useState } from "react";
import MainBox from "./MainBox";
import { Box } from "@mui/material";
import RenderBets from "./RenderBets";

const RenderDates = (props: any) => {
  const { i, handleDrawerToggle, colors } = props;
  const [selected, setSelected] = useState(false);

  return (
    <Box
      onClick={(event: any) => {
        event.stopPropagation();
        setSelected(!selected);
      }}
      sx={{
        width: "100%",
        display: "flex",
        alignSelf: "flex-end",
        flexDirection: "column",
      }}
    >
      <MainBox
        sub={i?.sub}
        selected={selected}
        under={true}
        color={colors[2]}
        width={80}
        title={i.title}
      />
      {selected &&
        i?.values?.map((value: any, index: any) => {
          return (
            <RenderBets
              handleDrawerToggle={handleDrawerToggle}
              i={value}
              k={index}
              key={index}
              colors={colors}
            />
          );
        })}
    </Box>
  );
};

export default RenderDates;
