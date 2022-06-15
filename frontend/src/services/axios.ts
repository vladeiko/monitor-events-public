import axios from "axios";
import { API_URL } from "../constants/env";
import { savedToken } from "../constants/savedToken";

export const axiosService = axios.create({ baseURL: API_URL });

axiosService.defaults.headers.common.Authorization = savedToken
  ? `Bearer ${savedToken}`
  : (undefined as any);

export const setAxiosToken = (token: string | null) => {
  if (!token) return;

  axiosService.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeAxiosToken = () => {
  axiosService.defaults.headers.common.Authorization = undefined as any;
};
