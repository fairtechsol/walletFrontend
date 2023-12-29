import { Box, Pagination } from "@mui/material";
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

const Inplay = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, matchListInplay, success } = useSelector(
    (state: RootState) => state.match.matchList
  );

  useEffect(() => {
    dispatch(getMatchListInplay({ currentPage: currentPage }));
  }, [currentPage]);

  useEffect(() => {
    if (success) {
      dispatch(matchListReset());
    }
  }, [success]);

  return (
    <>
      {matchListInplay?.matches &&
        matchListInplay?.matches?.map((match: any) => {
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
        })}
      {matchListInplay?.matches?.length != 0 && (
        <Pagination
          page={currentPage}
          className="whiteTextPagination d-flex justify-content-center"
          count={Math.ceil(
            parseInt(matchListInplay?.count ? matchListInplay?.count : 1) /
              Constants.pageLimit
          )}
          color="primary"
          onChange={(e: any, value: number) => {
            setCurrentPage(value);
            console.log(e)
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
