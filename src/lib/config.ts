export type DataMode = "mock" | "api";

export interface AppConfig {
  dataMode: DataMode;
  apiBaseUrl: string;
  isMock: boolean;
  isApi: boolean;
}

// Active application configuration load karna
export function getConfig(): AppConfig {
  const rawMode = (process.env.NEXT_PUBLIC_DATA_MODE || "mock").toLowerCase().trim();
  const dataMode: DataMode = rawMode === "api" ? "api" : "mock";
  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "").trim().replace(/\/+$/, "");

  return {
    dataMode,
    apiBaseUrl,
    isMock: dataMode === "mock",
    isApi: dataMode === "api",
  };
}

// Agar API mode ho toh check karna ke base URL set hai ya nahi
export function validateApiConfiguration(): { valid: boolean; error?: string } {
  const config = getConfig();

  if (config.isApi && !config.apiBaseUrl) {
    return {
      valid: false,
      error:
        "Configuration Error: NEXT_PUBLIC_DATA_MODE 'api' par hai lekin NEXT_PUBLIC_API_BASE_URL empty hai. Baraye meherbani API URL set karein ya 'mock' mode use karein.",
    };
  }

  return { valid: true };
}
