import { NextResponse } from "next/server";
import { getCredentials } from "@/lib/auth";

// Login API: User ka email/username aur password check karna
export async function POST(request: Request) {
  try {
    // Request body se data nikalna
    const body = await request.json();
    const { identifier, password } = body;

    // Dono fields ka required check
    if (!identifier || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter both email/username and password.",
        },
        { status: 400 }
      );
    }

    // .env file se active credentials lana
    const expected = getCredentials();

    // Agar .env me credentials missing hon to server error
    if (!expected.email || !expected.password) {
      return NextResponse.json(
        {
          success: false,
          message: "Server credentials are not configured in .env file (ProEMAIL, ProPASSWORD).",
        },
        { status: 500 }
      );
    }

    // Email aur username matching
    const userInput = String(identifier).trim().toLowerCase();
    const systemEmail = expected.email.toLowerCase();

    // '@' se pehle ka hissa (jaise 'student') bhi valid username hai
    const usernamePrefix = systemEmail.includes("@")
      ? systemEmail.split("@")[0]
      : systemEmail;

    const isUserValid = userInput === systemEmail || userInput === usernamePrefix;
    const isPasswordValid = String(password).trim() === expected.password;

    // Kamyab login
    if (isUserValid && isPasswordValid) {
      return NextResponse.json({
        success: true,
        message: "Login successful.",
        user: {
          name: expected.name,
          email: expected.email,
          role: expected.role,
        },
      });
    }

    // Galat credentials par 401 response
    return NextResponse.json(
      {
        success: false,
        message: "The email/username or password you entered is incorrect.",
      },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
