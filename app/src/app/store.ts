import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import calculateSlice from '../features/calculate/calculateSlice';

const reducers = {
  calculate: calculateSlice.reducer,
};
export const store = configureStore({
  reducer: { ...reducers },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
