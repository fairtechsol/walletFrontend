import Loader from "../../components/Loader";
import { Box, Pagination, Typography } from "@mui/material";
import CustomBox from "../../components/analysis/CustomBox";
import { useState } from "react";
import MatchListComponent from "../../components/analysis/MatchListComponent";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Analysis = () => {
  const loading = false;
  const navigate = useNavigate();
  const [mode, setMode] = useState("0");
  const [max] = useState("2");
  const [selected, setSelected] = useState([]);

  const handleClick = (value: string) => {
    console.log(value);
    setMode("1");
  };

  const matchData: any[] = [
    {
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
    },
  ];

  const changeSelected = (i: any) => {
    if (mode === "0") {
      return false;
    }
    const x: any = [...selected];
    if (x.includes(i.id)) {
      const updatedSelected = x.filter((id: any) => id !== i.id);
      setSelected(updatedSelected);
    } else {
      if (+max === selected?.length) {
        return;
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          margin: "0.5%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginX: ".5%",
              padding: { xs: "5px", lg: "0px 8px" },
              flexDirection: { xs: "column", md: "row", lg: "row" },
              width: "100%",
              marginY: { xs: "1%", md: "1%", lg: "0" },
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                color: "white",
                width: "100%",
                fontWeight: "700",
                marginY: "0.5%",
                marginLeft: "5px",
                alignSelf: "start",
              }}
            >
              MARKET ANALYSIS
            </Typography>
            {mode == "0" && (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: {
                    xs: "center",
                    md: "flex-end",
                    lg: "flex-end",
                    marginRight: "0.5%",
                  },
                }}
              >
                <CustomBox
                  onClick={() => {
                    handleClick("2");
                  }}
                  title={"2 Match Screen"}
                />
                <Box sx={{ width: "10px" }}></Box>
                <CustomBox
                  onClick={() => {
                    handleClick("3");
                  }}
                  title={"3 Match Screen"}
                />
                <Box sx={{ width: "10px" }}></Box>
                <CustomBox
                  onClick={() => {
                    handleClick("4");
                  }}
                  title={"4 Match Screen"}
                />
              </Box>
            )}
            {mode == "1" && (
              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                <CustomBox
                  bg={"#E32A2A"}
                  onClick={() => {
                    setMode("0");
                  }}
                  title={"Cancel"}
                />
                <CustomBox
                  onClick={() => {
                    if (max == "2") {
                      if (selected.length != 2) {
                        return;
                      }
                    } else if (max == "3") {
                      if (selected.length != 3) {
                        return;
                      }
                    } else if (max == "4") {
                      if (selected.length != 4) {
                        return;
                      }
                    }
                    if (selected) setMode("0");
                    setSelected([]);
                    if (max == "3") {
                      navigate(
                        `wallet/${
                          window.location.pathname.split("/")[2]
                        }/match_submit`,
                        {
                          state: {
                            match: Number(max),
                            // matchIds: matchIds,
                            // marketIds: marketIds,
                          },
                        }
                      );
                      // navigate(`/${pathname.split("/")[1]}/match_submit1`, {
                      //   state: { matchIds: matchIds, marketIds: marketIds },
                      // });
                    } else {
                      navigate(
                        `wallet/${
                          window.location.pathname.split("/")[2]
                        }/match_submit`,
                        {
                          state: {
                            match: Number(max),
                            // matchIds: matchIds,
                            // marketIds: marketIds,
                          },
                        }
                      );
                    }
                  }}
                  title={"Submit"}
                />
                <Box sx={{ width: "10px" }}></Box>
              </Box>
            )}
          </Box>
        </Box>
        {loading ? (
          <Box
            sx={{
              height: "60vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </Box>
        ) : (
          matchData?.length > 0 && (
            <>
              {matchData?.map((i: any) => {
                return (
                  <MatchListComponent
                    key={i?.id}
                    data={i}
                    setSelected={() => changeSelected(i)}
                    mode={mode}
                    selected={!selected.includes(i.id as never)}
                    team={i?.teamA}
                    team_2={i?.teamB}
                  />
                );
              })}
              <Pagination
                // page={currentPage}
                className="whiteTextPagination d-flex justify-content-center"
                // count={pageCount}
                color="primary"
                // onChange={callPage}
              />
            </>
          )
        )}
      </Box>
    </>
  );
};

export default Analysis;
