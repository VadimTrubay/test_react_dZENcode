export interface initialCommentsType {
  items: commentType[],
  loading: boolean,
  error: null,
}

export interface commentType {
  id: string;
  text: string;
  // image: file;
  // file: file;
}