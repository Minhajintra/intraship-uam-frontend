"use server";

import { authService } from "@/services/auth.service";
import { ForgotPasswordRequest, ForgotPasswordResponse } from "../types/forgotPassword.types";

// Password recovery email request bhejne wala server action
export async function forgotPasswordAction(
  payload: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> {
  return authService.forgotPassword(payload);
}
