import { NextResponse } from "next/server";

// Logout API: Session khatam karna
export async function POST() {
  try {
    return NextResponse.json({
      success: true,
      message: "User logged out successfully.",
    });
  } catch (error) {
    console.error("Logout API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process logout request.",
      },
      { status: 500 }
    );
  }
}
