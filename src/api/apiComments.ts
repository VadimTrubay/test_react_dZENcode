import {AxiosResponse} from 'axios';
import {mainUrls} from '../config/urls';
import axiosInstance from "../utils/createAxiosInstance";
import {CommentType} from "../types/commentsTypes.ts";


export const fetchCommentsListApi  = async (params: any): Promise<AxiosResponse> => {
  const { page, page_size, ordering } = params;
  return await axiosInstance.get(mainUrls.comments.all, {
    params: { page, page_size, ordering }
  });
};

export const getCommentByIdApi = async (id: number): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.comments.byId(id));
};

export const addCommentApi = async (commentData: CommentType): Promise<AxiosResponse> => {
  return await axiosInstance.post(mainUrls.comments.all, commentData);
};

export const deleteCommentApi = async (id: number): Promise<AxiosResponse> => {
  return await axiosInstance.delete(mainUrls.comments.byId(id));
}
