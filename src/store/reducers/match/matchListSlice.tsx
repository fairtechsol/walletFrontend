import { createSlice } from "@reduxjs/toolkit";
import {
  getMatchDetail,
  getMatchDetailMarketAnalysis,
  getMatchListInplay,
  matchListInplaySuccessReset,
  resetMarketAnalysys,
  setCurrentOdd,
  updateBetDataOnDeclare,
  updateMatchRates,
  updateMatchRatesFromApiOnList,
  updateMatchRatesOnMarketUndeclare,
  updateMaxLossForBet,
  updateMaxLossForBetOnUndeclare,
  updateMaxLossForDeleteBet,
  updateTeamRates,
  updateTeamRatesOnDelete,
} from "../../actions/match/matchAction";

interface InitialState {
  matchListInplay: any;
  matchListInplaySuccess: boolean;
  matchDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
  getProfile: any;
  matchDetails: any;
  betPlaceData: any;
  currentOdd: any;
  marketAnalysis: any;
}

const initialState: InitialState = {
  getProfile: null,
  matchListInplay: null,
  matchListInplaySuccess: false,
  matchDetail: null,
  loading: false,
  success: false,
  error: null,
  matchDetails: null,
  betPlaceData: [],
  currentOdd: null,
  marketAnalysis: null,
};

