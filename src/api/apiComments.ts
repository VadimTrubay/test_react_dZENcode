import {AxiosResponse} from 'axios';
import {RegisterType} from '../types/authTypes';
import {mainUrls} from '../config/urls';
import axiosInstance from "../utils/createAxiosInstance";


export const fetchCommentsApi  = async (): Promise<AxiosResponse> => {
  return await axiosInstance.post(mainUrls.comments);
};

