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
import Logo from "@/components/Logo";
import { brandingData, loginData } from "@/lib/data";

export default function LoginPage() {
  const router = useRouter();

  // Input states
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

    // Form validation check
    const newErrors: { identifier?: string; password?: string } = {};
    if (!identifier.trim()) {
      newErrors.identifier = loginData.validation.requiredEmail;
    }
    if (!password) {
      newErrors.password = loginData.validation.requiredPassword;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      // Backend /api/auth/login route call karna
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setServerError(data.message || loginData.validation.invalidCredentials);
        setIsLoading(false);
        return;
      }

      // Kamyab login par OTP screen par bhejna
      setLoginSuccess(true);
      setTimeout(() => {
        router.push("/verify-otp?from=login");
      }, 600);
    } catch {
      setServerError("Unable to reach authentication server. Please check your network.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-screen max-h-screen w-full flex flex-col justify-between font-sans selection:bg-[#225740] selection:text-white overflow-hidden py-3 px-4 sm:px-8 lg:px-12 xl:px-14">
      {/* Background image aur green gradient tint */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0"
        style={{
          backgroundImage: "url('/images/login-bg.webp')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#d9e6dc]/85 via-[#e8f1eb]/55 to-white/10 backdrop-blur-[0.5px]"></div>
      </div>

      {/* Top Header: Portal Tag aur Help Button */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between gap-2 flex-shrink-0">
        <div className="px-3.5 sm:px-5 py-1.5 rounded-2xl bg-white/85 backdrop-blur-md border border-white/90 text-[10.5px] sm:text-xs font-semibold text-[#1e4d3a] shadow-xs truncate max-w-[210px] sm:max-w-none">
          {brandingData.portalTag}
        </div>

        <button
          type="button"
          onClick={() => alert("IntraShip Support: Please reach out to your administrator for access assistance.")}
          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/90 hover:bg-white text-[10.5px] sm:text-xs font-semibold text-[#16382b] shadow-xs border border-white/90 transition-all cursor-pointer flex-shrink-0"
        >
          <span className="text-[#225740] font-bold">?</span>
          <span>{brandingData.helpSupportText}</span>
        </button>
      </header>

      {/* Main 2-column Layout */}
      <main className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 xl:gap-14 my-auto min-h-0 py-2">
        {/* Left Side: Branding aur Steps */}
        <div className="hidden lg:flex flex-col max-w-[440px] xl:max-w-[480px] shrink-0">
          <div className="mb-3 xl:mb-4">
            <Logo href="/login" />
          </div>

          <h1 className="text-3xl xl:text-4xl 2xl:text-[40px] font-black text-[#11261c] leading-[1.15] tracking-tight mb-2 drop-shadow-xs">
            {brandingData.headline}
          </h1>

          <p className="text-xs xl:text-sm text-[#253d30] font-medium leading-relaxed mb-3 xl:mb-4">
            {brandingData.subheadline}
          </p>

          {/* 3 Steps list */}
          <div className="space-y-2 xl:space-y-2.5 mb-3.5 xl:mb-4">
            {brandingData.steps.map((step) => (
              <div key={step.id} className="flex items-center gap-3">
                <span className="w-6 h-6 xl:w-6.5 xl:h-6.5 rounded-full bg-white text-[#225740] font-bold text-[11px] xl:text-xs flex items-center justify-center shadow-xs border border-white/80 flex-shrink-0">
                  {step.id}
                </span>
                <span className="text-xs xl:text-sm font-semibold text-[#16382b]">
                  {step.text}
                </span>
              </div>
            ))}
          </div>

          <div className="self-start inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#225740] text-white text-[10px] xl:text-[11px] font-bold tracking-wider uppercase shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span>{brandingData.badgeText}</span>
          </div>
        </div>

        {/* Right Side: Login Card */}
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

            {/* Error alert banner */}
            {serverError && (
              <div className="mb-2.5 p-2 rounded-xl bg-[#fde4e4] border border-[#fca5a5] flex items-start gap-2 text-xs text-[#b42318] animate-shake">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="font-medium leading-tight">{serverError}</span>
              </div>
            )}

            {/* Login input form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-2.5 sm:space-y-3">
              {/* Email / Username */}
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

              {/* Password */}
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
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto text-center lg:text-left text-[10.5px] text-[#3b4d42] font-medium flex-shrink-0 pt-1">
        {brandingData.copyright}
      </footer>
    </div>
  );
}
