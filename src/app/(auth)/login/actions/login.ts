"use server";

import { authService } from "@/services/auth.service";
import { LoginRequest, LoginResponse } from "../types/login.types";

// Login request ko handle karne wala server action
export async function loginAction(payload: LoginRequest): Promise<LoginResponse> {
  return authService.login(payload);
}
