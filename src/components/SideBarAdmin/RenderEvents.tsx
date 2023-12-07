import { useState } from "react";
import MainBox from "./MainBox";
import { Box } from "@mui/material";
import RenderDates from "./RenderDates";

const RenderEvents = (props: any) => {
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
        color={colors[0]}
        width={85}
        title={i.title}
      />
      {selected &&
        i?.values?.map((value: any, index: any) => {
          return (
            <RenderDates
              handleDrawerToggle={handleDrawerToggle}
              i={value}
              key={index}
              colors={colors}
            />
          );
        })}
    </Box>
  );
};

export default RenderEvents;
