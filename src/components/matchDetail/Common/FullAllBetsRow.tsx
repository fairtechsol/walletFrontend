import { Box } from "@mui/material";
import { memo } from "react";
import LargeBox from "./LargeBox";
import SmallBox from "./SmallBox";

interface FullAllBetsRowProps {
  values: any[];
  index: number;
}

const FullAllBetsRow = ({ values, index }: FullAllBetsRowProps) => {
  return (
    <Box key={index} sx={{ width: "100%", display: "flex" }}>
      {values.map((item: any, k: any) => {
        if (!item?.small) {
          return <LargeBox k={k} key={k} item={item} />;
        } else {
          return <SmallBox k={k} key={k} item={item} />;
        }
      })}
    </Box>
  );
};

export default memo(FullAllBetsRow);
