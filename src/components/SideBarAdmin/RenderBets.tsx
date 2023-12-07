import MainBox from "./MainBox";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RenderBets = (props: any) => {
  const { i, handleDrawerToggle, colors } = props;
  const navigate = useNavigate();
  const path = window.location.pathname.split("/")[1];
  return (
    <Box
      onClick={(event: any) => {
        event.stopPropagation();
        navigate(`/${path}/match`);
        handleDrawerToggle();
      }}
      sx={{
        width: "100%",
        display: "flex",
        marginLeft: "7%",
        alignSelf: "flex-end",
        flexDirection: "column",
      }}
    >
      <MainBox
        sub={i?.sub}
        under={false}
        color={colors[4]}
        width={70}
        title={i.title}
      />
    </Box>
  );
};
export default RenderBets;
