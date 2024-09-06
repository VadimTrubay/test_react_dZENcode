import {AxiosResponse} from 'axios';
import {mainUrls} from '../config/urls';
import axiosInstance from "../utils/createAxiosInstance";


export const fetchCommentsApi  = async (params: any): Promise<AxiosResponse> => {
  const { page, page_size, ordering } = params;
  return await axiosInstance.get(mainUrls.comments, {
    params: { page, page_size, ordering }
  });
};

