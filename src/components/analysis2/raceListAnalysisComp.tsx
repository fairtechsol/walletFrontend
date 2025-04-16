import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Paper,
  Radio,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import moment from "moment";
import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRateMarketAnalysis } from "../../store/actions/horseRacing/analysisActions";
import { AppDispatch, RootState } from "../../store/store";

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
  position: "relative",
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

  const [selectedRace, setSelectedRace] = useState<any>(null);

  const { raceMatchChilds } = useSelector(
    (state: RootState) => state.horseRacing.analysisRace
  );

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
      <Table aria-label="time table" sx={{ borderCollapse: "collapse" }}>
        <TableBody>
          {Object.entries(racingList || {})?.map(
            ([matchName, item]: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  <TableRow sx={{ position: "relative" }}>
                    {mode === "1" && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: item?.some((time: any) =>
                            selected?.includes(time?.id)
                          )
                            ? ""
                            : "rgba(0, 0, 0, 0.6)",
                          zIndex: 1,
                          pointerEvents: "none",
                        }}
                      />
                    )}
                    <TableCell
                      sx={{
                        borderRight: "1px solid rgba(224, 224, 224, 1)",
                        padding: "5px",
                        width: "30%",
                      }}
                    >
                      {matchName}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "5px",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {item?.map((time: any) => (
                        <YellowButton
                          key={time?.id}
                          onClick={() => {
                            if (mode === "1") {
                              handleRadioButtonSelect({
                                id: time?.id,
                                matchType: time?.matchType,
                              });
                            } else {
                              navigate(
                                `/wallet/race_list/${matchType}/${time.id}`
                              );
                            }
                          }}
                        >
                          {mode === "1" && (
                            <div
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: selected.includes(time?.id)
                                  ? ""
                                  : "rgba(0, 0, 0, 0.3)",
                                zIndex: 1,
                                pointerEvents: "none",
                              }}
                            ></div>
                          )}
                          {moment(time.startAt).format("hh:mm")}
                          <ExpandMoreIcon
                            sx={{ cursor: "pointer" }}
                            onClick={(e) => {
                              if (mode !== "1") {
                                e.stopPropagation();
                                handleRaceClick(time, matchName);
                              }
                            }}
                          />
                          {mode === "1" && (
                            <Radio
                              checked={selected.includes(time?.id)}
                              value={time?.id}
                              name="radio-buttons"
                            />
                          )}
                        </YellowButton>
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
                            {raceMatchChilds?.profitLoss?.map((item: any) => (
                              <Button
                                key={item?.id}
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
                                      item?.profitLoss >= 0 || !item?.profitLoss
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
                                  {item?.profitLoss ? item?.profitLoss : "0.00"}
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

export default memo(RacingListComponentAnalysis);
