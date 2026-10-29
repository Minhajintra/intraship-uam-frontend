"use server";

import { getConfig } from "@/lib/config";
import { apiClient } from "@/services/api-client";
import { mockService } from "@/services/mock.service";
import {
  DashboardKpiItem,
  RoleUsersResponse,
  LoginAttemptsResponse,
  LoginAttemptsPeriod,
  InterfaceAccessResponse,
  LoginHistoryResponse,
  LoginHistoryFilters,
  PaginationMeta,
} from "../types/dashboard.types";

// 1. Top 4 Summary KPI Cards fetch karna
export async function getDashboardKpis(): Promise<DashboardKpiItem[]> {
  const config = getConfig();

  if (config.isMock) {
    return mockService.getDashboardKpis();
  }

  return apiClient<DashboardKpiItem[]>("/api/v1/dashboard/kpis");
}

// 2. Users by Role (Pie/Donut chart data)
export async function getRoleUsers(): Promise<RoleUsersResponse> {
  const config = getConfig();

  if (config.isMock) {
    return mockService.getRoleUsers();
  }

  return apiClient<RoleUsersResponse>("/api/v1/dashboard/role-users");
}

// 3. Login Attempts (Daily / Monthly bar chart)
export async function getLoginAttempts(
  period: LoginAttemptsPeriod = "daily"
): Promise<LoginAttemptsResponse> {
  const config = getConfig();

  if (config.isMock) {
    return mockService.getLoginAttempts(period);
  }

  return apiClient<LoginAttemptsResponse>(`/api/v1/dashboard/login-attempts?period=${period}`);
}

// 4. Interface-wise access breakdown
export async function getInterfaceAccess(): Promise<InterfaceAccessResponse> {
  const config = getConfig();

  if (config.isMock) {
    return mockService.getInterfaceAccess();
  }

  return apiClient<InterfaceAccessResponse>("/api/v1/dashboard/interface-access");
}

// 5. Login History audit records with filters & pagination
export async function getLoginHistory(
  filters: LoginHistoryFilters = {},
  pagination: Partial<PaginationMeta> = {}
): Promise<LoginHistoryResponse> {
  const config = getConfig();

  if (config.isMock) {
    return mockService.getLoginHistory(filters, pagination);
  }

  const queryParams = new URLSearchParams();
  if (filters.search) queryParams.set("search", filters.search);
  if (filters.status && filters.status !== "All Statuses") queryParams.set("status", filters.status);
  if (filters.interface && filters.interface !== "All Interfaces")
    queryParams.set("interface", filters.interface);
  if (pagination.currentPage) queryParams.set("page", String(pagination.currentPage));
  if (pagination.pageSize) queryParams.set("pageSize", String(pagination.pageSize));

  const qs = queryParams.toString() ? `?${queryParams.toString()}` : "";
  return apiClient<LoginHistoryResponse>(`/api/v1/dashboard/login-history${qs}`);
}

// Backward-compatible named action aliases
export const getDashboardKpisAction = getDashboardKpis;
export const getRoleUsersAction = getRoleUsers;
export const getLoginAttemptsAction = getLoginAttempts;
export const getInterfaceAccessAction = getInterfaceAccess;
export const getLoginHistoryAction = getLoginHistory;

