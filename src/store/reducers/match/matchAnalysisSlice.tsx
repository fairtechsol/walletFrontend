import { createSlice } from "@reduxjs/toolkit";
import { convertData, updateSessionBettingsItem } from "../../../helper";
import { profitLossDataForMatchConstants } from "../../../utils/Constants";
import {
  analysisListReset,
  getAnalysisList,
  getMultipleMatchDetail,
  getMultipleMatchRates,
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
                apiTiedMatch2,
                bookmaker,
                bookmaker2,
                manualTideMatch,
                marketCompleteMatch,
                marketCompleteMatch1,
                matchOdd,
                quickbookmaker,
                sessionBettings,
                setWinner,
                firstHalfGoal,
                halfTime,
                overUnder,
                completeManual,
                other,
                tournament,
              } = action?.payload;
              const parsedSessionBettings =
                match?.sessionBettings?.map(JSON.parse) || [];
              const apiParsedSessionBettings =
                sessionBettings?.map(JSON.parse) || [];

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
              return {
                ...match,
                apiSession,
                apiTideMatch: apiTiedMatch,
                apiTideMatch2: apiTiedMatch2,
                bookmaker,
                marketBookmaker2: bookmaker2,
                manualTiedMatch: manualTideMatch,
                marketCompleteMatch,
                marketCompleteMatch1,
                matchOdd,
                quickBookmaker: quickbookmaker,
                sessionBettings: stringifiedSessionBetting,
                setWinner,
                firstHalfGoal,
                halfTime,
                overUnder,
                manualCompleteMatch: completeManual,
                updatedSessionBettings: updateSessionBettingsItem(
                  convertData(parsedSessionBettings),
                  apiSession
                ),
                other,
                tournament: tournament?.sort((a: any, b: any) => {
                  // Primary sort by sno (ascending)
                  if (a.sno !== b.sno) {
                    return a.sno - b.sno;
                  }
                  // If sno values are equal, sort so that null parentId comes first
                  if (a.parentBetId === null && b.parentBetId !== null) return -1;
                  if (a.parentBetId !== null && b.parentBetId === null) return 1;
                  return 0;
                }),
              };
            } else {
              return match;
            }
          }
        );
      })
      .addCase(getMultipleMatchRates.fulfilled, (state, action) => {
        state.multipleMatchDetail = state?.multipleMatchDetail?.map(
          (match: any) => {
            if (match?.id === action?.payload?.id) {
              const {
                apiSession,
                apiTiedMatch,
                apiTiedMatch2,
                bookmaker,
                bookmaker2,
                manualTideMatch,
                marketCompleteMatch,
                marketCompleteMatch1,
                matchOdd,
                quickbookmaker,
                sessionBettings,
                setWinner,
                firstHalfGoal,
                halfTime,
                overUnder,
                completeManual,
                other,
                tournament,
              } = action?.payload;
              const parsedSessionBettings =
                match?.sessionBettings?.map(JSON.parse) || [];
              const apiParsedSessionBettings =
                sessionBettings?.map(JSON.parse) || [];

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
              return {
                ...match,
                apiSession,
                apiTideMatch: apiTiedMatch,
                apiTideMatch2: apiTiedMatch2,
                bookmaker,
                marketBookmaker2: bookmaker2,
                manualTiedMatch: manualTideMatch,
                marketCompleteMatch,
                marketCompleteMatch1,
                matchOdd,
                quickBookmaker: quickbookmaker,
                sessionBettings: stringifiedSessionBetting,
                setWinner,
                firstHalfGoal,
                halfTime,
                overUnder,
                manualCompleteMatch: completeManual,
                updatedSessionBettings: updateSessionBettingsItem(
                  convertData(parsedSessionBettings),
                  apiSession
                ),
                other,
                tournament: tournament?.sort((a: any, b: any) => {
                  // Primary sort by sno (ascending)
                  if (a.sno !== b.sno) {
                    return a.sno - b.sno;
                  }
                  // If sno values are equal, sort so that null parentId comes first
                  if (a.parentBetId === null && b.parentBetId !== null) return -1;
                  if (a.parentBetId !== null && b.parentBetId === null) return 1;
                  return 0;
                }),
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
                        profitLoss: profitLoss?.betPlaced,
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
                    profitLoss: profitLoss?.betPlaced,
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
              if (jobData?.newBet?.marketType === "other") {
                return {
                  ...match,
                  profitLossDataMatch: {
                    ...match.profitLossDataMatch,
                    [profitLossDataForMatchConstants[
                      jobData?.newBet?.marketType
                    ].A +
                    "_" +
                    jobData?.newBet?.betId +
                    "_" +
                    match?.id]: userRedisObj[jobData?.teamArateRedisKey],
                    [profitLossDataForMatchConstants[
                      jobData?.newBet?.marketType
                    ].B +
                    "_" +
                    jobData?.newBet?.betId +
                    "_" +
                    match?.id]: userRedisObj[jobData?.teamBrateRedisKey],
                    [profitLossDataForMatchConstants[
                      jobData?.newBet?.marketType
                    ].C +
                    "_" +
                    jobData?.newBet?.betId +
                    "_" +
                    match?.id]: userRedisObj[jobData?.teamCrateRedisKey],
                  },
                };
              } else if (jobData?.newBet?.marketType === "tournament") {
                return {
                  ...match,
                  profitLossDataMatch: {
                    ...match.profitLossDataMatch,
                    [jobData?.betId + "_" + "profitLoss" + "_" + match?.id]:
                      JSON.stringify(userRedisObj),
                  },
                };
              } else {
                return {
                  ...match,
                  profitLossDataMatch: {
                    ...match.profitLossDataMatch,
                    [profitLossDataForMatchConstants[
                      jobData?.newBet?.marketType
                    ].A +
                    "_" +
                    match?.id]: userRedisObj[jobData?.teamArateRedisKey],
                    [profitLossDataForMatchConstants[
                      jobData?.newBet?.marketType
                    ].B +
                    "_" +
                    match?.id]: userRedisObj[jobData?.teamBrateRedisKey],
                    [profitLossDataForMatchConstants[
                      jobData?.newBet?.marketType
                    ].C +
                    "_" +
                    match?.id]: userRedisObj[jobData?.teamCrateRedisKey],
                  },
                };
              }
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
                      profitLoss: JSON.parse(
                        parentRedisUpdateObj[`${betId}_profitLoss`]
                      )?.betPlaced,
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
            betId,
            teamRate,
            matchBetType,
            teamArateRedisKey,
            teamBrateRedisKey,
            teamCrateRedisKey,
          } = action?.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id === action?.payload?.matchId) {
                if (matchBetType === "other") {
                  if (redisObject[teamCrateRedisKey]) {
                    return {
                      ...match,
                      profitLossDataMatch: {
                        ...match?.profitLossDataMatch,
                        [profitLossDataForMatchConstants[matchBetType].A +
                        "_" +
                        betId +
                        "_" +
                        match?.id]: redisObject[teamArateRedisKey],
                        [profitLossDataForMatchConstants[matchBetType].B +
                        "_" +
                        betId +
                        "_" +
                        match?.id]: redisObject[teamBrateRedisKey],
                        [profitLossDataForMatchConstants[matchBetType].C +
                        "_" +
                        betId +
                        "_" +
                        match?.id]: redisObject[teamCrateRedisKey],
                      },
                    };
                  } else {
                    return {
                      ...match,
                      profitLossDataMatch: {
                        ...match?.profitLossDataMatch,
                        [profitLossDataForMatchConstants[matchBetType].A +
                        "_" +
                        betId +
                        "_" +
                        match?.id]: redisObject[teamArateRedisKey],
                        [profitLossDataForMatchConstants[matchBetType].B +
                        "_" +
                        betId +
                        "_" +
                        match?.id]: redisObject[teamBrateRedisKey],
                      },
                    };
                  }
                } else if (matchBetType === "tournament") {
                  return {
                    ...match,
                    profitLossDataMatch: {
                      ...match?.profitLossDataMatch,
                      [betId + "_" + "profitLoss" + "_" + match?.id]:
                        JSON.stringify(teamRate),
                    },
                  };
                } else {
                  if (redisObject[teamCrateRedisKey]) {
                    return {
                      ...match,
                      profitLossDataMatch: {
                        ...match?.profitLossDataMatch,
                        [profitLossDataForMatchConstants[matchBetType].A +
                        "_" +
                        match?.id]: redisObject[teamArateRedisKey],
                        [profitLossDataForMatchConstants[matchBetType].B +
                        "_" +
                        match?.id]: redisObject[teamBrateRedisKey],
                        [profitLossDataForMatchConstants[matchBetType].C +
                        "_" +
                        match?.id]: redisObject[teamCrateRedisKey],
                      },
                    };
                  } else {
                    return {
                      ...match,
                      profitLossDataMatch: {
                        ...match?.profitLossDataMatch,
                        [profitLossDataForMatchConstants[matchBetType].A +
                        "_" +
                        match?.id]: redisObject[teamArateRedisKey],
                        [profitLossDataForMatchConstants[matchBetType].B +
                        "_" +
                        match?.id]: redisObject[teamBrateRedisKey],
                      },
                    };
                  }
                }
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
                        profitLoss: profitLoss?.betPlaced,
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
                    profitLoss: profitLoss?.betPlaced,
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
