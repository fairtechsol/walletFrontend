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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  analysisListReset,
  getMultipleMatchDetail,
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import { useSelector } from "react-redux";

const MultipleMatch = ({}) => {
  const theme = useTheme();
  const { state } = useLocation();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();
  const { multipleMatchDetail, success, loading } = useSelector(
    (state: RootState) => state.match.analysisList
  );

  const manualRateHttp: any = {};

  const IObets: any = [];
  const sessionBets: any = [];

  useEffect(() => {
    if (state?.matchIds) {
      dispatch(getMultipleMatchDetail(state?.matchIds));
    }
  }, [state?.matchIds]);

  useEffect(() => {
    if (success) {
      dispatch(analysisListReset());
    }
  }, [success]);

  return (
    <>
      {state?.match == 3 && (
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
              {multipleMatchDetail?.length > 0 &&
                multipleMatchDetail?.map((item: any, index: any) => {
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

      {(state?.match == 2 || state?.match == 4) && (
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
              {multipleMatchDetail?.length > 0 &&
                multipleMatchDetail?.map((item: any) => {
                  let manualSessionHttp: any = {};
                  if (manualRateHttp.hasOwnProperty(item?.id)) {
                    manualSessionHttp = manualRateHttp[item?.id];
                  }
                  // let matchOddsDataTemp = item?.bettings?.filter(
                  //   (element: any) => element?.sessionBet === false
                  // );
                  let IObetsData = IObets?.filter(
                    (element: any) => element?.match_id === item?.id
                  );
                  let sessionBetsData = sessionBets?.filter(
                    (element: any) => element?.match_id === item?.id
                  );
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
