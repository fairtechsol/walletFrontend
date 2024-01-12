import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DeleteIcon } from "../../assets";
import MatchOdds from "../../components/matchDetail/MatchOdds";
import SessionMarket from "../../components/matchDetail/SessionMarket";
import LiveBookmaker from "../../components/matchDetail/LiveBookmaker";
import UserProfitLoss from "../../components/matchDetail/Common/UserProfitLoss";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  AllBetDelete,
  getMatchDetail,
  matchListReset,
  updateMatchRates,
} from "../../store/actions/match/matchAction";
import { useSelector } from "react-redux";
import { socketService } from "../../socketManager";
import FullAllBets from "../../components/matchDetail/Common/FullAllBets";
import AddNotificationModal from "../../components/matchDetail/Common/AddNotificationModal";

const MatchDetail = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const [mode, setMode] = useState(false);
  const [visible, setVisible] = useState(false);
  // const [selectedData, setSelectedData] = useState([]);
  const [selectedBetData, setSelectedBetData] = useState([]);
  const [loadingDeleteBet] = useState(false);
  const { state } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { success, matchDetail } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const handleDeleteBet = () => {
    let payload = {
      matchId: state?.matchId,
      deleteReason: "test the api",
      urlData: {
        "http://localhost:5000": selectedBetData,
      },
    };
    dispatch(AllBetDelete(payload));
  };

  const updateMatchDetailToRedux = (event: any) => {
    if (state?.matchId === event?.id) {
      dispatch(updateMatchRates(event));
    } else return;
  };

  useEffect(() => {
    if (state?.matchId) {
      socketService.match.leaveAllRooms();
      dispatch(getMatchDetail(state?.matchId));
      socketService.match.joinMatchRoom(
        state?.matchId,
        profileDetail?.roleName
      );
      socketService.match.getMatchRates(
        state?.matchId,
        updateMatchDetailToRedux
      );
    }
    return () => {
      socketService.match.leaveMatchRoom(state?.matchId);
    };
  }, [state?.matchId]);

  useEffect(() => {
    if (success) {
      dispatch(matchListReset());
    }
  }, [success]);

  return (
    <>
      {visible && (
        <>
          <AddNotificationModal
            value={""}
            title={"Add Remark"}
            visible={visible}
            loadingDeleteBet={loadingDeleteBet}
            setVisible={setVisible}
            onDone={handleDeleteBet}
            onClick={(e: any) => {
              e.stopPropagation();
              setVisible(false);
              setMode(false);
            }}
          />
        </>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          flex: 1,
          height: "100%",
          marginX: "0.5%",
        }}
      >
        <Box
          sx={{
            flex: 1,
            flexDirection: "column",
            minHeight: "100px",
            display: "flex",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "white",
              fontWeight: "700",
              alignSelf: "start",
            }}
          >
            {matchDetail?.teamA} V/S {matchDetail?.teamB}
          </Typography>
          {matchDetail?.matchOdd && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Match Odds"}
              minBet={Math.floor(matchDetail?.matchOdd?.minBet)}
              maxBet={Math.floor(matchDetail?.matchOdd?.maxBet)}
            />
          )}
          {matchDetail?.marketCompleteMatch && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Market Complete Match"}
              minBet={Math.floor(matchDetail?.marketCompleteMatch?.minBet)}
              maxBet={Math.floor(matchDetail?.marketCompleteMatch?.maxBet)}
            />
          )}
          {matchDetail?.apiTideMatch && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Tied Match"}
              minBet={Math.floor(matchDetail?.apiTideMatch?.minBet)}
              maxBet={Math.floor(matchDetail?.apiTideMatch?.maxBet)}
            />
          )}
          {matchDetail?.bookmaker && (
            <LiveBookmaker
              currentMatch={matchDetail}
              minBet={Math.floor(matchDetail?.bookmaker?.minBet)}
              maxBet={Math.floor(matchDetail?.bookmaker?.maxBet)}
              data={
                matchDetail?.bookmaker?.runners?.length > 0
                  ? matchDetail?.bookmaker?.runners
                  : []
              }
            />
          )}
          {matchDetail?.quickBookmaker?.map((bookmaker: any, index: any) => {
            return (
              <MatchOdds
                key={index}
                currentMatch={matchDetail}
                session={"manualBookMaker"}
                data={bookmaker}
                minBet={Math.floor(bookmaker?.minBet) || 0}
                maxBet={Math.floor(bookmaker?.maxBet) || 0}
                typeOfBet={bookmaker?.name}
                matchOddsData={bookmaker}
              />
            );
          })}
          {matchDetail?.manualTiedMatch && matchesMobile && (
            <MatchOdds
              typeOfBet={"Manual Tied Match"}
              currentMatch={matchDetail}
              minBet={Math.floor(matchDetail?.manualTiedMatch?.minBet)}
              maxBet={Math.floor(matchDetail?.manualTiedMatch?.maxBet)}
            />
          )}

          {matchDetail?.apiSessionActive && matchesMobile && (
            <SessionMarket
              title={"Quick Session Market"}
              currentMatch={matchDetail}
              sessionData={matchDetail?.sessionBettings}
              min={matchDetail?.betFairSessionMinBet || 0}
              max={matchDetail?.betFairSessionMaxBet || 0}
            />
          )}
          {matchDetail?.apiSessionActive && matchesMobile && (
            <SessionMarket
              title={"Session Market"}
              currentMatch={matchDetail}
              min={Math.floor(matchDetail?.betFairSessionMinBet)}
              max={Math.floor(matchDetail?.betFairSessionMaxBet)}
            />
          )}

          {matchesMobile && (
            <UserProfitLoss
              single={"single"}
              title={"User Profit Loss"}
              // matchId={matchId}
            />
          )}
          {profileDetail?.roleName === "fairGameWallet" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              {mode && (
                <Box
                  onClick={() => {
                    setMode(!mode);
                  }}
                  sx={{
                    width: "150px",
                    marginY: ".75%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "5px",
                    background: "#f1c550",
                    height: "35px",
                    border: "1.5px solid white",
                    display: "flex",
                    alignSelf: "flex-end",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "600",
                      fontSize: "13px",
                      color: "black",
                      marginRight: "10px",
                    }}
                  >
                    {"Cancel"}
                  </Typography>
                </Box>
              )}
              <Box sx={{ width: "2%" }}></Box>
              <Box
                onClick={() => {
                  if (mode) {
                    setVisible(true);
                  } else {
                    setMode(!mode);
                  }
                }}
                sx={{
                  width: "150px",
                  marginY: ".75%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "5px",
                  background: "#E32A2A",
                  height: "35px",
                  border: "1.5px solid white",
                  display: "flex",
                  alignSelf: "flex-end",
                  cursor: "pointer",
                }}
              >
                <Typography
                  style={{
                    fontWeight: "600",
                    fontSize: "13px",
                    color: "white",
                    marginRight: "10px",
                  }}
                >
                  {profileDetail?.roleName === "fairGameWallet" && !mode
                    ? "Delete Bet"
                    : "Delete"}
                </Typography>
                <img
                  src={DeleteIcon}
                  style={{ width: "17px", height: "20px" }}
                />
              </Box>
            </Box>
          )}
          {/* } */}
          {profileDetail?.roleName === "fairGameWallet" && (
            <Box
              sx={{ mt: profileDetail?.roleName === "fairGameWallet" ? 0 : 1 }}
            >
              <FullAllBets
                IObets={[
                  {
                    id: "d5c89cfb-c5d1-4e66-ad7d-436f567b7300",
                    isActive: true,
                    createAt: "2024-01-05T12:33:33.303Z",
                    updateAt: "2024-01-05T12:33:33.303Z",
                    createdBy: "4113dbe1-dd42-489d-85bf-6cc9c50e3c7f",
                    deletedAt: null,
                    user_id: "4113dbe1-dd42-489d-85bf-6cc9c50e3c7f",
                    match_id: "b501723d-a82c-4a95-a20c-c40e428fce04",
                    bet_id: "5b259bdb-8431-4bab-8696-22a0eec9bf17",
                    result: "pending",
                    team_bet: "Bangladesh",
                    amount: 100,
                    odds: 10,
                    win_amount: 10,
                    loss_amount: 100,
                    max_loss_amount: 7290,
                    bet_type: "back",
                    country: "Not found",
                    ip_address: "Not found",
                    rate: null,
                    marketType: "QuickBookmaker0",
                    deleted_reason: null,
                    user: {
                      id: "4113dbe1-dd42-489d-85bf-6cc9c50e3c7f",
                      userName: "SUSER00",
                      fullName: "",
                      fw_partnership: 10,
                    },
                    myStack: "10.00",
                  },
                  {
                    id: "b800eb45-d460-4946-8517-d7085b8ac82d",
                    isActive: true,
                    createAt: "2023-12-27T05:58:10.481Z",
                    updateAt: "2024-01-05T04:07:29.283Z",
                    createdBy: "c0cc10f9-53df-4371-afea-bf09e0dab206",
                    deletedAt: null,
                    user_id: "c0cc10f9-53df-4371-afea-bf09e0dab206",
                    match_id: "b501723d-a82c-4a95-a20c-c40e428fce04",
                    bet_id: "5b259bdb-8431-4bab-8696-22a0eec9bf17",
                    result: "pending",
                    team_bet: "Bangladesh",
                    amount: 100,
                    odds: 10,
                    win_amount: 10,
                    loss_amount: 100,
                    max_loss_amount: 420,
                    bet_type: "back",
                    country: "Not found",
                    ip_address: "Not found",
                    rate: null,
                    marketType: "QuickBookmaker1",
                    deleted_reason: "check delete payload",
                    user: {
                      id: "c0cc10f9-53df-4371-afea-bf09e0dab206",
                      userName: "SUSER1",
                      fullName: "",
                      fw_partnership: 10,
                    },
                    myStack: "10.00",
                  },
                ]}
                mode={mode}
                tag={false}
                setSelectedBetData={setSelectedBetData}
                selectedBetData={selectedBetData}
              />
            </Box>
          )}
        </Box>
        {!matchesMobile && <Box sx={{ width: "20px" }} />}
        {!matchesMobile && (
          <Box
            sx={{
              flex: 1,
              flexDirection: "column",
              display: "flex",
              minHeight: "100px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              {/* {mode && <CancelButton />} */}
              <Box sx={{ width: "2%" }}></Box>
              <Box
                sx={{ width: "150px", marginY: ".75%", height: "15px" }}
              ></Box>
            </Box>
            {matchDetail?.manualTiedMatch?.isActive && (
              <MatchOdds
                typeOfBet={"Manual Tied Match"}
                currentMatch={matchDetail}
                minBet={Math.floor(matchDetail?.manualTiedMatch?.minBet)}
                maxBet={Math.floor(matchDetail?.manualTiedMatch?.maxBet)}
              />
            )}
            {matchDetail?.manualSessionActive && (
              <SessionMarket
                title={"Quick Session Market"}
                currentMatch={matchDetail}
                sessionExposer={"0.00"}
                sessionData={matchDetail?.sessionBettings}
                min={matchDetail?.betFairSessionMinBet || 0}
                max={matchDetail?.betFairSessionMaxBet || 0}
              />
            )}
            {matchDetail?.apiSessionActive && (
              <SessionMarket
                title={"Session Market"}
                //   currentOdds={currentOdds}
                currentMatch={matchDetail}
                //   sessionBets={sessionBets?.length}
                sessionExposer={"0.00"}
                // data={[]}
                //   sessionOffline={sessionOff}
                //   setPopData={setPopData}
                //   popData={popData}
                max={Math.floor(matchDetail?.betFairSessionMaxBet)}
                min={Math.floor(matchDetail?.betFairSessionMinBet)}
              />
            )}

            <UserProfitLoss
              single={"single"}
              title={"User Profit Loss"}
              // matchId={matchId}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default MatchDetail;
