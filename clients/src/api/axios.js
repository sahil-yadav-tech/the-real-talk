import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
    (response) => response,

    (error) => {

        return Promise.reject({
            message: error.response?.data?.message,
            status: error.response?.status,
        });

    }
);

export default axiosInstance;
