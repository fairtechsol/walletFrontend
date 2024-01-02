import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DeleteIcon } from "../../assets";
import MatchOdds from "../../components/matchDetail/MatchOdds";
import SessionMarket from "../../components/matchDetail/SessionMarket";
import LiveBookmaker from "../../components/matchDetail/LiveBookmaker";
import UserProfitLoss from "../../components/matchDetail/Common/UserProfitLoss";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getMatchDetail,
  matchListReset,
} from "../../store/actions/match/matchAction";
import { useSelector } from "react-redux";

const MatchDetail = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { state } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { success, matchDetail } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const bookmakerLive: any = [];

  useEffect(() => {
    if (state?.matchId) {
      dispatch(getMatchDetail(state?.matchId));
    }
  }, [state?.matchId]);

  useEffect(() => {
    if (success) {
      dispatch(matchListReset());
    }
  }, [success]);

  return (
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
        {matchDetail?.matchOdd?.isActive && (
          <MatchOdds
            currentMatch={matchDetail}
            typeOfBet={"Match Odds"}
            minBet={Math.floor(matchDetail?.matchOdd?.minBet)}
            maxBet={Math.floor(matchDetail?.matchOdd?.maxBet)}
          />
        )}
        {matchDetail?.marketCompleteMatch?.isActive && (
          <MatchOdds
            currentMatch={matchDetail}
            typeOfBet={"Market Complete Match"}
            minBet={Math.floor(matchDetail?.marketCompleteMatch?.minBet)}
            maxBet={Math.floor(matchDetail?.marketCompleteMatch?.maxBet)}
          />
        )}
        {matchDetail?.apiTideMatch?.isActive && (
          <MatchOdds
            currentMatch={matchDetail}
            typeOfBet={"Tied Match"}
            minBet={Math.floor(matchDetail?.apiTideMatch?.minBet)}
            maxBet={Math.floor(matchDetail?.apiTideMatch?.maxBet)}
          />
        )}
        {matchDetail?.apiBookMakerActive && (
          <LiveBookmaker
            currentMatch={matchDetail}
            data={
              bookmakerLive?.runners?.length > 0 ? bookmakerLive?.runners : []
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
        {matchDetail?.manualTiedMatch?.isActive && matchesMobile && (
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
        {0 > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            {false && (
              <Box
                //     onClick={() => {
                //       setMode(!mode);
                //     }}
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
              //   onClick={() => {
              //     if (mode) {
              //       setVisible(true);
              //     } else {
              //       setMode(!mode);
              //     }
              //   }}
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
                {false ? "Delete" : "Delete Bet"}
              </Typography>
              <img src={DeleteIcon} style={{ width: "17px", height: "20px" }} />
            </Box>
          </Box>
        )}
        {/* } */}
        {/* {IOSinglebets.length > 0 && (
          <FullAllBets
            // IObets={IOSinglebets}
            // mode={mode}
            tag={false}
            // setSelectedBetData={setSelectedBetData}
            // selectedBetData={selectedBetData}
          />
        )} */}
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
            <Box sx={{ width: "150px", marginY: ".75%", height: "15px" }}></Box>
          </Box>
          {matchDetail?.manualTiedMatch?.isActive && (
            <MatchOdds
              typeOfBet={"Manual Tied Match"}
              currentMatch={matchDetail}
              minBet={Math.floor(matchDetail?.manualTiedMatch?.minBet)}
              maxBet={Math.floor(matchDetail?.manualTiedMatch?.maxBet)}
            />
          )}
          {matchDetail?.apiSessionActive && (
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
  );
};

export default MatchDetail;
