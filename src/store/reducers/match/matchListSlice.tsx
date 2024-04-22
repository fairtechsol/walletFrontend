import { createSlice } from "@reduxjs/toolkit";
import {
  betDataFromSocket,
  getMatchDetail,
  getMatchListInplay,
  matchListReset,
  setCurrentOdd,
  updateBalance,
  updateBetDataOnDeclare,
  updateMatchListRates,
  updateMatchRates,
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
              state?.matchListInplay?.matches[matchListIndex]?.matchOdds.length >
                0
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
          manualTideMatch,
          marketCompleteMatch,
          matchOdd,
          quickbookmaker,
          sessionBettings,
        } = action?.payload;
        state.matchDetail = {
          ...state.matchDetail,
          manualSessionActive: sessionBettings?.length >= 0 ? true : false,
          apiSessionActive: apiSession?.length >= 0 ? true : false,
          apiSession: apiSession,
          apiTideMatch: apiTiedMatch,
          bookmaker: bookmaker,
          manualTiedMatch: manualTideMatch,
          marketCompleteMatch: marketCompleteMatch,
          matchOdd: matchOdd,
          quickBookmaker: quickbookmaker,
          sessionBettings: sessionBettings,
        };
      })
      .addCase(matchListReset, (state) => {
        return { ...state, success: false };
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        state.getProfile = {
          ...state.getProfile,
          userBal: {
            ...state?.getProfile?.userBal,
            exposure: action?.payload?.newUserExposure ?? action?.payload?.exposure,
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
        } else {
          return state?.matchDetail;
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
              totalBet: 1,
            });
          }

          state.matchDetail = {
            ...state.matchDetail,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        } else {
          return state?.matchDetail;
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
        const { userRedisObj, jobData } = action?.payload;
        if (["tiedMatch2", "tiedMatch"].includes(jobData?.newBet?.marketType)) {
          state.matchDetail.profitLossDataMatch = {
            ...state.matchDetail.profitLossDataMatch,
            yesRateTie: userRedisObj[jobData?.teamArateRedisKey],
            noRateTie: userRedisObj[jobData?.teamBrateRedisKey],
          };
        } else if (["completeMatch"].includes(jobData?.newBet?.marketType)) {
          state.matchDetail.profitLossDataMatch = {
            ...state.matchDetail.profitLossDataMatch,
            yesRateComplete: userRedisObj[jobData?.teamArateRedisKey],
            noRateComplete: userRedisObj[jobData?.teamBrateRedisKey],
          };
        } else {
          state.matchDetail.profitLossDataMatch = {
            ...state.matchDetail.profitLossDataMatch,
            teamARate: userRedisObj[jobData?.teamArateRedisKey],
            teamBRate: userRedisObj[jobData?.teamBrateRedisKey],
            teamCRate: userRedisObj[jobData?.teamCrateRedisKey] ?? "",
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
              totalBet: 1,
            });
          }
          state.matchDetail = {
            ...state.matchDetail,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        } else {
          return state?.matchDetail;
        }
      })
      .addCase(updateTeamRatesOnDelete.fulfilled, (state, action) => {
        const { redisObject, matchBetType } = action?.payload;
        if (matchBetType === "tiedMatch2" || matchBetType === "tiedMatch1") {
          state.matchDetail.profitLossDataMatch = {
            ...state.matchDetail.profitLossDataMatch,
            yesRateTie: redisObject[action?.payload?.teamArateRedisKey],
            noRateTie: redisObject[action?.payload?.teamBrateRedisKey],
          };
        } else if (matchBetType === "completeMatch") {
          state.matchDetail.profitLossDataMatch = {
            ...state.matchDetail.profitLossDataMatch,
            yesRateComplete: redisObject[action?.payload?.teamArateRedisKey],
            noRateComplete: redisObject[action?.payload?.teamBrateRedisKey],
          };
        } else {
          state.matchDetail.profitLossDataMatch = {
            ...state.matchDetail.profitLossDataMatch,
            teamARate: redisObject[action?.payload?.teamArateRedisKey],
            teamBRate: redisObject[action?.payload?.teamBrateRedisKey],
            teamCRate: redisObject[action?.payload?.teamCrateRedisKey] ?? "",
          };
        }
      })
      .addCase(setCurrentOdd.fulfilled, (state, action) => {
        state.currentOdd = action?.payload;
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
