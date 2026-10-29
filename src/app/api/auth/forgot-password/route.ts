import { NextResponse } from "next/server";
import { verifyEmail } from "@/lib/auth";

// Forgot Password API: Registered email verify karta hai
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Email check karna
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "A valid email address is required.",
        },
        { status: 400 }
      );
    }

    // Email check karna ke .env ke mutabiq registered hai ya nahi
    const verification = verifyEmail(email);

    if (!verification.valid) {
      return NextResponse.json(
        {
          success: false,
          message:
            verification.message ||
            "This email address is not registered in our records. Only the email configured in your .env file is allowed.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Verification code sent to your registered email address.",
    });
  } catch (error) {
    console.error("Forgot Password API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process password recovery request.",
      },
      { status: 500 }
    );
  }
}
