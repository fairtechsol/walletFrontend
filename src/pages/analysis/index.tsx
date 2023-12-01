import Loader from "../../components/Loader";
import { Box, Pagination, Typography } from "@mui/material";
import CustomBox from "../../components/analysis/CustomBox";
import { useState } from "react";
import MatchListComponent from "../../components/analysis/MatchListComponent";
import "./index.css"

const Analysis = () => {
  const loading = false;
  const [mode, setMode] = useState("0");

  const handleClick = (value: string) => {
    console.log(value);
    setMode("1");
  };

  const matchData: any = [
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
      teamA_rate: null,
      teamB_rate: null,
      teamC_rate: null,
      totalPlacedBet: 0,
    },
  ];

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
                  // onClick={(e) => {
                  //   if (max == "2") {
                  //     if (selected.length != 2) {
                  //       return;
                  //     }
                  //   } else if (max == "3") {
                  //     if (selected.length != 3) {
                  //       return;
                  //     }
                  //   } else if (max == "4") {
                  //     if (selected.length != 4) {
                  //       return;
                  //     }
                  //   }
                  //   if (selected) setMode("0");
                  //   setSelected([]);
                  //   if (max == "3") {
                  //     navigate(`/${pathname.split("/")[1]}/match_submit`, {
                  //       state: {
                  //         activeTab: "Analysis",

                  //         match: Number(max),
                  //         matchIds: matchIds,
                  //         marketIds: marketIds,
                  //       },
                  //     });
                  //     // navigate(`/${pathname.split("/")[1]}/match_submit1`, {
                  //     //   state: { matchIds: matchIds, marketIds: marketIds },
                  //     // });
                  //   } else {
                  //     navigate(`/${pathname.split("/")[1]}/match_submit`, {
                  //       state: {
                  //         match: Number(max),
                  //         matchIds: matchIds,
                  //         marketIds: marketIds,
                  //         activeTab: "Analysis",
                  //       },
                  //     });
                  //   }
                  // }}
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
                    // setSelected={() => changeSelected(k, i)}
                    mode={mode}
                    // selected={!selected.includes(i?.id)}
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
