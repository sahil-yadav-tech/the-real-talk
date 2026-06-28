import { registerApi } from "../api/auth.api";

export const registerService = async (data) => {
  return await registerApi(data);
};