import { NextResponse } from "next/server";
import { dashboardData } from "@/lib/data";

// Dashboard API: KPI cards aur charts ka data bhejna
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard data.",
      },
      { status: 500 }
    );
  }
}
