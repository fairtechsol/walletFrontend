import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  styled,
  Box,
  Button,
} from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { getRateMarketAnalysis } from "../../store/actions/horseRacing/analysisActions";

const YellowButton = styled("button")(() => ({
  backgroundColor: "#F8C851",
  color: "black",
  border: "none",
  borderRadius: "4px",
  padding: "6px 12px",
  margin: "4px",
  cursor: "pointer",
  fontWeight: "bold",
  alignItems: "center",
  display: "flex",
  "&:hover": {
    backgroundColor: "#FFC107",
  },
}));

const RacingListComponentAnalysis = ({ racingList, matchType }: any) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { raceMatchChilds } = useSelector(
    (state: RootState) => state.horseRacing.analysisRace
  );

  const [selectedRace, setSelectedRace] = useState<any>(null);

  const handleRaceClick = (race: any, matchName: any) => {
    if (selectedRace && selectedRace?.id === race?.id) {
      setSelectedRace(null);
    } else {
      dispatch(getRateMarketAnalysis(race?.id));
      setSelectedRace({
        id: race?.id,
        matchName,
      });
    }
  };

  console.log(raceMatchChilds);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="time table">
        <TableBody>
          {Object.entries(racingList).map(
            ([matchName, item]: any, index: number) => {
              return (
                <>
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        border: "1px solid black",
                        padding: "5px",
                        width: "30%",
                      }}
                    >
                      {matchName}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid black",
                        padding: "5px",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {item?.map((time: any, idx: any) => (
                        <>
                          <YellowButton
                            key={idx}
                            onClick={() =>
                              navigate(
                                `/wallet/race_list/${matchType}/${time.id}`
                              )
                            }
                          >
                            {moment(time.startAt).format("hh:mm")}
                            <ExpandMoreIcon
                              sx={{ cursor: "pointer" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRaceClick(time, matchName);
                              }}
                            />
                          </YellowButton>
                        </>
                      ))}
                    </TableCell>
                  </TableRow>
                  {selectedRace &&
                    selectedRace?.matchName === matchName &&
                    raceMatchChilds && (
                      <TableRow>
                        <TableCell colSpan={2}>
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              alignItems: "center",
                            }}
                          >
                            {raceMatchChilds &&
                              raceMatchChilds?.profitLoss?.map((item: any) => (
                                <Button
                                  sx={{
                                    backgroundColor:
                                      item?.profitLoss >= 0
                                        ? "#27AC1E"
                                        : "#E32A2A",
                                    borderRadius: 0,
                                    // margin: "0.5rem",
                                    border: "1px solid #fff",
                                    color: "#fff",
                                    fontWeight: "700",
                                    "&:hover": {
                                      backgroundColor: "#F8C851",
                                    },
                                  }}
                                >
                                  {item?.name} :{" "}
                                  <span
                                    style={{
                                      marginLeft: "5px",
                                    }}
                                  >
                                    {item?.profitLoss
                                      ? item?.profitLoss
                                      : "0.00"}
                                  </span>
                                </Button>
                              ))}
                            <Button
                              sx={{
                                backgroundColor: "#0B4F26",
                                color: "#fff",
                                margin: "0.5rem",
                                fontWeight: "700",
                                "&:hover": {
                                  backgroundColor: "#0B4F26",
                                },
                              }}
                            >
                              Total Bet : {raceMatchChilds?.totalBet || 0}
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                </>
              );
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RacingListComponentAnalysis;
