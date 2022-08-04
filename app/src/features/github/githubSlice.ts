import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface GithubState {
  loading: boolean;
  location: string;
  login: string;
  name: string;
  error: any;
  errorData: any;
}

const initialState: GithubState = {
  loading: false,
  location: '',
  login: '',
  name: '',
  error: null,
  errorData: null,
};

export const requestGetUserData = createAsyncThunk(
  'user',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/zz'
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestGetUserData.pending, (state: GithubState) => {
        state.loading = true;
      })
      .addCase(requestGetUserData.fulfilled, (state: GithubState, action) => {
        state.loading = false;
        state.location = action.payload.location;
        state.login = action.payload.login;
        state.name = action.payload.name;
      })
      .addCase(
        requestGetUserData.rejected,
        (state: GithubState, action: any) => {
          state.loading = false;
          state.error = action.payload;
          state.errorData = action.payload.data;
        }
      );
  },
});

// export const {} = githubSlice.actions;
export default githubSlice;
