import { registerApi, verifyOtpApi } from "../api/auth.api";

export const registerService = async (data) => {
  return await registerApi(data);
};

export const verifyOtpServices = async(data) =>{
  return await verifyOtpApi(data)
}