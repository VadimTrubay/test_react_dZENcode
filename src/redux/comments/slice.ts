import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CommentsResponseType, CommentType, InitialCommentsType} from "../../types/commentsTypes";
import {addComment, deleteComment, fetchCommentById, fetchCommentsList} from "./operations";
import toast from "react-hot-toast";

const initialComments: InitialCommentsType = {
  items: [],
  commentById: null,
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

const handleFetchCommentsListFulfilled = (state: InitialCommentsType, action: PayloadAction<CommentsResponseType>) => {
  state.loading = false;
  state.error = null;
  state.items = action.payload.results;
  state.count = action.payload.count;
  state.next = action.payload.next;
  state.previous = action.payload.previous;
};

const handleFetchCommentByIdFulfilled = (state: InitialCommentsType, action: PayloadAction<CommentType>) => {
  state.loading = false;
  state.error = null;
  state.commentById = action.payload
};

const handleAddCommentFulfilled = (state: InitialCommentsType, action: PayloadAction<CommentType>) => {
  state.loading = false;
  state.error = null;
  state.items.push(action.payload);
  toast.success(`Comment added successfully`);
};

const handleDeleteCommentFulfilled = (state: InitialCommentsType, action: PayloadAction<CommentType>) => {
  state.loading = false;
  state.error = null;
  state.items = state.items.filter((comment) => comment.id !== action.payload.id);
  toast.success(`Comment deleted successfully`);
};


const commentSlice = createSlice({
  name: "comments",
  initialState: initialComments,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsList.pending, handlePending)
      .addCase(fetchCommentsList.fulfilled, handleFetchCommentsListFulfilled)
      .addCase(fetchCommentsList.rejected, handleRejected)
      .addCase(fetchCommentById.pending, handlePending)
      .addCase(fetchCommentById.fulfilled, handleFetchCommentByIdFulfilled)
      .addCase(fetchCommentById.rejected, handleRejected)
      .addCase(addComment.pending, handlePending)
      .addCase(addComment.fulfilled, handleAddCommentFulfilled)
      .addCase(addComment.rejected, handleRejected)
      .addCase(deleteComment.pending, handlePending)
      .addCase(deleteComment.fulfilled, handleDeleteCommentFulfilled)
      .addCase(deleteComment.rejected, handleRejected)
  }
});

export const commentsReducer = commentSlice.reducer;
