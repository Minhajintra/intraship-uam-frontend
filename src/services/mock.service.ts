import sendOtpMock from "@/app/(auth)/verify-otp/data/send-otp.json";
import kpisMock from "@/app/(dashboard)/dashboard/data/kpis.json";
import roleUsersMock from "@/app/(dashboard)/dashboard/data/role-users.json";
import loginAttemptsDailyMock from "@/app/(dashboard)/dashboard/data/login-attempts-daily.json";
import loginAttemptsMonthlyMock from "@/app/(dashboard)/dashboard/data/login-attempts-monthly.json";
import interfaceAccessMock from "@/app/(dashboard)/dashboard/data/interface-access.json";
import loginHistoryMock from "@/app/(dashboard)/dashboard/data/login-history.json";

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

import {
  DashboardKpiItem,
  RoleUsersResponse,
  LoginAttemptsResponse,
  LoginAttemptsPeriod,
  InterfaceAccessResponse,
  LoginHistoryResponse,
  LoginHistoryFilters,
  PaginationMeta,
} from "@/app/(dashboard)/dashboard/types/dashboard.types";

// Asli network delay simulate karne ke liye helper function
const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Data Service: Local development aur testing ke liye
export const mockService = {
  // 1. Login: Credentials verify karna
  async login(payload: LoginRequest): Promise<LoginResponse> {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid email/username ya password.");
      }

      return data as LoginResponse;
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error("Authentication server se connect nahi ho saka.");
    }
  },

  // 2. OTP bhejna
  async sendOtp(_payload?: SendOtpRequest): Promise<SendOtpResponse> {
    void _payload;
    await delay(200);
    return sendOtpMock as unknown as SendOtpResponse;
  },

  // 3. OTP code check karna
  async verifyOtp(payload: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid verification code.");
      }

      return data as VerifyOtpResponse;
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error("OTP verify karne mein masla hua.");
    }
  },

  // 4. Password recovery ka email bhejna
  async forgotPassword(payload: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(
          data.message || "Yeh email hamare records mein registered nahi hai."
        );
      }

      return data as ForgotPasswordResponse;
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error("Password recovery request fail ho gayi.");
    }
  },

  // 5. Naya password save karna
  async resetPassword(payload: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Password update nahi ho saka.");
      }

      return data as ResetPasswordResponse;
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error("Password reset fail ho gaya.");
    }
  },

  // 6. Dashboard summary cards (KPIs)
  async getDashboardKpis(): Promise<DashboardKpiItem[]> {
    await delay(120);
    return kpisMock as unknown as DashboardKpiItem[];
  },

  // 7. Users by Role (Pie/Donut chart data)
  async getRoleUsers(): Promise<RoleUsersResponse> {
    await delay(140);
    return roleUsersMock as unknown as RoleUsersResponse;
  },

  // 8. Login attempts ka bar chart data (Daily ya Monthly)
  async getLoginAttempts(period: LoginAttemptsPeriod = "daily"): Promise<LoginAttemptsResponse> {
    await delay(150);
    const raw = period === "monthly" ? loginAttemptsMonthlyMock : loginAttemptsDailyMock;

    // Chart ke format mein data map karna
    const chartData = raw.categories.map((cat, i) => {
      const succ = raw.successful[i] ?? 0;
      const fail = raw.failed[i] ?? 0;
      return {
        period: cat,
        successful: succ,
        failed: fail,
        total: succ + fail,
      };
    });

    return {
      ...(raw as unknown as LoginAttemptsResponse),
      period,
      chartData,
    };
  },

  // 9. Interface ke hisab se access traffic
  async getInterfaceAccess(): Promise<InterfaceAccessResponse> {
    await delay(130);
    return interfaceAccessMock as unknown as InterfaceAccessResponse;
  },

  // 10. Login history records with search aur pagination
  async getLoginHistory(
    filters: LoginHistoryFilters = {},
    pagination: { page?: number; pageSize?: number } = {}
  ): Promise<LoginHistoryResponse> {
    await delay(180);
    const raw = loginHistoryMock as unknown as LoginHistoryResponse;

    let records = [...raw.records];

    // Search query match karna
    if (filters.search?.trim()) {
      const q = filters.search.toLowerCase().trim();
      records = records.filter(
        (r) =>
          r.userName.toLowerCase().includes(q) ||
          r.userEmail.toLowerCase().includes(q) ||
          r.ipAddress.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.device.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (filters.status && filters.status !== "All Statuses") {
      records = records.filter((r) => r.status.toLowerCase() === filters.status?.toLowerCase());
    }

    // Interface filter
    if (filters.interface && filters.interface !== "All Interfaces") {
      records = records.filter((r) => r.interface.toLowerCase() === filters.interface?.toLowerCase());
    }

    const currentPage = pagination.page && pagination.page > 0 ? pagination.page : 1;
    const pageSize = pagination.pageSize && pagination.pageSize > 0 ? pagination.pageSize : 5;
    const totalRecords = records.length;
    const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

    // Page ke mutabiq records slice karna
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedRecords = records.slice(startIndex, startIndex + pageSize);

    const paginationMeta: PaginationMeta = {
      currentPage,
      pageSize,
      totalRecords,
      totalPages,
    };

    return {
      title: raw.title,
      subtitle: raw.subtitle,
      records: paginatedRecords,
      pagination: paginationMeta,
      filterOptions: raw.filterOptions,
    };
  },
};
