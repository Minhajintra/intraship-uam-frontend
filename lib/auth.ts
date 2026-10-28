import fs from "fs";
import path from "path";

// User credentials ka interface
export interface DemoCredentials {
  email: string;
  password: string;
  role: string;
  name: string;
}

// .env file se email aur password read karna
export function getCredentials(): DemoCredentials {
  let email = "";
  let password = "";

  // Disk par maujood .env file check karna
  try {
    const envPath = path.join(process.cwd(), ".env");

    if (fs.existsSync(envPath)) {
      const fileContent = fs.readFileSync(envPath, "utf-8");
      const lines = fileContent.split(/\r?\n/);

      for (const line of lines) {
        const trimmedLine = line.trim();

        // Khali lines aur comments (#) skip karein
        if (!trimmedLine || trimmedLine.startsWith("#")) {
          continue;
        }

        // Key aur value alag karna
        const separatorIndex = trimmedLine.indexOf("=");
        if (separatorIndex !== -1) {
          const key = trimmedLine.substring(0, separatorIndex).trim();
          let value = trimmedLine.substring(separatorIndex + 1).trim();

          // Quotes hatana
          value = value.replace(/^["']|["']$/g, "");

          if (key === "ProEMAIL" || key === "PRO_EMAIL" || key === "ValidEmail") {
            email = value;
          }

          if (key === "ProPASSWORD" || key === "PRO_PASSWORD" || key === "ValidPassword") {
            password = value;
          }
        }
      }
    }
  } catch (error) {
    console.warn("Could not read .env file from disk:", error);
  }

  // Agar disk file me na mile to process.env check karein
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

// Naya password memory aur .env file dono me update karna
export function updatePassword(newPassword: string): boolean {
  const cleanPassword = newPassword.trim();
  const currentCredentials = getCredentials();

  // Server memory me password set karein
  process.env.ProPASSWORD = cleanPassword;
  process.env.PRO_PASSWORD = cleanPassword;
  process.env.ValidPassword = cleanPassword;

  // .env file me naya password save karein
  try {
    const envPath = path.join(process.cwd(), ".env");
    let fileContent = "";

    if (fs.existsSync(envPath)) {
      fileContent = fs.readFileSync(envPath, "utf-8");

      if (/^ProPASSWORD=.*/m.test(fileContent)) {
        fileContent = fileContent.replace(/^ProPASSWORD=.*$/m, `ProPASSWORD=${cleanPassword}`);
      } else {
        fileContent = fileContent.trimEnd() + `\nProPASSWORD=${cleanPassword}\n`;
      }

      if (currentCredentials.email && !/^ProEMAIL=.*/m.test(fileContent)) {
        fileContent = `ProEMAIL=${currentCredentials.email}\n` + fileContent;
      }
    } else {
      if (currentCredentials.email) {
        fileContent = `ProEMAIL=${currentCredentials.email}\nProPASSWORD=${cleanPassword}\n`;
      } else {
        fileContent = `ProPASSWORD=${cleanPassword}\n`;
      }
    }

    fs.writeFileSync(envPath, fileContent, "utf-8");
    return true;
  } catch (error) {
    console.warn("Failed to save updated password to .env file:", error);
    return false;
  }
}
