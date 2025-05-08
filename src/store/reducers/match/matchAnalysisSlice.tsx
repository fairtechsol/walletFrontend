import { createSlice } from "@reduxjs/toolkit";
import { convertData, updateSessionBettingsItem } from "../../../helper";
import {
  getAnalysisList,
  getMultipleMatchDetail,
  updateBetDataOnDeclareOfMultipleMatch,
  updateMatchRatesOnMarketUndeclareForMulti,
  updateMaxLossForBetForMultipleMatch,
  updateMaxLossForBetOnUndeclareForMultipleMatch,
  updateMaxLossForDeleteBetForMultiMatch,
  updateMultipleMatchDetail,
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
        state.analysisList = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getAnalysisList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getMultipleMatchDetail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMultipleMatchDetail.fulfilled, (state, action) => {
        state.multipleMatchDetail = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getMultipleMatchDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(updateMultipleMatchDetail.fulfilled, (state, action) => {
        const { apiSession, sessionBettings, tournament, id } = action.payload;
        state.multipleMatchDetail = state?.multipleMatchDetail?.map(
          (match: any) => {
            if (match?.id !== id) return match;
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
            return {
              ...match,
              apiSession,
              sessionBettings: sessionBettings,
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
          }
        );
      })
      .addCase(
        updateMaxLossForBetForMultipleMatch.fulfilled,
        (state, action) => {
          const { jobData, profitLoss } = action.payload;

          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id !== jobData?.placedBet?.matchId) return match;
              const updatedProfitLossDataSession =
                match?.profitLossDataSession?.map((item: any) => {
                  if (item?.betId !== jobData?.placedBet?.betId) return item;
                  return {
                    ...item,
                    maxLoss: profitLoss?.maxLoss,
                    totalBet: profitLoss?.totalBet,
                    profitLoss: profitLoss?.betPlaced,
                  };
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
            }
          );
        }
      )
      .addCase(updateTeamRatesOfMultipleMatch.fulfilled, (state, action) => {
        const { userRedisObj, jobData } = action.payload;

        state.multipleMatchDetail = state?.multipleMatchDetail.map(
          (match: any) => {
            if (match?.id !== jobData?.newBet?.matchId) return match;
            return {
              ...match,
              profitLossDataMatch: {
                ...match.profitLossDataMatch,
                [jobData?.betId + "_" + "profitLoss" + "_" + match?.id]:
                  JSON.stringify(userRedisObj),
              },
            };
          }
        );
      })
      .addCase(
        updateMaxLossForBetOnUndeclareForMultipleMatch.fulfilled,
        (state, action) => {
          const { betId, matchId, parentRedisUpdateObj } = action.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id !== matchId) return match;
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
            }
          );
        }
      )
      .addCase(
        updateBetDataOnDeclareOfMultipleMatch.fulfilled,
        (state, action) => {
          const { betId, matchId } = action.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (matchId !== match?.id) return match;
              const updatedProfitLossDataSession =
                match?.profitLossDataSession?.filter(
                  (item: any) => item?.betId !== betId
                );

              return {
                ...match,
                profitLossDataSession: updatedProfitLossDataSession,
              };
            }
          );
        }
      )
      .addCase(
        updateTeamRatesOnDeleteForMultiMatch.fulfilled,
        (state, action) => {
          const { betId, teamRate, matchId } = action.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id !== matchId) return match;
              return {
                ...match,
                profitLossDataMatch: {
                  ...match?.profitLossDataMatch,
                  [betId + "_" + "profitLoss" + "_" + match?.id]:
                    JSON.stringify(teamRate),
                },
              };
            }
          );
        }
      )
      .addCase(
        updateMaxLossForDeleteBetForMultiMatch.fulfilled,
        (state, action) => {
          const { betId, matchId, profitLoss } = action.payload;

          state.multipleMatchDetail = state.multipleMatchDetail?.map(
            (match: any) => {
              if (match.id !== matchId) return match;

              let updated = false;
              const updatedProfitLossDataSession =
                match.profitLossDataSession?.map((item: any) => {
                  if (item.betId !== betId) return item;
                  updated = true;
                  return {
                    ...item,
                    maxLoss: profitLoss?.maxLoss,
                    totalBet: profitLoss?.totalBet,
                    profitLoss: profitLoss?.betPlaced,
                  };
                }) || [];

              if (!updated) {
                updatedProfitLossDataSession.push({
                  betId,
                  maxLoss: profitLoss?.maxLoss,
                  profitLoss: profitLoss?.betPlaced,
                  totalBet: 1,
                });
              }

              return {
                ...match,
                profitLossDataSession: updatedProfitLossDataSession,
              };
            }
          );
        }
      )
      .addCase(
        updateMatchRatesOnMarketUndeclareForMulti.fulfilled,
        (state, action) => {
          const { profitLossData, betId, matchId } = action.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id !== matchId) return match;
              return {
                ...match,
                profitLossDataMatch: {
                  ...match?.profitLossDataMatch,
                  [betId + "_" + "profitLoss" + "_" + match?.id]:
                    JSON.stringify(profitLossData),
                },
              };
            }
          );
        }
      );
  },
});

export const analysisListReducer = analysisListSlice.reducer;
