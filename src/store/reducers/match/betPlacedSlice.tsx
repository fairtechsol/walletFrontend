import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import {
  addRunAmount,
  getPlacedBets,
  getSessionProLoss,
  getSessionProfitLossMatchDetailFilter,
  removeRunAmount,
  resetPlacedBets,
  resetSessionProLoss,
  updateBetDataOnDeclare,
  updateBetsPlaced,
  updatePlacedbets,
  updatePlacedbetsDeleteReason,
  updateProfitLoss,
} from "../../actions/match/matchAction";

interface InitialState {
  placedBets: Array<object>;
  sessionProLoss: Array<object>;
  loadingProLoss: boolean;
  successProLoss: boolean;
  loading: boolean;
  success: boolean;
  error: any;
}

const initialState: InitialState = {
  placedBets: [],
  sessionProLoss: [],
  loadingProLoss: false,
  successProLoss: false,
  loading: false,
  success: false,
  error: null,
};

const betsSlice = createSlice({
  name: "bets",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlacedBets.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getPlacedBets.fulfilled, (state, action) => {
        state.success = true;
        state.placedBets = action.payload;
        state.loading = false;
      })
      .addCase(getPlacedBets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(resetPlacedBets, (state) => {
        state.placedBets = [];
      })
      .addCase(updateBetsPlaced.fulfilled, (state, action) => {
        const { newBet, myStake, userName, betId } = action.payload;
        const currentPlacedBets = _.get(state, "placedBets", []);

        if (!_.some(currentPlacedBets, { id: betId })) {
          state.placedBets = [
            _.assign({}, newBet, {
              myStake,
              user: { userName },
            }),
            ...currentPlacedBets,
          ];
        }
      })
      .addCase(updateProfitLoss.fulfilled, (state, action) => {
        const { jobData, profitLoss } = action.payload;
        if (jobData?.betPlaceObject?.betPlacedData?.betId) {
          const updatedSessionProLoss = state?.sessionProLoss?.map(
            (item: any) =>
              item?.id === jobData?.betPlaceObject?.betPlacedData?.betId
                ? {
                    ...item,
                    proLoss: profitLoss,
                  }
                : item
          );
          state.sessionProLoss = updatedSessionProLoss;
        }
      })
      .addCase(updateBetDataOnDeclare.fulfilled, (state, action) => {
        const { betId } = action.payload;
        state.placedBets = state.placedBets?.filter(
          (items: any) => items?.betId != betId
        );
      })
      .addCase(addRunAmount.fulfilled, (state, action) => {
        const { id } = action.payload;

        if (
          id &&
          !_.some(state.sessionProLoss, (item: any) => item.id === id)
        ) {
          state.sessionProLoss?.push(action.payload);
        }
      })
      .addCase(removeRunAmount.fulfilled, (state, action) => {
        const { betId } = action.payload;
        state.sessionProLoss = state?.sessionProLoss?.filter(
          (item: any) => item?.id !== betId
        );
      })
      .addCase(getSessionProLoss.pending, (state) => {
        state.loadingProLoss = true;
        state.successProLoss = false;
        state.error = null;
      })
      .addCase(getSessionProLoss.fulfilled, (state, action) => {
        state.loadingProLoss = false;
        state.successProLoss = true;
        const { id } = action.payload;

        if (
          id &&
          !state?.sessionProLoss?.some((item: any) => item?.id === id)
        ) {
          state?.sessionProLoss?.push(action.payload);
        }
      })
      .addCase(getSessionProLoss.rejected, (state, action) => {
        state.loadingProLoss = false;
        state.error = action.error?.message;
      })
      .addCase(resetSessionProLoss, (state) => {
        state.successProLoss = false;
        state.sessionProLoss = [];
      })
      .addCase(
        getSessionProfitLossMatchDetailFilter.fulfilled,
        (state, action) => {
          const idToRemove = action.payload;

          if (!idToRemove || !Array.isArray(state.sessionProLoss)) return;

          state.sessionProLoss = _.filter(
            state.sessionProLoss,
            (item: any) => item.id !== idToRemove
          );
        }
      )
      .addCase(updatePlacedbets.fulfilled, (state, action) => {
        const {
          betPlacedId = [],
          deleteReason,
          profitLoss,
          betId,
          isPermanentDelete,
        } = action.payload;

        if (!Array.isArray(betPlacedId) || betPlacedId.length === 0) return;

        if (isPermanentDelete) {
          state.placedBets = state.placedBets?.filter(
            (bet: any) => !betPlacedId.includes(bet.id)
          );
        } else {
          state.placedBets = state.placedBets?.map((bet: any) =>
            betPlacedId.includes(bet.id) ? { ...bet, deleteReason } : bet
          );
        }

        if (state.sessionProLoss && betId && profitLoss) {
          state.sessionProLoss = state.sessionProLoss.map((session: any) =>
            session.id === betId
              ? {
                  ...session,
                  proLoss: [
                    JSON.stringify(profitLoss),
                    ...session.proLoss.slice(1),
                  ],
                }
              : session
          );
        }
      })

      .addCase(updatePlacedbetsDeleteReason.fulfilled, (state, action) => {
        const { betIds, deleteReason } = action.payload;

        state.placedBets = _.uniqBy(
          _.map(state.placedBets, (bet: any) =>
            _.includes(betIds, bet?.id) ? { ...bet, deleteReason } : bet
          ),
          "id"
        );
      });
  },
});

export const betsReducer = betsSlice.reducer;
