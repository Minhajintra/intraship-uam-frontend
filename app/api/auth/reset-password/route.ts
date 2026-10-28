import { NextResponse } from "next/server";
import { updatePassword } from "@/lib/auth";

// Reset Password API: Naya password .env me save karna
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    // Password validation
    if (!password || typeof password !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "A valid password is required.",
        },
        { status: 400 }
      );
    }

    // Minimum length check
    if (password.trim().length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 6 characters long.",
        },
        { status: 400 }
      );
    }

    // Password ko .env me update karna
    const wasUpdated = updatePassword(password);

    if (wasUpdated) {
      return NextResponse.json({
        success: true,
        message: "Password has been successfully updated in .env.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Password was updated in server memory.",
    });
  } catch (error) {
    console.error("Reset Password API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to reset password due to a server error.",
      },
      { status: 500 }
    );
  }
}
