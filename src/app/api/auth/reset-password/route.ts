import { NextResponse } from "next/server";
import { updatePassword } from "@/lib/auth";

// Reset Password API: .env file mein naya password update karta hai
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "A valid new password is required.",
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

    // .env file update karna
    const updated = updatePassword(password);

    if (updated) {
      return NextResponse.json({
        success: true,
        message: "Password has been successfully updated in .env file.",
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to write updated password to .env file.",
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("Reset Password API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred while updating password.",
      },
      { status: 500 }
    );
  }
}
