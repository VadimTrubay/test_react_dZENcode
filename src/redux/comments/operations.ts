import {createAsyncThunk} from '@reduxjs/toolkit';
import {setAuthHeader} from '../../utils/authUtils';
import {addCommentApi, deleteCommentApi, fetchCommentsListApi, getCommentByIdApi} from "../../api/apiComments";
import {CommentType} from "../../types/commentsTypes.ts";


export const fetchCommentsList = createAsyncThunk(
  "comments/fetchCommentsList",
  async (params: { page: number, page_size: number, ordering: string }, thunkAPI) => {
    try {
      const response = await fetchCommentsListApi(params);
      setAuthHeader(response.data.access_token);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCommentById = createAsyncThunk(
  "comments/fetchCompanyById",
  async (id: number, thunkAPI) => {
    try {
      const response = await getCommentByIdApi(id);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async (commentData: CommentType, thunkAPI) => {
    try {
      const response = await addCommentApi(commentData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id: number, thunkAPI) => {
    try {
      const response = await deleteCommentApi(id);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);