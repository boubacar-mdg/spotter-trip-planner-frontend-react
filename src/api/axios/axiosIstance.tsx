import axios from "axios";
import { apiTimeout, apiUrl } from "../../config/api.config";
import { IError } from "../../interfaces/error";

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: apiTimeout,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      return Promise.reject({
        status: 408,
        errors: [
          {
            type: "NETWORK_ERROR",
            message: "An error occurred while connecting to the server.",
          },
        ],
      } as IError);
    } else {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
