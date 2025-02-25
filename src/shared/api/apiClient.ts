import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { ApiResponse } from '../types/apiResponse';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // base URL
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const apiClient = {
  get: <T>(config: AxiosRequestConfig) =>
    axiosInstance
      .get<ApiResponse<T>>(config.url!, config)
      .then((res) => res.data),

  post: <T>(config: AxiosRequestConfig) =>
    axiosInstance
      .post<ApiResponse<T>>(config.url!, config.data, config)
      .then((res) => {
        if (!res.data.isSuccess) {
          throw new Error(res.data.message);
        }

        return res.data;
      }),
  // post: async <T>(config: AxiosRequestConfig) => {
  //   const res = await axiosInstance.post<ApiResponse<T>>(
  //     config.url!,
  //     config.data,
  //     config
  //   );
  //   if (!res.data.success) throw new Error(res.data);
  //   return res.data;
  // },

  put: <T>(config: AxiosRequestConfig) =>
    axiosInstance
      .put<ApiResponse<T>>(config.url!, config.data, config)
      .then((res) => res.data),

  patch: <T>(config: AxiosRequestConfig) =>
    axiosInstance
      .patch<ApiResponse<T>>(config.url!, config.data, config)
      .then((res) => res.data),

  delete: <T>(config: AxiosRequestConfig) =>
    axiosInstance
      .delete<ApiResponse<T>>(config.url!, config)
      .then((res) => res.data),

  putS3: async (url: string, file: File) =>
    axios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
    }),
} as const;
