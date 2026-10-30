import { NextResponse } from "next/server";

// Verify OTP API handler: 6-digit numeric verification code check karta hai
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { otp } = body;

    // 6 digits numeric validation
    if (!otp || typeof otp !== "string" || !/^\d{6}$/.test(otp.trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification code must be exactly 6 numeric digits.",
        },
        { status: 400 }
      );
    }

    // Mock failure cases
    if (otp === "000000") {
      return NextResponse.json(
        {
          success: false,
          message: "Verification code is invalid. Check it and try again.",
        },
        { status: 400 }
      );
    }

    if (otp === "999999") {
      return NextResponse.json(
        {
          success: false,
          message: "This verification code has expired. Please request a new code.",
        },
        { status: 400 }
      );
    }

    // Kamyab verification
    return NextResponse.json({
      success: true,
      message: "Verification code successfully verified.",
    });
  } catch (error) {
    console.error("Verify OTP API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to verify code due to a server error.",
      },
      { status: 500 }
    );
  }
}
