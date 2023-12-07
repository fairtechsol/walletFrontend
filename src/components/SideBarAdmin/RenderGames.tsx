import { Box } from "@mui/material";
import { useState } from "react";
import MainBox from "./MainBox";
import RenderEvents from "./RenderEvents";

const RenderGames = ({ i, handleDrawerToggle, colors }: any) => {
  const [selected, setSelected] = useState(false);
  return (
    <Box
      onClick={(event) => {
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
        color={colors[1]}
        width={90}
        title={i.title}
      />
      {selected &&
        i?.values?.map((value: any, index: any) => {
          return (
            <RenderEvents
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

export default RenderGames;
