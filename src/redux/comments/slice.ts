import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialCommentsType} from "../../types/commentsTypes";
import {fetchComments} from "./operations.ts";

const initialComments: initialCommentsType = {
  items: [],
  loading: false,
  error: null,
};

const handlePending = (state: initialCommentsType) => {
  state.loading = true;
};

const handleRejected = (state: initialCommentsType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
};

const handleFetchCommentsFulfilled = (state: initialCommentsType, action: PayloadAction<initialCommentsType>) => {
  state.loading = false;
  state.error = null;
};

const commentSlice = createSlice({
  name: "comments",
  initialState: initialComments,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, handlePending)
      .addCase(fetchComments.fulfilled, handleFetchCommentsFulfilled)
      .addCase(fetchComments.rejected, handleRejected)
  }
});

export const commentsReducer = commentSlice.reducer;
