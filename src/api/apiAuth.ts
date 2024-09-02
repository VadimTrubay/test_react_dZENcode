import {AxiosResponse} from 'axios';
import {RegisterType, UserAuthorizationType} from '../types/authTypes';
import {mainUrls} from '../config/urls';
import axiosInstance from "../utils/createAxiosInstance";


export const register = async (credentials: RegisterType): Promise<AxiosResponse> => {
  return await axiosInstance.post(mainUrls.auth.signup, credentials);
};

export const login = async (credentials: UserAuthorizationType): Promise<AxiosResponse> => {
  return await axiosInstance.post(mainUrls.auth.login, credentials);
};

export const getMeApi = async (): Promise<AxiosResponse> => {
  return await axiosInstance.get(mainUrls.auth.me);
};
