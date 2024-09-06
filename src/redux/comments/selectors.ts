import {CommentType} from "../../types/commentsTypes.ts";

// interface StateType {
//   comments: {
//     items: CommentType[];
//     count: number;
//     next: string | null;
//     previous: string | null;
//     loading: boolean;
//     error: string | null;
//   };
// }
export const selectAllComments = (state: any) => state.comments.items;
export const selectCountComments = (state: any) => state.comments.count;
export const selectNextComments = (state: any) => state.comments.next;
export const selectPreviousComments = (state: any) => state.comments.previous;
export const selectLoadingComments = (state: any) => state.comments.loading;
export const selectErrorComments = (state: any) => state.comments.error;
