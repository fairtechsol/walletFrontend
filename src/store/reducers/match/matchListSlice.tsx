import { createSlice } from "@reduxjs/toolkit";
import { convertData, updateSessionBettingsItem } from "../../../helper";
import { profitLossDataForMatchConstants } from "../../../utils/Constants";
import {
  betDataFromSocket,
  getMatchDetail,
  getMatchDetailMarketAnalysis,
  getMatchListInplay,
  matchListReset,
  setCurrentOdd,
  updateBalance,
  updateBetDataOnDeclare,
  updateMatchListRates,
  updateMatchRates,
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
      .addCase(updateMatchListRates.fulfilled, (state, action) => {
        const { id, matchOdd } = action?.payload;
        if (matchOdd) {
          const matchListIndex = state?.matchListInplay?.matches?.findIndex(
            (match: any) => match?.id === id
          );
          if (matchListIndex !== -1) {
            const updatedMatchlist = [...state.matchListInplay.matches];

            let matchOdds =
              state?.matchListInplay?.matches[matchListIndex]?.matchOdds &&
              state?.matchListInplay?.matches[matchListIndex]?.matchOdds
                .length > 0
                ? state.matchListInplay?.matches[matchListIndex]?.matchOdds[0]
                : state.matchListInplay?.matches[matchListIndex]?.matchOdds;

            updatedMatchlist[matchListIndex] = {
              ...updatedMatchlist[matchListIndex],
              matchOdds: [
                {
                  ...matchOdds,
                  ...matchOdd,
                },
              ],
            };

            return {
              ...state,
              matchListInplay: {
                ...state.matchListInplay,
                matches: updatedMatchlist,
              },
            };
          }
        }
        return state;
      })
      .addCase(updateMatchRates.fulfilled, (state, action) => {
        const {
          apiSession,
          apiTiedMatch,
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
          apiTiedMatch2,
          other,
          tournament,
        } = action?.payload;

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
          // manualSessionActive: sessionBettings?.length >= 0 ? true : false,
          // apiSessionActive: apiSession?.length >= 0 ? true : false,
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
          tournament,
        };
      })
      .addCase(matchListReset, (state) => {
        state.success = false;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        state.getProfile = {
          ...state.getProfile,
          userBal: {
            ...state?.getProfile?.userBal,
            exposure:
              action?.payload?.newUserExposure ?? action?.payload?.exposure,
          },
        };
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
      .addCase(betDataFromSocket.fulfilled, (state, action) => {
        const betId = action.payload?.betPlaced?.placedBet?.betId;

        if (
          !state?.betPlaceData?.some(
            (item: any) => item?.betPlaced?.placedBet?.betId === betId
          )
        ) {
          state.betPlaceData = [...state.betPlaceData, action?.payload];
        } else {
          const existingIndex = state?.betPlaceData?.findIndex(
            (item: any) => item?.betPlaced?.placedBet?.betId === betId
          );
          if (existingIndex !== -1) {
            let updatedSlice = state?.betPlaceData?.splice(existingIndex, 1);
            state.betPlaceData = [...updatedSlice, action?.payload];
          }
        }
      })
      .addCase(updateTeamRates.fulfilled, (state, action) => {
        const { userRedisObj, jobData } = action.payload;
        if (jobData?.newBet?.marketType === "other") {
          state.matchDetail.profitLossDataMatch = {
            ...state.matchDetail.profitLossDataMatch,
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
          state.matchDetail.profitLossDataMatch = {
            ...state.matchDetail.profitLossDataMatch,
            [jobData?.betId + "_" + "profitLoss" + "_" + state.matchDetail?.id]:
              JSON.stringify(userRedisObj),
          };
        } else {
          state.matchDetail.profitLossDataMatch = {
            ...state.matchDetail.profitLossDataMatch,
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
