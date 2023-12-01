import { Box, Pagination } from "@mui/material";
import Loader from "../../components/Loader";
import MatchComponent from "../../components/Inplay/MatchComponent";

const Inplay = () => {
  const loading = false;
  const matchData = [
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
      {matchData?.map((match: any) => {
        return (
          <MatchComponent
            key={match.id}
            onClick={() => {
              // navigate(`/${pathname.split("/")[1]}/matches`, {
              //   state: {
              //     submit: true,
              //     matchId: match?.id,
              //     activeTab: "INPLAY",
              //   },
              // });
            }}
            top={true}
            blur={false}
            match={match}
            // handleUpdateMatch={handleUpdateMatch}
          />
        );
      })}
      {matchData?.length != 0 && (
        <Pagination
          page={1}
          className="whiteTextPagination d-flex justify-content-center"
          count={1}
          color="primary"
          // onChange={callPage}
        />
      )}
      {loading && (
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader text="" />
        </Box>
      )}
    </>
  );
};

export default Inplay;
