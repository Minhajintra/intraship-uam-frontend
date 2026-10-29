import { getConfig, validateApiConfiguration } from "@/lib/config";

// API errors ko handle karne ke liye custom class
export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status = 500, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Backend API call karne ka generic helper function
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const config = getConfig();

  // Agar API mode on ho toh base URL lazmi check karna
  if (config.isApi) {
    const check = validateApiConfiguration();
    if (!check.valid) {
      throw new ApiError(check.error || "Backend API configuration invalid hai.", 500);
    }
  }

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const targetUrl = `${config.apiBaseUrl}${cleanEndpoint}`;

  // Default headers prepare karna
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  try {
    const response = await fetch(targetUrl, { ...options, headers });
    const isJson = response.headers.get("content-type")?.includes("application/json");
    const result = isJson ? await response.json() : await response.text();

    // Agar server se error status aaye
    if (!response.ok) {
      const serverMessage =
        typeof result === "object" && result && "message" in result
          ? String((result as { message: unknown }).message)
          : `Request fail ho gayi, status: ${response.status}`;

      throw new ApiError(serverMessage, response.status, result);
    }

    return result as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    const failureReason =
      error instanceof Error ? error.message : "Network ya server se rabta nahi ho saka.";
    throw new ApiError(failureReason, 503);
  }
}
