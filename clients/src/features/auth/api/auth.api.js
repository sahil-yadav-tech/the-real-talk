import axiosInstance from "../../../api/axios";

export const registerApi = async (payload) => {
  const response = await axiosInstance.post("/auth/register", payload);
  return response.data;
};

/*
Verify Login Api
*/
export const verifyOtpApi = async (payload) => {
  console.log(payload, "payload");
  const response = await axiosInstance.post("/auth/verify-otp", payload);
  return response.data;
};

/*
LOGIN API 
*/

export const loginApi = async(payload) =>{
  console.log(payload, "Payload in Login Api");
  const response = await axiosInstance.post("/auth/login", payload)
  return response?.data;
}
