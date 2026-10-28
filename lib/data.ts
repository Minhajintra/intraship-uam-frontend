import mockDataRaw from "@/data/intraship-uam-mock-data.json";
import { MockDataSchema } from "@/types/uam";

// Mock JSON data ko type ke sath export karna
export const mockData: MockDataSchema = mockDataRaw as unknown as MockDataSchema;

// Mukhtalif pages ke liye alag alag data accessors
export const brandingData = mockData.branding;
export const loginData = mockData.login;
export const forgotPasswordData = mockData.forgotPassword;
export const dashboardData = mockData.dashboard;
