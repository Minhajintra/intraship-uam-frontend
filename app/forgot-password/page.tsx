"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertCircle, Loader2, Mail, Info } from "lucide-react";
import Logo from "@/components/Logo";
import { forgotPasswordData } from "@/lib/data";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Email format validation helper
  const validateEmail = (val: string) => /\S+@\S+\.\S+/.test(val);

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError(forgotPasswordData.validation.requiredEmail);
      return;
    }

    if (!validateEmail(email)) {
      setError(forgotPasswordData.validation.invalidFormat);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Password reset flow ke liye OTP page par jana
      router.push("/verify-otp?from=reset");
    }, 600);
  };

  const sidePanel = forgotPasswordData.sidePanel;

  return (
    <div className="min-h-screen bg-[#f3f7f4] font-sans flex flex-col justify-between p-4 sm:p-6 lg:px-12 lg:py-6 overflow-x-hidden">
      {/* Top Header Logo */}
      <div className="w-full max-w-6xl mx-auto mb-3 sm:mb-5 lg:mb-4 flex-shrink-0">
        <Logo href="/login" />
      </div>

      {/* Main 2-column layout */}
      <main className="w-full max-w-6xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-10 items-center my-auto">
        {/* Left Side: Reset Password Form Card */}
        <div className="w-full max-w-[480px] lg:max-w-none mx-auto bg-white rounded-3xl p-6 sm:p-8 xl:p-9 border border-[#e5ece7] shadow-sm">
          {/* Step Progress Bar */}
          <div className="mb-5 xl:mb-6">
            <div className="flex items-center justify-between text-[11px] font-bold tracking-wider uppercase text-[#6b7c72] mb-2.5">
              <span>{forgotPasswordData.badge}</span>
              <span className="text-[#16382b]">Step 1 of 3</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-1.5 rounded-full bg-[#225740]"></div>
              <div className="h-1.5 rounded-full bg-[#dbe5dd]"></div>
              <div className="h-1.5 rounded-full bg-[#dbe5dd]"></div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#11261c] tracking-tight mb-2">
            {forgotPasswordData.title}
          </h1>

          <p className="text-xs sm:text-sm text-[#6b7c72] leading-relaxed mb-6">
            {forgotPasswordData.subtitle}
          </p>

          {/* Error Message Alert */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-[#fde4e4] border border-[#fca5a5] flex items-start gap-2.5 text-xs text-[#b42318] animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="font-medium leading-tight">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-[#16382b] mb-1.5"
              >
                {forgotPasswordData.emailLabel}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder={forgotPasswordData.emailPlaceholder}
                  disabled={isLoading}
                  autoComplete="email"
                  className={`w-full h-11 pl-10 pr-3.5 py-2 bg-white border text-xs sm:text-sm rounded-xl focus:outline-none transition-all ${
                    error
                      ? "border-[#d92d20] focus:ring-1 focus:ring-[#d92d20]"
                      : "border-[#dbe5dd] focus:border-[#225740] focus:ring-2 focus:ring-[#225740]/20"
                  } text-[#16382b] placeholder:text-gray-400`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#225740] hover:bg-[#183f2e] active:scale-[0.99] focus:ring-2 focus:ring-[#225740] focus:ring-offset-2 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{forgotPasswordData.loadingButton}</span>
                </>
              ) : (
                <span>{forgotPasswordData.submitButton}</span>
              )}
            </button>
          </form>

          {/* Back to sign in link */}
          <div className="mt-6 pt-5 border-t border-[#e5ece7] text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#225740] hover:text-[#16382b] group transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>{forgotPasswordData.backToLogin}</span>
            </Link>
          </div>
        </div>

        {/* Right Side: Security instructions panel */}
        <div className="w-full max-w-[480px] lg:max-w-none mx-auto bg-[#e6efe8] rounded-3xl p-6 sm:p-8 xl:p-9 border border-[#c7ded0]">
          <div className="flex items-center gap-2.5 text-[#1e4d3a] mb-3">
            <Info className="w-5 h-5 flex-shrink-0" />
            <h2 className="text-base sm:text-lg font-bold">
              {sidePanel.title}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#465b50] leading-relaxed mb-6">
            {sidePanel.subtitle}
          </p>

          {/* Steps */}
          <div className="space-y-3.5">
            {sidePanel.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 border border-white/80"
              >
                <span className="w-6 h-6 rounded-full bg-[#225740] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {item.id}
                </span>
                <span className="text-xs font-semibold text-[#16382b]">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#c7ded0] text-[11px] text-[#556b5e] uppercase tracking-wider font-bold">
            {sidePanel.footer}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto text-center text-[11px] text-[#6b7c72] py-3 flex-shrink-0">
        &copy; 2026 IntraShip. All rights reserved.
      </footer>
    </div>
  );
}
