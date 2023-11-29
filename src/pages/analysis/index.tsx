import Loader from "../../components/Loader";
import { Box } from "@mui/material";

const Analysis = () => {
  return (
    <>
      <Box sx={{ margin: "200px" }}>
        <Loader text={"Upcoming"} />;
      </Box>
    </>
  );
};

export default Analysis;
