import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import Loader from "../../components/Loader";
import MatchComponent from "../../components/Inplay/MatchComponent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getMatchListInplay,
  matchListReset,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { Constants } from "../../utils/Constants";
import { socketService } from "../../socketManager";

const Inplay = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, matchListInplay, success } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  useEffect(() => {
    dispatch(getMatchListInplay({ currentPage: currentPage }));
  }, [currentPage]);

  useEffect(() => {
    if (success) {
      dispatch(matchListReset());
    }
  }, [success]);

  useEffect(() => {
    if (matchListInplay && matchListInplay?.length > 0) {
      matchListInplay?.map((item: any) => {
        socketService.match.joinMatchRoom(item?.id, profileDetail?.roleName);
      });
    }
    return () => {
      matchListInplay?.forEach((item: any) => {
        socketService.match.leaveMatchRoom(item?.id);
      });
    };
  }, [matchListInplay.length]);

  return (
    <>
      {matchListInplay?.length > 0 ? (
        matchListInplay?.map((match: any) => {
          return (
            <MatchComponent
              key={match.id}
              onClick={() => {
                navigate(`/wallet/live_market/matches`, {
                  state: {
                    submit: true,
                    matchId: match?.id,
                  },
                });
              }}
              top={true}
              blur={false}
              match={match}
              // handleUpdateMatch={handleUpdateMatch}
            />
          );
        })
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
      {matchListInplay?.length > 0 && (
        <Pagination
          page={currentPage}
          className="whiteTextPagination d-flex justify-content-center"
          count={Math.ceil(
            parseInt(matchListInplay?.length ? matchListInplay?.length : 1) /
              Constants.pageLimit
          )}
          color="primary"
          onChange={(e: any, value: number) => {
            console.log(e);
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

export default Inplay;
