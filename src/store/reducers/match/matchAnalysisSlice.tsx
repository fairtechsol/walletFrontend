import { createSlice } from "@reduxjs/toolkit";
import {
  analysisListReset,
  getAnalysisList,
  getMultipleMatchDetail,
  updateBetDataOnDeclareOfMultipleMatch,
  updateMatchRatesOnMarketUndeclareForMulti,
  updateMaxLossForBetForMultipleMatch,
  updateMaxLossForBetOnUndeclareForMultipleMatch,
  updateMaxLossForDeleteBetForMultiMatch,
  updateMultipleMatchDetail,
  updateProfitLossForMultipleMatch,
  updateTeamRatesOfMultipleMatch,
  updateTeamRatesOnDeleteForMultiMatch,
} from "../../actions/match/multipleMatchActions";
import { profitLossDataForMatchConstants } from "../../../utils/Constants";

interface InitialState {
  analysisList: any;
  multipleMatchDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  analysisList: [],
  multipleMatchDetail: [],
  loading: false,
  success: false,
  error: null,
};

const analysisListSlice = createSlice({
  name: "analysisList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnalysisList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getAnalysisList.fulfilled, (state, action) => {
        state.analysisList = action?.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getAnalysisList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getMultipleMatchDetail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMultipleMatchDetail.fulfilled, (state, action) => {
        state.multipleMatchDetail = action?.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getMultipleMatchDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateMultipleMatchDetail.fulfilled, (state, action) => {
        state.multipleMatchDetail = state?.multipleMatchDetail?.map(
          (match: any) => {
            if (match?.id === action?.payload?.id) {
              const {
                apiSession,
                apiTiedMatch,
                bookmaker,
                manualTideMatch,
                marketCompleteMatch,
                matchOdd,
                quickbookmaker,
                sessionBettings,
                setWinner,
                firstHalfGoal,
                halfTime,
                overUnder,
              } = action?.payload;
              return {
                ...match,
                apiSession,
                apiTideMatch: apiTiedMatch,
                bookmaker,
                manualTiedMatch: manualTideMatch,
                marketCompleteMatch,
                matchOdd,
                quickBookmaker: quickbookmaker,
                sessionBettings,
                setWinner,
                firstHalfGoal,
                halfTime,
                overUnder,
              };
            } else {
              return match;
            }
          }
        );
      })
      .addCase(updateProfitLossForMultipleMatch.fulfilled, () => {
        // const { jobData, profitLoss } = action.payload;
        // if (jobData?.betPlaceObject?.betPlacedData?.betId) {
        //   const updatedSessionProLoss = state.sessionProLoss.map((item: any) =>
        //     item?.id === jobData.betPlaceObject.betPlacedData.betId
        //       ? {
        //           ...item,
        //           proLoss: [
        //             JSON.stringify(profitLoss),
        //             ...item.proLoss.slice(1),
        //           ],
        //         }
        //       : item
        //   );
        //   state.sessionProLoss = updatedSessionProLoss;
        // }
      })
      .addCase(
        updateMaxLossForBetForMultipleMatch.fulfilled,
        (state, action) => {
          const { jobData, profitLoss } = action?.payload;

          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id === jobData?.placedBet?.matchId) {
                const updatedProfitLossDataSession =
                  match?.profitLossDataSession?.map((item: any) => {
                    if (item?.betId === jobData?.placedBet?.betId) {
                      return {
                        ...item,
                        maxLoss: profitLoss?.maxLoss,
                        totalBet: profitLoss?.totalBet,
                      };
                    }
                    return item;
                  });

                const betIndex = updatedProfitLossDataSession.findIndex(
                  (item: any) => item?.betId === jobData?.placedBet?.betId
                );
                if (betIndex === -1) {
                  updatedProfitLossDataSession?.push({
                    betId: jobData?.placedBet?.betId,
                    maxLoss: profitLoss?.maxLoss,
                    totalBet: 1,
                  });
                }

                return {
                  ...match,
                  profitLossDataSession: updatedProfitLossDataSession,
                };
              } else {
                return match;
              }
            }
          );
        }
      )
      .addCase(updateTeamRatesOfMultipleMatch.fulfilled, (state, action) => {
        const { userRedisObj, jobData } = action?.payload;

        state.multipleMatchDetail = state?.multipleMatchDetail.map(
          (match: any) => {
            if (match?.id === jobData?.newBet?.matchId) {
              if (userRedisObj[jobData?.teamCrateRedisKey]) {
                return {
                  ...match,
                  profitLossDataMatch: {
                    ...match.profitLossDataMatch,
                    [profitLossDataForMatchConstants[
                      jobData?.newBet?.marketType
                    ].A]: userRedisObj[jobData?.teamArateRedisKey],
                    [profitLossDataForMatchConstants[
                      jobData?.newBet?.marketType
                    ].B]: userRedisObj[jobData?.teamBrateRedisKey],
                    [profitLossDataForMatchConstants[
                      jobData?.newBet?.marketType
                    ].C]: userRedisObj[jobData?.teamCrateRedisKey],
                  },
                };
              } else
                return {
                  ...match,
                  profitLossDataMatch: {
                    ...match.profitLossDataMatch,
                    [profitLossDataForMatchConstants[
                      jobData?.newBet?.marketType
                    ].A]: userRedisObj[jobData?.teamArateRedisKey],
                    [profitLossDataForMatchConstants[
                      jobData?.newBet?.marketType
                    ].B]: userRedisObj[jobData?.teamBrateRedisKey],
                  },
                };
            } else return match;
          }
        );
      })
      .addCase(
        updateMaxLossForBetOnUndeclareForMultipleMatch.fulfilled,
        (state, action) => {
          const { betId, matchId, parentRedisUpdateObj } = action?.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id === matchId) {
                const updatedProfitLoss = Array.from(
                  new Set([
                    ...match.profitLossDataSession,
                    {
                      betId: betId,
                      maxLoss: JSON.parse(
                        parentRedisUpdateObj[`${betId}_profitLoss`]
                      )?.maxLoss,
                      totalBet: JSON.parse(
                        parentRedisUpdateObj[`${betId}_profitLoss`]
                      )?.totalBet,
                    },
                  ])
                );
                return {
                  ...match,
                  profitLossDataSession: updatedProfitLoss,
                };
              } else return match;
            }
          );
        }
      )
      .addCase(
        updateBetDataOnDeclareOfMultipleMatch.fulfilled,
        (state, action) => {
          const { betId, matchId } = action?.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (matchId === match?.id) {
                const updatedProfitLossDataSession =
                  match?.profitLossDataSession?.filter(
                    (item: any) => item?.betId !== betId
                  );

                return {
                  ...match,
                  profitLossDataSession: updatedProfitLossDataSession,
                };
              } else {
                return match;
              }
            }
          );
        }
      )
      .addCase(
        updateTeamRatesOnDeleteForMultiMatch.fulfilled,
        (state, action) => {
          const {
            redisObject,
            matchBetType,
            teamArateRedisKey,
            teamBrateRedisKey,
            teamCrateRedisKey,
          } = action?.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id === action?.payload?.matchId) {
                if (redisObject[teamCrateRedisKey]) {
                  return {
                    ...match,
                    profitLossDataMatch: {
                      ...match?.profitLossDataMatch,
                      [profitLossDataForMatchConstants[matchBetType].A]:
                        redisObject[teamArateRedisKey],
                      [profitLossDataForMatchConstants[matchBetType].B]:
                        redisObject[teamBrateRedisKey],
                      [profitLossDataForMatchConstants[matchBetType].C]:
                        redisObject[teamCrateRedisKey],
                    },
                  };
                } else
                  return {
                    ...match,
                    profitLossDataMatch: {
                      ...match?.profitLossDataMatch,
                      [profitLossDataForMatchConstants[matchBetType].A]:
                        redisObject[teamArateRedisKey],
                      [profitLossDataForMatchConstants[matchBetType].B]:
                        redisObject[teamBrateRedisKey],
                    },
                  };
              } else return match;
            }
          );
        }
      )
      .addCase(
        updateMaxLossForDeleteBetForMultiMatch.fulfilled,
        (state, action) => {
          const { matchId, betId, profitLoss } = action?.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match === matchId) {
                const updatedProfitLossDataSession =
                  match?.profitLossDataSession?.map((item: any) => {
                    if (betId === item?.betId) {
                      return {
                        ...item,
                        maxLoss: profitLoss?.maxLoss,
                        totalBet: profitLoss?.totalBet,
                      };
                    }
                    return item;
                  });

                const betIndex = updatedProfitLossDataSession?.findIndex(
                  (item: any) => item?.betId === betId
                );
                if (betIndex === -1) {
                  updatedProfitLossDataSession?.push({
                    betId: betId,
                    maxLoss: profitLoss?.maxLoss,
                    totalBet: 1,
                  });
                }
                match = {
                  ...match,
                  profitLossDataSession: updatedProfitLossDataSession,
                };
              } else {
                return match;
              }
            }
          );
        }
      )
      .addCase(
        updateMatchRatesOnMarketUndeclareForMulti.fulfilled,
        (state, action) => {
          const {
            profitLossData,
            betType,
            teamArateRedisKey,
            teamBrateRedisKey,
            teamCrateRedisKey,
          } = action?.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id === action?.payload?.matchId) {
                if (profitLossData[teamCrateRedisKey]) {
                  return {
                    ...match,
                    profitLossDataMatch: {
                      ...match?.profitLossDataMatch,
                      [profitLossDataForMatchConstants[betType].A]:
                        profitLossData[teamArateRedisKey],
                      [profitLossDataForMatchConstants[betType].B]:
                        profitLossData[teamBrateRedisKey],
                      [profitLossDataForMatchConstants[betType].C]:
                        profitLossData[teamCrateRedisKey],
                    },
                  };
                } else
                  return {
                    ...match,
                    profitLossDataMatch: {
                      ...match?.profitLossDataMatch,
                      [profitLossDataForMatchConstants[betType].A]:
                        profitLossData[teamArateRedisKey],
                      [profitLossDataForMatchConstants[betType].B]:
                        profitLossData[teamBrateRedisKey],
                    },
                  };
              } else return match;
            }
          );
        }
      )
      .addCase(analysisListReset, (state) => {
        return { ...state, success: false };
      });
  },
});

export const analysisListReducer = analysisListSlice.reducer;
