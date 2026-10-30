"use server";

import { authService } from "@/services/auth.service";
import {
  VerifyOtpRequest,
  VerifyOtpResponse,
  SendOtpRequest,
  SendOtpResponse,
} from "../types/verifyOtp.types";

// OTP code verify karne wala server action
export async function verifyOtpAction(
  payload: VerifyOtpRequest
): Promise<VerifyOtpResponse> {
  return authService.verifyOtp(payload);
}

// Naya OTP code resend karne wala server action
export async function sendOtpAction(
  payload: SendOtpRequest = {}
): Promise<SendOtpResponse> {
  return authService.sendOtp(payload);
}
