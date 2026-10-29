import fs from "fs";
import path from "path";

export interface DemoCredentials {
  email: string;
  password: string;
  role: string;
  name: string;
}

// .env file se credentials read karna
export function getCredentials(): DemoCredentials {
  let email = "";
  let password = "";

  try {
    const envPath = path.join(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const fileContent = fs.readFileSync(envPath, "utf-8");
      const lines = fileContent.split(/\r?\n/);

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;

        const sepIndex = trimmed.indexOf("=");
        if (sepIndex !== -1) {
          const key = trimmed.substring(0, sepIndex).trim();
          let val = trimmed.substring(sepIndex + 1).trim();
          val = val.replace(/^["']|["']$/g, "");

          if (key === "ProEMAIL" || key === "PRO_EMAIL" || key === "ValidEmail") {
            email = val;
          }
          if (key === "ProPASSWORD" || key === "PRO_PASSWORD" || key === "ValidPassword") {
            password = val;
          }
        }
      }
    }
  } catch (err) {
    console.warn("Could not read .env from disk:", err);
  }

  // Fallback to process.env
  if (!email) {
    email = process.env.ProEMAIL || process.env.PRO_EMAIL || process.env.ValidEmail || "";
  }
  if (!password) {
    password = process.env.ProPASSWORD || process.env.PRO_PASSWORD || process.env.ValidPassword || "";
  }

  return {
    email: email.trim(),
    password: password.trim(),
    name: "Minhaj Khan",
    role: "Administrator",
  };
}

// Check karna ke email registered hai ya nahi
export function verifyEmail(emailToCheck: string): { valid: boolean; message?: string } {
  const creds = getCredentials();
  if (!creds.email) {
    return {
      valid: false,
      message: "ProEMAIL is not configured in your .env file.",
    };
  }

  const cleanInput = emailToCheck.trim().toLowerCase();
  const cleanExpected = creds.email.toLowerCase();

  if (cleanInput === cleanExpected) {
    return { valid: true };
  }

  return {
    valid: false,
    message: "This email address is not registered. Only the email configured in your .env file is allowed.",
  };
}

// Login username aur password verify karna
export function verifyLogin(
  identifier: string,
  password: string
): { valid: boolean; message?: string; user?: DemoCredentials } {
  const creds = getCredentials();

  if (!creds.email || !creds.password) {
    return {
      valid: false,
      message: "ProEMAIL or ProPASSWORD is not configured in your .env file.",
    };
  }

  const userInput = identifier.trim().toLowerCase();
  const expectedEmail = creds.email.toLowerCase();
  const expectedUsername = expectedEmail.includes("@")
    ? expectedEmail.split("@")[0]
    : expectedEmail;

  const isUserValid = userInput === expectedEmail || userInput === expectedUsername;
  const isPasswordValid = password.trim() === creds.password;

  if (isUserValid && isPasswordValid) {
    return { valid: true, user: creds };
  }

  if (!isUserValid) {
    return {
      valid: false,
      message: "This email or username is not registered. Only the account in your .env file is allowed.",
    };
  }

  return {
    valid: false,
    message: "The password you entered is incorrect.",
  };
}

// .env file mein naya password save karna
export function updatePassword(newPassword: string): boolean {
  const cleanPassword = newPassword.trim();
  const creds = getCredentials();

  process.env.ProPASSWORD = cleanPassword;
  process.env.PRO_PASSWORD = cleanPassword;
  process.env.ValidPassword = cleanPassword;

  try {
    const envPath = path.join(process.cwd(), ".env");
    let content = "";

    if (fs.existsSync(envPath)) {
      content = fs.readFileSync(envPath, "utf-8");

      if (/^ProPASSWORD=.*/m.test(content)) {
        content = content.replace(/^ProPASSWORD=.*$/m, `ProPASSWORD=${cleanPassword}`);
      } else if (/^PRO_PASSWORD=.*/m.test(content)) {
        content = content.replace(/^PRO_PASSWORD=.*$/m, `PRO_PASSWORD=${cleanPassword}`);
      } else {
        content = content.trimEnd() + `\nProPASSWORD=${cleanPassword}\n`;
      }

      if (creds.email && !/^(ProEMAIL|PRO_EMAIL)=.*/m.test(content)) {
        content = `ProEMAIL=${creds.email}\n` + content;
      }
    } else {
      content = `ProEMAIL=${creds.email || "student@educatehyderabad.net"}\nProPASSWORD=${cleanPassword}\n`;
    }

    fs.writeFileSync(envPath, content, "utf-8");
    return true;
  } catch (err) {
    console.error("Failed to update password in .env file:", err);
    return false;
  }
}
