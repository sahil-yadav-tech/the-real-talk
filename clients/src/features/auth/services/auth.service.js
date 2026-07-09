import { loginApi, registerApi, verifyOtpApi } from "../api/auth.api";

export const registerService = async (data) => {
  return await registerApi(data);
};

export const verifyOtpServices = async(data) =>{
  return await verifyOtpApi(data)
}

export const loginService = async(data) =>{
  return await loginApi(data)
}