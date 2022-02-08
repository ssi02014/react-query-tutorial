import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import calculateSlice from '../features/calculate/calculateSlice';
import sayByeMiddleware from '../features/middleware/sayBye';
import sayHelloMiddleware from '../features/middleware/sayHello';

// const reducers = {
//   calculate: calculateSlice.reducer,
// };

const rootReducer = combineReducers({
  calculate: calculateSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sayHelloMiddleware).concat(sayByeMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
