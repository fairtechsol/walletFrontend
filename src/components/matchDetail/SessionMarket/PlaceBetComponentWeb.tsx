import { Box, Typography } from "@mui/material";
import { UD } from "../../../assets";
// import { useState } from "react";
// import DropdownMenu from "./DropDownMenu";
import { AppDispatch } from "../../../store/store";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getRunAmount } from "../../../store/actions/match/matchAction";

const PlaceBetComponentWeb = ({ amount, newData, profitLoss }: any) => {
  const dispatch: AppDispatch = useDispatch();
  // const { runAmount } = useSelector((state: RootState) => state.match.bets);
  // const [show, setShow] = useState(false);
  // const [anchorEl, setAnchorEl] = useState(null);
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  return (
    <>
      <Box
        onClick={() => {
          dispatch(getRunAmount(newData?.id));
          // setShow(!show);
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
            background: "#FDF21A",
            borderRadius: "3px",
            width: "45%",
            height: "85%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{ fontSize: ".5vw", fontWeight: "bold", color: "#FF4D4D" }}
          >
            Total Bet
          </Typography>
          <Typography
            sx={{ fontSize: ".5vw", fontWeight: "bold", color: "#0B4F26" }}
          >
            {profitLoss?.totalBet || 0}
          </Typography>
        </Box>
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
              fontSize: { lg: amount ? ".65vw" : ".6vw" },
              fontWeight: amount ? "bold" : "500",
              color: "white",
            }}
          >
            {" "}
            {!profitLoss?.maxLoss ? "Profit/Loss" : profitLoss?.maxLoss}
          </Typography>
          <img
            src={UD}
            style={{ width: "12px", height: "12px", marginLeft: "5px" }}
          />
        </Box>
        {/* {show && (
          <DropdownMenu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            list={runAmount && runAmount}
            // list={profitLoss?.betData}
            handleClose={handleClose}
          />
        )} */}
      </Box>
    </>
  );
};

export default PlaceBetComponentWeb;
