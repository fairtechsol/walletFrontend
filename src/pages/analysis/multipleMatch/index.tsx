import {
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import MatchOdds from "../../../components/matchDetail/MatchOdds";
import UserProfitLoss from "../../../components/matchDetail/Common/UserProfitLoss";
import FullAllBets from "../../../components/matchDetail/Common/FullAllBets";
import SessionMarket from "../../../components/matchDetail/SessionMarket";
import LiveBookmaker from "../../../components/matchDetail/LiveBookmaker";
import { useLocation } from "react-router-dom";
const MultipleMatch = ({}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const location = useLocation();

  const matchData: any = [
    {
      id: "7ecf206e-6fdd-4f9b-b5e8-b085f045e0a0",
      isActive: true,
      createAt: "2023-11-22T05:49:55.887Z",
      updateAt: "2023-11-22T05:50:04.807Z",
      createdBy: "f06cf1a0-3bdb-43c4-abf3-afaf115ac167",
      deletedAt: null,
      gameType: "cricket",
      competitionId: "10529093",
      competitionName: "WBBL",
      title: "Perth Scorchers WBBL v Melbourne Stars WBBL",
      marketId: "1.221430601",
      EventId: "32779030",
      teamA: "Perth Scorchers WBBL",
      teamB: "Melbourne Stars WBBL",
      teamC: null,
      startAt: "2023-11-22T09:10:00.000Z",
      stopAt: null,
      matchImage: null,
      teamA_Image: null,
      teamB_Image: null,
      match_max_bet: null,
      betfair_match_min_bet: 100,
      betfair_match_max_bet: 100100,
      betfair_session_min_bet: 100,
      betfair_session_max_bet: 100100,
      betfair_bookmaker_min_bet: 100,
      betfair_bookmaker_max_bet: 100100,
      bookmaker_manual_min_bet: 0,
      bookmaker_manual_max_bet: 0,
      manaual_session_min_bet: 100,
      manaual_session_max_bet: 100100,
      apiMatchActive: true,
      apiBookMakerActive: true,
      apiSessionActive: true,
      manualBookMakerActive: false,
      manualSessionActive: true,
      delaySecond: 5,
      bettings: [
        {
          id: "c6adcfa9-f399-4cd3-8170-51375e0ffd74",
          isActive: true,
          createAt: "2023-11-22T05:49:55.895Z",
          updateAt: "2023-11-22T05:49:55.895Z",
          createdBy: "f06cf1a0-3bdb-43c4-abf3-afaf115ac167",
          deletedAt: null,
          match_id: "7ecf206e-6fdd-4f9b-b5e8-b085f045e0a0",
          matchType: "cricket",
          bet_condition: null,
          no_rate: null,
          yes_rate: null,
          rate_percent: null,
          suspended: "suspended",
          selectionId: null,
          sessionBet: false,
          betStatus: 1,
          stopAt: "2023-11-22T05:49:55.895Z",
          betRestult: null,
        },
      ],
      bookmakers: [
        {
          id: "609939de-e18b-4353-876e-018a3859d263",
          isActive: true,
          createAt: "2023-11-22T05:49:55.903Z",
          updateAt: "2023-11-28T06:29:43.168Z",
          createdBy: "f06cf1a0-3bdb-43c4-abf3-afaf115ac167",
          deletedAt: null,
          match_id: "7ecf206e-6fdd-4f9b-b5e8-b085f045e0a0",
          bet_id: "c6adcfa9-f399-4cd3-8170-51375e0ffd74",
          matchType: "cricket",
          marketType: "QuickBookmaker1",
          marketName: "b1",
          min_bet: 100,
          max_bet: 100100,
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
        },
        {
          id: "4c64903a-5270-4416-9148-39cabf819c78",
          isActive: true,
          createAt: "2023-11-22T05:49:55.903Z",
          updateAt: "2023-11-28T06:29:43.212Z",
          createdBy: "f06cf1a0-3bdb-43c4-abf3-afaf115ac167",
          deletedAt: null,
          match_id: "7ecf206e-6fdd-4f9b-b5e8-b085f045e0a0",
          bet_id: "c6adcfa9-f399-4cd3-8170-51375e0ffd74",
          matchType: "cricket",
          marketType: "QuickBookmaker0",
          marketName: "b0",
          min_bet: 100,
          max_bet: 100100,
          teamA_Back: 50,
          teamB_Back: null,
          teamC_Back: null,
          teamA_suspend: null,
          teamB_suspend: "suspended",
          teamC_suspend: "suspended",
          teamA_lay: 53,
          teamB_lay: null,
          teamC_lay: null,
          sessionBet: false,
          betStatus: 1,
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
    },
    {
      id: "44c55207-c75e-404a-b9b3-55f2fb54c731",
      isActive: true,
      createAt: "2023-11-20T10:52:41.370Z",
      updateAt: "2023-11-20T10:53:48.819Z",
      createdBy: "c59d1bd5-41ae-4224-a720-33b9c49ed30f",
      deletedAt: null,
      gameType: "cricket",
      competitionId: "12264582",
      competitionName: "Marsh One-Day Cup",
      title: "Western Australia v South Australia",
      marketId: "1.221404798",
      EventId: "32808336",
      teamA: "Western Australia",
      teamB: "South Australia",
      teamC: null,
      startAt: "2023-11-20T04:35:00.000Z",
      stopAt: null,
      matchImage: null,
      teamA_Image: null,
      teamB_Image: null,
      match_max_bet: null,
      betfair_match_min_bet: 100,
      betfair_match_max_bet: 10000,
      betfair_session_min_bet: 100,
      betfair_session_max_bet: 10000,
      betfair_bookmaker_min_bet: 100,
      betfair_bookmaker_max_bet: 10000,
      bookmaker_manual_min_bet: 0,
      bookmaker_manual_max_bet: 0,
      manaual_session_min_bet: 100,
      manaual_session_max_bet: 10000,
      apiMatchActive: true,
      apiBookMakerActive: true,
      apiSessionActive: true,
      manualBookMakerActive: false,
      manualSessionActive: true,
      delaySecond: 2,
      bettings: [
        {
          id: "5d1e9dee-d377-4843-ba9f-62b071df3864",
          isActive: true,
          createAt: "2023-11-20T10:52:41.378Z",
          updateAt: "2023-11-20T10:52:41.378Z",
          createdBy: "c59d1bd5-41ae-4224-a720-33b9c49ed30f",
          deletedAt: null,
          match_id: "44c55207-c75e-404a-b9b3-55f2fb54c731",
          matchType: "cricket",
          bet_condition: null,
          no_rate: null,
          yes_rate: null,
          rate_percent: null,
          suspended: "suspended",
          selectionId: null,
          sessionBet: false,
          betStatus: 1,
          stopAt: "2023-11-20T10:52:41.378Z",
          betRestult: null,
        },
        {
          id: "64f38a50-5859-4833-86c4-786543401065",
          isActive: true,
          createAt: "2023-11-20T10:54:06.293Z",
          updateAt: "2023-11-20T10:54:06.293Z",
          createdBy: "c59d1bd5-41ae-4224-a720-33b9c49ed30f",
          deletedAt: null,
          match_id: "44c55207-c75e-404a-b9b3-55f2fb54c731",
          matchType: "cricket",
          bet_condition: "40 over run WA",
          no_rate: 201,
          yes_rate: 202,
          rate_percent: "100-100",
          suspended: "",
          selectionId: "40overrunwa",
          sessionBet: true,
          betStatus: 1,
          stopAt: "2023-11-20T10:54:06.293Z",
          betRestult: null,
          profitLoss: null,
        },
        {
          id: "6c3ba15f-a991-4072-8582-fef2846c7a39",
          isActive: true,
          createAt: "2023-11-20T10:54:08.498Z",
          updateAt: "2023-11-20T10:54:08.498Z",
          createdBy: "c59d1bd5-41ae-4224-a720-33b9c49ed30f",
          deletedAt: null,
          match_id: "44c55207-c75e-404a-b9b3-55f2fb54c731",
          matchType: "cricket",
          bet_condition: "38 over run WA",
          no_rate: 188,
          yes_rate: 189,
          rate_percent: "100-100",
          suspended: "",
          selectionId: "38overrunwa",
          sessionBet: true,
          betStatus: 1,
          stopAt: "2023-11-20T10:54:08.498Z",
          betRestult: null,
          profitLoss: null,
        },
        {
          id: "9d96594a-6e41-40ef-9712-d1e461985c36",
          isActive: true,
          createAt: "2023-12-04T05:17:32.604Z",
          updateAt: "2023-12-04T05:17:32.604Z",
          createdBy: "d1dc65aa-a481-4aff-aa9c-37d656f38ff6",
          deletedAt: null,
          match_id: "44c55207-c75e-404a-b9b3-55f2fb54c731",
          matchType: "cricket",
          bet_condition: "test10",
          no_rate: 9,
          yes_rate: 10,
          rate_percent: "100-100",
          suspended: "ACTIVE",
          selectionId: null,
          sessionBet: true,
          betStatus: 1,
          stopAt: "2023-12-04T05:17:32.604Z",
          betRestult: null,
          profitLoss: null,
        },
      ],
      bookmakers: [
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
        },
      ],
      bookMakerRateLive: false,
      matchOddRateLive: false,
      teamA_rate: "-0.5",
      teamB_rate: "5",
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
    },
  ];

  const manualRateHttp: any = {};

  const IObets: any = [];
  const sessionBets: any = [];
  return (
    <>
      {location?.state?.match == 3 && (
        <>
          <Box
            sx={{
              display: "flex",
              // flexDirection: "row",
              flexDirection: { matchesMobile: "column", lg: "row" },
              flex: 1,
              height: "100%",
              marginLeft: "0.5%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {matchData?.length > 0 &&
                matchData?.map((item: any, index: any) => {
                  let manualSessionHttp: any = {};
                  if (manualRateHttp.hasOwnProperty(item?.id)) {
                    manualSessionHttp = manualRateHttp[item?.id];
                  }
                  let IObetsData = IObets?.filter(
                    (element: any) => element?.match_id === item?.id
                  );
                  let sessionBetsData = sessionBets?.filter(
                    (element: any) => element?.match_id === item?.id
                  );

                  return (
                    <>
                      {index === 0 ? (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              width: "100%",
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
                                  width: "100%",
                                  color: "white",
                                  fontWeight: "700",
                                  paddingTop: "2%",
                                  alignSelf: "start",
                                }}
                              >
                                {item?.teamA} V/S {item?.teamB}
                                <Button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    // handleClicked(item?.id);
                                  }}
                                  sx={{
                                    backgroundColor: "#F8C851",
                                    fontSize: "10px",
                                    color: "black",
                                    fontWeight: "700",
                                    float: "right",
                                    border: " 1px solid white",
                                    marginBottom: "2px",
                                    alignSelf: "start",
                                    "&:hover": {
                                      backgroundColor: "#F8C851",
                                    },
                                  }}
                                >
                                  User Profit Loss
                                </Button>
                              </Typography>
                              {item?.apiMatchActive && (
                                <MatchOdds
                                  currentMatch={item}
                                  matchOddsLive={item?.matchOddsLive}
                                  data={
                                    item?.matchOddsLive?.runners?.length > 0
                                      ? item?.matchOddsLive?.runners
                                      : []
                                  }
                                  typeOfBet={"Match Odds"}
                                />
                              )}
                              {manualSessionHttp?.manualBookRate?.map(
                                (bookmaker: any) => {
                                  if (bookmaker.betStatus === 1) {
                                    return (
                                      <MatchOdds
                                        currentMatch={item}
                                        session={"manualBookMaker"}
                                        data={bookmaker}
                                        minBet={bookmaker?.min_bet || 0}
                                        maxBet={bookmaker?.max_bet || 0}
                                        typeOfBet={bookmaker?.marketName}
                                        matchOddsData={bookmaker}
                                      />
                                    );
                                  }
                                }
                              )}
                              {/* {item?.manualBookMakerActive && (
                                  <Odds
                                    currentMatch={item}
                                    data={item}
                                    manualBookmakerData={matchOddsDataTemp}
                                    typeOfBet={"Quick Bookmaker"}
                                  />
                                )} */}
                              {manualSessionHttp?.manualBookRate?.map(
                                (bookmaker: any) => {
                                  if (bookmaker.betStatus === 1) {
                                    return (
                                      <MatchOdds
                                        currentMatch={item}
                                        session={"manualBookMaker"}
                                        data={bookmaker}
                                        minBet={bookmaker?.min_bet || 0}
                                        maxBet={bookmaker?.max_bet || 0}
                                        typeOfBet={bookmaker?.marketName}
                                        matchOddsData={bookmaker}
                                      />
                                    );
                                  }
                                }
                              )}
                              {item?.apiBookMakerActive && (
                                <LiveBookmaker
                                  currentMatch={item}
                                  bookmakerLive={item?.bookmakerLive}
                                  data={
                                    item?.bookmakerLive?.runners?.length > 0
                                      ? item?.bookmakerLive?.runners
                                      : []
                                  }
                                />
                              )}

                              {item?.manualSessionActive && (
                                <SessionMarket
                                  title={"Quick Session Market"}
                                  // match={"multiple"}
                                  //   currentOdds={currentOdds}
                                  currentMatch={item}
                                  data={[]}
                                  sessionOffline={item?.sessionOffline}
                                  //   sessionExposer={
                                  //     manualSessionHttp?.sessionExposure
                                  //   }
                                  sessionBets={sessionBetsData?.length}
                                  //   setPopData={setPopData}
                                  //   popData={popData}
                                  //   sessionData={
                                  //     manualSessionHttp?.manualSessionRate
                                  //   }
                                  max={item?.manaual_session_max_bet}
                                  min={item?.manaual_session_min_bet}
                                />
                              )}
                              {item?.apiSessionActive && (
                                <SessionMarket
                                  title={"Session Market"}
                                  match={"multiple"}
                                  //   currentOdds={currentOdds}
                                  currentMatch={item}
                                  data={[]}
                                  sessionOffline={item?.sessionOffline}
                                  //   sessionExposer={
                                  //     manualSessionHttp?.sessionExposure
                                  //   }
                                  sessionBets={sessionBetsData?.length}
                                  //   setPopData={setPopData}
                                  //   popData={popData}
                                  max={item?.betfair_session_max_bet}
                                  min={item?.betfair_session_min_bet}
                                />
                              )}
                            </Box>
                            <Box
                              sx={{
                                flex: 1,
                                flexDirection: "column",
                                display: "flex",
                                minHeight: "100px",
                                marginX: "0.5%",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  width: "100%",
                                }}
                              >
                                <Box
                                  sx={{
                                    width: "150px",
                                    marginY: ".75%",
                                    height: "35px",
                                  }}
                                ></Box>
                              </Box>
                              <FullAllBets
                                IObets={IObetsData}
                                // mode={mode}
                                tag={false}
                                // setSelectedBetData={setSelectedBetData}
                                // selectedBetData={selectedBetData}
                              />
                            </Box>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box
                            sx={{
                              maxWidth: matchesMobile ? "99%" : "49.5%",
                              flex: matchesMobile ? "0 0 99%" : "0 0 49.5%",
                              marginRight: "0.5%",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "16px",
                                color: "white",
                                fontWeight: "700",
                                paddingTop: "0.7%",
                                alignSelf: "start",
                              }}
                            >
                              {item?.teamA} V/S {item?.teamB}
                              <Button
                                // onClick={() => handleClicked(item?.id)}
                                sx={{
                                  backgroundColor: "#F8C851",
                                  fontSize: "10px",
                                  color: "black",
                                  fontWeight: "700",
                                  float: "right",
                                  border: " 1px solid white",
                                  marginBottom: "2px",
                                  alignSelf: "start",
                                  "&:hover": { backgroundColor: "#F8C851" },
                                }}
                              >
                                User Profit Loss
                              </Button>
                            </Typography>
                            {item?.apiMatchActive && (
                              <MatchOdds
                                currentMatch={item}
                                // matchOddsLive={matchOddsLive}
                                matchOddsLive={item?.matchOddsLive}
                                // data={[]}
                                data={
                                  item?.matchOddsLive?.runners?.length > 0
                                    ? item?.matchOddsLive?.runners
                                    : []
                                }
                                typeOfBet={"Match Odds"}
                              />
                            )}
                            {/* {item?.manualBookMakerActive && (
                              <Odds
                                currentMatch={item}
                                data={item}
                                manualBookmakerData={matchOddsDataTemp}
                                typeOfBet={"Quick Bookmaker"}
                                // data={matchOddsLive?.length > 0 ? matchOddsLive[0] : []}
                              />
                            )} */}
                            {manualSessionHttp?.manualBookRate?.map(
                              (bookmaker: any) => {
                                if (bookmaker.betStatus === 1) {
                                  return (
                                    <MatchOdds
                                      currentMatch={item}
                                      session={"manualBookMaker"}
                                      data={bookmaker}
                                      minBet={bookmaker?.min_bet || 0}
                                      maxBet={bookmaker?.max_bet || 0}
                                      typeOfBet={bookmaker?.marketName}
                                      matchOddsData={bookmaker}
                                    />
                                  );
                                }
                              }
                            )}
                            {item?.apiBookMakerActive && (
                              <LiveBookmaker
                                currentMatch={item}
                                bookmakerLive={item?.bookmakerLive}
                                data={
                                  item?.bookmakerLive?.runners?.length > 0
                                    ? item?.bookmakerLive?.runners
                                    : []
                                }
                              />
                            )}

                            {item?.manualSessionActive && (
                              <SessionMarket
                                title={"Quick Session Market"}
                                // match={"multiple"}
                                // currentOdds={currentOdds}
                                currentMatch={item}
                                // sessionExposer={
                                //   manualSessionHttp?.sessionExposure
                                // }
                                sessionOffline={item?.sessionOffline}
                                sessionBets={sessionBetsData?.length}
                                // setPopData={setPopData}
                                // popData={popData}
                                // sessionData={
                                //   manualSessionHttp?.manualSessionRate
                                // }
                                max={item?.manaual_session_max_bet}
                                min={item?.manaual_session_min_bet}
                              />
                            )}
                            {item?.apiSessionActive && (
                              <SessionMarket
                                title={"Session Market"}
                                match={"multiple"}
                                // currentOdds={currentOdds}
                                currentMatch={item}
                                // sessionExposer={
                                //   manualSessionHttp?.sessionExposure
                                // }
                                sessionOffline={item?.sessionOffline}
                                sessionBets={sessionBetsData?.length}
                                // setPopData={setPopData}
                                // popData={popData}
                                max={item?.betfair_session_max_bet}
                                min={item?.betfair_session_min_bet}
                              />
                            )}
                            <FullAllBets
                              tag={true}
                              IObets={IObetsData}
                              //   setSelectedBetData={setSelectedBetData}
                              //   selectedBetData={selectedBetData}
                            />
                          </Box>
                        </>
                      )}
                    </>
                  );
                })}
            </Box>
          </Box>
          <ModalMUI
            open={false}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignSelf: "center",
              }}
            >
              <Box
                sx={{
                  alignSelf: "center",
                  width: { xs: "90%", lg: "50%" },
                }}
              >
                <UserProfitLoss
                  title={"User Profit Loss"}
                  //   matchId={storedMatchid}
                  //   setShowUserProfitLoss={setShowUserProfitLoss}
                  single={"multiple"}
                />
              </Box>
            </Box>
          </ModalMUI>
        </>
      )}

      {(location?.state?.match === 4 || location?.state?.match === 2) && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: { matchesMobile: "column", lg: "row" },
              flex: 1,
              height: "100%",
              // marginX: "0.5%",
              marginLeft: "0.5%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {matchData?.length > 0 &&
                matchData?.map((item: any, index: any) => {
                  let manualSessionHttp: any = {};
                  if (manualRateHttp.hasOwnProperty(item?.id)) {
                    manualSessionHttp = manualRateHttp[item?.id];
                  }
                  let matchOddsDataTemp = item?.bettings?.filter(
                    (element: any) => element?.sessionBet === false
                  );
                  let IObetsData = IObets?.filter(
                    (element: any) => element?.match_id === item?.id
                  );
                  let sessionBetsData = sessionBets?.filter(
                    (element: any) => element?.match_id === item?.id
                  );
                  console.log("sdsdfsf", item, index);
                  return (
                    <>
                      <Box
                        key={item?.id}
                        sx={{
                          maxWidth: matchesMobile ? "99%" : "49.5%",
                          flex: matchesMobile ? "0 0 99%" : "0 0 49.5%",
                          marginRight: matchesMobile ? "0%" : "0.5%",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "16px",
                            color: "white",
                            fontWeight: "700",
                            paddingTop: "0.7%",
                            alignSelf: "start",
                          }}
                        >
                          {item?.teamA} V/S {item?.teamB}
                          <Button
                            // onClick={() => handleClicked(item?.id)}
                            sx={{
                              backgroundColor: "#F8C851",
                              fontSize: "10px",
                              color: "black",
                              fontWeight: "700",
                              float: "right",
                              border: " 1px solid white",
                              marginBottom: "2px",
                              alignSelf: "start",
                              "&:hover": { backgroundColor: "#F8C851" },
                            }}
                          >
                            User Profit Loss
                          </Button>
                        </Typography>

                        {item?.apiMatchActive && (
                          <MatchOdds
                            currentMatch={item}
                            matchOddsLive={item?.matchOddsLive}
                            data={
                              item.matchOddsLive?.runners?.length > 0
                                ? item.matchOddsLive?.runners
                                : []
                            }
                            typeOfBet={"Match Odds"}
                          />
                        )}
                        {/* {item?.manualBookMakerActive && (
                          <Odds
                            currentMatch={item}
                            data={item}
                            manualBookmakerData={matchOddsDataTemp}
                            typeOfBet={"Quick Bookmaker"}
                          />
                        )} */}
                        {manualSessionHttp?.manualBookRate?.map(
                          (bookmaker: any) => {
                            if (bookmaker.betStatus === 1) {
                              return (
                                <MatchOdds
                                  key={bookmaker?.id}
                                  currentMatch={item}
                                  session={"manualBookMaker"}
                                  data={bookmaker}
                                  minBet={bookmaker?.min_bet || 0}
                                  maxBet={bookmaker?.max_bet || 0}
                                  typeOfBet={bookmaker?.marketName}
                                  matchOddsData={bookmaker}
                                />
                              );
                            }
                          }
                        )}

                        {item?.apiBookMakerActive && (
                          <LiveBookmaker
                            currentMatch={item}
                            bookmakerLive={item?.bookmakerLive}
                            data={
                              item?.bookmakerLive?.runners?.length > 0
                                ? item?.bookmakerLive?.runners
                                : []
                            }
                          />
                        )}

                        {item?.manualSessionActive && (
                          <SessionMarket
                            title={"Quick Session Market"}
                            // match={"multiple"}
                            currentMatch={item}
                            // currentOdds={currentOdds}
                            sessionOffline={item?.sessionOffline}
                            // sessionExposer={manualSessionHttp?.sessionExposure}
                            sessionBets={sessionBetsData?.length}
                            // sessionData={manualSessionHttp?.manualSessionRate}
                            // setPopData={setPopData}
                            // popData={popData}
                            max={item?.manaual_session_max_bet}
                            min={item?.manaual_session_min_bet}
                          />
                        )}
                        {item?.apiSessionActive && (
                          <SessionMarket
                            title={"Session Market"}
                            match={"multiple"}
                            currentMatch={item}
                            // currentOdds={currentOdds}
                            sessionOffline={item?.sessionOffline}
                            // sessionExposer={manualSessionHttp?.sessionExposure}
                            sessionBets={sessionBetsData?.length}
                            // setPopData={setPopData}
                            // popData={popData}
                            max={item?.betfair_session_max_bet}
                            min={item?.betfair_session_min_bet}
                          />
                        )}
                        <FullAllBets
                          tag={true}
                          IObets={IObetsData}
                          //   setSelectedBetData={setSelectedBetData}
                          //   selectedBetData={selectedBetData}
                        />
                      </Box>
                    </>
                  );
                })}
            </Box>
          </Box>
          <ModalMUI
            open={false}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignSelf: "center",
              }}
            >
              <Box
                sx={{
                  alignSelf: "center",
                  width: { xs: "90%", lg: "50%" },
                }}
              >
                <UserProfitLoss
                  title={"User Profit Loss"}
                  //   matchId={storedMatchid}
                  //   setShowUserProfitLoss={setShowUserProfitLoss}
                  single={"multiple"}
                />
              </Box>
            </Box>
          </ModalMUI>
        </>
      )}
    </>
  );
};

export default MultipleMatch;
