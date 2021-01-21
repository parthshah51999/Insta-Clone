import axios from "axios";
import Constants from "../shared/js/constants";

const { ACCESS_TOKEN_KEY, BASE_API } = Constants;

// process.env.BASE_API
export const service = axios.create({
  baseURL: BASE_API,
});

// Add a request interceptor
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
