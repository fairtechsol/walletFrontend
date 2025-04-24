import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MatchComponent from "../../components/Inplay/MatchComponent";
import Loader from "../../components/Loader";
import { socket, socketService } from "../../socketManager";
import {
  getMatchListInplay,
  updateMatchRatesFromApiOnList,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import { Constants, marketApiConst } from "../../utils/Constants";
const Inplay = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, matchListInplay, success } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const useStyles = makeStyles({
    whiteTextPagination: {
      "& .MuiPaginationItem-root": {
        color: "white",
      },
    },
  });
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  const getMatchListService = () => {
    dispatch(getMatchListInplay({ currentPage: currentPage }));
  };

  useEffect(() => {
    try {
      dispatch(getMatchListInplay({ currentPage: currentPage }));
    } catch (e) {
      console.log(e);
    }
  }, [currentPage]);

  const getMatchListMarket = async (matchType: string) => {
    try {
      const resp: any = await axios.get(marketApiConst[matchType], {
        timeout: 2000,
      });
      if (resp?.status) {
        dispatch(updateMatchRatesFromApiOnList(resp?.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      if (success && profileDetail?.roleName && socket) {
        socketService.match.matchResultDeclaredOff();
        socketService.match.matchResultUnDeclaredOff();
        socketService.match.declaredMatchResultAllUserOff();
        socketService.match.unDeclaredMatchResultAllUserOff();
        socketService.match.matchAddedOff();
        matchListInplay?.matches?.map((item: any) => {
          socketService.match.joinMatchRoom(item?.id);
        });
        socketService.match.matchResultDeclared(getMatchListService);
        socketService.match.matchResultUnDeclared(getMatchListService);
        socketService.match.declaredMatchResultAllUser(getMatchListService);
        socketService.match.unDeclaredMatchResultAllUser(getMatchListService);
        socketService.match.matchAdded(getMatchListService);
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, profileDetail?.roleName, socket]);

  useEffect(() => {
    return () => {
      socketService.match.matchResultDeclaredOff();
      socketService.match.matchResultUnDeclaredOff();
      socketService.match.declaredMatchResultAllUserOff();
      socketService.match.unDeclaredMatchResultAllUserOff();
      socketService.match.matchAddedOff();
    };
  }, [success, profileDetail?.roleName, socket]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setCurrentPage(1);
        getMatchListService();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getMatchListMarket("cricket");
      getMatchListMarket("tennis");
      getMatchListMarket("football");
    }, 1500);
    const intervalId = setInterval(() => {
      getMatchListMarket("cricket");
      getMatchListMarket("tennis");
      getMatchListMarket("football");
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const classes = useStyles();
  return (
    <>
      {matchListInplay && matchListInplay?.matches?.length > 0
        ? matchListInplay?.matches?.map((match: any) => {
            return (
              <MatchComponent
                key={match.id}
                onClick={() => {
                  navigate(`/wallet/live_market/matches`, {
                    state: {
                      submit: true,
                      matchId: match?.id,
                      matchType: match?.matchType,
                    },
                  });
                }}
                top={true}
                blur={false}
                match={match}
              />
            );
          })
        : !loading && (
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
      {matchListInplay && matchListInplay?.matches?.length > 0 && (
        <Pagination
          page={currentPage}
          className={`${classes.whiteTextPagination} d-flex justify-content-center`}
          count={Math.ceil(
            parseInt(matchListInplay?.count ? matchListInplay?.count : 1) /
              Constants.pageLimit
          )}
          color="primary"
          onChange={(_: any, value: number) => {
            setCurrentPage(value);
          }}
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

export default memo(Inplay);
