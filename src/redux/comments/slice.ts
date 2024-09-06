import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CommentsResponseType, CommentType, InitialCommentsType} from "../../types/commentsTypes";
import {fetchComments} from "./operations";

const initialComments: InitialCommentsType = {
  items: [],
  count: 0,
  next: null,
  previous: null,
  loading: false,
  error: null,
};

const handlePending = (state: InitialCommentsType) => {
  state.loading = true;
};

const handleRejected = (state: InitialCommentsType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
};

const handleFetchCommentsFulfilled = (state: InitialCommentsType, action: PayloadAction<CommentsResponseType[]>) => {
  state.loading = false;
  state.error = null;
  state.items = action.payload.results;
  state.count = action.payload.count;
  state.next = action.payload.next;
  state.previous = action.payload.previous;
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
