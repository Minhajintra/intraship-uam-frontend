import { getConfig } from "@/lib/config";
import { apiClient } from "./api-client";
import { mockService } from "./mock.service";
import { LoginRequest, LoginResponse } from "@/app/(auth)/login/types/login.types";
import {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "@/app/(auth)/verify-otp/types/verifyOtp.types";
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from "@/app/(auth)/forgot-password/types/forgotPassword.types";
import {
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "@/app/(auth)/reset-password/types/resetPassword.types";

// Authentication Service: Config ke mutabiq mock ya live API use karta hai
export const authService = {
  // 1. User login request
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const config = getConfig();

    if (config.isMock) {
      return mockService.login(payload);
    }

    return apiClient<LoginResponse>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // 2. OTP bhejna ya resend karna
  async sendOtp(payload: SendOtpRequest = {}): Promise<SendOtpResponse> {
    const config = getConfig();

    if (config.isMock) {
      return mockService.sendOtp(payload);
    }

    return apiClient<SendOtpResponse>("/api/v1/auth/send-otp", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // 3. OTP code verify karna
  async verifyOtp(payload: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    const config = getConfig();

    if (config.isMock) {
      return mockService.verifyOtp(payload);
    }

    return apiClient<VerifyOtpResponse>("/api/v1/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // 4. Password reset ka request bhejna
  async forgotPassword(payload: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const config = getConfig();

    if (config.isMock) {
      return mockService.forgotPassword(payload);
    }

    return apiClient<ForgotPasswordResponse>("/api/v1/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // 5. Naya password update karna
  async resetPassword(payload: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const config = getConfig();

    if (config.isMock) {
      return mockService.resetPassword(payload);
    }

    return apiClient<ResetPasswordResponse>("/api/v1/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // 6. User logout handler
  async logout(): Promise<void> {
    const config = getConfig();
    if (config.isMock) return;

    try {
      await apiClient("/api/v1/auth/logout", { method: "POST" });
    } catch {
      // Network error par bhi clean exit
    }
  },
};
