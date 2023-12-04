import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DeleteIcon } from "../../assets";
import MatchOdds from "../../components/matchDetail/MatchOdds";
import SessionMarket from "../../components/matchDetail/SessionMarket";
import LiveBookmaker from "../../components/matchDetail/LiveBookmaker";
import UserProfitLoss from "../../components/matchDetail/Common/UserProfitLoss";
import FullAllBets from "../../components/matchDetail/Common/FullAllBets";

const MatchDetail = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const currentMatch = {
    id: "d5fba619-029c-4493-9d63-dc61d608f9cd",
    isActive: true,
    createAt: "2023-11-29T07:06:41.983Z",
    updateAt: "2023-11-29T12:34:22.145Z",
    createdBy: "b774e612-041d-4879-a856-cb6dad2f8789",
    deletedAt: null,
    gameType: "cricket",
    competitionId: "9992899",
    competitionName: "International Twenty20 Matches",
    title: "India v Australia",
    marketId: "1.221896870",
    EventId: "32839195",
    teamA: "India",
    teamB: "Australia",
    teamC: null,
    startAt: "2023-12-01T13:30:00.000Z",
    stopAt: null,
    matchImage: null,
    teamA_Image: null,
    teamB_Image: null,
    match_max_bet: null,
    betfair_match_min_bet: 100,
    betfair_match_max_bet: 1000,
    betfair_session_min_bet: 100,
    betfair_session_max_bet: 1000,
    betfair_bookmaker_min_bet: 100,
    betfair_bookmaker_max_bet: 1000,
    bookmaker_manual_min_bet: 0,
    bookmaker_manual_max_bet: 0,
    manaual_session_min_bet: 100,
    manaual_session_max_bet: 1000,
    apiMatchActive: true,
    apiBookMakerActive: true,
    apiSessionActive: true,
    manualBookMakerActive: false,
    manualSessionActive: true,
    delaySecond: 5,
    bettings: [
      {
        id: "c771b160-8e28-4c9e-a24f-b31fff8c8725",
        isActive: true,
        createAt: "2023-11-29T11:33:38.646Z",
        updateAt: "2023-11-29T11:33:38.646Z",
        createdBy: "3f9ba641-e4fa-434c-b696-938003aa17ec",
        deletedAt: null,
        match_id: "d5fba619-029c-4493-9d63-dc61d608f9cd",
        matchType: "cricket",
        bet_condition: "Test",
        no_rate: null,
        yes_rate: null,
        rate_percent: "140-90",
        suspended: "ACTIVE",
        selectionId: null,
        sessionBet: true,
        betStatus: 1,
        stopAt: "2023-11-29T11:33:38.646Z",
        betRestult: null,
        profitLoss: null,
      },
      {
        id: "48d321f0-9b9a-4805-9860-6d21182bdf14",
        isActive: true,
        createAt: "2023-11-29T07:06:41.992Z",
        updateAt: "2023-11-29T07:06:41.992Z",
        createdBy: "b774e612-041d-4879-a856-cb6dad2f8789",
        deletedAt: null,
        match_id: "d5fba619-029c-4493-9d63-dc61d608f9cd",
        matchType: "cricket",
        bet_condition: "Test2",
        no_rate: null,
        yes_rate: null,
        rate_percent: null,
        suspended: "suspended",
        selectionId: null,
        sessionBet: false,
        betStatus: 1,
        stopAt: "2023-11-29T07:06:41.992Z",
        betRestult: null,
      },
    ],
    bookmakers: [
      {
        id: "598424ce-5a05-47ca-b9ac-26b971b88e37",
        isActive: true,
        createAt: "2023-11-29T07:06:41.999Z",
        updateAt: "2023-12-01T09:13:51.954Z",
        createdBy: "b774e612-041d-4879-a856-cb6dad2f8789",
        deletedAt: null,
        match_id: "d5fba619-029c-4493-9d63-dc61d608f9cd",
        bet_id: "48d321f0-9b9a-4805-9860-6d21182bdf14",
        matchType: "cricket",
        marketType: "QuickBookmaker0",
        marketName: "bK1",
        min_bet: 100,
        max_bet: 200,
        teamA_Back: 6,
        teamB_Back: null,
        teamC_Back: null,
        teamA_suspend: null,
        teamB_suspend: "suspended",
        teamC_suspend: "suspended",
        teamA_lay: 7,
        teamB_lay: null,
        teamC_lay: null,
        sessionBet: false,
        betStatus: 1,
        teamA: "India",
        teamB: "Australia",
        teamC: null,
      },
    ],
    bookMakerRateLive: false,
    matchOddRateLive: false,
    teamA_rate: null,
    teamB_rate: null,
    teamC_rate: null,
    blockMarket: {
      BOOKMAKER: {
        block: false,
      },
      MANUALBOOKMAKER: {
        block: false,
      },
      MATCH_ODDS: {
        block: false,
      },
      SESSION: {
        block: false,
      },
    },
  };

  const bookmakerLive: any = [];

  const sessionExposerHttp = [
    {
      createdBy: "d1dc65aa-a481-4aff-aa9c-37d656f38ff6",
      sessionBet: true,
      match_id: "44c55207-c75e-404a-b9b3-55f2fb54c731",
      matchType: "cricket",
      betStatus: 1,
      suspended: "suspended",
      bet_condition: "test10",
      no_rate: null,
      yes_rate: null,
      rate_percent: null,
      selectionId: null,
      deletedAt: null,
      stopAt: "2023-12-04T05:17:32.604Z",
      betRestult: null,
      id: "9d96594a-6e41-40ef-9712-d1e461985c36",
      isActive: true,
      createAt: "2023-12-04T05:17:32.604Z",
      updateAt: "2023-12-04T05:17:32.604Z",
      sorting: 3,
      profitLoss: null,
    },
  ];
  const bookmakerHttp = [
    {
      id: "f75bc413-7e82-4d54-974d-03972cb2979d",
      isActive: true,
      createAt: "2023-11-20T10:52:41.386Z",
      updateAt: "2023-11-20T10:52:41.386Z",
      createdBy: "c59d1bd5-41ae-4224-a720-33b9c49ed30f",
      deletedAt: null,
      match_id: "44c55207-c75e-404a-b9b3-55f2fb54c731",
      bet_id: "5d1e9dee-d377-4843-ba9f-62b071df3864",
      matchType: "cricket",
      marketType: "QuickBookmaker0",
      marketName: "BookVR",
      min_bet: 100,
      max_bet: 10000,
      teamA_Back: null,
      teamB_Back: null,
      teamC_Back: null,
      teamA_suspend: "suspended",
      teamB_suspend: "suspended",
      teamC_suspend: "suspended",
      teamA_lay: null,
      teamB_lay: null,
      teamC_lay: null,
      sessionBet: false,
      betStatus: 1,
      teamA_rate: null,
      teamB_rate: null,
      teamC_rate: null,
      teamA: "Western Australia",
      teamB: "South Australia",
      teamC: null,
    },
  ];
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
          {currentMatch?.teamA} V/S {currentMatch?.teamB}
        </Typography>
        {currentMatch?.apiMatchActive && (
          <MatchOdds
            currentMatch={currentMatch}
            // matchOddsLive={matchOddsLive}
            // data={
            //   matchOddsLive?.runners?.length > 0 ? matchOddsLive?.runners : []
            // }
            typeOfBet={"Match Odds"}
            minBet={currentMatch?.betfair_match_min_bet}
            maxBet={currentMatch?.betfair_match_max_bet}
          />
        )}
        {bookmakerHttp?.map((bookmaker) => {
          if (bookmaker.betStatus === 1) {
            return (
              <MatchOdds
                currentMatch={currentMatch}
                session={"manualBookMaker"}
                data={bookmaker}
                minBet={bookmaker?.min_bet || 0}
                maxBet={bookmaker?.max_bet || 0}
                typeOfBet={bookmaker?.marketName}
                matchOddsData={bookmaker}
              />
            );
          }
        })}

        {currentMatch?.apiBookMakerActive && (
          <LiveBookmaker
            currentMatch={currentMatch}
            data={
              bookmakerLive?.runners?.length > 0 ? bookmakerLive?.runners : []
            }
          />
        )}

        {currentMatch?.manualSessionActive && matchesMobile && (
          <SessionMarket
            title={"Quick Session Market"}
            // sessionExposer={sessionExposerHttp}
            currentMatch={currentMatch}
            // sessionBets={sessionBets?.length}
            sessionData={sessionExposerHttp}
            // sessionOffline={sessionOff}
            // setPopData={setPopData}
            // popData={popData}
            min={currentMatch?.manaual_session_min_bet || 0}
            max={currentMatch?.manaual_session_max_bet || 0}
          />
        )}
        {currentMatch?.apiSessionActive && matchesMobile && (
          <SessionMarket
            title={"Session Market"}
            currentMatch={currentMatch}
            // sessionBets={sessionBets?.length}
            // sessionExposer={sessionExposerHttp}
            // sessionData={currentMatch?.bettings}
            // sessionOffline={sessionOff}
            // setPopData={setPopData}
            // popData={popData}
            max={currentMatch?.betfair_session_max_bet}
            min={currentMatch?.betfair_session_min_bet}
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
          {currentMatch?.manualSessionActive && (
            <SessionMarket
              title={"Quick Session Market"}
              //   currentOdds={currentOdds}
              currentMatch={currentMatch}
              //   sessionBets={sessionBets?.length}
              sessionExposer={"0.00"}
              sessionData={sessionExposerHttp}
              // data={[]}
              //   sessionOffline={sessionOff}
              //   setPopData={setPopData}
              //   popData={popData}
              min={currentMatch?.manaual_session_min_bet || 0}
              max={currentMatch?.manaual_session_max_bet || 0}
            />
          )}
          {currentMatch?.apiSessionActive && (
            <SessionMarket
              title={"Session Market"}
              //   currentOdds={currentOdds}
              currentMatch={currentMatch}
              //   sessionBets={sessionBets?.length}
              sessionExposer={"0.00"}
              // sessionData={currentMatch?.bettings}
              // data={[]}
              //   sessionOffline={sessionOff}
              //   setPopData={setPopData}
              //   popData={popData}
              max={currentMatch?.betfair_session_max_bet}
              min={currentMatch?.betfair_session_min_bet}
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
