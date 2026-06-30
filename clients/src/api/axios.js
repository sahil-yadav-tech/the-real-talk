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
    console.log(error, "error in axios instance");
    console.log(error.response, "error.response");
    
    
    return Promise.reject({
      message: error.response?.data?.message || "Something went wrong",
      status: error.response?.status || 500,
      success: error.response?.data?.success ?? false,
      errors: error.response?.data?.errors || null,
    });
  },
);

export default axiosInstance;
