import { Box } from "@mui/material";
import { Fragment, memo } from "react";
import LargeBox from "./LargeBox";
import SmallBox from "./SmallBox";

interface FullAllBetsRowProps {
  values: any[];
  index: number;
}

const FullAllBetsRow = ({ values, index }: FullAllBetsRowProps) => {
  return (
    <Box key={index} sx={{ width: "100%", display: "flex" }}>
      {values.map((item: any, k: any) => (
        <Fragment key={k}>
          {!item?.small ? (
            <LargeBox k={k} item={item} />
          ) : (
            <SmallBox k={k} item={item} />
          )}
        </Fragment>
      ))}
    </Box>
  );
};

export default memo(FullAllBetsRow);
