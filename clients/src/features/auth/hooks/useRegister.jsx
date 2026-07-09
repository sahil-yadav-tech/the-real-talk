import { useMutation } from "@tanstack/react-query";
import {
  loginService,
  registerService,
  verifyOtpServices,
} from "../services/auth.service";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerService,
  });
};

export const useverifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtpServices,
  });
};

export const useResendOtp = () => {
  return useMutation({});
};

export const useLogin = () => {
  return useMutation({
    mutationFn:loginService
  })
}
