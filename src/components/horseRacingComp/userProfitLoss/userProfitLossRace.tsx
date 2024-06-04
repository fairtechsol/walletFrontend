import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Refresh } from "../../../assets";
import {
  getUserProfitLossForRace,
  resetUserProfitLossForRace,
} from "../../../store/actions/horseRacing/horseMatchDetailActions";
import { AppDispatch, RootState } from "../../../store/store";
import Divider from "../../Inplay/Divider";
import UserProfitLossListCompRace from "./userProfitLossListCompRace";

const UserProfitLossRace = (props: any) => {
  const { title, matchData, setShowUserProfitLoss, single, matchDetail } =
    props;
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { userProfitLossData } = useSelector(
    (state: RootState) => state.horseRacing.userProfitLoss
  );

  useEffect(() => {
    if (matchData?.matchId !== undefined) {
      dispatch(getUserProfitLossForRace(matchData?.matchId));
    }
  }, [matchData?.matchId]);

  return (
    <>
      <Box
        sx={{
          top: "2.5%",
          display: "flex",
          position: "relative",
          background: "white",
          padding: 0.3,
          flexDirection: "column",
          marginBottom: "3px",
          width: "100%",
          maxHeight: single === "single" ? "29rem" : null,
          alignSelf: {
            xs: "center",
            md: "center",
            lg: "flex-start",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: 38,
            flexDirection: "row",
            width: "99.7%",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              background: "#f1c550",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  lg: "13px",
                  md: "12px",
                  xs: matchesMobile ? "12px" : "12px",
                },
                fontWeight: "bold",
                marginLeft: "7px",
              }}
            >
              {title}
            </Typography>
            {single === "multiple" && (
              <img
                onClick={(event) => {
                  event.preventDefault();
                  dispatch(getUserProfitLossForRace(matchData?.matchId));
                }}
                src={Refresh}
                style={{
                  width: "25px",
                  height: "25px",
                  marginRight: "5px",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              flex: 0.1,
              background: "#262626",
            }}
          >
            <div className="slanted"></div>
          </Box>
          <Box
            sx={{
              flex: 1,
              background: "#262626",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {single === "multiple" ? (
              <Button
                sx={{
                  color: "#f1c40f",
                  fontSize: "30px",
                  minWidth: 0,
                  padding: "0px 8px",
                }}
                onClick={() => {
                  setShowUserProfitLoss(false);
                  dispatch(resetUserProfitLossForRace());
                }}
              >
                &times;
              </Button>
            ) : (
              <img
                onClick={() => {
                  dispatch(getUserProfitLossForRace(matchDetail?.id));
                }}
                src={Refresh}
                style={{
                  width: "25px",
                  height: "25px",
                  marginRight: "5px",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
              />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            overflowX: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              background: "#319E5B",
              alignSelf: "center",
              // overflowX: "scroll",
              // overflow: "hidden",
              width: "100%",
              height: "25px"
            }}
          >
              <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRight: "2px solid #fff",
              }}>
              <Typography
                sx={{
                  color: "white",
                  fontSize: { lg: "12px", xs: "9px" },
                 padding: "4px"
                }}
              >
                Username
              </Typography>
              </Box>
              {matchDetail?.matchOdd?.runners?.map((runner: any) => {
                return (
                  <>
                    <Box
                      sx={{
                        background: "#f1c550",
                        border: "2px solid #fff",
                        // height: "100%",
                        display: "flex",
                        alignItems: "center",
                        width: "100vw",
                        textAlign: "center"
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: {
                            lg: "13px",
                            md: "12px",
                            xs: "10px",
                          },
                          color: "black",
                          fontWeight: "600",
                          lineHeight: "0.9",
                          width: "10vw"
                        }}
                      >
                        {runner?.runnerName}
                      </Typography>
                    </Box>
                  </>
                );
              })}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxHeight: single === "single" ? "400" : "160px",
              width: "100%",
              position: "relative",
            }}
          >
            {userProfitLossData?.length > 0 &&
              userProfitLossData?.map((element: any, index: number) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      // width: "100%",
                      display: element?.betStatus === 2 ? "none" : "block",
                    }}
                  >
                    <UserProfitLossListCompRace
                      element={element}
                      matchDetail={matchDetail}
                    />
                    <Divider />
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserProfitLossRace;
