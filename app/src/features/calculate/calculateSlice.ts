import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalculateState {
  number: number;
}

const initialState: CalculateState = {
  number: 0,
};

const calculateSlice = createSlice({
  name: 'calculate',
  initialState,
  reducers: {
    increase: (state: CalculateState) => {
      state.number += 1;
    },
    decrease: (state: CalculateState) => {
      state.number -= 1;
    },
    multiple: (state: CalculateState, action: PayloadAction<number>) => {
      state.number *= action.payload;
    },
    divide: (state: CalculateState, action: PayloadAction<number>) => {
      state.number /= action.payload;
    },
  },
});

export const { increase, decrease, multiple, divide } = calculateSlice.actions;
export default calculateSlice;
