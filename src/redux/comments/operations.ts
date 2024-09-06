import {createAsyncThunk} from '@reduxjs/toolkit';
import {setAuthHeader} from '../../utils/authUtils';
import {fetchCommentsApi} from "../../api/apiComments";



export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (params: { page: number, page_size: number, ordering: string }, thunkAPI) => {
    try {
      const response = await fetchCommentsApi(params);
      setAuthHeader(response.data.access_token);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

