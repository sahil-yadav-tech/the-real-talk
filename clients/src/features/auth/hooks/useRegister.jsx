import { useMutation } from "@tanstack/react-query";
import { registerService, verifyOtpServices } from "../services/auth.service";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerService,
  });
};

export const useverifyOtp  = () =>{
  return useMutation({
    mutationFn:verifyOtpServices
  })
}

export const useResendOtp =() =>{
  return useMutation({
    
  })
}