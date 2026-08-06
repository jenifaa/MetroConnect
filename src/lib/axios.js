
import config from "@/config";
import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

// Request Interceptor
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);