import { Box } from "@mui/material";
import LargeBox from "./LargeBox";
import SmallBox from "./SmallBox";

const FullAllBetsRow = ({ values, index }: any) => {
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

export default FullAllBetsRow;
