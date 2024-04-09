import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import CustomBox from "../../components/analysis/CustomBox";
import MatchListComponent from "../../components/analysis/MatchListComponent";
import { socket, socketService } from "../../socketManager";
import { getAnalysisList } from "../../store/actions/match/multipleMatchActions";
import { AppDispatch, RootState } from "../../store/store";
import { Constants } from "../../utils/Constants";
import "./index.css";

import { makeStyles } from "@material-ui/core/styles";
const Analysis = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [mode, setMode] = useState("0");
  const [max, setMax] = useState("2");
  const [selected, setSelected] = useState<any>([]);
  const [matchIds, setMatchIds] = useState<any>([]);
  // const [marketIds, setMarketIds] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const useStyles = makeStyles({
    whiteTextPagination: {
      "& .MuiPaginationItem-root": {
        color: "white", // Change text color to white
      },
    },
  });
  const classes = useStyles();
  const { loading, analysisList, success } = useSelector(
    (state: RootState) => state.match.analysisList
  );

  const handleClick = (value: string) => {
    setMax(value);
    setMode("1");
  };

  const changeSelected = (match: any) => {
    if (mode === "0") {
      return false;
    }
    const x: any = [...selected];
    if (x.includes(match?.id)) {
      setMatchIds((prevIds: any) =>
        prevIds.filter((matchId: any) => matchId !== match?.id)
      );
      const updatedSelected = x.filter((id: any) => id !== match?.id);
      setSelected(updatedSelected);
    } else {
      setMatchIds((prevIds: any) => [...prevIds, match?.id]);
      setSelected([...x, match?.id]);
      if (+max === selected?.length) {
        toast.warn(`Only ${max} allowed`);
        return;
      }
    }
  };

  const getMatchist = () => {
    setCurrentPage(1);
    dispatch(getAnalysisList({ currentPage: currentPage }));
  };

  useEffect(() => {
    dispatch(getAnalysisList({ currentPage: currentPage }));
  }, [currentPage]);

  useEffect(() => {
    try {
      if (socket?.connected && success) {
        socketService.match.matchResultDeclaredOff();
        socketService.match.matchResultUnDeclaredOff();
        socketService.match.matchAddedOff();
        socketService.match.matchResultDeclared(getMatchist);
        socketService.match.matchResultUnDeclared(getMatchist);
        socketService.match.declaredMatchResultAllUser(getMatchist);
        socketService.match.unDeclaredMatchResultAllUser(getMatchist);
        socketService.match.matchAdded(getMatchist);
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket?.connected, success]);

  useEffect(() => {
    return () => {
      socketService.match.matchResultDeclaredOff();
      socketService.match.matchResultUnDeclaredOff();
      socketService.match.declaredMatchResultAllUserOff();
      socketService.match.unDeclaredMatchResultAllUserOff();
      socketService.match.matchAddedOff();
    };
  }, []);

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
                    setSelected([]);
                    setMatchIds([]);
                  }}
                  title={"Cancel"}
                />
                <CustomBox
                  onClick={() => {
                    if (max == "2") {
                      if (selected.length != 2) {
                        toast.error("Select 2 matches");
                        return;
                      }
                    } else if (max == "3") {
                      if (selected.length != 3) {
                        toast.error("Select 3 matches");
                        return;
                      }
                    } else if (max == "4") {
                      if (selected.length != 4) {
                        toast.error("Select 4 matches");
                        return;
                      }
                    }
                    if (selected) {
                      setMode("0");
                      setSelected([]);
                      setMatchIds([]);
                    }
                    if (max == "3") {
                      navigate(`/wallet/market_analysis/multiple_Match`, {
                        state: {
                          match: Number(max),
                          matchIds: matchIds,
                          // marketIds: marketIds,
                        },
                      });
                    } else {
                      navigate(`/wallet/market_analysis/multiple_Match`, {
                        state: {
                          match: Number(max),
                          matchIds: matchIds,
                          // marketIds: marketIds,
                        },
                      });
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
        ) : analysisList?.matches?.length > 0 ? (
          <>
            {analysisList?.matches?.map((match: any) => {
              return (
                <MatchListComponent
                  key={match?.id}
                  data={match}
                  setSelected={() => changeSelected(match)}
                  mode={mode}
                  selected={!selected.includes(match.id as never)}
                  team={match?.teamA}
                  team2={match?.teamB}
                />
              );
            })}
            <Pagination
              page={currentPage}
              className={`${classes.whiteTextPagination} d-flex justify-content-center`}
              count={Math.ceil(
                parseInt(analysisList?.count ? analysisList?.count : 1) /
                  Constants.pageLimit
              )}
              color="primary"
              onChange={(_: any, value: number) => {
                setCurrentPage(value);
              }}
            />
          </>
        ) : (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={{ color: "white", textAlign: "center" }}>
                  No Record Found...
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </Box>
    </>
  );
};

export default Analysis;
