"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { otpSchema } from "../schema/verifyOtpSchema";
import { authService } from "@/services/auth.service";

// Multi-Factor OTP verification form component
export default function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || searchParams.get("flow") || "login";

  // 6 digits array state
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 60-second countdown timer
  const INITIAL_TIME = 60;
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIME);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  // MM:SS format helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Pehle input box par auto focus
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Har digit enter hone par agle input box par focus move karna
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, 6).split("");
      const nextOtp = [...otp];
      digits.forEach((d, i) => {
        if (index + i < 6) nextOtp[index + i] = d;
      });
      setOtp(nextOtp);
      const nextIndex = Math.min(index + digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const nextOtp = [...otp];
    nextOtp[index] = value;
    setOtp(nextOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Backspace dabane par pichle box par wapas jana
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Clipboard paste support (6 digits aik sath)
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const digits = pasted.split("");
    const nextOtp = [...otp];
    digits.forEach((d, i) => {
      if (i < 6) nextOtp[i] = d;
    });
    setOtp(nextOtp);
    const targetFocus = Math.min(digits.length, 5);
    inputRefs.current[targetFocus]?.focus();
  };

  // Code verify karne ka handler
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const otpValue = otp.join("");

    // Zod schema check
    const validation = otpSchema.safeParse({ otp: otpValue });
    if (!validation.success) {
      setError(validation.error.issues[0]?.message || "Please enter all 6 digits.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await authService.verifyOtp({
        otp: otpValue,
        flow: from === "reset" ? "reset" : "login",
      });

      if (data.success) {
        if (from === "reset") {
          router.push("/reset-password");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError(data.message || "Invalid verification code.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Code verify karne mein masla hua. Dobara koshish karein.");
    } finally {
      setIsLoading(false);
    }
  };

  // Naya verification code resend karna
  const handleResend = async () => {
    setError("");
    try {
      await authService.sendOtp({ reason: from === "reset" ? "reset" : "login" });
      setTimeLeft(INITIAL_TIME);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      setResendMessage("A new 6-digit verification code has been dispatched.");
      setTimeout(() => setResendMessage(""), 3500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "OTP resend nahi ho saka.");
    }
  };

  return (
    <div className="w-full bg-white rounded-[28px] p-6 sm:p-8 lg:p-9 border border-[#dce6df] shadow-xs">
      <span className="block text-[10px] sm:text-[10.5px] font-bold tracking-wider uppercase text-[#16382b] mb-2 sm:mb-2.5">
        MULTI-FACTOR AUTHENTICATION
      </span>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#11261c] mb-1.5 tracking-tight">
        Verify your identity
      </h1>

      <p className="text-xs sm:text-sm text-[#55695e] mb-6 leading-relaxed">
        Enter the 6-digit verification code sent to your registered email address.
      </p>

      {/* Resend success notice */}
      {resendMessage && (
        <div className="mb-4 p-2.5 rounded-xl bg-[#e6f0e8] text-[#245b43] text-xs font-semibold">
          {resendMessage}
        </div>
      )}

      {/* Error alert notice */}
      {error && (
        <div className="mb-4 p-2.5 rounded-xl bg-[#fde4e4] border border-[#fca5a5] text-[#b42318] text-xs font-semibold animate-shake">
          {error}
        </div>
      )}

      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-[#16382b]">
              Verification code
            </label>
            {/* Live countdown timer */}
            <span className="text-[11px] font-semibold text-[#245b43] bg-[#e6f0e8] px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span>⏱</span>
              <span>{formatTime(timeLeft)}</span>
            </span>
          </div>

          {/* 6 input boxes */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 justify-start">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-10 h-11 sm:w-12 sm:h-13 text-center text-lg sm:text-xl font-bold text-[#16382b] bg-white border border-[#d5ded7] rounded-xl focus:border-[#245b43] focus:ring-2 focus:ring-[#245b43]/20 outline-none transition-all"
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#6b7c72] mt-3">
            <span>
              {timeLeft > 0
                ? `Code expires in ${formatTime(timeLeft)}.`
                : "Code expired. Please request a new code."}
            </span>
            <span>Keep this page open while you verify.</span>
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 sm:h-12 rounded-xl font-semibold text-sm text-white bg-[#245b43] hover:bg-[#1b4332] active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
          >
            {isLoading ? "Verifying..." : "Verify code"}
          </button>
        </div>

        {/* Resend button */}
        <div className="pt-1 text-xs">
          <span className="text-[#16382b]">Didn&apos;t receive a code? </span>
          {timeLeft > 0 ? (
            <span className="text-[#6b7c72]">
              Resend in <span className="font-semibold text-[#245b43]">{formatTime(timeLeft)}</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="font-bold text-[#245b43] hover:underline cursor-pointer"
            >
              Resend
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
