import { Box } from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import MainBox from "./MainBox";

const RenderOdds = ({ i, handleDrawerToggle, colors, matchType }: any) => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={(event: any) => {
        event.stopPropagation();
        navigate(`/wallet/match`, {
          state: { matchId: i?.id, matchType: matchType },
        });
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
      {i?.isTiedMatch && (
        <MainBox
          sub={i?.sub}
          under={false}
          color={colors[4]}
          width={70}
          title={"Tied Match"}
        />
      )}
      {true && (
        <MainBox
          sub={i?.sub}
          under={false}
          color={colors[4]}
          width={70}
          title={"Match Odds"}
        />
      )}
    </Box>
  );
};
export default memo(RenderOdds);
