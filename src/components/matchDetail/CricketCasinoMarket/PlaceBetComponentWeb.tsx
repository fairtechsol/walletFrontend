import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { UD } from "../../../assets";
import { handleNumber } from "../../../helper";
import { getSessionProLoss } from "../../../store/actions/match/matchAction";
import { AppDispatch } from "../../../store/store";

interface PlaceBetComponentWebProps {
  newData: any;
  profitLoss: any;
  index: number;
}

const PlaceBetComponentWeb = ({
  newData,
  profitLoss,
  index,
}: PlaceBetComponentWebProps) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <Box
      onClick={() => {
        dispatch(
          getSessionProLoss({
            matchId: newData?.matchId,
            id: newData?.id,
            name: newData?.name ?? newData?.RunnerName,
            type: !newData?.isManual
              ? "Session Market"
              : "Quick Session Market",
          })
        );
      }}
      sx={{
        background: "#0B4F26",
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        paddingX: ".2vw",
        width: "10vw",
        borderRadius: "5px",
        height: "32px",
        right: "11vw",
        position: "absolute",
      }}
    >
      <Box
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: profitLoss?.maxLoss ? ".65vw" : ".6vw" },
            fontWeight: profitLoss?.maxLoss ? "bold" : "500",
            color: "white",
          }}
        >
          {!profitLoss?.profitLoss && !profitLoss?.betPlaced
            ? "Profit/Loss"
            : handleNumber(
                parseFloat(
                  (isNaN(profitLoss?.betPlaced?.[index])
                    ? profitLoss?.betPlaced?.[index]?.profitLoss
                    : profitLoss?.betPlaced?.[index]) ||
                    profitLoss?.profitLoss?.[index]
                ).toFixed(2),
                ""
              )}
        </Typography>
        <img
          src={UD}
          style={{ width: "12px", height: "12px", marginLeft: "5px" }}
        />
      </Box>
    </Box>
  );
};

export default memo(PlaceBetComponentWeb);
