import {createAsyncThunk} from '@reduxjs/toolkit';
import {setAuthHeader} from '../../utils/authUtils';
import {fetchCommentsApi} from "../../api/apiComments.ts";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (_, thunkAPI) => {
    try {
      const response = await fetchCommentsApi();
      setAuthHeader(response.data.access_token);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

