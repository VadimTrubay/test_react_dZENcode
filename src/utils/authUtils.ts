import axios from "axios";

export const setAuthHeader = (access_token: string | null) => {
  if (access_token) {
    axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};