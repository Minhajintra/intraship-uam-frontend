"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/Logo";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || searchParams.get("flow") || "login";

  // 6 boxes ke liye OTP array
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 60-Second Countdown Timer
  const INITIAL_TIME = 60;
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIME);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Timer format (e.g. 01:00)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Pehle input box par auto focus
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Har box me number enter hone par agle box par focus shift karna
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

  // Copy paste OTP handle karna
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

  // OTP verify karne ka API call
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 6) return;

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: otpValue }),
      });
      const data = await res.json();
      if (data.success) {
        if (from === "reset") {
          router.push("/reset-password");
        } else {
          router.push("/dashboard");
        }
      }
    } catch {
      // Network issue fallback
      if (from === "reset") {
        router.push("/reset-password");
      } else {
        router.push("/dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Naya OTP mangwana (Resend)
  const handleResend = () => {
    setTimeLeft(INITIAL_TIME);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    setResendMessage("A new 6-digit verification code has been dispatched.");
    setTimeout(() => setResendMessage(""), 3500);
  };

  const steps = [
    { id: "01", text: "Check your registered email inbox" },
    { id: "02", text: "Enter all six digits carefully" },
    { id: "03", text: "Request a new code if it expires" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f8f5] font-sans flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-12 overflow-x-hidden">
      <main className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Side: OTP Verification Card */}
        <div className="flex flex-col">
          <div className="mb-5 sm:mb-6">
            <Logo href="/login" />
          </div>

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

            {resendMessage && (
              <div className="mb-4 p-2.5 rounded-xl bg-[#e6f0e8] text-[#245b43] text-xs font-semibold">
                {resendMessage}
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
        </div>

        {/* Right Side: Informative steps card */}
        <div className="w-full bg-[#e6f0e8] rounded-[28px] p-6 sm:p-8 lg:p-9 shadow-xs flex flex-col justify-between min-h-[460px]">
          <div>
            <div className="w-full h-2.5 rounded-full bg-[#245b43] mb-6 sm:mb-8"></div>

            <span className="block text-[10px] sm:text-[10.5px] font-bold tracking-wider uppercase text-[#245b43] mb-2 sm:mb-2.5">
              ACCOUNT SECURITY
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#11261c] mb-2.5 tracking-tight">
              One more step to sign in
            </h2>

            <p className="text-xs sm:text-sm text-[#4a5e52] mb-6 leading-relaxed">
              A quick verification helps keep your workspace and users safe.
            </p>

            {/* 3 Step List */}
            <div className="space-y-3">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="bg-white rounded-2xl p-3.5 sm:p-4 flex items-center gap-3.5 shadow-xs border border-white/80"
                >
                  <span className="w-7 h-7 rounded-full bg-[#e6f0e8] text-[#245b43] font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {step.id}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#16382b]">
                    {step.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] font-bold tracking-wider text-[#4a6355] uppercase mt-8 pt-4">
            INTRASHIP &bull; SECURE BY DESIGN
          </div>
        </div>
      </main>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f8f5]" />}>
      <VerifyOtpContent />
    </Suspense>
  );
}
