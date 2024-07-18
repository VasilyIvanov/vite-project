import { configureStore } from '@reduxjs/toolkit';
import historyReducer from './historySlice';
import currentMoveReducer from './currentMoveSlice';

export const store = configureStore({
  reducer: {
    history: historyReducer,
    currentMove: currentMoveReducer
  }
});

store.subscribe(() => sessionStorage.setItem('gameState', JSON.stringify(store.getState())));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
