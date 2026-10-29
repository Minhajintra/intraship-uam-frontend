"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Logo from "@/components/layout/Logo";
import { loginData } from "@/lib/data";
import { loginSchema, getFieldErrors } from "../schema/loginSchema";
import { authService } from "@/services/auth.service";

// User login form component
export default function LoginForm() {
  const router = useRouter();

  // Form input fields ki state
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Error aur loading states
  const [errors, setErrors] = useState<{ identifier?: string; password?: string }>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    // Zod schema se inputs validate karna
    const validation = loginSchema.safeParse({ identifier, password, rememberMe });
    if (!validation.success) {
      setErrors(getFieldErrors(validation.error));
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      // Auth service ke zariye login request bhejna
      const data = await authService.login({ identifier, password, rememberMe });

      if (!data.success) {
        setServerError(data.message || loginData.validation.invalidCredentials);
        setIsLoading(false);
        return;
      }

      // Kamyab login par OTP ya Dashboard par redirect
      setLoginSuccess(true);
      setTimeout(() => {
        if (data.requiresOtp !== false) {
          router.push("/verify-otp?from=login");
        } else {
          router.push("/dashboard");
        }
      }, 600);
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Authentication server se rabta nahi ho saka. Connection check karein."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[360px] sm:max-w-[390px] xl:max-w-[410px] mx-auto lg:mr-0 shrink-0">
      <div className="bg-white/90 backdrop-blur-xl border border-white/95 rounded-[28px] p-5 sm:p-6 shadow-2xl transition-all">
        <div className="mb-2">
          <Logo href="/login" />
        </div>

        <span className="inline-block px-2.5 py-0.5 rounded-full text-[9.5px] font-bold tracking-wider uppercase bg-[#e6efe8] text-[#225740] mb-1">
          {loginData.badge}
        </span>

        <h2 className="text-xl sm:text-2xl font-extrabold text-[#11261c] tracking-tight mb-0.5">
          {loginData.title}
        </h2>
        <p className="text-[11px] text-[#6b7c72] mb-2.5">
          {loginData.subtitle}
        </p>

        {/* Server error alert banner */}
        {serverError && (
          <div className="mb-2.5 p-2 rounded-xl bg-[#fde4e4] border border-[#fca5a5] flex items-start gap-2 text-xs text-[#b42318] animate-shake">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="font-medium leading-tight">{serverError}</span>
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-2.5 sm:space-y-3">
          {/* Email / Username field */}
          <div>
            <label
              htmlFor="identifier"
              className="block text-[11px] font-bold text-[#16382b] mb-1"
            >
              {loginData.emailLabel}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  if (errors.identifier) {
                    setErrors({ ...errors, identifier: undefined });
                  }
                }}
                placeholder={loginData.emailPlaceholder}
                disabled={isLoading}
                autoComplete="username"
                autoCapitalize="none"
                spellCheck="false"
                className={`w-full h-9.5 sm:h-10 pl-9 pr-3 py-2 bg-white border text-xs sm:text-sm rounded-xl focus:outline-none transition-all ${
                  errors.identifier
                    ? "border-[#d92d20] focus:ring-1 focus:ring-[#d92d20]"
                    : "border-[#225740] focus:ring-2 focus:ring-[#225740]/20"
                } text-[#16382b] placeholder:text-gray-400`}
              />
            </div>
            {errors.identifier && (
              <p className="mt-1 text-[10.5px] text-[#d92d20] font-medium">
                {errors.identifier}
              </p>
            )}
          </div>

          {/* Password field with show/hide toggle */}
          <div>
            <label
              htmlFor="password"
              className="block text-[11px] font-bold text-[#16382b] mb-1"
            >
              {loginData.passwordLabel}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: undefined });
                  }
                }}
                placeholder={loginData.passwordPlaceholder}
                disabled={isLoading}
                autoComplete="current-password"
                className={`w-full h-9.5 sm:h-10 pl-9 pr-9 py-2 bg-white border text-xs sm:text-sm rounded-xl focus:outline-none transition-all ${
                  errors.password
                    ? "border-[#d92d20] focus:ring-1 focus:ring-[#d92d20]"
                    : "border-[#dbe5dd] focus:border-[#225740] focus:ring-2 focus:ring-[#225740]/20"
                } text-[#16382b] placeholder:text-gray-400`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-md cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-[10.5px] text-[#d92d20] font-medium">
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember me aur Forgot password */}
          <div className="flex items-center justify-between text-[11px] pt-0.5">
            <label className="flex items-center gap-1.5 cursor-pointer select-none text-[#16382b] font-medium">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#225740] focus:ring-[#225740] border-gray-300 accent-[#225740] cursor-pointer"
              />
              <span>{loginData.rememberMe}</span>
            </label>

            <Link
              href="/forgot-password"
              className="font-bold text-[#225740] hover:text-[#16382b] hover:underline"
            >
              {loginData.forgotPasswordLink}
            </Link>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading || loginSuccess}
            className="w-full h-10 sm:h-10.5 mt-1 py-2 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#225740] hover:bg-[#183f2e] active:scale-[0.99] focus:ring-2 focus:ring-[#225740] focus:ring-offset-2 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{loginData.loadingButton}</span>
              </>
            ) : loginSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Success! Redirecting...</span>
              </>
            ) : (
              <span>{loginData.submitButton}</span>
            )}
          </button>
        </form>

        {/* Support info */}
        <div className="mt-2.5 pt-2 border-t border-[#e5ece7] text-[10.5px]">
          <p className="text-[#6b7c72]">
            {loginData.supportTroubleText}
          </p>
          <button
            type="button"
            onClick={() => alert("Please email your system administrator at admin@intraship.example.com")}
            className="font-bold text-[#225740] hover:underline text-[10.5px] inline-block mt-0.5 cursor-pointer"
          >
            {loginData.supportContactText}
          </button>

          <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-[#556b5e]">
            <Check className="w-3.5 h-3.5 text-[#225740] flex-shrink-0" />
            <span>{loginData.securityNote}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
