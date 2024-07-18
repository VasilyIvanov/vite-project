import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface HistoryState {
    value: any[][];
}

interface Payload {
    currentMove: number;
    nextSquares: any[];
}

const startValue = [Array(9).fill(null)];

export const historySlice = createSlice({
  name: 'history',
  initialState: getInitialState(),
  reducers: {
    set: (state, action: PayloadAction<Payload>) => {
        return { value: [...state.value.slice(0, action.payload.currentMove + 1), action.payload.nextSquares] };
    },
    reset: (state) => {
        state.value = startValue;
    }
  }
});

function getInitialState(): HistoryState {
    const json = sessionStorage.getItem('gameState');

    if (json) {
        const state: RootState = JSON.parse(json);

        if (Array.isArray(state?.history?.value) && state.history.value.length >= 1) {
            return state.history;
        }
    }

    return {
        value: startValue
    };
}

// Action creators are generated for each case reducer function
export const { set, reset } = historySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectHistory = (state: RootState) => state.history.value;

export default historySlice.reducer;
