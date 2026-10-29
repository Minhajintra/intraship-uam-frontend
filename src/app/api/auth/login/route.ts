import { NextResponse } from "next/server";
import { verifyLogin } from "@/lib/auth";

// Login API handler: .env credentials verify karta hai
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    // Required fields check karna
    if (!identifier || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter both email/username and password.",
        },
        { status: 400 }
      );
    }

    // Credentials verify karna
    const verification = verifyLogin(String(identifier), String(password));

    if (!verification.valid || !verification.user) {
      return NextResponse.json(
        {
          success: false,
          message: verification.message || "Invalid credentials.",
        },
        { status: 401 }
      );
    }

    // Kamyab authentication
    return NextResponse.json({
      success: true,
      message: "Authentication successful. Multi-Factor verification required.",
      requiresOtp: true,
      user: {
        name: verification.user.name,
        email: verification.user.email,
        role: verification.user.role,
        initials: "MK",
      },
    });
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred during login.",
      },
      { status: 500 }
    );
  }
}