const matchListSlice = createSlice({
  name: "matchListInplay",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMatchListInplay.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.matchListInplay = null;
      })
      .addCase(getMatchListInplay.fulfilled, (state, action) => {
        state.matchListInplay = action.payload;
        state.loading = false;
        state.matchListInplaySuccess = true;
        state.success = true;
      })
      .addCase(getMatchListInplay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(matchListInplaySuccessReset, (state) => {
        state.matchListInplaySuccess = false;
      })
      .addCase(getMatchDetail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.matchDetail = null;
      })
      .addCase(getMatchDetail.fulfilled, (state, action) => {
        state.matchDetail = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getMatchDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getMatchDetailMarketAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.marketAnalysis = null;
      })
      .addCase(getMatchDetailMarketAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.marketAnalysis = action.payload;
      })
      .addCase(getMatchDetailMarketAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(resetMarketAnalysys, (state) => {
        state.marketAnalysis = null;
      })
      .addCase(updateMatchRates.fulfilled, (state, action) => {
        const { apiSession, sessionBettings, tournament } = action.payload;

        const parsedSessionBettings = new Map(
          (state.matchDetail?.sessionBettings || []).map((item: any) => {
            const parsed = JSON.parse(item);
            return [parsed.id, parsed];
          })
        );

        (sessionBettings || []).forEach((item: any) => {
          const parsed = JSON.parse(item);
          const existing = parsedSessionBettings.get(parsed.id);
          parsedSessionBettings.set(
            parsed.id,
            existing ? { ...existing, ...parsed } : parsed
          );
        });

        const stringifiedSessionBetting = Array.from(
          parsedSessionBettings.values()
        ).map((item) => JSON.stringify(item));

        state.matchDetail = {
          ...state.matchDetail,
          manualSessionActive: sessionBettings?.length >= 0 ? true : false,
          apiSession,
          sessionBettings: stringifiedSessionBetting,
          tournament: tournament?.sort((a: any, b: any) => {
            if (a.sno !== b.sno) {
              return a.sno - b.sno;
            }
            if (a.parentBetId === null && b.parentBetId !== null) return -1;
            if (a.parentBetId !== null && b.parentBetId === null) return 1;
            return 0;
          }),
        };
      })
      .addCase(updateMatchRatesFromApiOnList.fulfilled, (state, action) => {
        const matchListFromApi = action.payload;

        if (
          state.matchListInplay?.matches?.length &&
          matchListFromApi?.length
        ) {
          const apiMatchMap = new Map();

          matchListFromApi.forEach((item: any) => {
            const id = Number(item.beventId || item.gmid);
            apiMatchMap.set(id, item);
          });

          state.matchListInplay.matches = state.matchListInplay.matches.map(
            (match: any) => {
              const matchFromApi = apiMatchMap.get(+match.eventId);
              return matchFromApi ? { ...match, ...matchFromApi } : match;
            }
          );
        }
      })
      .addCase(updateMaxLossForBetOnUndeclare.fulfilled, (state, action) => {
        const { betId, matchId, parentRedisUpdateObj } = action.payload;
        if (state?.matchDetail?.id === matchId) {
          state.matchDetail = {
            ...state.matchDetail,
            profitLossDataSession: Array.from(
              new Set([
                ...state.matchDetail.profitLossDataSession,
                {
                  betId: betId,
                  maxLoss: JSON.parse(
                    parentRedisUpdateObj[`${betId}_profitLoss`]
                  )?.maxLoss,
                  totalBet: JSON.parse(
                    parentRedisUpdateObj[`${betId}_profitLoss`]
                  )?.totalBet,
                  profitLoss: JSON.parse(
                    parentRedisUpdateObj[`${betId}_profitLoss`]
                  )?.betPlaced,
                },
              ])
            ),
          };
        }
      })
      .addCase(updateBetDataOnDeclare.fulfilled, (state, action) => {
        const { betId, matchId } = action.payload;
        if (state?.matchDetail?.id === matchId) {
          const updatedProfitLossDataSession =
            state.matchDetail?.profitLossDataSession?.filter(
              (item: any) => item?.betId !== betId
            );

          state.matchDetail = {
            ...state.matchDetail,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        }
      })
      .addCase(updateMaxLossForBet.fulfilled, (state, action) => {
        const { jobData, profitLoss } = action.payload;
        if (state?.matchDetail?.id === jobData?.placedBet?.matchId) {
          const updatedProfitLossDataSession =
            state?.matchDetail?.profitLossDataSession?.map((item: any) => {
              if (item?.betId !== jobData?.placedBet?.betId) return item;
              return {
                ...item,
                maxLoss: profitLoss?.maxLoss,
                totalBet: profitLoss?.totalBet,
                profitLoss: profitLoss?.betPlaced,
              };
            });

          const betIndex = updatedProfitLossDataSession?.findIndex(
            (item: any) => item?.betId === jobData?.placedBet?.betId
          );
          if (betIndex === -1) {
            updatedProfitLossDataSession?.push({
              betId: jobData?.placedBet?.betId,
              maxLoss: profitLoss?.maxLoss,
              profitLoss: profitLoss?.betPlaced,
              totalBet: 1,
            });
          }

          state.matchDetail = {
            ...state.matchDetail,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        }
      })
      .addCase(updateTeamRates.fulfilled, (state, action) => {
        const { userRedisObj, jobData } = action.payload;
        state.matchDetail.profitLossDataMatch = {
          ...state.matchDetail.profitLossDataMatch,
          [jobData?.betId + "_profitLoss_" + state.matchDetail?.id]:
            JSON.stringify(userRedisObj),
        };
      })
      .addCase(updateMaxLossForDeleteBet.fulfilled, (state, action) => {
        const { matchId, betId, profitLoss } = action.payload;
        if (state?.matchDetail?.id === matchId) {
          const updatedProfitLossDataSession =
            state?.matchDetail?.profitLossDataSession?.map((item: any) => {
              if (betId !== item?.betId) return item;
              return {
                ...item,
                maxLoss: profitLoss?.maxLoss,
                totalBet: profitLoss?.totalBet,
                profitLoss: profitLoss?.betPlaced,
              };
            });

          const betIndex = updatedProfitLossDataSession.findIndex(
            (item: any) => item?.betId === betId
          );
          if (betIndex === -1) {
            updatedProfitLossDataSession?.push({
              betId: betId,
              maxLoss: profitLoss?.maxLoss,
              profitLoss: profitLoss?.betPlaced,
              totalBet: 1,
            });
          }
          state.matchDetail = {
            ...state.matchDetail,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        }
      })
      .addCase(updateTeamRatesOnDelete.fulfilled, (state, action) => {
        const { betId, teamRate } = action.payload;

        state.matchDetail.profitLossDataMatch = {
          ...state.matchDetail.profitLossDataMatch,
          [betId + "_profitLoss_" + state.matchDetail?.id]:
            JSON.stringify(teamRate),
        };
      })
      .addCase(updateMatchRatesOnMarketUndeclare.fulfilled, (state, action) => {
        const { betId, profitLossData } = action.payload;

        state.matchDetail.profitLossDataMatch = {
          ...state.matchDetail.profitLossDataMatch,
          [betId + "_profitLoss_" + state.matchDetail?.id]:
            JSON.stringify(profitLossData),
        };
      })
      .addCase(setCurrentOdd.fulfilled, (state, action) => {
        state.currentOdd = action.payload;
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
