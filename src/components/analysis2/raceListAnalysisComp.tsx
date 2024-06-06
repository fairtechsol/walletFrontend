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
  Radio,
} from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
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

const RacingListComponentAnalysis = ({
  racingList,
  matchType,
  mode,
  handleRadioButtonSelect,
  selected,
}: any) => {
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

  return (
    <TableContainer component={Paper}>
      <Table aria-label="time table">
        <TableBody>
          {Object.entries(racingList).map(
            ([matchName, item]: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  <TableRow>
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
                            {mode === "1" && (
                              <Radio
                                checked={selected.includes(time?.id)}
                                onClick={(e: any) => {
                                  e.stopPropagation();
                                  handleRadioButtonSelect({
                                    id: e.target.value,
                                    matchType: time?.matchType,
                                  });
                                }}
                                value={time?.id}
                                name="radio-buttons"
                                inputProps={{ "aria-label": "A" }}
                              />
                            )}
                          </YellowButton>
                        </>
                      ))}
                    </TableCell>
                  </TableRow>
                  {selectedRace &&
                    selectedRace?.matchName === matchName &&
                    raceMatchChilds && (
                      <TableRow>
                        <TableCell colSpan={2} sx={{ background: "#004A25" }}>
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
                                      item?.profitLoss >= 0 || !item?.profitLoss
                                        ? "#27AC1E"
                                        : "#E32A2A",
                                    borderRadius: 0,
                                    padding: "0.5rem",
                                    border: "1px solid #000",
                                    color: "#fff",
                                    fontWeight: "700",
                                    "&:hover": {
                                      backgroundColor:
                                        item?.profitLoss >= 0 ||
                                        !item?.profitLoss
                                          ? "#27AC1E"
                                          : "#E32A2A",
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
                                padding: "0.5rem",
                                fontWeight: "700",
                                borderRadius: 0,
                                border: "1px solid #000",
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
                </React.Fragment>
              );
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RacingListComponentAnalysis;
