import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface CurrentMoveState {
    value: number;
}

const startValue = 0;

export const currentMoveSlice = createSlice({
  name: 'currentMove',
  initialState: getInitialState(),
  reducers: {
    increment: (state) => {
        state.value++;
    },
    set: (state, action: PayloadAction<number>) => {
        state.value = action.payload;
    },
    reset: (state) => {
        state.value = startValue;
    }
  }
});

function getInitialState(): CurrentMoveState {
    const json = sessionStorage.getItem('gameState');

    if (json) {
        const state: RootState = JSON.parse(json);

        if (state?.currentMove?.value != null) {
            return state.currentMove;
        }
    }

    return {
        value: startValue
    };
}

// Action creators are generated for each case reducer function
export const { increment, set, reset } = currentMoveSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentMove = (state: RootState) => state.history.value;

export default currentMoveSlice.reducer;
