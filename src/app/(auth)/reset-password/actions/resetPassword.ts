"use server";

import { authService } from "@/services/auth.service";
import { ResetPasswordRequest, ResetPasswordResponse } from "../types/resetPassword.types";

// Naya password update karne wala server action
export async function resetPasswordAction(
  payload: ResetPasswordRequest
): Promise<ResetPasswordResponse> {
  return authService.resetPassword(payload);
}
