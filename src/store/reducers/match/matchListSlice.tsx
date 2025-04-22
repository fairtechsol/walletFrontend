import { createSlice } from "@reduxjs/toolkit";
import { convertData, updateSessionBettingsItem } from "../../../helper";
import { profitLossDataForMatchConstants } from "../../../utils/Constants";
import {
  getMatchDetail,
  getMatchDetailMarketAnalysis,
  getMatchListInplay,
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
        state.matchListInplay = action?.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getMatchListInplay.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getMatchDetail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.matchDetail = null;
      })
      .addCase(getMatchDetail.fulfilled, (state, action) => {
        state.matchDetail = action?.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getMatchDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getMatchDetailMarketAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.marketAnalysis = null;
      })
      .addCase(getMatchDetailMarketAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.marketAnalysis = action?.payload;
      })
      .addCase(getMatchDetailMarketAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(resetMarketAnalysys, (state) => {
        state.marketAnalysis = null;
      })
      .addCase(updateMatchRates.fulfilled, (state, action) => {
        const { apiSession, sessionBettings, tournament } = action?.payload;

        const parsedSessionBettings =
          state.matchDetail?.sessionBettings?.map(JSON.parse) || [];
        const apiParsedSessionBettings = sessionBettings?.map(JSON.parse) || [];

        apiParsedSessionBettings.forEach((apiItem: any) => {
          const index = parsedSessionBettings.findIndex(
            (parsedItem: any) => parsedItem.id === apiItem.id
          );
          if (index !== -1) {
            parsedSessionBettings[index] = {
              ...parsedSessionBettings[index],
              ...apiItem,
            };
          } else {
            parsedSessionBettings.push(apiItem);
          }
        });
        const stringifiedSessionBetting = parsedSessionBettings.map(
          JSON.stringify
        );

        state.matchDetail = {
          ...state.matchDetail,
          manualSessionActive: sessionBettings?.length >= 0 ? true : false,
          apiSession,
          sessionBettings: stringifiedSessionBetting,
          updatedSessionBettings: updateSessionBettingsItem(
            convertData(parsedSessionBettings),
            apiSession
          ),
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
            if (item?.gameId) apiMatchMap.set(+item.gameId, item);
            if (item?.gmid) apiMatchMap.set(+item.gmid, item);
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
        const { betId, matchId, parentRedisUpdateObj } = action?.payload;
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
        const { betId, matchId } = action?.payload;
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
        const { jobData, profitLoss } = action?.payload;
        if (state?.matchDetail?.id === jobData?.placedBet?.matchId) {
          const updatedProfitLossDataSession =
            state?.matchDetail?.profitLossDataSession?.map((item: any) => {
              if (item?.betId === jobData?.placedBet?.betId) {
                return {
                  ...item,
                  maxLoss: profitLoss?.maxLoss,
                  totalBet: profitLoss?.totalBet,
                  profitLoss: profitLoss?.betPlaced,
                };
              }
              return item;
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
        if (jobData?.newBet?.marketType === "other") {
          state.matchDetail.teamRates = {
            ...state.matchDetail.teamRates,
            [profitLossDataForMatchConstants[jobData?.newBet?.marketType].A +
            "_" +
            jobData?.newBet?.betId +
            "_" +
            state.matchDetail?.id]: userRedisObj[jobData?.teamArateRedisKey],
            [profitLossDataForMatchConstants[jobData?.newBet?.marketType].B +
            "_" +
            jobData?.newBet?.betId +
            "_" +
            state.matchDetail?.id]: userRedisObj[jobData?.teamBrateRedisKey],
            [profitLossDataForMatchConstants[jobData?.newBet?.marketType].C +
            "_" +
            jobData?.newBet?.betId +
            "_" +
            state.matchDetail?.id]: userRedisObj[jobData?.teamCrateRedisKey],
          };
        } else if (jobData?.newBet?.marketType === "tournament") {
          state.matchDetail.teamRates = {
            ...state.matchDetail.teamRates,
            [jobData?.betId + "_" + "profitLoss" + "_" + state.matchDetail?.id]:
              JSON.stringify(userRedisObj),
          };
        } else {
          state.matchDetail.teamRates = {
            ...state.matchDetail.teamRates,
            [profitLossDataForMatchConstants[jobData?.newBet?.marketType].A +
            "_" +
            state.matchDetail?.id]: userRedisObj[jobData?.teamArateRedisKey],
            [profitLossDataForMatchConstants[jobData?.newBet?.marketType].B +
            "_" +
            state.matchDetail?.id]: userRedisObj[jobData?.teamBrateRedisKey],
            [profitLossDataForMatchConstants[jobData?.newBet?.marketType].C +
            "_" +
            state.matchDetail?.id]: userRedisObj[jobData?.teamCrateRedisKey],
          };
        }
      })
      .addCase(updateMaxLossForDeleteBet.fulfilled, (state, action) => {
        const { matchId, betId, profitLoss } = action?.payload;
        if (state?.matchDetail?.id === matchId) {
          const updatedProfitLossDataSession =
            state?.matchDetail?.profitLossDataSession?.map((item: any) => {
              if (betId === item?.betId) {
                return {
                  ...item,
                  maxLoss: profitLoss?.maxLoss,
                  totalBet: profitLoss?.totalBet,
                  profitLoss: profitLoss?.betPlaced,
                };
              }
              return item;
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
        const {
          redisObject,
          betId,
          teamRate,
          matchBetType,
          teamArateRedisKey,
          teamBrateRedisKey,
          teamCrateRedisKey,
        } = action?.payload;

        if (matchBetType === "other") {
          if (redisObject[teamCrateRedisKey]) {
            state.matchDetail.profitLossDataMatch = {
              ...state.matchDetail.profitLossDataMatch,
              [profitLossDataForMatchConstants[matchBetType].A +
              "_" +
              betId +
              "_" +
              state.matchDetail?.id]: redisObject[teamArateRedisKey],
              [profitLossDataForMatchConstants[matchBetType].B +
              "_" +
              betId +
              "_" +
              state.matchDetail?.id]: redisObject[teamBrateRedisKey],
              [profitLossDataForMatchConstants[matchBetType].C +
              "_" +
              betId +
              "_" +
              state.matchDetail?.id]: redisObject[teamCrateRedisKey],
            };
          } else {
            state.matchDetail.profitLossDataMatch = {
              ...state.matchDetail.profitLossDataMatch,
              [profitLossDataForMatchConstants[matchBetType].A +
              "_" +
              betId +
              "_" +
              state.matchDetail?.id]: redisObject[teamArateRedisKey],
              [profitLossDataForMatchConstants[matchBetType].B +
              "_" +
              betId +
              "_" +
              state.matchDetail?.id]: redisObject[teamBrateRedisKey],
            };
          }
        } else if (matchBetType === "tournament") {
          state.matchDetail.profitLossDataMatch = {
            ...state.matchDetail.profitLossDataMatch,
            [betId + "_" + "profitLoss" + "_" + state.matchDetail?.id]:
              JSON.stringify(teamRate),
          };
        } else {
          if (redisObject[teamCrateRedisKey]) {
            state.matchDetail.profitLossDataMatch = {
              ...state.matchDetail.profitLossDataMatch,
              [profitLossDataForMatchConstants[matchBetType].A +
              "_" +
              state.matchDetail?.id]: redisObject[teamArateRedisKey],
              [profitLossDataForMatchConstants[matchBetType].B +
              "_" +
              state.matchDetail?.id]: redisObject[teamBrateRedisKey],
              [profitLossDataForMatchConstants[matchBetType].C +
              "_" +
              state.matchDetail?.id]: redisObject[teamCrateRedisKey],
            };
          } else {
            state.matchDetail.profitLossDataMatch = {
              ...state.matchDetail.profitLossDataMatch,
              [profitLossDataForMatchConstants[matchBetType].A +
              "_" +
              state.matchDetail?.id]: redisObject[teamArateRedisKey],
              [profitLossDataForMatchConstants[matchBetType].B +
              "_" +
              state.matchDetail?.id]: redisObject[teamBrateRedisKey],
            };
          }
        }

        // if (redisObject[teamCrateRedisKey]) {
        //   state.matchDetail.profitLossDataMatch = {
        //     ...state.matchDetail.profitLossDataMatch,
        //     [profitLossDataForMatchConstants[matchBetType].A]:
        //       redisObject[teamArateRedisKey],
        //     [profitLossDataForMatchConstants[matchBetType].B]:
        //       redisObject[teamBrateRedisKey],
        //     [profitLossDataForMatchConstants[matchBetType].C]:
        //       redisObject[teamCrateRedisKey],
        //   };
        // } else {
        //   state.matchDetail.profitLossDataMatch = {
        //     ...state.matchDetail.profitLossDataMatch,
        //     [profitLossDataForMatchConstants[matchBetType].A]:
        //       redisObject[teamArateRedisKey],
        //     [profitLossDataForMatchConstants[matchBetType].B]:
        //       redisObject[teamBrateRedisKey],
        //   };
        // }
      })
      .addCase(updateMatchRatesOnMarketUndeclare.fulfilled, (state, action) => {
        const {
          profitLossData,
          betType,
          teamArateRedisKey,
          teamBrateRedisKey,
          teamCrateRedisKey,
        } = action?.payload;

        if (profitLossData[teamCrateRedisKey]) {
          state.matchDetail.profitLossDataMatch = {
            ...state.matchDetail.profitLossDataMatch,
            [profitLossDataForMatchConstants[betType].A]:
              profitLossData[teamArateRedisKey],
            [profitLossDataForMatchConstants[betType].B]:
              profitLossData[teamBrateRedisKey],
            [profitLossDataForMatchConstants[betType].C]:
              profitLossData[teamCrateRedisKey],
          };
        } else {
          state.matchDetail.profitLossDataMatch = {
            ...state.matchDetail.profitLossDataMatch,
            [profitLossDataForMatchConstants[betType].A]:
              profitLossData[teamArateRedisKey],
            [profitLossDataForMatchConstants[betType].B]:
              profitLossData[teamBrateRedisKey],
          };
        }
      })
      .addCase(setCurrentOdd.fulfilled, (state, action) => {
        state.currentOdd = action?.payload;
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
