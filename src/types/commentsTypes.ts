export interface UserType {
  id: number;
  username: string;
  email: string;
  home_page: string;
}

export interface ReplyType {
  id: number;
  user: UserType;
  replies: ReplyType[];
  text: string;
  image: string | null;
  file: string | null;
  created_at: string | null;
  parent: number;
}

export interface CommentType {
  id: number;
  user: UserType;
  replies: ReplyType[];
  text: string;
  image: string | null;
  file: string | null;
  created_at: string;
  parent: number;
}

export interface CommentsResponseType {
  results: CommentType[];
  count: number;
  next: number | null;
  previous: number | null;
}

export interface InitialCommentsType {
  items: CommentType[];
  count: number;
  next: number | null;
  previous: number | null;
  loading: boolean;
  error: null;
}