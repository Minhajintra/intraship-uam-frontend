import { NextResponse } from "next/server";

// Verify OTP API: 6-digit numeric code check karna
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { otp } = body;

    const cleanOtp = typeof otp === "string" ? otp.trim() : "";

    // 6 digits ka check
    if (!cleanOtp || cleanOtp.length !== 6 || !/^\d{6}$/.test(cleanOtp)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid 6-digit numeric OTP code.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "OTP code verified successfully.",
    });
  } catch (error) {
    console.error("Verify OTP API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to verify OTP due to a server error.",
      },
      { status: 500 }
    );
  }
}
