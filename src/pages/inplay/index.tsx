import { Box } from "@mui/material";
import Loader from "../../components/Loader";

const Inplay = () => {
  return (
    <Box sx={{ margin: "200px" }}>
      <Loader text={"Upcoming"} />;
    </Box>
  );
};

export default Inplay;
