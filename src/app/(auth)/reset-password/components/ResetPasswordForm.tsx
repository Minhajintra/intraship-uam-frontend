"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { resetPasswordSchema } from "../schema/resetPasswordSchema";
import { authService } from "@/services/auth.service";

// Naya password set karne ka form component
export default function ResetPasswordForm() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form submit handler with Zod validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Password validation aur confirmation match check karna
    const validation = resetPasswordSchema.safeParse({ password, confirmPassword });
    if (!validation.success) {
      setError(validation.error.issues[0]?.message || "Invalid password provided.");
      return;
    }

    setIsLoading(true);

    try {
      // Password update request bhejna
      const data = await authService.resetPassword({ password, confirmPassword });

      if (!data.success) {
        setError(data.message || "Password update fail ho gaya.");
        setIsLoading(false);
        return;
      }

      // Kamyabi par login page par redirect
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Password update nahi ho saka. Connection check karein.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-[28px] p-6 sm:p-8 lg:p-9 border border-[#dce6df] shadow-xs">
      <span className="block text-[10px] sm:text-[10.5px] font-bold tracking-wider uppercase text-[#16382b] mb-2 sm:mb-2.5">
        PASSWORD RECOVERY
      </span>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#11261c] mb-1.5 tracking-tight">
        Create new password
      </h1>

      <p className="text-xs sm:text-sm text-[#55695e] mb-6 leading-relaxed">
        Choose a strong, memorable password for your IntraShip account.
      </p>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-[#fde4e4] text-[#b42318] text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 rounded-xl bg-[#e6f0e8] text-[#245b43] text-xs font-semibold">
          Password successfully updated! Redirecting to login...
        </div>
      )}

      {/* Reset form fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#16382b] mb-1.5">
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter at least 6 characters"
            disabled={isLoading || success}
            className="w-full h-11 px-3.5 bg-white border border-[#d5ded7] rounded-xl text-sm text-[#16382b] focus:border-[#245b43] focus:ring-2 focus:ring-[#245b43]/20 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#16382b] mb-1.5">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            disabled={isLoading || success}
            className="w-full h-11 px-3.5 bg-white border border-[#d5ded7] rounded-xl text-sm text-[#16382b] focus:border-[#245b43] focus:ring-2 focus:ring-[#245b43]/20 outline-none"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || success}
            className="w-full h-11 sm:h-12 rounded-xl font-semibold text-sm text-white bg-[#245b43] hover:bg-[#1b4332] active:scale-[0.99] transition-all shadow-sm flex items-center justify-center disabled:opacity-75 cursor-pointer"
          >
            {isLoading ? "Updating password..." : "Update password"}
          </button>
        </div>

        <div className="pt-2 text-center text-xs">
          <Link
            href="/login"
            className="font-bold text-[#245b43] hover:underline"
          >
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
