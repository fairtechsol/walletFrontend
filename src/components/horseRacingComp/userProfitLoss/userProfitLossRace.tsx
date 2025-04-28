import {
  Box,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Refresh } from "../../../assets";
import {
  getUserProfitLossForRace,
  resetUserProfitLossForRace,
} from "../../../store/actions/horseRacing/horseMatchDetailActions";
import { AppDispatch, RootState } from "../../../store/store";
import UserProfitLossListCompRace from "./userProfitLossListCompRace";
import UserProfitLossListCompRaceHeader from "./userProfitLossListCompRaceHeader";

interface UserProfitLossRaceProps {
  single: string;
  title: string;
  matchDetail: any;
  matchData?: any;
  setShowUserProfitLoss?: (val: boolean) => void;
}

const UserProfitLossRace = ({
  title,
  matchData,
  setShowUserProfitLoss,
  single,
  matchDetail,
}: UserProfitLossRaceProps) => {
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
          <Box className="slanted" />
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
                setShowUserProfitLoss?.(false);
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
      <Box sx={{ width: "100%" }}>
        <TableContainer
          sx={{
            maxHeight: single === "single" ? 400 : 160,
            overflowY: "auto",
          }}
        >
          <Table>
            <TableHead>
              {userProfitLossData?.length > 0 &&
                userProfitLossData?.map((_: any, index: any) => (
                  <UserProfitLossListCompRaceHeader
                    key={index}
                    matchDetail={matchDetail}
                  />
                ))}
            </TableHead>
            <TableBody>
              {userProfitLossData?.length > 0 &&
                userProfitLossData?.map((element: any, index: any) => (
                  <UserProfitLossListCompRace
                    key={index}
                    element={element}
                    matchDetail={matchDetail}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default memo(UserProfitLossRace);
