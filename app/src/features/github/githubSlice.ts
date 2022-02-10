import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface GithubState {
  loading: boolean;
  location: string;
  login: string;
  name: string;
}

const initialState: GithubState = {
  loading: false,
  location: '',
  login: '',
  name: '',
};

export const fetchGithubUserData = createAsyncThunk(
  'github/user',
  async (userId: string, thunkAPI) => {
    console.log('thunkAPI', thunkAPI);

    try {
      const res = await axios.get(`https://api.github.com/users/${userId}`);
      return res.data;
    } catch (err) {
      console.log('err');
    }
  }
);

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGithubUserData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchGithubUserData.fulfilled, (state: GithubState, action) => {
        state.loading = false;
        state.location = action.payload.location;
        state.login = action.payload.login;
        state.name = action.payload.name;
      });
  },
});

export const {} = githubSlice.actions;
export default githubSlice;
