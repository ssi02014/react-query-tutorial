import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalculateSlice {
  number: number;
}

const initialState: CalculateSlice = {
  number: 0,
};

const calculateSlice = createSlice({
  name: 'calculate',
  initialState,
  reducers: {
    increase: (state: CalculateSlice) => {
      state.number += 1;
    },
    decrease: (state: CalculateSlice) => {
      state.number -= 1;
    },
    multiple: (state: CalculateSlice, action: PayloadAction<number>) => {
      state.number *= action.payload;
    },
    divide: (state: CalculateSlice, action: PayloadAction<number>) => {
      state.number /= action.payload;
    },
  },
});

export const { increase, decrease, multiple, divide } = calculateSlice.actions;
export default calculateSlice;
