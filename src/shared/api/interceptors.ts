import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import {
  NetworkOfflineError,
  TokenExpiredHandler,
} from '@/shared/api/errorHandler';
import { NON_AUTH_PATHS } from '@/shared/constants/NonAuthPaths';
import { ApiErrorResponse } from '@/shared/types/apiResponse';

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const isNonAuthPath = NON_AUTH_PATHS.some(
    (path) => config.url && config.url.includes(path)
  );

  if (!isNonAuthPath) {
    const authStorageStr = localStorage.getItem('auth-storage');
    let accessToken = null;

    if (authStorageStr) {
      try {
        const authStorage = JSON.parse(authStorageStr);
        accessToken = authStorage.state?.accessToken || null;
      } catch (e) {
        console.error('Failed to parse auth-storage from localStorage', e);
      }
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  if (config.headers['Content-Type'] === 'multipart/form-data') {
    const formData = new FormData();

    Object.entries(config.data || {}).forEach(([key, value]) => {
      if (value == null) return;
      formData.append(key, value instanceof File ? value : String(value));
    });

    config.data = formData;
  }

  return config;
};

export const responseInterceptor = (response: AxiosResponse) => {
  return Promise.resolve(response);
};

export const rejectInterceptor = async (error: AxiosError) => {
  if (!navigator.onLine) {
    throw new NetworkOfflineError();
  }

  if (TokenExpiredHandler.validate(error as AxiosError<ApiErrorResponse>)) {
    return TokenExpiredHandler.handleRefresh(
      error as AxiosError<ApiErrorResponse>
    );
  }

  return Promise.reject(error);
};
